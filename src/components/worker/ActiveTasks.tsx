import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  MapPin, 
  Calendar,
  Camera,
  CheckCircle,
  PlayCircle,
  Pause
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const ActiveTasks = () => {
  const [activeTasks] = useState([
    {
      id: 3,
      title: "Garbage Collection Issue",
      description: "Clear accumulated waste at Community Center",
      category: "Sanitation & Waste",
      priority: "high",
      status: "in-progress",
      startedAt: "2024-01-17 09:30",
      deadline: "2024-01-18",
      location: "Community Center, Zone 3",
      estimatedHours: 3,
      timeSpent: 1.5,
      progress: 50
    }
  ]);

  const handlePauseTask = (id: number) => {
    toast({
      title: "Task Paused",
      description: "Work timer paused for this task",
    });
  };

  const handleResumeTask = (id: number) => {
    toast({
      title: "Task Resumed",
      description: "Work timer resumed for this task",
    });
  };

  const handleCompleteTask = (id: number) => {
    toast({
      title: "Task Completed",
      description: "Please upload completion photos to finish",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Active Tasks</h1>
        <p className="text-muted-foreground">Currently in-progress work assignments</p>
      </div>

      {activeTasks.length === 0 ? (
        <Card className="p-8 text-center">
          <div className="space-y-4">
            <Clock className="w-12 h-12 text-muted-foreground mx-auto" />
            <div>
              <h3 className="text-lg font-medium">No Active Tasks</h3>
              <p className="text-muted-foreground">You don't have any tasks in progress</p>
            </div>
          </div>
        </Card>
      ) : (
        <div className="grid gap-6">
          {activeTasks.map((task) => (
            <Card key={task.id} className="border-primary/30 bg-primary/5">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-lg">{task.title}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-destructive text-destructive-foreground">
                        {task.priority} Priority
                      </Badge>
                      <Badge variant="outline" className="bg-secondary/20 text-secondary border-secondary/30">
                        In Progress
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right text-sm">
                    <p className="text-muted-foreground">Started</p>
                    <p className="font-medium">{task.startedAt}</p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{task.description}</p>
                
                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{task.progress}% Complete</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary rounded-full h-2 transition-all duration-300" 
                      style={{ width: `${task.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Task Details */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{task.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-secondary" />
                    <span>Due: {task.deadline}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>Time Spent: {task.timeSpent}h</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <PlayCircle className="w-4 h-4 text-muted-foreground" />
                    <span>Est. {task.estimatedHours}h total</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => handlePauseTask(task.id)}
                    className="flex-1"
                  >
                    <Pause className="w-4 h-4 mr-2" />
                    Pause Work
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="flex-1"
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Add Progress Photo
                  </Button>
                  
                  <Button 
                    onClick={() => handleCompleteTask(task.id)}
                    className="flex-1"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Complete Task
                  </Button>
                </div>

                {/* Time Tracking */}
                <div className="flex items-center justify-between p-3 bg-card border rounded-lg">
                  <div className="text-sm">
                    <p className="text-muted-foreground">Work Timer</p>
                    <p className="font-bold text-lg">
                      {Math.floor(task.timeSpent)}h {Math.round((task.timeSpent % 1) * 60)}m
                    </p>
                  </div>
                  <Button variant="secondary" size="sm">
                    <PlayCircle className="w-4 h-4 mr-2" />
                    Resume
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActiveTasks;