import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { motion } from 'motion/react';
import { QrCode, Hash, Users, Clock, Sparkles } from 'lucide-react';
import { QRScanner } from './qr-scanner';

interface MessJoinProps {
  onJoin: (messCode: string) => void;
}

export function MessJoin({ onJoin }: MessJoinProps) {
  const [messCode, setMessCode] = useState('');
  const [showScanner, setShowScanner] = useState(false);

  const handleCodeSubmit = (e) => {
    e.preventDefault();
    if (messCode.trim()) {
      onJoin(messCode.trim().toUpperCase());
    }
  };

  const handleQRScan = (code: string) => {
    onJoin(code);
    setShowScanner(false);
  };

  if (showScanner) {
    return <QRScanner onScan={handleQRScan} onClose={() => setShowScanner(false)} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        <Card className="gradient-card border-2 border-violet-200 shadow-2xl">
          <CardHeader className="text-center">
            <motion.div 
              className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >
              <Hash className="w-8 h-8 text-white" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <CardTitle className="text-2xl bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                Join a Mess
              </CardTitle>
              <CardDescription className="mt-2 text-gray-600">
                Enter the mess code provided by your hostel or scan the QR code
              </CardDescription>
            </motion.div>
          </CardHeader>
        
          <CardContent className="space-y-6">
            {/* Manual Code Entry */}
            <motion.form 
              onSubmit={handleCodeSubmit} 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="space-y-2">
                <Label htmlFor="messCode" className="text-gray-700">Mess Code</Label>
                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Input
                    id="messCode"
                    placeholder="Enter mess code (e.g., MESS123)"
                    value={messCode}
                    onChange={(e) => setMessCode(e.target.value)}
                    className="uppercase border-2 border-violet-200 focus:border-violet-400 bg-gradient-to-r from-white to-violet-50"
                  />
                </motion.div>
              </div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white shadow-lg py-6" 
                  disabled={!messCode.trim()}
                >
                  <Hash className="w-4 h-4 mr-2" />
                  Join Mess
                </Button>
              </motion.div>
            </motion.form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full border-violet-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-4 text-muted-foreground font-medium">
                  Or
                </span>
              </div>
            </div>

            {/* QR Scanner */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                variant="outline" 
                className="w-full border-2 border-violet-200 hover:border-violet-300 hover:bg-violet-50 py-6" 
                onClick={() => setShowScanner(true)}
              >
                <QrCode className="w-4 h-4 mr-2" />
                Scan QR Code
              </Button>
            </motion.div>

            {/* Sample Codes */}
            <motion.div 
              className="mt-6 p-5 bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl border-2 border-violet-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center mb-3">
                <Sparkles className="w-4 h-4 text-violet-500 mr-2" />
                <h4 className="font-medium text-violet-700">Demo Mess Codes:</h4>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {['MESS123', 'HOSTEL1', 'DEMO001', 'TEST999'].map((code, index) => (
                  <motion.div
                    key={code}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onJoin(code)}
                      className="justify-start w-full hover:bg-violet-100 border border-violet-200"
                    >
                      {code}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Info Cards */}
            <motion.div 
              className="grid grid-cols-2 gap-4 mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="p-4 gradient-card-blue border-2 hover:border-blue-300">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center">
                      <Users className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Active Users</p>
                      <p className="font-bold text-blue-600">1,247</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="p-4 gradient-card-green border-2 hover:border-green-300">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                      <Clock className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Avg Wait Time</p>
                      <p className="font-bold text-green-600">3 mins</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}