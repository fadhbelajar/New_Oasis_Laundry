"use client";

import { useRef, useState, useEffect } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface BarcodeScannerProps {
  onScan: (code: string) => void;
  onClose: () => void;
}

export function BarcodeScanner({ onScan, onClose }: BarcodeScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [manualCode, setManualCode] = useState("");
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const readerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(() => {});
      }
    };
  }, []);

  const startScanner = async () => {
    if (!readerRef.current) return;

    try {
      const scanner = new Html5Qrcode(readerRef.current.id);
      scannerRef.current = scanner;

      await scanner.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 150 },
          aspectRatio: 1.0,
        },
        (decodedText) => {
          onScan(decodedText);
          scanner.stop().catch(() => {});
          setIsScanning(false);
        },
        () => {}
      );

      setIsScanning(true);
    } catch (error) {
      console.error("Scanner error:", error);
    }
  };

  const stopScanner = async () => {
    if (scannerRef.current) {
      await scannerRef.current.clear().catch(() => {});
      scannerRef.current = null;
    }
    setIsScanning(false);
  };

  const handleManualSubmit = () => {
    if (manualCode.trim()) {
      onScan(manualCode.trim());
      setManualCode("");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Scanner Barcode</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div ref={readerRef} className="w-full aspect-video rounded-lg overflow-hidden border" />

        <div className="flex gap-2">
          {!isScanning ? (
            <Button onClick={startScanner} className="flex-1">
              Mulai Scan
            </Button>
          ) : (
            <Button onClick={stopScanner} variant="destructive" className="flex-1">
              Berhenti
            </Button>
          )}
          <Button onClick={onClose} variant="outline">
            Tutup
          </Button>
        </div>

        <Separator />

        <div className="space-y-2">
          <Label>Atau masukkan kode barcode</Label>
          <div className="flex gap-2">
            <Input
              value={manualCode}
              onChange={(e) => setManualCode(e.target.value)}
              placeholder="Kode barcode..."
              onKeyDown={(e) => e.key === "Enter" && handleManualSubmit()}
            />
            <Button onClick={handleManualSubmit}>Scan</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}