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
        santri_id: "santri-1",
        layanan_id: "service-1",
        berat: 3.5,
        jumlah_potong: 1,
        total_harga: 24500,
        hutang: 0,
        status: "SIAP_DIAMBIL",
        catatan: null,
        tanggal_masuk: "2026-01-15T08:00:00Z",
        estimasi_selesai: "2026-01-16T08:00:00Z",
      },
    });
  } catch {
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}