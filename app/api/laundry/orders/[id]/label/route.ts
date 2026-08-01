import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    return NextResponse.json({
      order: {
        id,
        kode_order: `LDR-2026-000001`,
        nama_santri: "Aisyah Rahmah",
        kamar: "Kamar 1",
        berat: 3.5,
        layanan: "Cuci Setrika",
        total_harga: 24500,
        status: "SIAP_DIAMBIL",
        tanggal_masuk: "2026-01-15",
        estimasi_selesai: "2026-01-16",
      },
    });
  } catch {
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}