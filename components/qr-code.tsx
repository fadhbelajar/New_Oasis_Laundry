import { QRCodeSVG } from "qrcode.react";

interface QRCodeDisplayProps {
  value: string;
  size?: number;
  className?: string;
}

export function QRCodeDisplay({ value, size = 128, className }: QRCodeDisplayProps) {
  return (
    <div className={className}>
      <QRCodeSVG value={value} size={size} level="M" includeMargin />
    </div>
  );
}