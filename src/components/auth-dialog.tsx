import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { motion } from 'motion/react';
import { 
  User, 
  Mail, 
  Lock, 
  Users, 
  Settings, 
  Sparkles,
  Eye,
  EyeOff,
  CheckCircle,
  Phone,
  School
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAuth: (userData: any) => void;
}

export function AuthDialog({ open, onOpenChange, onAuth }: AuthDialogProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    rollNumber: '',
    hostel: '',
    role: 'student'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mock authentication
    const userData = {
      id: Date.now(),
      name: formData.name || (formData.role === 'student' ? 'John Doe' : 'Admin User'),
      email: formData.email,
      role: formData.role,
      avatar: null,
      messCode: null // Will be set later when joining a mess
    };
    
    onAuth(userData);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const features = [
    "Real-time queue tracking",
    "QR-based mess entry", 
    "Anonymous feedback system",
    "Menu voting & preferences",
    "Hygiene gallery access",
    "Pre-booking meals"
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 bg-gradient-to-br from-white to-violet-50 border-violet-200">
        <DialogHeader className="sr-only">
          <DialogTitle>
            {isLogin ? 'Sign In to SmartMess' : 'Create SmartMess Account'}
          </DialogTitle>
          <DialogDescription>
            {isLogin 
              ? 'Sign in to access your mess dashboard and manage your dining experience'
              : 'Join the SmartMess community and transform your hostel dining experience'
            }
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left Side - Branding */}
          <div className="p-8 bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500 text-white flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mr-4">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-3xl font-bold">SmartMess</h2>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold mb-3">
                  Welcome to the Future of Mess Management
                </h3>
                <p className="text-white/90 text-lg">
                  Join thousands of students experiencing smarter, more transparent hostel dining.
                </p>
              </div>

              <div className="space-y-3">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-center"
                  >
                    <CheckCircle className="w-5 h-5 mr-3 text-white/80" />
                    <span className="text-white/90">{feature}</span>
                  </motion.div>
                ))}
              </div>

              <div className="pt-6">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
                  <p className="text-white/80 text-sm mb-2">Trusted by students at</p>
                  <div className="flex flex-wrap gap-2">
                    {['IIT Delhi', 'NIT Trichy', 'BITS Pilani', 'VIT'].map((college, index) => (
                      <span key={index} className="bg-white/20 px-3 py-1 rounded-full text-xs">
                        {college}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Auth Form */}
          <div className="p-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="text-center">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                  {isLogin ? 'Welcome Back!' : 'Create Account'}
                </h3>
                <p className="text-gray-600 mt-2">
                  {isLogin 
                    ? 'Sign in to access your mess dashboard'
                    : 'Join the SmartMess community today'
                  }
                </p>
              </div>

              <Tabs value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
                <TabsList className="grid w-full grid-cols-2 bg-violet-100">
                  <TabsTrigger value="student" className="data-[state=active]:bg-white">
                    <Users className="w-4 h-4 mr-2" />
                    Student
                  </TabsTrigger>
                  <TabsTrigger value="admin" className="data-[state=active]:bg-white">
                    <Settings className="w-4 h-4 mr-2" />
                    Admin
                  </TabsTrigger>
                </TabsList>

                <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                  {!isLogin && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      className="space-y-4"
                    >
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                          <Input
                            id="name"
                            type="text"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className="pl-10 border-violet-200 focus:border-violet-400"
                            required={!isLogin}
                          />
                        </div>
                      </div>

                      {formData.role === 'student' && (
                        <>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="rollNumber">Roll Number</Label>
                              <Input
                                id="rollNumber"
                                type="text"
                                placeholder="e.g., 21CSE001"
                                value={formData.rollNumber}
                                onChange={(e) => handleInputChange('rollNumber', e.target.value)}
                                className="border-violet-200 focus:border-violet-400"
                              />
                            </div>
                            <div>
                              <Label htmlFor="hostel">Hostel</Label>
                              <Input
                                id="hostel"
                                type="text"
                                placeholder="e.g., Raman Hostel"
                                value={formData.hostel}
                                onChange={(e) => handleInputChange('hostel', e.target.value)}
                                className="border-violet-200 focus:border-violet-400"
                              />
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="phone">Phone Number</Label>
                            <div className="relative">
                              <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                              <Input
                                id="phone"
                                type="tel"
                                placeholder="+91 98765 43210"
                                value={formData.phone}
                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                className="pl-10 border-violet-200 focus:border-violet-400"
                              />
                            </div>
                          </div>
                        </>
                      )}
                    </motion.div>
                  )}

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@college.edu"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="pl-10 border-violet-200 focus:border-violet-400"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className="pl-10 pr-10 border-violet-200 focus:border-violet-400"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white shadow-lg py-6"
                    >
                      {isLogin ? 'Sign In' : 'Create Account'}
                    </Button>
                  </motion.div>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => setIsLogin(!isLogin)}
                      className="text-violet-600 hover:text-violet-700 text-sm font-medium"
                    >
                      {isLogin 
                        ? "Don't have an account? Sign up" 
                        : "Already have an account? Sign in"
                      }
                    </button>
                  </div>
                </form>
              </Tabs>
            </motion.div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}