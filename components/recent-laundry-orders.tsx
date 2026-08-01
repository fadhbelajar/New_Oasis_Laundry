"use client";

import { LaundryStatusBadge } from "@/components/laundry/laundry-status-badge";
import { formatRupiah, formatDateTime } from "@/lib/utils/helpers";

interface RecentLaundryOrdersProps {
  orders?: Array<{
    kode_order: string;
    nama_santri: string;
    status: string;
    total_harga: number;
    tanggal_masuk: string;
  }>;
}

export function RecentLaundryOrders({ orders }: RecentLaundryOrdersProps) {
  const defaultOrders = [
    { kode_order: "LDR-2026-000001", nama_santri: "Aisyah Rahmah", status: "SIAP_DIAMBIL", total_harga: 24500, tanggal_masuk: "2026-01-15" },
    { kode_order: "LDR-2026-000002", nama_santri: "Khadijah Zahra", status: "DICUCI", total_harga: 10000, tanggal_masuk: "2026-01-15" },
    { kode_order: "LDR-2026-000003", nama_santri: "Hafshah Nabila", status: "DIJEMUR", total_harga: 6000, tanggal_masuk: "2026-01-15" },
    { kode_order: "LDR-2026-000004", nama_santri: "Maryam Salsabila", status: "DILIPAT", total_harga: 35000, tanggal_masuk: "2026-01-15" },
    { kode_order: "LDR-2026-000005", nama_santri: "Aisyah Rahmah", status: "DITERIMA", total_harga: 15000, tanggal_masuk: "2026-01-16" },
  ];

  const data = orders ?? defaultOrders;

  return (
    <div className="bg-white rounded-xl p-4 shadow-card border border-gray-100">
      <h3 className="text-sm font-semibold text-navy-600 mb-4">Order Laundry Terbaru</h3>
      <div className="space-y-3">
        {data.map((order, index) => (
          <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
            <div>
              <p className="text-sm font-medium">{order.kode_order}</p>
              <p className="text-xs text-gray-400">{order.nama_santri}</p>
            </div>
            <div className="text-right">
              <LaundryStatusBadge status={order.status} />
              <p className="text-xs text-gray-400 mt-1">{formatRupiah(order.total_harga)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}