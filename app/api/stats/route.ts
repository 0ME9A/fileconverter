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

export async function GET() {
  try {
    await dbConnect();

    // Use aggregation for better insights
    const [counts, formatData, sizeData, recentConversions] = await Promise.all(
      [
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
        Stat.find().sort({ timestamp: -1 }).limit(10),
      ],
    );

    return NextResponse.json({
      success: true,
      totalFiles: counts,
      totalSize: sizeData[0]?.totalSize || 0,
      avgTime: Math.round(sizeData[0]?.avgTime || 0),
      formats: formatData.map((f) => ({ type: f._id, count: f.count })),
      recent: recentConversions,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to get stats";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}
