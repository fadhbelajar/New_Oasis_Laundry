import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const pickupSchema = z.object({
  order_id: z.string(),
  penerima: z.string(),
  keterangan: z.string().optional(),
});

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const parsed = pickupSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Validasi gagal", errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { penerima, keterangan } = parsed.data;

    return NextResponse.json({
      message: "Pengambilan laundry berhasil dikonfirmasi",
      pickup: {
        order_id: id,
        penerima,
        keterangan,
        confirmed_at: new Date().toISOString(),
      },
    });
  } catch {
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}