"use client";

import { useState } from "react";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function POSHistoryPage() {
  const [search, setSearch] = useState("");

  const columns = [
    { accessorKey: "nomor_invoice", header: "No. Invoice" },
    { accessorKey: "tanggal", header: "Tanggal" },
    { accessorKey: "total_bayar", header: "Total Bayar" },
    { accessorKey: "metode_bayar", header: "Metode" },
    { accessorKey: "kasir", header: "Kasir" },
    { accessorKey: "status", header: "Status" },
  ];

  const data = [
    { nomor_invoice: "INV-2026-000001", tanggal: "2026-01-17 10:30", total_bayar: "Rp 15.000", metode_bayar: "Tunai", kasir: "Admin", status: "Selesai" },
    { nomor_invoice: "INV-2026-000002", tanggal: "2026-01-17 09:15", total_bayar: "Rp 8.500", metode_bayar: "QRIS", kasir: "Kasir 1", status: "Selesai" },
    { nomor_invoice: "INV-2026-000003", tanggal: "2026-01-16 16:45", total_bayar: "Rp 22.000", metode_bayar: "Transfer", kasir: "Admin", status: "Selesai" },
    { nomor_invoice: "INV-2026-000004", tanggal: "2026-01-16 14:20", total_bayar: "Rp 5.000", metode_bayar: "Tunai", kasir: "Kasir 1", status: "Selesai" },
    { nomor_invoice: "INV-2026-000005", tanggal: "2026-01-16 11:00", total_bayar: "Rp 12.500", metode_bayar: "Saldo Santri", kasir: "Admin", status: "Selesai" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-navy-600 font-poppins">Riwayat Transaksi POS</h1>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              placeholder="Cari invoice..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={data} />
        </CardContent>
      </Card>
    </div>
  );
}