import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") || "daily";

  const data = {
    daily: {
      penjualan: 2450000,
      laundry: 1500000,
      kas_masuk: 3200000,
      kas_keluar: 850000,
    },
    monthly: {
      laba_kotor: 75000000,
      pendapatan_laundry: 180000000,
      pengeluaran_operasional: 52000000,
      laba_bersih: 203000000,
    },
  };

  return NextResponse.json({
    type,
    data: data[type as keyof typeof data] || {},
  });
}