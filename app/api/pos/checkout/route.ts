import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const checkoutSchema = z.object({
  items: z.array(
    z.object({
      product_id: z.string(),
      qty: z.number().min(1),
      price: z.number().min(0),
      discount: z.number().min(0).max(100).default(0),
    })
  ),
  payment_method: z.enum(["tunai", "transfer", "qris", "saldo_santri"]),
  discount_total: z.number().min(0).max(100).default(0),
  tax_enabled: z.boolean().default(false),
  tax_rate: z.number().default(11),
  notes: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = checkoutSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Validasi gagal", errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { items, payment_method, discount_total, tax_enabled, tax_rate, notes } = parsed.data;

    const subtotal = items.reduce((sum, item) => {
      return sum + item.qty * item.price * (1 - item.discount / 100);
    }, 0);

    const discountAmount = subtotal * (discount_total / 100);
    const taxableAmount = subtotal - discountAmount;
    const tax = tax_enabled ? taxableAmount * (tax_rate / 100) : 0;
    const total = taxableAmount + tax;

    const invoiceNumber = `INV-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 999999)).padStart(6, "0")}`;

    return NextResponse.json({
      message: "Transaksi berhasil",
      invoice: {
        nomor_invoice: invoiceNumber,
        total: total,
        payment_method,
        notes,
        items: items.map((item) => ({
          product_id: item.product_id,
          qty: item.qty,
          price: item.price,
          discount: item.discount,
          subtotal: item.qty * item.price * (1 - item.discount / 100),
        })),
      },
    });
  } catch {
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}