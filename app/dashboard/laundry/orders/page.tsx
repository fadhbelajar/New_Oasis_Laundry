"use client";

import { useState } from "react";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LaundryOrdersPage() {
  const [search, setSearch] = useState("");

  const columns = [
    { accessorKey: "kode_order", header: "Kode Order" },
    { accessorKey: "nama_santri", header: "Nama Santri" },
    { accessorKey: "layanan", header: "Layanan" },
    { accessorKey: "berat", header: "Berat" },
    { accessorKey: "total_harga", header: "Total" },
    { accessorKey: "status", header: "Status" },
    { accessorKey: "tanggal_masuk", header: "Tanggal Masuk" },
  ];

  const data = [
    { kode_order: "LDR-2026-000001", nama_santri: "Aisyah Rahmah", layanan: "Cuci Setrika", berat: "3.5 kg", total_harga: "Rp 24.500", status: "SIAP_DIAMBIL", tanggal_masuk: "2026-01-15" },
    { kode_order: "LDR-2026-000002", nama_santri: "Khadijah Zahra", layanan: "Cuci Kering", berat: "2.0 kg", total_harga: "Rp 10.000", status: "DICUCI", tanggal_masuk: "2026-01-15" },
    { kode_order: "LDR-2026-000003", nama_santri: "Hafshah Nabila", layanan: "Setrika Saja", berat: "1.5 kg", total_harga: "Rp 6.000", status: "DIJEMUR", tanggal_masuk: "2026-01-15" },
    { kode_order: "LDR-2026-000004", nama_santri: "Maryam Salsabila", layanan: "Cuci Setrika", berat: "5.0 kg", total_harga: "Rp 35.000", status: "DILIPAT", tanggal_masuk: "2026-01-15" },
    { kode_order: "LDR-2026-000005", nama_santri: "Aisyah Rahmah", layanan: "Bedcover", berat: "1.0 kg", total_harga: "Rp 15.000", status: "DITERIMA", tanggal_masuk: "2026-01-16" },
    { kode_order: "LDR-2026-000006", nama_santri: "Khadijah Zahra", layanan: "Karpet", berat: "2.0 kg", total_harga: "Rp 50.000", status: "DITIMBANG", tanggal_masuk: "2026-01-16" },
    { kode_order: "LDR-2026-000007", nama_santri: "Hafshah Nabila", layanan: "Cuci Kering", berat: "4.0 kg", total_harga: "Rp 20.000", status: "DICUCI", tanggal_masuk: "2026-01-16" },
    { kode_order: "LDR-2026-000008", nama_santri: "Maryam Salsabila", layanan: "Cuci Setrika", berat: "2.5 kg", total_harga: "Rp 17.500", status: "SIAP_DIAMBIL", tanggal_masuk: "2026-01-16" },
    { kode_order: "LDR-2026-000009", nama_santri: "Aisyah Rahmah", layanan: "Express", berat: "1.0 kg", total_harga: "Rp 8.000", status: "DILIPAT", tanggal_masuk: "2026-01-17" },
    { kode_order: "LDR-2026-000010", nama_santri: "Khadijah Zahra", layanan: "Cuci Setrika", berat: "3.0 kg", total_harga: "Rp 21.000", status: "SUDAH_DIAMBIL", tanggal_masuk: "2026-01-17" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-navy-600 font-poppins">Daftar Order Laundry</h1>
        <Button onClick={() => window.location.href = "/dashboard/laundry/orders/new"}>Order Baru</Button>
      </div>

      <Card>
        <CardHeader>
          <Input
            placeholder="Cari kode order atau nama santri..."
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