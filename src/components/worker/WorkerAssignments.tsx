import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  Clock, 
  MapPin, 
  Calendar,
  User,
  AlertCircle,
  Camera
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const WorkerAssignments = () => {
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "Road Pothole Repair",
      description: "Fix multiple potholes on MG Road near City Mall",
      category: "Road & Infrastructure",
      priority: "high",
      status: "pending",
      assignedBy: "Municipal Engineer",
      deadline: "2024-01-20",
      location: "MG Road, Sector 14",
      estimatedHours: 4
    },
    {
      id: 2,
      title: "Streetlight Maintenance", 
      description: "Replace broken streetlights on Park Avenue",
      category: "Electrical",
      priority: "medium",
      status: "pending",
      assignedBy: "Electrical Supervisor",
      deadline: "2024-01-22",
      location: "Park Avenue, Block A",
      estimatedHours: 2
    },
    {
      id: 3,
      title: "Garbage Collection Issue",
      description: "Clear accumulated waste at Community Center",
      category: "Sanitation & Waste",
      priority: "high",
      status: "accepted",
      assignedBy: "Sanitation Officer",
      deadline: "2024-01-18",
      location: "Community Center, Zone 3",
      estimatedHours: 3
    }
  ]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-warning/20 text-warning border-warning/30';
      case 'accepted': return 'bg-primary/20 text-primary border-primary/30';
      case 'in-progress': return 'bg-secondary/20 text-secondary border-secondary/30';
      case 'completed': return 'bg-success/20 text-success border-success/30';
      default: return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  const handleAcceptAssignment = (id: number) => {
    setAssignments(prev => 
      prev.map(assignment => 
        assignment.id === id 
          ? { ...assignment, status: 'accepted' }
          : assignment
      )
    );
    toast({
      title: "Assignment Accepted",
      description: "You have accepted this work assignment",
    });
  };

  const handleStartWork = (id: number) => {
    setAssignments(prev => 
      prev.map(assignment => 
        assignment.id === id 
          ? { ...assignment, status: 'in-progress' }
          : assignment
      )
    );
    toast({
      title: "Work Started",
      description: "Assignment marked as in progress",
    });
  };

  const handleCompleteWork = (id: number) => {
    setAssignments(prev => 
      prev.map(assignment => 
        assignment.id === id 
          ? { ...assignment, status: 'completed' }
          : assignment
      )
    );
    toast({
      title: "Work Completed",
      description: "Don't forget to upload completion photos",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Work Assignments</h1>
          <p className="text-muted-foreground">Manage your assigned tasks and deadlines</p>
        </div>
        <Badge variant="outline" className="px-3 py-1">
          {assignments.filter(a => a.status === 'pending').length} New Assignments
        </Badge>
      </div>

      {/* Assignments Grid */}
      <div className="grid gap-6">
        {assignments.map((assignment) => (
          <Card key={assignment.id} className="hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-lg">{assignment.title}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge className={getPriorityColor(assignment.priority)}>
                      {assignment.priority} Priority
                    </Badge>
                    <Badge variant="outline" className={getStatusColor(assignment.status)}>
                      {assignment.status.replace('-', ' ')}
                    </Badge>
                  </div>
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  <p>Assigned by</p>
                  <p className="font-medium">{assignment.assignedBy}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{assignment.description}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>{assignment.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-secondary" />
                  <span>Due: {assignment.deadline}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span>Est. {assignment.estimatedHours} hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span>{assignment.category}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4">
                {assignment.status === 'pending' && (
                  <Button 
                    onClick={() => handleAcceptAssignment(assignment.id)}
                    className="flex-1"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Accept Assignment
                  </Button>
                )}
                
                {assignment.status === 'accepted' && (
                  <Button 
                    onClick={() => handleStartWork(assignment.id)}
                    variant="secondary"
                    className="flex-1"
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    Start Work
                  </Button>
                )}
                
                {assignment.status === 'in-progress' && (
                  <>
                    <Button 
                      onClick={() => handleCompleteWork(assignment.id)}
                      variant="default"
                      className="flex-1"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Mark Complete
                    </Button>
                    <Button variant="outline" size="sm">
                      <Camera className="w-4 h-4 mr-2" />
                      Add Photo
                    </Button>
                  </>
                )}
                
                {assignment.status === 'completed' && (
                  <div className="flex-1 flex items-center justify-center gap-2 text-success">
                    <CheckCircle className="w-4 h-4" />
                    <span className="font-medium">Task Completed</span>
                  </div>
                )}
              </div>

              {/* Deadline Warning */}
              {new Date(assignment.deadline) <= new Date(Date.now() + 86400000) && assignment.status !== 'completed' && (
                <div className="flex items-center gap-2 p-3 bg-warning/10 border border-warning/30 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-warning" />
                  <span className="text-sm text-warning">Deadline approaching</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WorkerAssignments;