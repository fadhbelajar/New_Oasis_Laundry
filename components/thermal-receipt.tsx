"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { QRCodeDisplay } from "@/components/qr-code";
import { BarcodeDisplay } from "@/components/barcode-display";
import { formatRupiah, formatDateTime } from "@/lib/utils/helpers";

interface ThermalReceiptProps {
  invoiceNumber: string;
  date: string;
  cashierName: string;
  items: Array<{
    name: string;
    qty: number;
    price: number;
    subtotal: number;
  }>;
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  paymentMethod: string;
  notes?: string;
  width?: "58mm" | "80mm";
}

export function ThermalReceipt({
  invoiceNumber,
  date,
  cashierName,
  items,
  subtotal,
  discount,
  tax,
  total,
  paymentMethod,
  notes,
  width = "58mm",
}: ThermalReceiptProps) {
  const [showQR, setShowQR] = useState(false);

  const widthClass = width === "58mm" ? "w-48" : "w-64";

  return (
    <div className={`${widthClass} mx-auto bg-white p-4 font-mono text-xs print:w-full`}>
      <div className="text-center border-b border-dashed pb-2 mb-2">
        <h2 className="text-sm font-bold text-navy-600 font-poppins">AL MAWADDAH</h2>
        <p className="text-[10px] text-gray-500">SmartPOS</p>
        <p className="text-[10px] text-gray-400">Pondok Pesantren Tahfidz Al Mawaddah</p>
      </div>

      <div className="space-y-1 mb-2">
        <div className="flex justify-between">
          <span>Invoice:</span>
          <span className="font-semibold">{invoiceNumber}</span>
        </div>
        <div className="flex justify-between">
          <span>Tanggal:</span>
          <span>{formatDateTime(date)}</span>
        </div>
        <div className="flex justify-between">
          <span>Kasir:</span>
          <span>{cashierName}</span>
        </div>
        <div className="flex justify-between">
          <span>Metode:</span>
          <span>{paymentMethod}</span>
        </div>
      </div>

      <div className="border-t border-dashed pt-2 mb-2">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between mb-1">
            <div className="flex-1">
              <p className="truncate">{item.name}</p>
              <p className="text-gray-400">{item.qty} x {formatRupiah(item.price)}</p>
            </div>
            <span className="ml-2">{formatRupiah(item.subtotal)}</span>
          </div>
        ))}
      </div>

      <div className="border-t border-dashed pt-2 mb-2 space-y-1">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{formatRupiah(subtotal)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between">
            <span>Diskon</span>
            <span>-{formatRupiah(discount)}</span>
          </div>
        )}
        {tax > 0 && (
          <div className="flex justify-between">
            <span>Pajak</span>
            <span>+{formatRupiah(tax)}</span>
          </div>
        )}
        <div className="flex justify-between font-bold text-sm pt-1 border-t">
          <span>Total</span>
          <span className="text-primary">{formatRupiah(total)}</span>
        </div>
      </div>

      {notes && (
        <div className="mb-2">
          <p className="text-gray-500">Catatan: {notes}</p>
        </div>
      )}

      <div className="text-center pt-2 border-t border-dashed">
        <Button variant="outline" size="sm" onClick={() => setShowQR(!showQR)}>
          {showQR ? "Sembunyikan QR" : "Tampilkan QR"}
        </Button>
        {showQR && (
          <div className="mt-2 flex justify-center">
            <QRCodeDisplay value={invoiceNumber} size={96} />
          </div>
        )}
      </div>

      <div className="text-center mt-2 text-gray-400">
        <p>Terima kasih atas kunjungannya</p>
        <p>Al Mawaddah SmartPOS</p>
      </div>
    </div>
  );
}