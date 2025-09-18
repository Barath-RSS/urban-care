import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle, 
  MapPin, 
  Calendar,
  Camera,
  Star,
  Download,
  Eye
} from "lucide-react";

const CompletedTasks = () => {
  const [completedTasks] = useState([
    {
      id: 1,
      title: "Street Cleaning - Market Area",
      description: "Complete cleaning of main market street",
      category: "Sanitation & Waste",
      priority: "medium",
      completedAt: "2024-01-15 14:30",
      location: "Main Market Street",
      timeSpent: 2.5,
      rating: 5,
      photos: 3,
      feedback: "Excellent work, area cleaned thoroughly"
    },
    {
      id: 2,
      title: "Traffic Light Repair",
      description: "Fixed malfunctioning traffic signal at crossroads",
      category: "Electrical",
      priority: "high",
      completedAt: "2024-01-14 11:45",
      location: "Central Crossroads",
      timeSpent: 1.5,
      rating: 4,
      photos: 2,
      feedback: "Quick response and good work quality"
    }
  ]);

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'text-yellow-500 fill-current' : 'text-muted-foreground'}`} 
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Completed Tasks</h1>
          <p className="text-muted-foreground">Your work history and performance</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-success">{completedTasks.length}</div>
          <div className="text-sm text-muted-foreground">Tasks Completed</div>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {(completedTasks.reduce((acc, task) => acc + task.rating, 0) / completedTasks.length).toFixed(1)}
            </div>
            <div className="text-sm text-muted-foreground">Average Rating</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-secondary">
              {completedTasks.reduce((acc, task) => acc + task.timeSpent, 0)}h
            </div>
            <div className="text-sm text-muted-foreground">Total Hours</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-accent">
              {completedTasks.reduce((acc, task) => acc + task.photos, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Photos Uploaded</div>
          </CardContent>
        </Card>
      </div>

      {/* Completed Tasks List */}
      <div className="grid gap-6">
        {completedTasks.map((task) => (
          <Card key={task.id} className="border-success/30 bg-success/5">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-lg">{task.title}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-success/20 text-success border-success/30">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Completed
                    </Badge>
                    <Badge variant="secondary">
                      {task.category}
                    </Badge>
                  </div>
                </div>
                <div className="text-right text-sm">
                  <p className="text-muted-foreground">Completed</p>
                  <p className="font-medium">{task.completedAt}</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{task.description}</p>
              
              {/* Task Details */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>{task.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-secondary" />
                  <span>Time: {task.timeSpent}h</span>
                </div>
              </div>

              {/* Rating and Photos */}
              <div className="flex items-center justify-between p-3 bg-card border rounded-lg">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Rating:</span>
                    <div className="flex gap-1">
                      {getRatingStars(task.rating)}
                    </div>
                  </div>
                  {task.feedback && (
                    <p className="text-sm text-muted-foreground italic">"{task.feedback}"</p>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Camera className="w-4 h-4 mr-2" />
                    {task.photos} Photos
                  </Button>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Download Report Button */}
      <div className="text-center pt-6">
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Download Work Report
        </Button>
      </div>
    </div>
  );
};

export default CompletedTasks;