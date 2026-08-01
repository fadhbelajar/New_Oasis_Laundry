"use client";

import { formatRupiah, formatDateTime } from "@/lib/utils/helpers";

interface RecentSalesProps {
  sales?: Array<{
    nomor_invoice: string;
    tanggal: string;
    total_bayar: number;
    metode_bayar: string;
    kasir: string;
  }>;
}

export function RecentSales({ sales }: RecentSalesProps) {
  const defaultSales = [
    { nomor_invoice: "INV-2026-000001", tanggal: "2026-01-17 10:30", total_bayar: 15000, metode_bayar: "Tunai", kasir: "Admin" },
    { nomor_invoice: "INV-2026-000002", tanggal: "2026-01-17 09:15", total_bayar: 8500, metode_bayar: "QRIS", kasir: "Kasir 1" },
    { nomor_invoice: "INV-2026-000003", tanggal: "2026-01-16 16:45", total_bayar: 22000, metode_bayar: "Transfer", kasir: "Admin" },
    { nomor_invoice: "INV-2026-000004", tanggal: "2026-01-16 14:20", total_bayar: 5000, metode_bayar: "Tunai", kasir: "Kasir 1" },
    { nomor_invoice: "INV-2026-000005", tanggal: "2026-01-16 11:00", total_bayar: 12500, metode_bayar: "Saldo Santri", kasir: "Admin" },
  ];

  const data = sales ?? defaultSales;

  return (
    <div className="bg-white rounded-xl p-4 shadow-card border border-gray-100">
      <h3 className="text-sm font-semibold text-navy-600 mb-4">Transaksi Terbaru</h3>
      <div className="space-y-3">
        {data.map((sale, index) => (
          <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
            <div>
              <p className="text-sm font-medium">{sale.nomor_invoice}</p>
              <p className="text-xs text-gray-400">{formatDateTime(sale.tanggal)}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold">{formatRupiah(sale.total_bayar)}</p>
              <p className="text-xs text-gray-400">{sale.metode_bayar}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}