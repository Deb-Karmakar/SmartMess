import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Utensils, Clock, DollarSign, TrendingDown, AlertTriangle } from 'lucide-react';

export function AdminAnalytics() {
  const [timeRange, setTimeRange] = useState('week');

  const attendanceData = [
    { day: 'Mon', breakfast: 678, lunch: 834, dinner: 723 },
    { day: 'Tue', breakfast: 721, lunch: 891, dinner: 756 },
    { day: 'Wed', breakfast: 645, lunch: 823, dinner: 698 },
    { day: 'Thu', breakfast: 698, lunch: 867, dinner: 734 },
    { day: 'Fri', breakfast: 712, lunch: 889, dinner: 778 },
    { day: 'Sat', breakfast: 456, lunch: 623, dinner: 589 },
    { day: 'Sun', breakfast: 523, lunch: 734, dinner: 645 }
  ];

  const revenueData = [
    { month: 'Jan', revenue: 42000, cost: 28000 },
    { month: 'Feb', revenue: 45000, cost: 30000 },
    { month: 'Mar', revenue: 48000, cost: 32000 },
    { month: 'Apr', revenue: 46000, cost: 31000 },
    { month: 'May', revenue: 51000, cost: 34000 },
    { month: 'Jun', revenue: 49000, cost: 33000 }
  ];

  const mealPreferenceData = [
    { name: 'North Indian', value: 45, color: '#8884d8' },
    { name: 'South Indian', value: 25, color: '#82ca9d' },
    { name: 'Continental', value: 15, color: '#ffc658' },
    { name: 'Chinese', value: 10, color: '#ff7300' },
    { name: 'Other', value: 5, color: '#0088fe' }
  ];

  const wasteData = [
    { meal: 'Breakfast', waste: 12, served: 678 },
    { meal: 'Lunch', waste: 28, served: 834 },
    { meal: 'Dinner', waste: 15, served: 723 }
  ];

  const peakHours = [
    { time: '7:00', count: 45 },
    { time: '7:30', count: 89 },
    { time: '8:00', count: 123 },
    { time: '8:30', count: 98 },
    { time: '9:00', count: 67 },
    { time: '12:00', count: 156 },
    { time: '12:30', count: 234 },
    { time: '13:00', count: 289 },
    { time: '13:30', count: 198 },
    { time: '14:00', count: 123 },
    { time: '19:00', count: 134 },
    { time: '19:30', count: 198 },
    { time: '20:00', count: 234 },
    { time: '20:30', count: 178 },
    { time: '21:00', count: 98 }
  ];

  const kpiData = [
    {
      title: 'Average Wait Time',
      value: '3.2 mins',
      change: '-12%',
      trend: 'down',
      icon: Clock,
      color: 'text-green-600'
    },
    {
      title: 'Daily Revenue',
      value: '₹1,847',
      change: '+8.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Food Wastage',
      value: '8.2%',
      change: '-2.1%',
      trend: 'down',
      icon: AlertTriangle,
      color: 'text-green-600'
    },
    {
      title: 'Student Satisfaction',
      value: '4.2/5',
      change: '+0.3',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-green-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header with Time Range Selector */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Analytics Dashboard
              </CardTitle>
              <CardDescription>Comprehensive insights into mess operations and performance</CardDescription>
            </div>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">Quarter</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
      </Card>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {kpiData.map((kpi, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{kpi.title}</p>
                  <p className="text-2xl font-bold">{kpi.value}</p>
                </div>
                <kpi.icon className={`w-8 h-8 ${kpi.color}`} />
              </div>
              <div className="flex items-center mt-2 text-sm">
                <span className={kpi.trend === 'up' ? 'text-green-600' : 'text-green-600'}>
                  {kpi.trend === 'up' ? '↗' : '↓'} {kpi.change}
                </span>
                <span className="text-muted-foreground ml-1">vs last {timeRange}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Attendance */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Meal Attendance</CardTitle>
            <CardDescription>Number of students per meal across the week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Bar dataKey="breakfast" fill="#8884d8" name="Breakfast" />
                <Bar dataKey="lunch" fill="#82ca9d" name="Lunch" />
                <Bar dataKey="dinner" fill="#ffc658" name="Dinner" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue vs Cost Analysis</CardTitle>
            <CardDescription>Monthly revenue and operational costs comparison</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" name="Revenue" strokeWidth={3} />
                <Line type="monotone" dataKey="cost" stroke="#82ca9d" name="Cost" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Meal Preferences */}
        <Card>
          <CardHeader>
            <CardTitle>Meal Preferences</CardTitle>
            <CardDescription>Distribution of cuisine preferences based on voting</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={mealPreferenceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {mealPreferenceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                {mealPreferenceData.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm">{item.name}</span>
                    <Badge variant="outline">{item.value}%</Badge>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Peak Hours */}
        <Card>
          <CardHeader>
            <CardTitle>Peak Hours Analysis</CardTitle>
            <CardDescription>Student traffic throughout the day</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={peakHours}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Food Wastage */}
        <Card>
          <CardHeader>
            <CardTitle>Food Wastage Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {wasteData.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{item.meal}</span>
                    <span>{((item.waste / item.served) * 100).toFixed(1)}%</span>
                  </div>
                  <Progress value={(item.waste / item.served) * 100} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Wasted: {item.waste}kg</span>
                    <span>Served: {item.served} portions</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Student Engagement */}
        <Card>
          <CardHeader>
            <CardTitle>Student Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Active Users</span>
                <Badge>892/1247</Badge>
              </div>
              <Progress value={(892/1247) * 100} className="h-2" />
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Pre-booking Rate</span>
                <Badge>68%</Badge>
              </div>
              <Progress value={68} className="h-2" />
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Feedback Rate</span>
                <Badge>24%</Badge>
              </div>
              <Progress value={24} className="h-2" />
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Voting Participation</span>
                <Badge>56%</Badge>
              </div>
              <Progress value={56} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Key Insights */}
        <Card>
          <CardHeader>
            <CardTitle>Key Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <TrendingUp className="w-4 h-4 text-green-600 mr-2" />
                  <span className="text-sm font-medium text-green-800">Revenue Growth</span>
                </div>
                <p className="text-xs text-green-700 mt-1">
                  Monthly revenue increased by 12.5%
                </p>
              </div>
              
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center">
                  <Users className="w-4 h-4 text-blue-600 mr-2" />
                  <span className="text-sm font-medium text-blue-800">Peak Efficiency</span>
                </div>
                <p className="text-xs text-blue-700 mt-1">
                  Lunch service is most efficient at 13:00
                </p>
              </div>
              
              <div className="p-3 bg-orange-50 rounded-lg">
                <div className="flex items-center">
                  <AlertTriangle className="w-4 h-4 text-orange-600 mr-2" />
                  <span className="text-sm font-medium text-orange-800">Action Needed</span>
                </div>
                <p className="text-xs text-orange-700 mt-1">
                  Weekend attendance is 35% lower
                </p>
              </div>
              
              <div className="p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center">
                  <Utensils className="w-4 h-4 text-purple-600 mr-2" />
                  <span className="text-sm font-medium text-purple-800">Popular Choice</span>
                </div>
                <p className="text-xs text-purple-700 mt-1">
                  North Indian cuisine is most preferred
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Export and Report Generation */}
      <Card>
        <CardHeader>
          <CardTitle>Report Generation</CardTitle>
          <CardDescription>Generate detailed reports for stakeholders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <button className="flex-1 p-4 border rounded-lg hover:bg-muted/30 transition-colors">
              <h4>Daily Operations Report</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Attendance, revenue, and feedback summary
              </p>
            </button>
            <button className="flex-1 p-4 border rounded-lg hover:bg-muted/30 transition-colors">
              <h4>Weekly Performance Report</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Trends, KPIs, and improvement areas
              </p>
            </button>
            <button className="flex-1 p-4 border rounded-lg hover:bg-muted/30 transition-colors">
              <h4>Monthly Financial Report</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Revenue, costs, and profitability analysis
              </p>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}