import { Card } from "@/components/ui/card";

interface LoadingSkeletonProps {
  rows?: number;
  columns?: number;
}

export function LoadingSkeleton({ rows = 5, columns = 4 }: LoadingSkeletonProps) {
  return (
    <div className="space-y-4">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4">
          {Array.from({ length: columns }).map((_, j) => (
            <div
              key={j}
              className="h-4 bg-gray-200 rounded animate-pulse"
              style={{ width: `${Math.max(20, 100 - j * 15)}%` }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export function StatsCardSkeleton() {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
          <div className="h-8 bg-gray-200 rounded w-32 animate-pulse" />
        </div>
        <div className="h-10 w-10 bg-gray-200 rounded-lg animate-pulse" />
      </div>
    </Card>
  );
}