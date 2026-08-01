"use client";

import { useState } from "react";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LaundryNewOrderPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-navy-600 font-poppins">Order Laundry Baru</h1>

      <Card>
        <CardHeader>
          <CardTitle>Form Order Laundry</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="santri">Pilih Santri</Label>
                <select id="santri" className="w-full border rounded-lg p-2">
                  <option value="">-- Pilih Santri --</option>
                  <option value="1">Aisyah Rahmah (SANTRI-001)</option>
                  <option value="2">Khadijah Zahra (SANTRI-002)</option>
                  <option value="3">Hafshah Nabila (SANTRI-003)</option>
                  <option value="4">Maryam Salsabila (SANTRI-004)</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="layanan">Layanan</Label>
                <select id="layanan" className="w-full border rounded-lg p-2">
                  <option value="">-- Pilih Layanan --</option>
                  <option value="1">Cuci Kering - Rp 5.000/kg</option>
                  <option value="2">Cuci Setrika - Rp 7.000/kg</option>
                  <option value="3">Setrika Saja - Rp 4.000/kg</option>
                  <option value="4">Express - Rp 3.000/kg tambahan</option>
                  <option value="5">Bedcover - Rp 15.000/pcs</option>
                  <option value="6">Karpet - Rp 25.000/pcs</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="berat">Berat (kg)</Label>
                <Input id="berat" type="number" step="0.1" placeholder="0.0" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="jumlah_potong">Jumlah Potong</Label>
                <Input id="jumlah_potong" type="number" defaultValue="1" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tanggal_masuk">Tanggal Masuk</Label>
                <Input id="tanggal_masuk" type="datetime-local" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="estimasi_selesai">Estimasi Selesai</Label>
                <Input id="estimasi_selesai" type="datetime-local" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="hutang">Hutang Laundry Santri</Label>
              <Input id="hutang" type="number" step="0.01" placeholder="0" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="catatan">Catatan Khusus</Label>
              <Textarea id="catatan" placeholder="Catatan khusus untuk order ini..." />
            </div>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Memproses..." : "Buat Order"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}