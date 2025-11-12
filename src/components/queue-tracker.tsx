import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { motion } from 'motion/react';
import { Users, Clock, MapPin, TrendingUp } from 'lucide-react';

export function QueueTracker() {
  const [queueData, setQueueData] = useState({
    current: 12,
    estimated: 3,
    trend: 'decreasing',
    peak: false
  });

  useEffect(() => {
    // Simulate real-time queue updates
    const interval = setInterval(() => {
      setQueueData(prev => ({
        ...prev,
        current: Math.max(0, prev.current + (Math.random() > 0.6 ? 1 : -1)),
        estimated: Math.max(1, Math.round((prev.current + (Math.random() > 0.6 ? 1 : -1)) * 0.25)),
        trend: Math.random() > 0.5 ? 'increasing' : 'decreasing',
        peak: prev.current > 20
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getQueueStatus = () => {
    if (queueData.current <= 5) return { status: 'Low', color: 'green', variant: 'default' };
    if (queueData.current <= 15) return { status: 'Medium', color: 'yellow', variant: 'secondary' };
    return { status: 'High', color: 'red', variant: 'destructive' };
  };

  const queueStatus = getQueueStatus();

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card className="cursor-pointer gradient-card-orange border-2 hover:border-orange-300 hover:shadow-xl transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <motion.div 
                className="w-12 h-12 bg-gradient-to-br from-orange-400 to-amber-500 rounded-xl flex items-center justify-center mr-4 shadow-lg"
                animate={{ 
                  scale: queueData.current > 15 ? [1, 1.1, 1] : 1,
                }}
                transition={{ repeat: queueData.current > 15 ? Infinity : 0, duration: 1.5 }}
              >
                <Users className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h3>Live Queue</h3>
                <motion.p 
                  className="text-sm text-muted-foreground"
                  key={queueData.current} // Key ensures animation on change
                  initial={{ scale: 1.2, color: "#f97316" }}
                  animate={{ scale: 1, color: "#6b7280" }}
                  transition={{ duration: 0.3 }}
                >
                  {queueData.current} people waiting
                </motion.p>
              </div>
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
            >
              <Badge 
                variant={queueStatus.variant} 
                className={`text-xs ${
                  queueStatus.variant === 'default' ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                  queueStatus.variant === 'secondary' ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                  'bg-gradient-to-r from-red-500 to-pink-500'
                } text-white`}
              >
                {queueStatus.status}
              </Badge>
            </motion.div>
          </div>

          <div className="space-y-3">
            <motion.div 
              className="flex items-center justify-between text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                Est. Wait Time
              </div>
              <motion.span 
                className="font-medium text-orange-600"
                key={queueData.estimated}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
              >
                {queueData.estimated} mins
              </motion.span>
            </motion.div>

            <motion.div 
              className="flex items-center justify-between text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center">
                <TrendingUp className="w-4 h-4 mr-2 text-muted-foreground" />
                Trend
              </div>
              <motion.span 
                className={`font-medium ${
                  queueData.trend === 'decreasing' ? 'text-green-600' : 'text-red-600'
                }`}
                key={queueData.trend}
                initial={{ x: queueData.trend === 'decreasing' ? -10 : 10 }}
                animate={{ x: 0 }}
              >
                {queueData.trend === 'decreasing' ? '↓ Decreasing' : '↑ Increasing'}
              </motion.span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Progress 
                value={(queueData.current / 30) * 100} 
                className="w-full h-3 bg-gradient-to-r from-orange-100 to-amber-100" 
              />
            </motion.div>

            {queueData.peak && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center text-xs text-amber-700 bg-gradient-to-r from-amber-50 to-yellow-50 p-3 rounded-lg border border-amber-200"
              >
                <MapPin className="w-3 h-3 mr-1" />
                Peak hours - Consider waiting
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}