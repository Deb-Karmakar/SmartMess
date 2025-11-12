import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { Calendar } from './ui/calendar';
import { CalendarDays, Clock, Users, CheckCircle, X } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function MealPreBooking() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [bookings, setBookings] = useState({
    breakfast: false,
    lunch: true,
    dinner: false
  });

  const meals = [
    {
      id: 'breakfast',
      name: 'Breakfast',
      time: '7:00 AM - 9:30 AM',
      menu: 'Poha, Bread, Butter, Tea/Coffee',
      price: 25,
      available: true
    },
    {
      id: 'lunch', 
      name: 'Lunch',
      time: '12:00 PM - 2:30 PM',
      menu: 'Rice, Dal, Sabzi, Roti, Pickle',
      price: 45,
      available: true
    },
    {
      id: 'dinner',
      name: 'Dinner', 
      time: '7:00 PM - 10:00 PM',
      menu: 'Rice, Dal, Sabzi, Roti, Dessert',
      price: 50,
      available: true
    }
  ];

  const handleBookingChange = (mealId: string, checked: boolean) => {
    setBookings(prev => ({
      ...prev,
      [mealId]: checked
    }));
  };

  const handleSaveBookings = () => {
    const bookedMeals = Object.entries(bookings)
      .filter(([_, booked]) => booked)
      .map(([meal, _]) => meal);
    
    toast.success(`Meals booked for ${selectedDate.toLocaleDateString()}: ${bookedMeals.join(', ')}`);
  };

  const getBookedCount = () => Object.values(bookings).filter(Boolean).length;
  const getTotalCost = () => meals.reduce((total, meal) => 
    bookings[meal.id] ? total + meal.price : total, 0
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CalendarDays className="w-5 h-5 mr-2" />
            Pre-book Your Meals
          </CardTitle>
          <CardDescription>
            Book meals in advance to help with headcount prediction and avoid queues
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card>
          <CardHeader>
            <CardTitle>Select Date</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => date < new Date() || date > new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)}
              className="rounded-md border"
            />
            <div className="mt-4 text-sm text-muted-foreground">
              You can book meals up to 7 days in advance
            </div>
          </CardContent>
        </Card>

        {/* Meal Selection */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Meals for {selectedDate.toLocaleDateString()}</CardTitle>
                <div className="flex items-center space-x-4">
                  <Badge variant="outline">
                    {getBookedCount()} meals selected
                  </Badge>
                  <Badge>
                    ₹{getTotalCost()}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {meals.map((meal) => (
                <div key={meal.id} className="flex items-center space-x-3 p-4 border rounded-lg">
                  <Checkbox
                    checked={bookings[meal.id]}
                    onCheckedChange={(checked) => handleBookingChange(meal.id, checked)}
                    disabled={!meal.available}
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg">{meal.name}</h3>
                      <div className="text-right">
                        <p className="font-medium">₹{meal.price}</p>
                        {meal.available ? (
                          <Badge variant="outline" className="text-xs">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Available
                          </Badge>
                        ) : (
                          <Badge variant="destructive" className="text-xs">
                            <X className="w-3 h-3 mr-1" />
                            Full
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <Clock className="w-4 h-4 mr-1" />
                      {meal.time}
                    </div>
                    
                    <p className="text-sm mt-1">{meal.menu}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Summary and Actions */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4>Booking Summary</h4>
                  <p className="text-sm text-muted-foreground">
                    {getBookedCount()} meals • Total: ₹{getTotalCost()}
                  </p>
                </div>
                <div className="space-x-2">
                  <Button variant="outline" onClick={() => setBookings({ breakfast: false, lunch: false, dinner: false })}>
                    Clear All
                  </Button>
                  <Button onClick={handleSaveBookings} disabled={getBookedCount() === 0}>
                    Save Bookings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card>
            <CardContent className="p-6">
              <h4 className="mb-3">💡 Pro Tips</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Pre-book meals to skip the queue during peak hours</li>
                <li>• Cancel bookings at least 2 hours before meal time</li>
                <li>• Your booking helps the mess predict headcount accurately</li>
                <li>• You'll receive a confirmation QR code for quick entry</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}