"use client";

import { useState, useEffect, useCallback } from "react";
import { Download, X, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);

  const handleInstall = useCallback(async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        toast.success("Aplikasi berhasil diinstal!");
      }
      setDeferredPrompt(null);
    }
    setShowPopup(false);
  }, [deferredPrompt]);

  const dismissPopup = useCallback(() => {
    setShowPopup(false);
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPopup(true);
      setTimeLeft(20);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  useEffect(() => {
    if (!showPopup) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setShowPopup(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [showPopup]);

  if (!showPopup) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 animate-slide-up">
      <Card className="shadow-xl border-2 border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Smartphone className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-base text-navy-600">
                Install Al Mawaddah SmartPOS
              </CardTitle>
              <p className="text-sm text-gray-500 mt-1">
                Instal aplikasi untuk pengalaman terbaik dan akses offline.
              </p>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-1000"
                    style={{ width: `${(timeLeft / 20) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-gray-400">{timeLeft}s</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Button size="sm" onClick={handleInstall}>
                <Download className="mr-1 h-4 w-4" />
                Instal
              </Button>
              <Button size="sm" variant="ghost" onClick={dismissPopup}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}