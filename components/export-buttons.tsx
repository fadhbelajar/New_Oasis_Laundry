"use client";

import { Button } from "@/components/ui/button";
import { Download, FileText, FileSpreadsheet, Printer } from "lucide-react";

interface ExportButtonsProps {
  onExportPDF?: () => void;
  onExportExcel?: () => void;
  onPrint?: () => void;
  className?: string;
}

export function ExportButtons({ onExportPDF, onExportExcel, onPrint, className }: ExportButtonsProps) {
  return (
    <div className={`flex gap-2 ${className ?? ""}`}>
      <Button variant="outline" size="sm" onClick={onExportPDF}>
        <FileText className="mr-2 h-4 w-4" />
        PDF
      </Button>
      <Button variant="outline" size="sm" onClick={onExportExcel}>
        <FileSpreadsheet className="mr-2 h-4 w-4" />
        Excel
      </Button>
      <Button variant="outline" size="sm" onClick={onPrint}>
        <Printer className="mr-2 h-4 w-4" />
        Print
      </Button>
    </div>
  );
}