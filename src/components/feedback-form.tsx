import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { Separator } from './ui/separator';
import { MessageCircle, Star, Send, Eye, EyeOff, TrendingUp } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function FeedbackForm() {
  const [feedback, setFeedback] = useState({
    meal: 'lunch',
    rating: [4],
    taste: [4],
    quantity: [3],
    hygiene: [5],
    service: [4],
    comments: '',
    anonymous: true
  });

  const [recentFeedback, setRecentFeedback] = useState([
    {
      id: 1,
      date: '2024-09-03',
      meal: 'lunch',
      rating: 4,
      comments: 'The dal was excellent today!',
      anonymous: true,
      responses: 1
    },
    {
      id: 2,
      date: '2024-09-02', 
      meal: 'dinner',
      rating: 3,
      comments: 'Food was okay, but the queue was too long.',
      anonymous: true,
      responses: 0
    }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Add to recent feedback
    const newFeedback = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      meal: feedback.meal,
      rating: feedback.rating[0],
      comments: feedback.comments,
      anonymous: feedback.anonymous,
      responses: 0
    };
    
    setRecentFeedback(prev => [newFeedback, ...prev]);
    
    // Reset form
    setFeedback({
      meal: 'lunch',
      rating: [4],
      taste: [4],
      quantity: [3],
      hygiene: [5],
      service: [4],
      comments: '',
      anonymous: true
    });
    
    toast.success('Feedback submitted successfully! Thank you for helping us improve.');
  };

  const getRatingLabel = (value) => {
    const labels = ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];
    return labels[value - 1] || 'Good';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageCircle className="w-5 h-5 mr-2" />
            Anonymous Feedback
          </CardTitle>
          <CardDescription>
            Share your honest feedback to help us improve the mess experience for everyone
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Feedback Form */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Submit New Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Meal Selection */}
                <div>
                  <Label className="text-base mb-3 block">Which meal are you reviewing?</Label>
                  <RadioGroup 
                    value={feedback.meal} 
                    onValueChange={(value) => setFeedback(prev => ({...prev, meal: value}))}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="breakfast" id="breakfast" />
                      <Label htmlFor="breakfast">Breakfast</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="lunch" id="lunch" />
                      <Label htmlFor="lunch">Lunch</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="dinner" id="dinner" />
                      <Label htmlFor="dinner">Dinner</Label>
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                {/* Overall Rating */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Label className="text-base">Overall Rating</Label>
                    <Badge variant="outline">
                      {feedback.rating[0]} - {getRatingLabel(feedback.rating[0])}
                    </Badge>
                  </div>
                  <Slider
                    value={feedback.rating}
                    onValueChange={(value) => setFeedback(prev => ({...prev, rating: value}))}
                    max={5}
                    min={1}
                    step={1}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Poor</span>
                    <span>Excellent</span>
                  </div>
                </div>

                {/* Detailed Ratings */}
                <div className="space-y-4">
                  <Label className="text-base">Detailed Ratings</Label>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-sm">Taste</Label>
                      <Badge variant="outline" className="text-xs">
                        {feedback.taste[0]}/5
                      </Badge>
                    </div>
                    <Slider
                      value={feedback.taste}
                      onValueChange={(value) => setFeedback(prev => ({...prev, taste: value}))}
                      max={5}
                      min={1}
                      step={1}
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-sm">Quantity</Label>
                      <Badge variant="outline" className="text-xs">
                        {feedback.quantity[0]}/5
                      </Badge>
                    </div>
                    <Slider
                      value={feedback.quantity}
                      onValueChange={(value) => setFeedback(prev => ({...prev, quantity: value}))}
                      max={5}
                      min={1}
                      step={1}
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-sm">Hygiene</Label>
                      <Badge variant="outline" className="text-xs">
                        {feedback.hygiene[0]}/5
                      </Badge>
                    </div>
                    <Slider
                      value={feedback.hygiene}
                      onValueChange={(value) => setFeedback(prev => ({...prev, hygiene: value}))}
                      max={5}
                      min={1}
                      step={1}
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-sm">Service</Label>
                      <Badge variant="outline" className="text-xs">
                        {feedback.service[0]}/5
                      </Badge>
                    </div>
                    <Slider
                      value={feedback.service}
                      onValueChange={(value) => setFeedback(prev => ({...prev, service: value}))}
                      max={5}
                      min={1}
                      step={1}
                    />
                  </div>
                </div>

                <Separator />

                {/* Comments */}
                <div>
                  <Label htmlFor="comments" className="text-base mb-3 block">
                    Additional Comments (Optional)
                  </Label>
                  <Textarea
                    id="comments"
                    placeholder="Share specific feedback, suggestions, or compliments..."
                    value={feedback.comments}
                    onChange={(e) => setFeedback(prev => ({...prev, comments: e.target.value}))}
                    rows={3}
                  />
                </div>

                {/* Anonymous Option */}
                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div className="flex items-center space-x-3">
                    {feedback.anonymous ? (
                      <EyeOff className="w-5 h-5 text-green-600" />
                    ) : (
                      <Eye className="w-5 h-5 text-orange-600" />
                    )}
                    <div>
                      <Label className="text-base">Anonymous Feedback</Label>
                      <p className="text-sm text-muted-foreground">
                        Your identity will {feedback.anonymous ? 'not' : ''} be shared
                      </p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant={feedback.anonymous ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFeedback(prev => ({...prev, anonymous: !prev.anonymous}))}
                  >
                    {feedback.anonymous ? 'Anonymous' : 'Public'}
                  </Button>
                </div>

                <Button type="submit" className="w-full" size="lg">
                  <Send className="w-4 h-4 mr-2" />
                  Submit Feedback
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Recent Feedback & Stats */}
        <div className="space-y-6">
          {/* Your Recent Feedback */}
          <Card>
            <CardHeader>
              <CardTitle>Your Recent Feedback</CardTitle>
              <CardDescription>Track your submitted feedback and responses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentFeedback.map((item) => (
                <div key={item.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="capitalize">
                        {item.meal}
                      </Badge>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-3 h-3 ${i < item.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{item.date}</span>
                  </div>
                  <p className="text-sm mb-2">{item.comments}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant={item.anonymous ? "secondary" : "outline"} className="text-xs">
                      {item.anonymous ? <EyeOff className="w-3 h-3 mr-1" /> : <Eye className="w-3 h-3 mr-1" />}
                      {item.anonymous ? 'Anonymous' : 'Public'}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {item.responses} responses
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Feedback Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Feedback Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total Feedback Submitted</span>
                  <Badge>8</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Average Rating Given</span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                    <span>4.2</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Improvements Implemented</span>
                  <Badge variant="secondary">3</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card>
            <CardContent className="p-6">
              <h4 className="mb-3">💡 Feedback Tips</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Be specific about what you liked or disliked</li>
                <li>• Suggest improvements rather than just complaints</li>
                <li>• Anonymous feedback helps you be more honest</li>
                <li>• Regular feedback helps us track trends and improve</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}