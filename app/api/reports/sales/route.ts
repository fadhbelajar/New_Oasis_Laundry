import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") || "sales";
  const period = searchParams.get("period") || "daily";

  const data = {
    sales: {
      daily: [
        { date: "2026-01-11", amount: 2100000 },
        { date: "2026-01-12", amount: 2300000 },
        { date: "2026-01-13", amount: 1800000 },
        { date: "2026-01-14", amount: 2500000 },
        { date: "2026-01-15", amount: 2200000 },
        { date: "2026-01-16", amount: 2800000 },
        { date: "2026-01-17", amount: 2450000 },
      ],
      monthly: [
        { month: "Jan", amount: 75000000 },
        { month: "Feb", amount: 82000000 },
        { month: "Mar", amount: 78000000 },
        { month: "Apr", amount: 85000000 },
        { month: "Mei", amount: 90000000 },
        { month: "Jun", amount: 88000000 },
      ],
    },
    laundry: {
      monthly: [
        { month: "Jan", amount: 15000000 },
        { month: "Feb", amount: 18000000 },
        { month: "Mar", amount: 16500000 },
        { month: "Apr", amount: 20000000 },
        { month: "Mei", amount: 22000000 },
        { month: "Jun", amount: 19500000 },
      ],
    },
    finance: {
      kas_masuk: 150000000,
      kas_keluar: 85000000,
      laba_bersih: 65000000,
    },
  };

  return NextResponse.json({
    type,
    period,
    data: data[type as keyof typeof data]?.[period as keyof typeof data.sales] || [],
  });
}