import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Badge } from './components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar';
import { Progress } from './components/ui/progress';
import { toast } from 'sonner@2.0.3';
import { motion } from 'motion/react';
import { 
  QrCode, 
  Users, 
  Clock, 
  Vote, 
  MessageCircle, 
  Camera, 
  CalendarDays,
  ChefHat,
  Settings,
  TrendingUp,
  Bell,
  LogOut,
  Utensils,
  Star,
  Heart,
  AlertCircle,
  Sparkles,
  Menu
} from 'lucide-react';
import { StudentDashboard } from './components/student-dashboard';
import { AdminDashboard } from './components/admin-dashboard';
import { MessJoin } from './components/mess-join';
import { Homepage } from './components/homepage';
import { AuthDialog } from './components/auth-dialog';

export default function App() {
  const [user, setUser] = useState(null);
  const [showJoin, setShowJoin] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuth = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    setShowAuth(false);
    toast.success(`Welcome ${userData.name}!`);
  };

  const handleMessJoin = (messCode) => {
    setUser(prev => ({ ...prev, messCode }));
    setShowJoin(false);
    toast.success(`Successfully joined mess with code: ${messCode}`);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setShowJoin(false);
  };

  // Homepage - Not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50">
        <Homepage onShowAuth={() => setShowAuth(true)} />
        <AuthDialog 
          open={showAuth} 
          onOpenChange={setShowAuth}
          onAuth={handleAuth}
        />
      </div>
    );
  }

  // Student needs to join a mess first
  if (user.role === 'student' && !user.messCode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50">
        <MessJoin onJoin={handleMessJoin} />
      </div>
    );
  }

  // Show join mess modal
  if (showJoin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50">
        <MessJoin onJoin={handleMessJoin} />
      </div>
    );
  }

  // Main Application
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50">
      {/* Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-bold">
                  SmartMess
                </h1>
                {user.messCode && (
                  <p className="text-xs text-muted-foreground">Mess: {user.messCode}</p>
                )}
              </div>
            </motion.div>
            
            <div className="flex items-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Bell className="w-5 h-5 text-muted-foreground cursor-pointer" />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
              >
                <Avatar className="w-8 h-8 ring-2 ring-violet-200">
                  <AvatarFallback className="bg-gradient-to-br from-violet-100 to-purple-100">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleLogout}
                  className="p-2 hover:bg-violet-100"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"
      >
        {user.role === 'student' ? (
          <StudentDashboard user={user} onShowJoin={() => setShowJoin(true)} />
        ) : (
          <AdminDashboard user={user} />
        )}
      </motion.main>
    </div>
  );
}