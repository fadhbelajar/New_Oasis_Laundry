"use client";

import { useState } from "react";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function FinancePage() {
  const [search, setSearch] = useState("");

  const columns = [
    { accessorKey: "tanggal", header: "Tanggal" },
    { accessorKey: "jenis", header: "Jenis" },
    { accessorKey: "kategori", header: "Kategori" },
    { accessorKey: "jumlah", header: "Jumlah" },
    { accessorKey: "keterangan", header: "Keterangan" },
    { accessorKey: "created_by", header: "Dibuat Oleh" },
  ];

  const data = [
    { tanggal: "2026-01-17", jenis: "Masuk", kategori: "Penjualan POS", jumlah: "Rp 15.000", keterangan: "Transaksi #INV-001", created_by: "Admin" },
    { tanggal: "2026-01-17", jenis: "Masuk", kategori: "Pembayaran Laundry", jumlah: "Rp 24.500", keterangan: "LDR-2026-000001", created_by: "Operator" },
    { tanggal: "2026-01-17", jenis: "Keluar", kategori: "Pembelian Barang", jumlah: "Rp 500.000", keterangan: "FKT-2026-000001", created_by: "Gudang" },
    { tanggal: "2026-01-16", jenis: "Masuk", kategori: "Penjualan POS", jumlah: "Rp 8.500", keterangan: "Transaksi #INV-002", created_by: "Kasir 1" },
    { tanggal: "2026-01-16", jenis: "Keluar", kategori: "Pembelian Deterjen", jumlah: "Rp 150.000", keterangan: "Pembelian deterjen", created_by: "Gudang" },
    { tanggal: "2026-01-16", jenis: "Masuk", kategori: "Deposit Saldo", jumlah: "Rp 100.000", keterangan: "Deposit santri", created_by: "Admin" },
    { tanggal: "2026-01-15", jenis: "Keluar", kategori: "Listrik & Air", jumlah: "Rp 75.000", keterangan: "Tagihan listrik", created_by: "Bendahara" },
    { tanggal: "2026-01-15", jenis: "Masuk", kategori: "Penjualan POS", jumlah: "Rp 22.000", keterangan: "Transaksi #INV-003", created_by: "Admin" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-navy-600 font-poppins">Kas Harian</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Total Kas Masuk</p>
            <p className="text-2xl font-bold text-green-600">Rp 66.000</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Total Kas Keluar</p>
            <p className="text-2xl font-bold text-red-600">Rp 725.000</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Saldo Bersih</p>
            <p className="text-2xl font-bold text-navy-600">-Rp 659.000</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              placeholder="Cari transaksi..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-sm"
            />
            <div className="flex gap-2">
              <Button variant="outline">Masuk</Button>
              <Button variant="outline">Keluar</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={data} />
        </CardContent>
      </Card>
    </div>
  );
}