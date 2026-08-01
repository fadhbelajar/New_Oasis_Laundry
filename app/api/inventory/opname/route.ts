import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const opnameSchema = z.object({
  items: z.array(
    z.object({
      product_id: z.string(),
      stok_fisik: z.number().min(0),
      keterangan: z.string().optional(),
    })
  ),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = opnameSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Validasi gagal", errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { items } = parsed.data;

    const results = items.map((item) => ({
      product_id: item.product_id,
      stok_sistem: 100,
      stok_fisik: item.stok_fisik,
      selisih: item.stok_fisik - 100,
      status: item.stok_fisik === 100 ? "Cocok" : "Perlu Approval",
    }));

    return NextResponse.json({
      message: "Stok opname berhasil dicatat",
      results,
    });
  } catch {
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}