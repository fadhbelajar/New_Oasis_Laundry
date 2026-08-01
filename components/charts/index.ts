"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const COLORS = ["#1E3A5F", "#2563EB", "#0EA5E9", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];

export function SalesChart() {
  const data = [
    { name: "Sen", penjualan: 2100000, laundry: 800000 },
    { name: "Sel", penjualan: 2300000, laundry: 950000 },
    { name: "Rab", penjualan: 1800000, laundry: 700000 },
    { name: "Kam", penjualan: 2500000, laundry: 1100000 },
    { name: "Jum", penjualan: 2200000, laundry: 850000 },
    { name: "Sab", penjualan: 2800000, laundry: 1200000 },
    { name: "Min", penjualan: 2450000, laundry: 900000 },
  ];

  return (
    <div className="bg-white rounded-xl p-4 shadow-card border border-gray-100">
      <h3 className="text-sm font-semibold text-navy-600 mb-4">Penjualan 7 Hari Terakhir</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="penjualan" fill="#1E3A5F" name="Penjualan" />
          <Bar dataKey="laundry" fill="#0EA5E9" name="Laundry" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function LaundryRevenueChart() {
  const data = [
    { month: "Jan", pendapatan: 15000000 },
    { month: "Feb", pendapatan: 18000000 },
    { month: "Mar", pendapatan: 16500000 },
    { month: "Apr", pendapatan: 20000000 },
    { month: "Mei", pendapatan: 22000000 },
    { month: "Jun", pendapatan: 19500000 },
  ];

  return (
    <div className="bg-white rounded-xl p-4 shadow-card border border-gray-100">
      <h3 className="text-sm font-semibold text-navy-600 mb-4">Pendapatan Laundry Bulanan</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="pendapatan" stroke="#2563EB" strokeWidth={2} dot={{ fill: "#2563EB" }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function TopProductsChart() {
  const data = [
    { name: "Air Mineral", penjualan: 45 },
    { name: "Roti Premium", penjualan: 32 },
    { name: "Buku Tulis", penjualan: 28 },
    { name: "Pulpen Hitam", penjualan: 25 },
    { name: "Sabun Mandi", penjualan: 18 },
    { name: "Pasta Gigi", penjualan: 15 },
  ];

  return (
    <div className="bg-white rounded-xl p-4 shadow-card border border-gray-100">
      <h3 className="text-sm font-semibold text-navy-600 mb-4">Produk Terlaris</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" />
          <Tooltip />
          <Bar dataKey="penjualan" fill="#1E3A5F" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function PopularServicesChart() {
  const data = [
    { name: "Cuci Setrika", value: 35 },
    { name: "Cuci Kering", value: 25 },
    { name: "Setrika Saja", value: 15 },
    { name: "Express", value: 10 },
    { name: "Bedcover", value: 8 },
    { name: "Karpet", value: 7 },
  ];

  return (
    <div className="bg-white rounded-xl p-4 shadow-card border border-gray-100">
      <h3 className="text-sm font-semibold text-navy-600 mb-4">Layanan Laundry Terpopuler</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" labelLine={false} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} outerRadius={80} dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}