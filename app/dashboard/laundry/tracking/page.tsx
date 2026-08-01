"use client";

import { useState } from "react";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LaundryTrackingPage() {
  const [search, setSearch] = useState("");

  const columns = [
    { accessorKey: "kode_order", header: "Kode Order" },
    { accessorKey: "nama_santri", header: "Nama Santri" },
    { accessorKey: "status", header: "Status" },
    { accessorKey: "tanggal_masuk", header: "Tanggal Masuk" },
    { accessorKey: "estimasi_selesai", header: "Estimasi Selesai" },
  ];

  const data = [
    { kode_order: "LDR-2026-000001", nama_santri: "Aisyah Rahmah", status: "SIAP_DIAMBIL", tanggal_masuk: "2026-01-15", estimasi_selesai: "2026-01-16" },
    { kode_order: "LDR-2026-000002", nama_santri: "Khadijah Zahra", status: "DICUCI", tanggal_masuk: "2026-01-15", estimasi_selesai: "2026-01-16" },
    { kode_order: "LDR-2026-000003", nama_santri: "Hafshah Nabila", status: "DIJEMUR", tanggal_masuk: "2026-01-15", estimasi_selesai: "2026-01-16" },
    { kode_order: "LDR-2026-000004", nama_santri: "Maryam Salsabila", status: "DILIPAT", tanggal_masuk: "2026-01-15", estimasi_selesai: "2026-01-16" },
    { kode_order: "LDR-2026-000005", nama_santri: "Aisyah Rahmah", status: "DITERIMA", tanggal_masuk: "2026-01-16", estimasi_selesai: "2026-01-17" },
    { kode_order: "LDR-2026-000006", nama_santri: "Khadijah Zahra", status: "DITIMBANG", tanggal_masuk: "2026-01-16", estimasi_selesai: "2026-01-17" },
    { kode_order: "LDR-2026-000007", nama_santri: "Hafshah Nabila", status: "DICUCI", tanggal_masuk: "2026-01-16", estimasi_selesai: "2026-01-17" },
    { kode_order: "LDR-2026-000008", nama_santri: "Maryam Salsabila", status: "SIAP_DIAMBIL", tanggal_masuk: "2026-01-16", estimasi_selesai: "2026-01-17" },
    { kode_order: "LDR-2026-000009", nama_santri: "Aisyah Rahmah", status: "DILIPAT", tanggal_masuk: "2026-01-17", estimasi_selesai: "2026-01-17" },
    { kode_order: "LDR-2026-000010", nama_santri: "Khadijah Zahra", status: "SUDAH_DIAMBIL", tanggal_masuk: "2026-01-17", estimasi_selesai: "2026-01-18" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-navy-600 font-poppins">Tracking Laundry</h1>

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