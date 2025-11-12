import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { X, QrCode, Scan, CheckCircle } from 'lucide-react';

interface QRScannerProps {
  onScan: (code: string) => void;
  onClose: () => void;
}

export function QRScanner({ onScan, onClose }: QRScannerProps) {
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [found, setFound] = useState(false);

  useEffect(() => {
    if (scanning) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setFound(true);
            setTimeout(() => {
              onScan('MESS123'); // Mock QR code result
            }, 500);
            return 100;
          }
          return prev + 2;
        });
      }, 50);

      return () => clearInterval(interval);
    }
  }, [scanning, onScan]);

  const startScan = () => {
    setScanning(true);
    setProgress(0);
    setFound(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-black/50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <QrCode className="w-5 h-5 mr-2" />
              QR Scanner
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Scanner Area */}
          <div className="relative bg-black rounded-lg aspect-square overflow-hidden">
            <div className="absolute inset-4 border-2 border-white/30 rounded-lg">
              {/* Corner markers */}
              <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-white"></div>
              <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-white"></div>
              <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-white"></div>
              <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-white"></div>
              
              {/* Scanning line */}
              {scanning && !found && (
                <div 
                  className="absolute left-0 right-0 h-0.5 bg-red-500 transition-all duration-100"
                  style={{ top: `${progress}%` }}
                ></div>
              )}
              
              {/* Success indicator */}
              {found && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <CheckCircle className="w-16 h-16 text-green-500" />
                </div>
              )}
            </div>
            
            {/* Mock camera view */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 opacity-80"></div>
          </div>

          {/* Progress */}
          {scanning && (
            <div className="space-y-2">
              <Progress value={progress} className="w-full" />
              <p className="text-center text-sm text-muted-foreground">
                {found ? 'QR Code Found!' : 'Scanning for QR code...'}
              </p>
            </div>
          )}

          {/* Controls */}
          <div className="space-y-3">
            {!scanning ? (
              <Button onClick={startScan} className="w-full" size="lg">
                <Scan className="w-4 h-4 mr-2" />
                Start Scanning
              </Button>
            ) : (
              <Button 
                variant="outline" 
                onClick={() => setScanning(false)} 
                className="w-full"
                disabled={found}
              >
                Stop Scanning
              </Button>
            )}
          </div>

          {/* Instructions */}
          <div className="text-center text-sm text-muted-foreground">
            <p>Position the QR code within the frame</p>
            <p className="mt-1">Make sure the code is clearly visible</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}