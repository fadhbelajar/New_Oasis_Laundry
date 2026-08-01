"use client";

import { useState } from "react";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function InventoryInPage() {
  const [search, setSearch] = useState("");

  const columns = [
    { accessorKey: "nomor_faktur", header: "No. Faktur" },
    { accessorKey: "supplier", header: "Supplier" },
    { accessorKey: "tanggal", header: "Tanggal" },
    { accessorKey: "total_amount", header: "Total" },
    { accessorKey: "status", header: "Status" },
  ];

  const data = [
    { nomor_faktur: "FKT-2026-000001", supplier: "CV Indo Makmur", tanggal: "2026-01-17", total_amount: "Rp 500.000", status: "Diterima" },
    { nomor_faktur: "FKT-2026-000002", supplier: "Toko Abadi", tanggal: "2026-01-16", total_amount: "Rp 350.000", status: "Diterima" },
    { nomor_faktur: "FKT-2026-000003", supplier: "CV Indo Makmur", tanggal: "2026-01-15", total_amount: "Rp 750.000", status: "Proses" },
    { nomor_faktur: "FKT-2026-000004", supplier: "Distributor Sejahtera", tanggal: "2026-01-14", total_amount: "Rp 1.200.000", status: "Diterima" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-navy-600 font-poppins">Barang Masuk</h1>
        <Button>Tambah Barang Masuk</Button>
      </div>

      <Card>
        <CardHeader>
          <Input
            placeholder="Cari faktur..."
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