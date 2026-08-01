"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { qrcode } from "qrcode";

const checkoutSchema = z.object({
  items: z.array(z.object({
    product_id: z.string(),
    qty: z.number().min(1),
    price: z.number().min(0),
    discount: z.number().min(0).max(100),
  })),
  payment_method: z.enum(["tunai", "transfer", "qris", "saldo_santri"]),
  discount_total: z.number().min(0).max(100).default(0),
  tax_enabled: z.boolean().default(false),
  tax_rate: z.number().default(11),
  notes: z.string().optional(),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

export default function POSCheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState<Array<{
    product_id: string;
    nama_produk: string;
    qty: number;
    harga: number;
    diskon: number;
    subtotal: number;
  }>>([]);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      items: [],
      payment_method: "tunai",
      discount_total: 0,
      tax_enabled: false,
      tax_rate: 11,
      notes: "",
    },
  });

  const paymentMethod = watch("payment_method");
  const discountTotal = watch("discount_total");
  const taxEnabled = watch("tax_enabled");
  const taxRate = watch("tax_rate");

  const addToCart = (product: { id: string; nama_produk: string; harga_jual: number }) => {
    const existing = cart.find((item) => item.product_id === product.id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.product_id === product.id
            ? { ...item, qty: item.qty + 1, subtotal: (item.qty + 1) * item.harga * (1 - item.diskon / 100) }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          product_id: product.id,
          nama_produk: product.nama_produk,
          qty: 1,
          harga: product.harga_jual,
          diskon: 0,
          subtotal: product.harga_jual,
        },
      ]);
    }
  };

  const updateQty = (productId: string, qty: number) => {
    if (qty < 1) return;
    setCart(
      cart.map((item) =>
        item.product_id === productId
          ? { ...item, qty, subtotal: qty * item.harga * (1 - item.diskon / 100) }
          : item
      )
    );
  };

  const updateDiscount = (productId: string, discount: number) => {
    setCart(
      cart.map((item) =>
        item.product_id === productId
          ? { ...item, diskon: discount, subtotal: item.qty * item.harga * (1 - discount / 100) }
          : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter((item) => item.product_id !== productId));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.subtotal, 0);
  const discountAmount = subtotal * (discountTotal / 100);
  const taxableAmount = subtotal - discountAmount;
  const tax = taxEnabled ? taxableAmount * (taxRate / 100) : 0;
  const total = taxableAmount + tax;

  const onSubmit = async (data: CheckoutForm) => {
    try {
      const res = await fetch("/api/pos/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart.map((item) => ({
            product_id: item.product_id,
            qty: item.qty,
            price: item.harga,
            discount: item.diskon,
          })),
          payment_method: data.payment_method,
          discount_total: data.discount_total,
          tax_enabled: data.tax_enabled,
          tax_rate: data.tax_rate,
          notes: data.notes,
        }),
      });

      if (res.ok) {
        const invoice = await res.json();
        toast.success("Transaksi berhasil!");
        router.push(`/dashboard/pos/history`);
      } else {
        const error = await res.json();
        toast.error(error.message || "Transaksi gagal");
      }
    } catch {
      toast.error("Terjadi kesalahan. Silakan coba lagi.");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-navy-600 font-poppins">Kasir POS</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Produk</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { id: "1", nama_produk: "Air Mineral 600ml", harga_jual: 3000 },
                  { id: "2", nama_produk: "Roti Premium", harga_jual: 5000 },
                  { id: "3", nama_produk: "Buku Tulis A5", harga_jual: 7500 },
                  { id: "4", nama_produk: "Pulpen Hitam", harga_jual: 2500 },
                  { id: "5", nama_produk: "Sabun Mandi", harga_jual: 4500 },
                  { id: "6", nama_produk: "Pasta Gigi", harga_jual: 5500 },
                ].map((product) => (
                  <button
                    key={product.id}
                    onClick={() => addToCart(product)}
                    className="p-3 border rounded-lg hover:bg-navy-50 hover:border-navy-300 transition-colors text-left"
                  >
                    <p className="font-medium text-sm text-navy-600">{product.nama_produk}</p>
                    <p className="text-sm font-semibold text-primary">Rp {product.harga_jual.toLocaleString("id-ID")}</p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Keranjang Belanja</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {cart.length === 0 ? (
                    <p className="text-sm text-gray-400 text-center py-4">Keranjang kosong</p>
                  ) : (
                    cart.map((item) => (
                      <div key={item.product_id} className="flex items-center justify-between py-2 border-b">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{item.nama_produk}</p>
                          <p className="text-xs text-gray-500">Rp {item.harga.toLocaleString("id-ID")}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => updateQty(item.product_id, item.qty - 1)}
                            className="w-6 h-6 rounded bg-gray-100 hover:bg-gray-200 text-xs font-bold"
                          >
                            −
                          </button>
                          <span className="w-6 text-center text-sm">{item.qty}</span>
                          <button
                            type="button"
                            onClick={() => updateQty(item.product_id, item.qty + 1)}
                            className="w-6 h-6 rounded bg-gray-100 hover:bg-gray-200 text-xs font-bold"
                          >
                            +
                          </button>
                        </div>
                        <div className="flex items-center gap-1">
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            value={item.diskon}
                            onChange={(e) => updateDiscount(item.product_id, Number(e.target.value))}
                            className="w-16 h-8 text-xs"
                            placeholder="%"
                          />
                          <span className="text-xs text-gray-400">%</span>
                        </div>
                        <div className="text-right min-w-[60px]">
                          <p className="text-sm font-semibold">Rp {item.subtotal.toLocaleString("id-ID")}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.product_id)}
                          className="text-red-500 hover:text-red-700 text-xs"
                        >
                          ✕
                        </button>
                      </div>
                    ))
                  )}
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>Rp {subtotal.toLocaleString("id-ID")}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Diskon ({discountTotal}%)</span>
                    <span>-Rp {discountAmount.toLocaleString("id-ID")}</span>
                  </div>
                  {taxEnabled && (
                    <div className="flex justify-between text-sm">
                      <span>Pajak ({taxRate}%)</span>
                      <span>+Rp {tax.toLocaleString("id-ID")}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-primary">Rp {total.toLocaleString("id-ID")}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="payment_method">Metode Pembayaran</Label>
                  <Select onValueChange={(v) => setValue("payment_method", v as any)} defaultValue="tunai">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tunai">Tunai</SelectItem>
                      <SelectItem value="transfer">Transfer</SelectItem>
                      <SelectItem value="qris">QRIS</SelectItem>
                      <SelectItem value="saldo_santri">Saldo Santri</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Catatan</Label>
                  <Textarea
                    id="notes"
                    placeholder="Catatan transaksi..."
                    {...register("notes")}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={cart.length === 0}>
                  Selesaikan Pembayaran
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}