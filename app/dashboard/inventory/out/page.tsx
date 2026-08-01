"use client";

import { useState } from "react";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function InventoryOutPage() {
  const [search, setSearch] = useState("");

  const columns = [
    { accessorKey: "nomor_referensi", header: "Referensi" },
    { accessorKey: "jenis", header: "Jenis" },
    { accessorKey: "tanggal", header: "Tanggal" },
    { accessorKey: "produk", header: "Produk" },
    { accessorKey: "qty", header: "Qty" },
    { accessorKey: "keterangan", header: "Keterangan" },
  ];

  const data = [
    { nomor_referensi: "OUT-2026-000001", jenis: "Penjualan", tanggal: "2026-01-17", produk: "Air Mineral 600ml", qty: 10, keterangan: "Penjualan POS" },
    { nomor_referensi: "OUT-2026-000002", jenis: "Pemakaian Laundry", tanggal: "2026-01-17", produk: "Deterjen", qty: 2, keterangan: "Pencucian" },
    { nomor_referensi: "OUT-2026-000003", jenis: "Penjualan", tanggal: "2026-01-16", produk: "Roti Premium", qty: 5, keterangan: "Penjualan POS" },
    { nomor_referensi: "OUT-2026-000004", jenis: "Penyesuaian Stok", tanggal: "2026-01-16", produk: "Pulpen Hitam", qty: 1, keterangan: "Rusak" },
    { nomor_referensi: "OUT-2026-000005", jenis: "Retur Supplier", tanggal: "2026-01-15", produk: "Buku Tulis A5", qty: 3, keterangan: "Barang cacat" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-navy-600 font-poppins">Barang Keluar</h1>
        <Button>Tambah Barang Keluar</Button>
      </div>

      <Card>
        <CardHeader>
          <Input
            placeholder="Cari referensi..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm"
          />
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={data} />
        </CardContent>
      </Card>
    </div>
  );
}