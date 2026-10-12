import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Stat from "@/lib/models/Stat";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    const stat = await Stat.create(body);

    return NextResponse.json({ success: true, data: stat }, { status: 201 });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to log stat";
    console.error("Failed to log stat:", error);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}

export async function GET(req: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const full = searchParams.get("full") === "1";

    if (full) {
      // Full dataset for /stats dashboard — runs all 4 queries
      const [counts, formatData, sizeData, recentConversions] =
        await Promise.all([
          Stat.countDocuments(),
          Stat.aggregate([
            { $group: { _id: "$convertedType", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
          ]),
          Stat.aggregate([
            {
              $group: {
                _id: null,
                totalSize: { $sum: "$fileSize" },
                avgTime: { $avg: "$processingTime" },
              },
            },
          ]),
          Stat.find().sort({ timestamp: -1 }).limit(10).lean(),
        ]);

      return NextResponse.json({
        success: true,
        totalFiles: counts,
        totalSize: sizeData[0]?.totalSize || 0,
        avgTime: Math.round(sizeData[0]?.avgTime || 0),
        formats: formatData.map((f) => ({ type: f._id, count: f.count })),
        recent: recentConversions,
      });
    }

    // Lightweight response for home page StatsCounter (cached by CDN)
    const [counts, sizeData] = await Promise.all([
      Stat.countDocuments(),
      Stat.aggregate([
        {
          $group: {
            _id: null,
            totalSize: { $sum: "$fileSize" },
            avgTime: { $avg: "$processingTime" },
          },
        },
      ]),
    ]);

    const response = NextResponse.json({
      success: true,
      totalFiles: counts,
      totalSize: sizeData[0]?.totalSize || 0,
      avgTime: Math.round(sizeData[0]?.avgTime || 0),
    });

    // Cache for 60 s on the CDN/browser; stale-while-revalidate up to 300 s
    response.headers.set(
      "Cache-Control",
      "public, s-maxage=60, stale-while-revalidate=300",
    );

    return response;
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to get stats";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}
