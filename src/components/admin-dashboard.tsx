import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { 
  Settings,
  Users, 
  Clock, 
  TrendingUp, 
  MessageCircle, 
  Camera,
  ChefHat,
  Calendar,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Star,
  DollarSign,
  Package
} from 'lucide-react';
import { AdminMenuManager } from './admin-menu-manager';
import { AdminFeedbackDashboard } from './admin-feedback-dashboard';
import { AdminAnalytics } from './admin-analytics';

interface AdminDashboardProps {
  user: any;
}

export function AdminDashboard({ user }: AdminDashboardProps) {
  const [stats] = useState({
    totalStudents: 1247,
    activeToday: 892,
    avgRating: 4.2,
    pendingFeedback: 23,
    messRevenue: 45600,
    wastagePercent: 8.5
  });

  const [todayMetrics] = useState({
    breakfast: { served: 678, booked: 723, no_shows: 45 },
    lunch: { served: 834, booked: 891, no_shows: 57 },
    dinner: { served: 0, booked: 756, no_shows: 0 } // Future meal
  });

  const [recentAlerts] = useState([
    { 
      id: 1, 
      type: 'warning', 
      message: 'High queue time during lunch (>5 mins)', 
      time: '13:45',
      resolved: false 
    },
    { 
      id: 2, 
      type: 'info', 
      message: 'Weekly menu voting closes in 2 hours', 
      time: '12:30',
      resolved: false 
    },
    { 
      id: 3, 
      type: 'success', 
      message: 'Food safety inspection completed - Grade A', 
      time: '09:15',
      resolved: true 
    }
  ]);

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-white rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2>Admin Dashboard</h2>
            <p className="text-muted-foreground">Manage mess operations and monitor performance</p>
          </div>
          <Badge variant="outline" className="text-sm">
            <Settings className="w-4 h-4 mr-1" />
            Admin Panel
          </Badge>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold">{stats.totalStudents}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
            <div className="flex items-center mt-2 text-sm">
              <span className="text-green-600">↗ +5.2%</span>
              <span className="text-muted-foreground ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Today</p>
                <p className="text-2xl font-bold">{stats.activeToday}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <div className="flex items-center mt-2 text-sm">
              <Progress value={(stats.activeToday / stats.totalStudents) * 100} className="w-16 h-2 mr-2" />
              <span className="text-muted-foreground">{Math.round((stats.activeToday / stats.totalStudents) * 100)}% participation</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Rating</p>
                <p className="text-2xl font-bold">{stats.avgRating}/5</p>
              </div>
              <Star className="w-8 h-8 text-yellow-500" />
            </div>
            <div className="flex items-center mt-2 text-sm">
              <span className="text-green-600">↗ +0.3</span>
              <span className="text-muted-foreground ml-1">vs last week</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                <p className="text-2xl font-bold">₹{(stats.messRevenue / 1000).toFixed(0)}k</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-500" />
            </div>
            <div className="flex items-center mt-2 text-sm">
              <span className="text-green-600">↗ +12.5%</span>
              <span className="text-muted-foreground ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" />
            Today's Meal Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(todayMetrics).map(([meal, data]) => (
              <div key={meal} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="capitalize">{meal}</h3>
                  <Badge variant={data.served > 0 ? 'default' : 'secondary'}>
                    {data.served > 0 ? 'Completed' : 'Upcoming'}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Served</span>
                    <span className="font-medium">{data.served}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Pre-booked</span>
                    <span className="font-medium">{data.booked}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>No-shows</span>
                    <span className="font-medium text-orange-600">{data.no_shows}</span>
                  </div>
                </div>

                {data.served > 0 && (
                  <div className="pt-2">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>Utilization</span>
                      <span>{Math.round((data.served / data.booked) * 100)}%</span>
                    </div>
                    <Progress value={(data.served / data.booked) * 100} className="h-2" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Recent Alerts
            </div>
            <Badge variant="outline">
              {recentAlerts.filter(alert => !alert.resolved).length} Active
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className={`flex items-center justify-between p-3 rounded-lg border ${
                alert.resolved ? 'bg-green-50 border-green-200' : 
                alert.type === 'warning' ? 'bg-orange-50 border-orange-200' : 
                'bg-blue-50 border-blue-200'
              }`}>
                <div className="flex items-center space-x-3">
                  {alert.type === 'warning' && <AlertTriangle className="w-4 h-4 text-orange-600" />}
                  {alert.type === 'success' && <CheckCircle className="w-4 h-4 text-green-600" />}
                  {alert.type === 'info' && <Clock className="w-4 h-4 text-blue-600" />}
                  <div>
                    <p className="text-sm">{alert.message}</p>
                    <p className="text-xs text-muted-foreground">{alert.time}</p>
                  </div>
                </div>
                {!alert.resolved && (
                  <Button size="sm" variant="outline">
                    Resolve
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Admin Tabs */}
      <Tabs defaultValue="menu" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="menu">
            <ChefHat className="w-4 h-4 mr-2" />
            Menu
          </TabsTrigger>
          <TabsTrigger value="feedback">
            <MessageCircle className="w-4 h-4 mr-2" />
            Feedback
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <TrendingUp className="w-4 h-4 mr-2" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="hygiene">
            <Camera className="w-4 h-4 mr-2" />
            Hygiene
          </TabsTrigger>
        </TabsList>

        <TabsContent value="menu" className="space-y-4">
          <AdminMenuManager />
        </TabsContent>

        <TabsContent value="feedback" className="space-y-4">
          <AdminFeedbackDashboard />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <AdminAnalytics />
        </TabsContent>

        <TabsContent value="hygiene" className="space-y-4">
          {/* Hygiene Management */}
          <Card>
            <CardHeader>
              <CardTitle>Hygiene Monitoring</CardTitle>
              <CardDescription>Manage hygiene gallery and inspection records</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4>Latest Inspection</h4>
                    <Badge variant="default">Grade A</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Food Safety Authority inspection completed
                  </p>
                  <p className="text-xs text-muted-foreground">September 1, 2024</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4>Media Updates</h4>
                    <Badge variant="outline">24 today</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Photos and videos uploaded
                  </p>
                  <Button size="sm" variant="outline" className="mt-2">
                    <Camera className="w-4 h-4 mr-1" />
                    Upload Media
                  </Button>
                </div>
              </div>

              <div className="pt-4">
                <h4 className="mb-3">Hygiene Checklist</h4>
                <div className="space-y-2">
                  {[
                    { task: 'Kitchen deep cleaning', completed: true },
                    { task: 'Storage area sanitization', completed: true },
                    { task: 'Equipment maintenance', completed: false },
                    { task: 'Staff hygiene training', completed: true },
                    { task: 'Dining area setup', completed: false }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded border">
                      <span className="text-sm">{item.task}</span>
                      <Badge variant={item.completed ? 'default' : 'outline'}>
                        {item.completed ? '✓ Done' : 'Pending'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}