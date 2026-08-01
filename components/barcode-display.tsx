import { Barcode } from "jsbarcode";

interface BarcodeDisplayProps {
  value: string;
  format?: string;
  width?: number;
  height?: number;
  className?: string;
}

export function BarcodeDisplay({ value, format = "CODE128", width = 2, height = 100, className }: BarcodeDisplayProps) {
  return (
    <div className={className}>
      <canvas ref={(canvas) => {
        if (canvas) {
          Barcode(canvas, value, { format, width, height, displayValue: true });
        }
      }} />
    </div>
  );
}