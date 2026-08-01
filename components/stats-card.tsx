import { cn } from "@/lib/utils/helpers";
import {
  ShoppingCart,
  Receipt,
  Package,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  ArrowDownLeft,
  ArrowUpRight,
} from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  change?: string;
  trend?: "up" | "down";
  icon: string;
}

const iconMap: Record<string, React.ReactNode> = {
  ShoppingCart: <ShoppingCart className="h-5 w-5 text-primary" />,
  Receipt: <Receipt className="h-5 w-5 text-primary" />,
  Package: <Package className="h-5 w-5 text-primary" />,
  RefreshCw: <RefreshCw className="h-5 w-5 text-primary" />,
  CheckCircle: <CheckCircle className="h-5 w-5 text-green-500" />,
  AlertTriangle: <AlertTriangle className="h-5 w-5 text-amber-500" />,
  ArrowDownLeft: <ArrowDownLeft className="h-5 w-5 text-green-500" />,
  ArrowUpRight: <ArrowUpRight className="h-5 w-5 text-red-500" />,
};

export function StatsCard({ title, value, change, trend, icon }: StatsCardProps) {
  return (
    <div className="stat-card">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-navy-600">{value}</p>
        </div>
        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
          {iconMap[icon] || <ShoppingCart className="h-5 w-5 text-primary" />}
        </div>
      </div>
      {change && (
        <div className="mt-2 flex items-center gap-1">
          <span
            className={cn(
              "text-xs font-medium",
              trend === "up" ? "text-green-600" : "text-red-600"
            )}
          >
            {change}
          </span>
          <span className="text-xs text-gray-400">dibandingkan periode sebelumnya</span>
        </div>
      )}
    </div>
  );
}