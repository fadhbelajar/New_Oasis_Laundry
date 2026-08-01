import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const orderSchema = z.object({
  santri_id: z.string(),
  layanan_id: z.string(),
  berat: z.number().min(0.1),
  jumlah_potong: z.number().min(1).default(1),
  catatan: z.string().optional(),
  tanggal_masuk: z.string().optional(),
  estimasi_selesai: z.string().optional(),
  hutang: z.number().min(0).default(0),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = orderSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Validasi gagal", errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { santri_id, layanan_id, berat, jumlah_potong, catatan, hutang } = parsed.data;

    const orderNumber = `LDR-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 999999)).padStart(6, "0")}`;

    return NextResponse.json({
      message: "Order laundry berhasil dibuat",
      order: {
        id: "order-" + Date.now(),
        kode_order: orderNumber,
        santri_id,
        layanan_id,
        berat,
        jumlah_potong,
        total_harga: berat * 5000,
        hutang,
        status: "DITERIMA",
        catatan,
        tanggal_masuk: new Date().toISOString(),
      },
    });
  } catch {
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}