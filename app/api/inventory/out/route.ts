import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const inventoryOutSchema = z.object({
  jenis: z.enum(["penjualan", "pemakaian_laundry", "barang_rusak", "retur_supplier", "penyesuaian_stok"]),
  items: z.array(
    z.object({
      product_id: z.string(),
      qty: z.number().min(1),
      keterangan: z.string().optional(),
    })
  ),
  referensi: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = inventoryOutSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Validasi gagal", errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { jenis, items, referensi } = parsed.data;

    return NextResponse.json({
      message: "Barang keluar berhasil dicatat",
      transaction: {
        id: "out-" + Date.now(),
        jenis,
        items,
        referensi,
        total_qty: items.reduce((sum, item) => sum + item.qty, 0),
      },
    });
  } catch {
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}