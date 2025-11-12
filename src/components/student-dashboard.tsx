import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { motion } from 'motion/react';
import { 
  QrCode, 
  Users, 
  Clock, 
  Vote, 
  MessageCircle, 
  Camera,
  CalendarDays,
  TrendingUp,
  Hash,
  Utensils,
  Star,
  AlertCircle,
  CheckCircle,
  Timer,
  MapPin,
  Sparkles
} from 'lucide-react';
import { QueueTracker } from './queue-tracker';
import { MenuVoting } from './menu-voting';
import { FeedbackForm } from './feedback-form';
import { HygieneGallery } from './hygiene-gallery';
import { MealPreBooking } from './meal-prebooking';
import { QRScanner } from './qr-scanner';

interface StudentDashboardProps {
  user: any;
  onShowJoin: () => void;
}

export function StudentDashboard({ user, onShowJoin }: StudentDashboardProps) {
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [currentMeal, setCurrentMeal] = useState('lunch');
  const [todayStatus, setTodayStatus] = useState({
    breakfast: 'skipped',
    lunch: 'pending',
    dinner: 'pre-booked'
  });

  const handleQREntry = (code: string) => {
    setShowQRScanner(false);
    // Update meal status
    setTodayStatus(prev => ({
      ...prev,
      [currentMeal]: 'completed'
    }));
  };

  if (showQRScanner) {
    return <QRScanner onScan={handleQREntry} onClose={() => setShowQRScanner(false)} />;
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="gradient-card rounded-xl p-6 border-2"
      >
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center mb-2">
              <Sparkles className="w-5 h-5 text-violet-500 mr-2" />
              <h2 className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                Welcome back, {user.name}!
              </h2>
            </div>
            <p className="text-muted-foreground">Mess Code: {user.messCode}</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              variant="outline" 
              onClick={onShowJoin}
              className="border-violet-200 hover:border-violet-300 hover:bg-violet-50"
            >
              <Hash className="w-4 h-4 mr-2" />
              Switch Mess
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          whileHover={{ y: -5, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Card 
            className="cursor-pointer gradient-card-blue border-2 hover:border-blue-300" 
            onClick={() => setShowQRScanner(true)}
          >
            <CardContent className="flex items-center p-6">
              <motion.div 
                className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center mr-4 shadow-lg"
                whileHover={{ rotate: 5 }}
              >
                <QrCode className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h3>QR Entry</h3>
                <p className="text-sm text-muted-foreground">Scan to enter mess</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <QueueTracker />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          whileHover={{ y: -5, scale: 1.02 }}
        >
          <Card className="gradient-card-green border-2 hover:border-green-300">
            <CardContent className="flex items-center p-6">
              <motion.div 
                className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center mr-4 shadow-lg"
                whileHover={{ rotate: -5 }}
              >
                <CalendarDays className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h3>Today's Meals</h3>
                <div className="flex items-center mt-1">
                  {Object.entries(todayStatus).map(([meal, status]) => (
                    <Badge 
                      key={meal} 
                      variant={status === 'completed' ? 'default' : status === 'pre-booked' ? 'secondary' : 'outline'}
                      className="mr-1 text-xs"
                    >
                      {meal[0].toUpperCase()}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Today's Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="gradient-card border-2">
          <CardHeader>
            <CardTitle className="flex items-center bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              <Utensils className="w-5 h-5 mr-2 text-violet-500" />
              Today's Meal Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(todayStatus).map(([meal, status], index) => (
                <motion.div 
                  key={meal} 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center justify-between p-4 border-2 rounded-xl bg-gradient-to-br from-white to-violet-50/30 hover:border-violet-300"
                >
                  <div className="flex items-center">
                    <motion.div 
                      className={`w-3 h-3 rounded-full mr-3 ${
                        status === 'completed' ? 'bg-green-500' :
                        status === 'pre-booked' ? 'bg-blue-500' :
                        status === 'skipped' ? 'bg-red-500' : 'bg-gray-300'
                      }`}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2, delay: index * 0.3 }}
                    ></motion.div>
                    <div>
                      <p className="capitalize font-medium">{meal}</p>
                      <p className="text-xs text-muted-foreground capitalize">{status}</p>
                    </div>
                  </div>
                  {status === 'pending' && (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="border-violet-200 hover:border-violet-300 hover:bg-violet-50"
                      >
                        Skip
                      </Button>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Content Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Tabs defaultValue="pre-booking" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-gradient-to-r from-violet-100 via-purple-100 to-pink-100 border-2 border-violet-200">
            <TabsTrigger 
              value="pre-booking"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
            >
              <CalendarDays className="w-4 h-4 mr-2" />
              Pre-book
            </TabsTrigger>
            <TabsTrigger 
              value="voting"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
            >
              <Vote className="w-4 h-4 mr-2" />
              Vote
            </TabsTrigger>
            <TabsTrigger 
              value="feedback"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Feedback
            </TabsTrigger>
            <TabsTrigger 
              value="hygiene"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
            >
              <Camera className="w-4 h-4 mr-2" />
              Hygiene
            </TabsTrigger>
            <TabsTrigger 
              value="stats"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Stats
            </TabsTrigger>
          </TabsList>

        <TabsContent value="pre-booking" className="space-y-4">
          <MealPreBooking />
        </TabsContent>

        <TabsContent value="voting" className="space-y-4">
          <MenuVoting />
        </TabsContent>

        <TabsContent value="feedback" className="space-y-4">
          <FeedbackForm />
        </TabsContent>

        <TabsContent value="hygiene" className="space-y-4">
          <HygieneGallery />
        </TabsContent>

        <TabsContent value="stats" className="space-y-4">
          {/* Personal Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <Card className="gradient-card-orange border-2 hover:border-orange-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Meals This Month</p>
                      <p className="text-2xl font-bold text-orange-600">47</p>
                    </div>
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 3 }}
                    >
                      <Utensils className="w-8 h-8 text-orange-500" />
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <Card className="gradient-card-blue border-2 hover:border-blue-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Avg Wait Time</p>
                      <p className="text-2xl font-bold text-blue-600">2.5 mins</p>
                    </div>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                    >
                      <Timer className="w-8 h-8 text-blue-500" />
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <Card className="gradient-card border-2 hover:border-violet-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Feedback Given</p>
                      <p className="text-2xl font-bold text-yellow-600">12</p>
                    </div>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <Star className="w-8 h-8 text-yellow-500" />
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <Card className="gradient-card-green border-2 hover:border-green-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Skip Rate</p>
                      <p className="text-2xl font-bold text-green-600">8%</p>
                    </div>
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <TrendingUp className="w-8 h-8 text-green-500" />
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Usage Patterns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="gradient-card border-2">
              <CardHeader>
                <CardTitle className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                  Weekly Usage Pattern
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                    <motion.div 
                      key={day} 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="flex items-center justify-between"
                    >
                      <span className="w-12 font-medium">{day}</span>
                      <div className="flex-1 mx-4">
                        <Progress 
                          value={[85, 92, 78, 95, 88, 45, 67][index]} 
                          className="h-3 bg-gradient-to-r from-violet-200 to-purple-200"
                        />
                      </div>
                      <span className="text-sm text-muted-foreground font-medium">
                        {[85, 92, 78, 95, 88, 45, 67][index]}%
                      </span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
      </motion.div>
    </div>
  );
}