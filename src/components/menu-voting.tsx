import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Vote, Calendar, Users, TrendingUp, Star } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function MenuVoting() {
  const [selectedOptions, setSelectedOptions] = useState({
    breakfast: '',
    lunch: '',
    dinner: ''
  });

  const polls = [
    {
      id: 'breakfast',
      title: 'Next Week Breakfast Menu',
      description: 'Vote for your preferred breakfast option',
      deadline: 'Voting closes in 2 days',
      totalVotes: 143,
      options: [
        { id: 'poha', name: 'Poha + Tea', votes: 45, description: 'Traditional poha with onions and peas' },
        { id: 'upma', name: 'Upma + Coffee', votes: 38, description: 'Semolina upma with vegetables' },
        { id: 'paratha', name: 'Aloo Paratha + Curd', votes: 35, description: 'Stuffed potato paratha with fresh curd' },
        { id: 'sandwich', name: 'Veg Sandwich + Juice', votes: 25, description: 'Grilled vegetable sandwich with fresh juice' }
      ]
    },
    {
      id: 'lunch',
      title: 'Special Lunch - Friday',
      description: 'Vote for this Friday\'s special lunch menu',
      deadline: 'Voting closes tomorrow',
      totalVotes: 89,
      options: [
        { id: 'biryani', name: 'Veg Biryani', votes: 32, description: 'Fragrant rice with mixed vegetables' },
        { id: 'pulao', name: 'Jeera Rice + Rajma', votes: 28, description: 'Cumin rice with kidney beans curry' },
        { id: 'chole', name: 'Chole Bhature', votes: 20, description: 'Spicy chickpea curry with fried bread' },
        { id: 'sambar', name: 'Sambar Rice + Vada', votes: 9, description: 'South Indian lentil curry with rice' }
      ]
    },
    {
      id: 'dinner',
      title: 'Weekend Dinner Special',
      description: 'Vote for your favorite weekend dinner',
      deadline: 'Voting ends in 5 days',
      totalVotes: 67,
      options: [
        { id: 'paneer', name: 'Paneer Butter Masala', votes: 25, description: 'Rich cottage cheese curry' },
        { id: 'dal', name: 'Dal Makhani + Naan', votes: 18, description: 'Creamy black lentils with bread' },
        { id: 'mixed', name: 'Mixed Veg + Roti', votes: 15, description: 'Seasonal mixed vegetable curry' },
        { id: 'south', name: 'South Indian Thali', votes: 9, description: 'Complete South Indian meal set' }
      ]
    }
  ];

  const handleVote = (pollId: string, optionId: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [pollId]: optionId
    }));
  };

  const submitVote = (pollId: string) => {
    const selectedOption = selectedOptions[pollId];
    if (!selectedOption) {
      toast.error('Please select an option to vote');
      return;
    }

    const poll = polls.find(p => p.id === pollId);
    const option = poll?.options.find(o => o.id === selectedOption);
    
    toast.success(`Vote submitted for: ${option?.name}`);
    
    // Reset selection after voting
    setSelectedOptions(prev => ({
      ...prev,
      [pollId]: ''
    }));
  };

  const getVotePercentage = (votes: number, total: number) => {
    return total > 0 ? Math.round((votes / total) * 100) : 0;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Vote className="w-5 h-5 mr-2" />
            Weekly Menu Voting
          </CardTitle>
          <CardDescription>
            Vote for your preferred menu items and help shape the weekly meal plan
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Active Polls */}
      <div className="space-y-6">
        {polls.map((poll) => (
          <Card key={poll.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{poll.title}</CardTitle>
                  <CardDescription>{poll.description}</CardDescription>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="mb-2">
                    <Users className="w-3 h-3 mr-1" />
                    {poll.totalVotes} votes
                  </Badge>
                  <p className="text-xs text-muted-foreground">{poll.deadline}</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <RadioGroup
                value={selectedOptions[poll.id]}
                onValueChange={(value) => handleVote(poll.id, value)}
              >
                {poll.options.map((option) => {
                  const percentage = getVotePercentage(option.votes, poll.totalVotes);
                  return (
                    <div key={option.id} className="relative">
                      <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                        <RadioGroupItem value={option.id} id={`${poll.id}-${option.id}`} />
                        <Label 
                          htmlFor={`${poll.id}-${option.id}`} 
                          className="flex-1 cursor-pointer"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4>{option.name}</h4>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-muted-foreground">
                                {option.votes} votes
                              </span>
                              <Badge variant="outline" className="text-xs">
                                {percentage}%
                              </Badge>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {option.description}
                          </p>
                          <Progress value={percentage} className="h-2" />
                        </Label>
                      </div>
                    </div>
                  );
                })}
              </RadioGroup>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  {poll.deadline}
                </div>
                <Button 
                  onClick={() => submitVote(poll.id)}
                  disabled={!selectedOptions[poll.id]}
                  size="sm"
                >
                  <Vote className="w-4 h-4 mr-2" />
                  Submit Vote
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Voting Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Your Voting Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">12</div>
              <p className="text-sm text-muted-foreground">Total Votes Cast</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">8</div>
              <p className="text-sm text-muted-foreground">Winning Votes</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-orange-600">67%</div>
              <p className="text-sm text-muted-foreground">Success Rate</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* How Voting Works */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Star className="w-5 h-5 mr-2" />
            How Menu Voting Works
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="mb-2">📋 Weekly Process</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• New polls are created every Tuesday</li>
                <li>• Voting closes on Thursday evening</li>
                <li>• Results are implemented the following week</li>
                <li>• Menu is published on Friday</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2">🎯 Voting Guidelines</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• One vote per poll per student</li>
                <li>• You can change your vote before deadline</li>
                <li>• Majority vote wins for each meal</li>
                <li>• Special dietary requests can be submitted separately</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}