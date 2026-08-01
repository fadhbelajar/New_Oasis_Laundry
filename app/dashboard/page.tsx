import { StatsCard } from "@/components/stats-card";
import { SalesChart } from "@/components/charts/sales-chart";
import { LaundryRevenueChart } from "@/components/charts/laundry-revenue-chart";
import { TopProductsChart } from "@/components/charts/top-products-chart";
import { PopularServicesChart } from "@/components/charts/popular-services-chart";
import { DataTable } from "@/components/data-table";
import { RecentSales } from "@/components/recent-sales";
import { RecentLaundryOrders } from "@/components/recent-laundry-orders";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-navy-600 font-poppins">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Omzet Hari Ini"
          value="Rp 2.450.000"
          change="+12.5%"
          trend="up"
          icon="ShoppingCart"
        />
        <StatsCard
          title="Transaksi POS"
          value="45"
          change="+8.2%"
          trend="up"
          icon="Receipt"
        />
        <StatsCard
          title="Order Laundry Masuk"
          value="12"
          change="+5.0%"
          trend="up"
          icon="Package"
        />
        <StatsCard
          title="Cucian Diproses"
          value="8"
          change="-3.1%"
          trend="down"
          icon="RefreshCw"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Cucian Siap Ambil"
          value="15"
          change="+22%"
          trend="up"
          icon="CheckCircle"
        />
        <StatsCard
          title="Stok Menipis"
          value="7"
          change="-15%"
          trend="down"
          icon="AlertTriangle"
        />
        <StatsCard
          title="Kas Masuk"
          value="Rp 3.200.000"
          change="+10.3%"
          trend="up"
          icon="ArrowDownLeft"
        />
        <StatsCard
          title="Pengeluaran"
          value="Rp 850.000"
          change="+4.1%"
          trend="up"
          icon="ArrowUpRight"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesChart />
        <LaundryRevenueChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopProductsChart />
        <PopularServicesChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentSales />
        <RecentLaundryOrders />
      </div>
    </div>
  );
}