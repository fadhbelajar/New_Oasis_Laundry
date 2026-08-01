import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") || "daily";

  const data = {
    daily: {
      total_pendapatan: 3900000,
      total_pengeluaran: 850000,
      laba_bersih: 3050000,
    },
    monthly: {
      total_pendapatan: 93000000,
      total_pengeluaran: 52000000,
      laba_bersih: 41000000,
    },
  };

  return NextResponse.json({
    type,
    data: data[type as keyof typeof data] || {},
  });
}