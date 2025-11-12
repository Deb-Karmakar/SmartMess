import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { MessageCircle, Star, TrendingUp, AlertTriangle, Reply, Filter, Calendar } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function AdminFeedbackDashboard() {
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [filter, setFilter] = useState('all');
  const [response, setResponse] = useState('');

  const feedbackData = [
    {
      id: 1,
      meal: 'lunch',
      date: '2024-09-04',
      rating: 4,
      taste: 4,
      quantity: 3,
      hygiene: 5,
      service: 4,
      comments: 'The dal was excellent today! Really enjoyed the meal. Could use a bit more quantity though.',
      anonymous: true,
      status: 'new',
      category: 'positive',
      response: null
    },
    {
      id: 2,
      meal: 'dinner',
      date: '2024-09-03',
      rating: 2,
      taste: 2,
      quantity: 3,
      hygiene: 4,
      service: 2,
      comments: 'Food was cold when served. The queue was too long and staff seemed rushed. Please improve service timing.',
      anonymous: true,
      status: 'responded',
      category: 'complaint',
      response: 'Thank you for your feedback. We have implemented new heating systems and added more serving staff during peak hours.'
    },
    {
      id: 3,
      meal: 'breakfast',
      date: '2024-09-03',
      rating: 5,
      taste: 5,
      quantity: 4,
      hygiene: 5,
      service: 5,
      comments: 'Amazing breakfast today! The poha was perfectly seasoned and the service was quick. Keep it up!',
      anonymous: false,
      status: 'new',
      category: 'positive',
      response: null
    },
    {
      id: 4,
      meal: 'lunch',
      date: '2024-09-02',
      rating: 3,
      taste: 3,
      quantity: 2,
      hygiene: 4,
      service: 3,
      comments: 'The sabzi was okay but the quantity was less. Also, please add more variety to the weekly menu.',
      anonymous: true,
      status: 'pending',
      category: 'suggestion',
      response: null
    }
  ];

  const getFilteredFeedback = () => {
    if (filter === 'all') return feedbackData;
    if (filter === 'new') return feedbackData.filter(f => f.status === 'new');
    if (filter === 'pending') return feedbackData.filter(f => f.status === 'pending');
    if (filter === 'complaints') return feedbackData.filter(f => f.category === 'complaint');
    return feedbackData;
  };

  const handleSendResponse = () => {
    if (!response.trim()) return;
    
    // Update feedback with response
    const updatedFeedback = {
      ...selectedFeedback,
      response: response,
      status: 'responded'
    };
    
    toast.success('Response sent successfully');
    setResponse('');
    setSelectedFeedback(null);
  };

  const getAverageRating = (category) => {
    const categoryRatings = feedbackData.map(f => f[category]).filter(r => r);
    return (categoryRatings.reduce((a, b) => a + b, 0) / categoryRatings.length).toFixed(1);
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'positive': return 'bg-green-100 text-green-800';
      case 'complaint': return 'bg-red-100 text-red-800';
      case 'suggestion': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'responded': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Feedback Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-blue-600">{feedbackData.length}</div>
            <p className="text-sm text-muted-foreground">Total Feedback</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {feedbackData.filter(f => f.status === 'new').length}
            </div>
            <p className="text-sm text-muted-foreground">New</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {feedbackData.filter(f => f.status === 'pending').length}
            </div>
            <p className="text-sm text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-green-600">
              {feedbackData.filter(f => f.status === 'responded').length}
            </div>
            <p className="text-sm text-muted-foreground">Responded</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {getAverageRating('rating')}
            </div>
            <p className="text-sm text-muted-foreground">Avg Rating</p>
          </CardContent>
        </Card>
      </div>

      {/* Rating Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Star className="w-5 h-5 mr-2" />
            Rating Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {['taste', 'quantity', 'hygiene', 'service'].map((category) => (
              <div key={category} className="space-y-2">
                <div className="flex justify-between">
                  <span className="capitalize">{category}</span>
                  <span className="font-medium">{getAverageRating(category)}/5</span>
                </div>
                <Progress value={parseFloat(getAverageRating(category)) * 20} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Poor</span>
                  <span>Excellent</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Filters and Feedback List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <MessageCircle className="w-5 h-5 mr-2" />
              Recent Feedback
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('all')}
              >
                All
              </Button>
              <Button
                variant={filter === 'new' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('new')}
              >
                New
              </Button>
              <Button
                variant={filter === 'pending' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('pending')}
              >
                Pending
              </Button>
              <Button
                variant={filter === 'complaints' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('complaints')}
              >
                <AlertTriangle className="w-4 h-4 mr-1" />
                Complaints
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {getFilteredFeedback().map((feedback) => (
              <div key={feedback.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="capitalize">{feedback.meal}</Badge>
                    <Badge className={getCategoryColor(feedback.category)}>
                      {feedback.category}
                    </Badge>
                    <Badge className={getStatusColor(feedback.status)}>
                      {feedback.status}
                    </Badge>
                    {!feedback.anonymous && (
                      <Badge variant="outline">Public</Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-3 h-3 ${i < feedback.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">{feedback.date}</span>
                  </div>
                </div>
                
                <p className="text-sm mb-3">{feedback.comments}</p>
                
                <div className="grid grid-cols-4 gap-4 text-xs text-muted-foreground mb-3">
                  <div>Taste: {feedback.taste}/5</div>
                  <div>Quantity: {feedback.quantity}/5</div>
                  <div>Hygiene: {feedback.hygiene}/5</div>
                  <div>Service: {feedback.service}/5</div>
                </div>
                
                {feedback.response && (
                  <div className="bg-blue-50 p-3 rounded-lg mt-3">
                    <p className="text-sm"><strong>Admin Response:</strong></p>
                    <p className="text-sm mt-1">{feedback.response}</p>
                  </div>
                )}
                
                <div className="flex justify-end space-x-2 mt-3">
                  {!feedback.response && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedFeedback(feedback)}
                    >
                      <Reply className="w-4 h-4 mr-1" />
                      Respond
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    Mark as Priority
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Feedback Trends */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Weekly Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, index) => (
                <div key={day} className="flex items-center justify-between">
                  <span className="text-sm">{day}</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={[85, 92, 78, 95, 88, 45, 67][index]} className="w-20 h-2" />
                    <span className="text-xs text-muted-foreground w-8">
                      {[4.2, 4.5, 3.8, 4.7, 4.3, 3.2, 4.0][index]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Common Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { issue: 'Long queue times', count: 8, trend: 'up' },
                { issue: 'Food temperature', count: 5, trend: 'down' },
                { issue: 'Portion size', count: 4, trend: 'up' },
                { issue: 'Limited variety', count: 3, trend: 'stable' },
                { issue: 'Service speed', count: 2, trend: 'down' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-2 border rounded">
                  <span className="text-sm">{item.issue}</span>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{item.count}</Badge>
                    <span className={`text-xs ${
                      item.trend === 'up' ? 'text-red-500' :
                      item.trend === 'down' ? 'text-green-500' :
                      'text-gray-500'
                    }`}>
                      {item.trend === 'up' ? '↑' : item.trend === 'down' ? '↓' : '→'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Response Dialog */}
      <Dialog open={!!selectedFeedback} onOpenChange={() => setSelectedFeedback(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Respond to Feedback</DialogTitle>
          </DialogHeader>
          
          {selectedFeedback && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{selectedFeedback.meal}</Badge>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-3 h-3 ${i < selectedFeedback.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{selectedFeedback.date}</span>
                </div>
                <p className="text-sm">{selectedFeedback.comments}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Your Response</label>
                <Textarea
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  placeholder="Type your response to this feedback..."
                  rows={4}
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setSelectedFeedback(null)}>
                  Cancel
                </Button>
                <Button onClick={handleSendResponse} disabled={!response.trim()}>
                  <Reply className="w-4 h-4 mr-2" />
                  Send Response
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}