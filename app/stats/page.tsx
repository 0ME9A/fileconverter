import { notFound } from "next/navigation";
import { StatsData } from "../type/common";
import ClientUi from "./ClientUi";

export default async function page() {
  const req = await fetch(`${process.env.API_BASE_URL}/stats`);

  if (!req.ok) notFound();

  const res: StatsData | null = await req.json();

  if (!res || !res.success) notFound();

  return <ClientUi res={res} />;
}
