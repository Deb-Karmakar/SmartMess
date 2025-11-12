import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { ChefHat, Plus, Edit, Trash2, Calendar, DollarSign, Clock } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function AdminMenuManager() {
  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      name: 'Aloo Paratha',
      meal: 'breakfast',
      price: 25,
      category: 'North Indian',
      ingredients: 'Wheat flour, Potato, Onions, Spices',
      allergens: 'Gluten',
      status: 'active',
      preparationTime: 20
    },
    {
      id: 2,
      name: 'Dal Makhani',
      meal: 'lunch',
      price: 45,
      category: 'North Indian',
      ingredients: 'Black lentils, Butter, Cream, Spices',
      allergens: 'Dairy',
      status: 'active',
      preparationTime: 60
    },
    {
      id: 3,
      name: 'Sambar Rice',
      meal: 'lunch',
      price: 40,
      category: 'South Indian',
      ingredients: 'Rice, Toor dal, Vegetables, Tamarind',
      allergens: 'None',
      status: 'inactive',
      preparationTime: 30
    }
  ]);

  const [editingItem, setEditingItem] = useState(null);
  const [newItem, setNewItem] = useState({
    name: '',
    meal: 'breakfast',
    price: '',
    category: '',
    ingredients: '',
    allergens: '',
    status: 'active',
    preparationTime: ''
  });

  const handleSaveItem = () => {
    if (editingItem) {
      setMenuItems(prev => prev.map(item => 
        item.id === editingItem.id ? { ...editingItem } : item
      ));
      setEditingItem(null);
      toast.success('Menu item updated successfully');
    } else {
      const item = {
        ...newItem,
        id: Date.now(),
        price: parseInt(newItem.price),
        preparationTime: parseInt(newItem.preparationTime)
      };
      setMenuItems(prev => [...prev, item]);
      setNewItem({
        name: '',
        meal: 'breakfast',
        price: '',
        category: '',
        ingredients: '',
        allergens: '',
        status: 'active',
        preparationTime: ''
      });
      toast.success('New menu item added successfully');
    }
  };

  const handleDeleteItem = (id) => {
    setMenuItems(prev => prev.filter(item => item.id !== id));
    toast.success('Menu item deleted');
  };

  const toggleItemStatus = (id) => {
    setMenuItems(prev => prev.map(item => 
      item.id === id 
        ? { ...item, status: item.status === 'active' ? 'inactive' : 'active' }
        : item
    ));
  };

  const weeklySchedule = {
    Monday: { breakfast: 'Poha', lunch: 'Rice + Dal', dinner: 'Roti + Sabzi' },
    Tuesday: { breakfast: 'Upma', lunch: 'Biryani', dinner: 'Rice + Curry' },
    Wednesday: { breakfast: 'Paratha', lunch: 'Chole Rice', dinner: 'Dal + Roti' },
    Thursday: { breakfast: 'Idli', lunch: 'Sambar Rice', dinner: 'Mixed Veg' },
    Friday: { breakfast: 'Dosa', lunch: 'Pulao', dinner: 'Paneer + Naan' },
    Saturday: { breakfast: 'Sandwich', lunch: 'Rajma Rice', dinner: 'Special Thali' },
    Sunday: { breakfast: 'Puri Sabzi', lunch: 'South Indian', dinner: 'North Indian' }
  };

  return (
    <div className="space-y-6">
      {/* Header with Add Button */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <ChefHat className="w-5 h-5 mr-2" />
                Menu Management
              </CardTitle>
              <CardDescription>Manage menu items, pricing, and weekly schedule</CardDescription>
            </div>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Menu Item
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Menu Item</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Item Name</Label>
                    <Input
                      id="name"
                      value={newItem.name}
                      onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g., Aloo Paratha"
                    />
                  </div>
                  <div>
                    <Label htmlFor="meal">Meal Type</Label>
                    <Select value={newItem.meal} onValueChange={(value) => setNewItem(prev => ({ ...prev, meal: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="breakfast">Breakfast</SelectItem>
                        <SelectItem value="lunch">Lunch</SelectItem>
                        <SelectItem value="dinner">Dinner</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="price">Price (₹)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={newItem.price}
                      onChange={(e) => setNewItem(prev => ({ ...prev, price: e.target.value }))}
                      placeholder="25"
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      value={newItem.category}
                      onChange={(e) => setNewItem(prev => ({ ...prev, category: e.target.value }))}
                      placeholder="North Indian"
                    />
                  </div>
                  <div>
                    <Label htmlFor="prepTime">Preparation Time (mins)</Label>
                    <Input
                      id="prepTime"
                      type="number"
                      value={newItem.preparationTime}
                      onChange={(e) => setNewItem(prev => ({ ...prev, preparationTime: e.target.value }))}
                      placeholder="30"
                    />
                  </div>
                  <div>
                    <Label htmlFor="allergens">Allergens</Label>
                    <Input
                      id="allergens"
                      value={newItem.allergens}
                      onChange={(e) => setNewItem(prev => ({ ...prev, allergens: e.target.value }))}
                      placeholder="Gluten, Dairy"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="ingredients">Ingredients</Label>
                    <Textarea
                      id="ingredients"
                      value={newItem.ingredients}
                      onChange={(e) => setNewItem(prev => ({ ...prev, ingredients: e.target.value }))}
                      placeholder="List main ingredients..."
                      rows={3}
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                  <Button variant="outline" onClick={() => setNewItem({
                    name: '', meal: 'breakfast', price: '', category: '', ingredients: '', allergens: '', status: 'active', preparationTime: ''
                  })}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveItem} disabled={!newItem.name || !newItem.price}>
                    Add Item
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
      </Card>

      {/* Menu Items List */}
      <Card>
        <CardHeader>
          <CardTitle>Menu Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {menuItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg">{item.name}</h3>
                    <Badge variant="outline" className="capitalize">{item.meal}</Badge>
                    <Badge variant={item.status === 'active' ? 'default' : 'secondary'}>
                      {item.status}
                    </Badge>
                    <Badge variant="outline">{item.category}</Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <DollarSign className="w-3 h-3 mr-1" />
                      ₹{item.price}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {item.preparationTime} mins
                    </div>
                    <div>
                      Allergens: {item.allergens || 'None'}
                    </div>
                    <div className="md:col-span-1">
                      {item.ingredients.length > 30 
                        ? `${item.ingredients.substring(0, 30)}...` 
                        : item.ingredients
                      }
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleItemStatus(item.id)}
                  >
                    {item.status === 'active' ? 'Deactivate' : 'Activate'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingItem(item)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteItem(item.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Weekly Menu Schedule
          </CardTitle>
          <CardDescription>Current week's planned menu</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {Object.entries(weeklySchedule).map(([day, meals]) => (
              <div key={day} className="border rounded-lg p-4">
                <h3 className="text-lg mb-3">{day}</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Breakfast</span>
                    <span>{meals.breakfast}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Lunch</span>
                    <span>{meals.lunch}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Dinner</span>
                    <span>{meals.dinner}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-3">
                  Edit Day Menu
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Menu Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-blue-600">{menuItems.length}</div>
            <p className="text-sm text-muted-foreground">Total Items</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-green-600">
              {menuItems.filter(item => item.status === 'active').length}
            </div>
            <p className="text-sm text-muted-foreground">Active Items</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-orange-600">
              ₹{Math.round(menuItems.reduce((acc, item) => acc + item.price, 0) / menuItems.length)}
            </div>
            <p className="text-sm text-muted-foreground">Avg Price</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {Math.round(menuItems.reduce((acc, item) => acc + item.preparationTime, 0) / menuItems.length)}
            </div>
            <p className="text-sm text-muted-foreground">Avg Prep Time</p>
          </CardContent>
        </Card>
      </div>

      {/* Edit Item Dialog */}
      {editingItem && (
        <Dialog open={!!editingItem} onOpenChange={() => setEditingItem(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Menu Item</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-name">Item Name</Label>
                <Input
                  id="edit-name"
                  value={editingItem.name}
                  onChange={(e) => setEditingItem(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="edit-meal">Meal Type</Label>
                <Select value={editingItem.meal} onValueChange={(value) => setEditingItem(prev => ({ ...prev, meal: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="breakfast">Breakfast</SelectItem>
                    <SelectItem value="lunch">Lunch</SelectItem>
                    <SelectItem value="dinner">Dinner</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-price">Price (₹)</Label>
                <Input
                  id="edit-price"
                  type="number"
                  value={editingItem.price}
                  onChange={(e) => setEditingItem(prev => ({ ...prev, price: parseInt(e.target.value) || 0 }))}
                />
              </div>
              <div>
                <Label htmlFor="edit-category">Category</Label>
                <Input
                  id="edit-category"
                  value={editingItem.category}
                  onChange={(e) => setEditingItem(prev => ({ ...prev, category: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="edit-prepTime">Preparation Time (mins)</Label>
                <Input
                  id="edit-prepTime"
                  type="number"
                  value={editingItem.preparationTime}
                  onChange={(e) => setEditingItem(prev => ({ ...prev, preparationTime: parseInt(e.target.value) || 0 }))}
                />
              </div>
              <div>
                <Label htmlFor="edit-allergens">Allergens</Label>
                <Input
                  id="edit-allergens"
                  value={editingItem.allergens}
                  onChange={(e) => setEditingItem(prev => ({ ...prev, allergens: e.target.value }))}
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="edit-ingredients">Ingredients</Label>
                <Textarea
                  id="edit-ingredients"
                  value={editingItem.ingredients}
                  onChange={(e) => setEditingItem(prev => ({ ...prev, ingredients: e.target.value }))}
                  rows={3}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="outline" onClick={() => setEditingItem(null)}>
                Cancel
              </Button>
              <Button onClick={handleSaveItem}>
                Save Changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}