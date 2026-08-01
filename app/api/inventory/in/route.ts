import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const inventoryInSchema = z.object({
  supplier_id: z.string(),
  nomor_faktur: z.string().min(1),
  tanggal: z.string().optional(),
  items: z.array(
    z.object({
      product_id: z.string(),
      qty: z.number().min(1),
      harga_beli: z.number().min(0),
    })
  ),
  catatan: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = inventoryInSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Validasi gagal", errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { supplier_id, nomor_faktur, tanggal, items, catatan } = parsed.data;

    return NextResponse.json({
      message: "Barang masuk berhasil dicatat",
      purchase: {
        id: "pur-" + Date.now(),
        supplier_id,
        nomor_faktur,
        tanggal: tanggal || new Date().toISOString(),
        total_amount: items.reduce((sum, item) => sum + item.qty * item.harga_beli, 0),
        status: "draft",
        catatan,
        items,
      },
    });
  } catch {
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}