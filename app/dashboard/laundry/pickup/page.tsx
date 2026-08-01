"use client";

import { useState } from "react";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LaundryPickupPage() {
  const [search, setSearch] = useState("");

  const columns = [
    { accessorKey: "kode_order", header: "Kode Order" },
    { accessorKey: "nama_santri", header: "Nama Santri" },
    { accessorKey: "status", header: "Status" },
    { accessorKey: "total_harga", header: "Total" },
    { accessorKey: "tanggal_masuk", header: "Tanggal Masuk" },
  ];

  const data = [
    { kode_order: "LDR-2026-000001", nama_santri: "Aisyah Rahmah", status: "SIAP_DIAMBIL", total_harga: "Rp 24.500", tanggal_masuk: "2026-01-15" },
    { kode_order: "LDR-2026-000008", nama_santri: "Maryam Salsabila", status: "SIAP_DIAMBIL", total_harga: "Rp 17.500", tanggal_masuk: "2026-01-16" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-navy-600 font-poppins">Pengambilan Laundry</h1>

      <Card>
        <CardHeader>
          <Input
            placeholder="Scan QR Code atau cari order..."
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