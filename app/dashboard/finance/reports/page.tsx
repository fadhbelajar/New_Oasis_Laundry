"use client";

import { useState } from "react";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function FinanceReportsPage() {
  const [search, setSearch] = useState("");

  const columns = [
    { accessorKey: "periode", header: "Periode" },
    { accessorKey: "penjualan", header: "Penjualan POS" },
    { accessorKey: "laundry", header: "Pendapatan Laundry" },
    { accessorKey: "pengeluaran", header: "Pengeluaran" },
    { accessorKey: "laba_bersih", header: "Laba Bersih" },
  ];

  const data = [
    { periode: "Januari 2026", penjualan: "Rp 15.000.000", laundry: "Rp 8.500.000", pengeluaran: "Rp 5.200.000", laba_bersih: "Rp 18.300.000" },
    { periode: "Desember 2025", penjualan: "Rp 14.200.000", laundry: "Rp 7.800.000", pengeluaran: "Rp 4.900.000", laba_bersih: "Rp 17.100.000" },
    { periode: "November 2025", penjualan: "Rp 13.500.000", laundry: "Rp 7.200.000", pengeluaran: "Rp 5.100.000", laba_bersih: "Rp 15.600.000" },
    { periode: "Oktober 2025", penjualan: "Rp 12.800.000", laundry: "Rp 6.900.000", pengeluaran: "Rp 4.800.000", laba_bersih: "Rp 14.900.000" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-navy-600 font-poppins">Laporan Keuangan</h1>
        <div className="flex gap-2">
          <Button variant="outline">Preview</Button>
          <Button variant="outline">PDF</Button>
          <Button variant="outline">Excel</Button>
          <Button variant="outline">Print</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <Input
            placeholder="Cari laporan..."
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