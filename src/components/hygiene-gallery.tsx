import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Camera, Video, Eye, Calendar, Clock, MapPin, Star, ThumbsUp } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function HygieneGallery() {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [filter, setFilter] = useState('all');

  const mediaItems = [
    {
      id: 1,
      type: 'image',
      title: 'Clean Kitchen Area',
      description: 'Kitchen prep area after morning cleaning',
      timestamp: '2024-09-04 08:30',
      location: 'Main Kitchen',
      rating: 4.8,
      views: 156,
      likes: 23,
      url: 'https://images.unsplash.com/photo-1556909045-f3c6b1b92e40?w=400&h=300&fit=crop'
    },
    {
      id: 2,
      type: 'image',  
      title: 'Dining Hall Setup',
      description: 'Sanitized dining area ready for lunch service',
      timestamp: '2024-09-04 11:45',
      location: 'Dining Hall',
      rating: 4.9,
      views: 203,
      likes: 31,
      url: 'https://images.unsplash.com/photo-1555992336-03a23f78013c?w=400&h=300&fit=crop'
    },
    {
      id: 3,
      type: 'video',
      title: 'Food Preparation Process',
      description: 'Live cooking demonstration showing hygiene practices',
      timestamp: '2024-09-04 10:15',
      location: 'Cooking Area',
      rating: 4.7,
      views: 89,
      likes: 18,
      duration: '2:34',
      url: 'https://images.unsplash.com/photo-1556909010-f8bf5b6a5ab4?w=400&h=300&fit=crop'
    },
    {
      id: 4,
      type: 'image',
      title: 'Storage Area Inspection',
      description: 'Organized and clean food storage facility',
      timestamp: '2024-09-03 16:20',
      location: 'Storage Room',
      rating: 4.6,
      views: 134,
      likes: 19,
      url: 'https://images.unsplash.com/photo-1556909195-4d5d5cb9b8b6?w=400&h=300&fit=crop'
    },
    {
      id: 5,
      type: 'video',
      title: 'Daily Cleaning Routine',
      description: 'Time-lapse of end-of-day cleaning process',
      timestamp: '2024-09-03 20:30',
      location: 'Entire Facility',
      rating: 4.9,
      views: 245,
      likes: 42,
      duration: '1:45',
      url: 'https://images.unsplash.com/photo-1556909116-2c4c94df41c3?w=400&h=300&fit=crop'
    },
    {
      id: 6,
      type: 'image',
      title: 'Fresh Ingredients Display',
      description: 'Today\'s fresh vegetables and ingredients showcase',
      timestamp: '2024-09-04 07:00',
      location: 'Prep Area',
      rating: 4.8,
      views: 178,
      likes: 28,
      url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop'
    }
  ];

  const filteredItems = filter === 'all' 
    ? mediaItems 
    : mediaItems.filter(item => item.type === filter);

  const handleMediaClick = (item) => {
    setSelectedMedia(item);
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Camera className="w-5 h-5 mr-2" />
            Hygiene Gallery
          </CardTitle>
          <CardDescription>
            Transparent view of our kitchen and dining area hygiene standards
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Button 
              variant={filter === 'all' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setFilter('all')}
            >
              All
            </Button>
            <Button 
              variant={filter === 'image' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setFilter('image')}
            >
              <Camera className="w-4 h-4 mr-1" />
              Photos
            </Button>
            <Button 
              variant={filter === 'video' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setFilter('video')}
            >
              <Video className="w-4 h-4 mr-1" />
              Videos
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-green-600">98.5%</div>
            <p className="text-sm text-muted-foreground">Hygiene Score</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-blue-600">24</div>
            <p className="text-sm text-muted-foreground">Updates Today</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-orange-600">4.8</div>
            <p className="text-sm text-muted-foreground">Avg Rating</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-purple-600">1.2k</div>
            <p className="text-sm text-muted-foreground">Total Views</p>
          </CardContent>
        </Card>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id} className="cursor-pointer hover:shadow-lg transition-shadow">
            <div className="relative">
              <div className="aspect-video relative overflow-hidden rounded-t-lg">
                <ImageWithFallback
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary" className="text-xs">
                    {item.type === 'video' ? (
                      <>
                        <Video className="w-3 h-3 mr-1" />
                        {item.duration}
                      </>
                    ) : (
                      <>
                        <Camera className="w-3 h-3 mr-1" />
                        Photo
                      </>
                    )}
                  </Badge>
                </div>
                <div className="absolute bottom-2 left-2">
                  <Badge className="text-xs bg-black/60 text-white">
                    <Star className="w-3 h-3 mr-1 text-yellow-400" />
                    {item.rating}
                  </Badge>
                </div>
              </div>
            </div>
            
            <CardContent className="p-4" onClick={() => handleMediaClick(item)}>
              <h3 className="text-base mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                <div className="flex items-center">
                  <MapPin className="w-3 h-3 mr-1" />
                  {item.location}
                </div>
                <div className="flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {formatTimestamp(item.timestamp)}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                  <span className="flex items-center">
                    <Eye className="w-3 h-3 mr-1" />
                    {item.views}
                  </span>
                  <span className="flex items-center">
                    <ThumbsUp className="w-3 h-3 mr-1" />
                    {item.likes}
                  </span>
                </div>
                <Button size="sm" variant="ghost" onClick={() => handleMediaClick(item)}>
                  View
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Media Detail Dialog */}
      <Dialog open={!!selectedMedia} onOpenChange={() => setSelectedMedia(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              {selectedMedia?.type === 'video' ? (
                <Video className="w-5 h-5 mr-2" />
              ) : (
                <Camera className="w-5 h-5 mr-2" />
              )}
              {selectedMedia?.title}
            </DialogTitle>
          </DialogHeader>
          
          {selectedMedia && (
            <div className="space-y-4">
              <div className="aspect-video relative overflow-hidden rounded-lg">
                <ImageWithFallback
                  src={selectedMedia.url}
                  alt={selectedMedia.title}
                  className="w-full h-full object-cover"
                />
                {selectedMedia.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <Button size="lg" className="rounded-full">
                      <Video className="w-6 h-6" />
                    </Button>
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4>Description</h4>
                  <p className="text-sm text-muted-foreground">{selectedMedia.description}</p>
                </div>
                <div>
                  <h4>Details</h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p><MapPin className="w-3 h-3 inline mr-1" />{selectedMedia.location}</p>
                    <p><Clock className="w-3 h-3 inline mr-1" />{formatTimestamp(selectedMedia.timestamp)}</p>
                    <p><Star className="w-3 h-3 inline mr-1 text-yellow-400" />Rating: {selectedMedia.rating}/5</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span><Eye className="w-4 h-4 inline mr-1" />{selectedMedia.views} views</span>
                  <span><ThumbsUp className="w-4 h-4 inline mr-1" />{selectedMedia.likes} likes</span>
                </div>
                <div className="space-x-2">
                  <Button variant="outline" size="sm">
                    <ThumbsUp className="w-4 h-4 mr-1" />
                    Like
                  </Button>
                  <Button variant="outline" size="sm">
                    Share
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Information Panel */}
      <Card>
        <CardHeader>
          <CardTitle>About Our Hygiene Standards</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="mb-3">🔍 What We Show</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Real-time kitchen and dining area photos</li>
                <li>• Daily cleaning process videos</li>
                <li>• Food preparation and storage areas</li>
                <li>• Ingredient freshness verification</li>
                <li>• Staff hygiene compliance checks</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3">📋 Our Standards</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• FSSAI certified kitchen operations</li>
                <li>• Regular third-party inspections</li>
                <li>• Temperature monitoring for all food items</li>
                <li>• Daily sanitization of all surfaces</li>
                <li>• Continuous staff training programs</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}