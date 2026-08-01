import { cn } from "@/lib/utils/helpers";

interface LaundryStatusBadgeProps {
  status: string;
}

const statusStyles: Record<string, string> = {
  DITERIMA: "bg-blue-100 text-blue-800",
  DITIMBANG: "bg-indigo-100 text-indigo-800",
  DICUCI: "bg-cyan-100 text-cyan-800",
  DIJEMUR: "bg-teal-100 text-teal-800",
  DISETRIKA: "bg-purple-100 text-purple-800",
  DILIPAT: "bg-emerald-100 text-emerald-800",
  SIAP_DIAMBIL: "bg-amber-100 text-amber-800",
  SUDAH_DIAMBIL: "bg-green-100 text-green-800",
};

export function LaundryStatusBadge({ status }: LaundryStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        statusStyles[status] || "bg-gray-100 text-gray-800"
      )}
    >
      {status.replace(/_/g, " ")}
    </span>
  );
}