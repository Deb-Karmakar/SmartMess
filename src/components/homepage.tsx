import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  Users, 
  Clock, 
  Vote, 
  MessageCircle, 
  Camera,
  QrCode,
  TrendingUp,
  Star,
  ChefHat,
  ArrowRight,
  Play,
  CheckCircle
} from 'lucide-react';

interface HomepageProps {
  onShowAuth: () => void;
}

export function Homepage({ onShowAuth }: HomepageProps) {
  const features = [
    {
      icon: QrCode,
      title: "QR-Based Entry",
      description: "Quick and contactless mess entry with QR code scanning",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Clock,
      title: "Real-time Queue Tracking", 
      description: "See live queue status and estimated wait times",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Vote,
      title: "Menu Voting",
      description: "Vote for your favorite meals and shape the weekly menu",
      gradient: "from-purple-500 to-violet-500"
    },
    {
      icon: MessageCircle,
      title: "Anonymous Feedback",
      description: "Share honest feedback to help improve mess services",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: Camera,
      title: "Hygiene Gallery",
      description: "Transparent view of kitchen cleanliness and food preparation",
      gradient: "from-pink-500 to-rose-500"
    },
    {
      icon: TrendingUp,
      title: "Smart Analytics",
      description: "Data-driven insights for better mess management",
      gradient: "from-indigo-500 to-blue-500"
    }
  ];

  const stats = [
    { number: "10k+", label: "Students" },
    { number: "500+", label: "Hostels" },
    { number: "98%", label: "Satisfaction" },
    { number: "24/7", label: "Support" }
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-white/20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-bold">
                SmartMess
              </h1>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                onClick={onShowAuth}
                className="bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white shadow-lg"
              >
                Get Started
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <Badge className="mb-6 bg-gradient-to-r from-violet-100 to-purple-100 text-violet-700 border-violet-200">
              <Sparkles className="w-3 h-3 mr-1" />
              Next-Generation Mess Management
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Smart Hostel
              <br />
              Mess Management
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Transform your hostel dining experience with intelligent queue management, 
              real-time feedback, and transparent operations. Built for the modern student lifestyle.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  onClick={onShowAuth}
                  className="bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white shadow-xl px-8 py-6 text-lg"
                >
                  Join Your Mess
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-violet-200 hover:border-violet-300 hover:bg-violet-50 px-8 py-6 text-lg"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <Card className="p-6 bg-gradient-to-br from-white to-violet-50 border-violet-100 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-0">
                    <div className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-600">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From smart queue management to transparent hygiene monitoring, 
              SmartMess brings modern technology to hostel dining.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Card className="p-6 h-full bg-gradient-to-br from-white to-violet-50 border-violet-100 shadow-lg hover:shadow-2xl transition-all duration-300">
                  <CardContent className="p-0">
                    <div className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-800">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Card className="p-12 text-center bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500 border-0 shadow-2xl">
              <CardContent className="p-0">
                <div className="text-white">
                  <ChefHat className="w-16 h-16 mx-auto mb-6 opacity-90" />
                  <h2 className="text-4xl font-bold mb-4">
                    Ready to Transform Your Mess Experience?
                  </h2>
                  <p className="text-xl mb-8 opacity-90">
                    Join thousands of students already enjoying smarter, more transparent mess management.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button 
                        size="lg" 
                        onClick={onShowAuth}
                        className="bg-white text-violet-600 hover:bg-gray-100 shadow-lg px-8 py-6 text-lg font-semibold"
                      >
                        <Users className="w-5 h-5 mr-2" />
                        Join as Student
                      </Button>
                    </motion.div>
                    
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button 
                        size="lg" 
                        variant="outline"
                        onClick={onShowAuth}
                        className="border-2 border-white text-white hover:bg-white hover:text-violet-600 px-8 py-6 text-lg font-semibold"
                      >
                        <ChefHat className="w-5 h-5 mr-2" />
                        Admin Portal
                      </Button>
                    </motion.div>
                  </div>
                  
                  <div className="flex justify-center items-center mt-8 space-x-6 text-white/80">
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Free to Join
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Instant Setup
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      24/7 Support
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-violet-900 via-purple-900 to-pink-900 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center items-center mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-white to-violet-200 rounded-lg flex items-center justify-center mr-3">
              <Sparkles className="w-5 h-5 text-violet-600" />
            </div>
            <h3 className="text-xl font-bold">SmartMess</h3>
          </div>
          <p className="text-white/70 mb-4">
            Revolutionizing hostel dining experiences with smart technology and transparent operations.
          </p>
          <p className="text-white/50 text-sm">
            © 2024 SmartMess. Making mess management smarter, one meal at a time.
          </p>
        </div>
      </footer>
    </div>
  );
}