import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, User, Settings, Phone, Mail, AlertTriangle, CheckCircle, Clock, Star } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const WorkerAssignment = () => {
  const [selectedWorker, setSelectedWorker] = useState("");
  const [priority, setPriority] = useState("");
  const [deadline, setDeadline] = useState<Date>();
  const [notes, setNotes] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");

  const workers = [
    {
      id: 1,
      name: "Rajesh Kumar",
      department: "Roads & Infrastructure",
      designation: "Senior Engineer",
      phone: "+91 98765 43210",
      email: "rajesh.kumar@municipal.gov.in",
      currentTasks: 3,
      rating: 4.8,
      status: "available",
      expertise: ["Road Repair", "Bridge Maintenance", "Traffic Systems"]
    },
    {
      id: 2,
      name: "Priya Sharma",
      department: "Water Department",
      designation: "Water Systems Specialist",
      phone: "+91 87654 32109",
      email: "priya.sharma@municipal.gov.in",
      currentTasks: 2,
      rating: 4.9,
      status: "busy",
      expertise: ["Water Supply", "Sewage Systems", "Pipeline Repair"]
    },
    {
      id: 3,
      name: "Amit Singh",
      department: "Electrical Department",
      designation: "Electrical Technician",
      phone: "+91 76543 21098",
      email: "amit.singh@municipal.gov.in",
      currentTasks: 1,
      rating: 4.7,
      status: "available",
      expertise: ["Street Lighting", "Power Lines", "Electrical Maintenance"]
    },
    {
      id: 4,
      name: "Sunita Devi",
      department: "Sanitation Department",
      designation: "Sanitation Supervisor",
      phone: "+91 65432 10987",
      email: "sunita.devi@municipal.gov.in",
      currentTasks: 4,
      rating: 4.6,
      status: "available",
      expertise: ["Waste Management", "Cleaning Operations", "Public Hygiene"]
    }
  ];

  const filteredWorkers = workers.filter(worker => 
    filterDepartment === "all" || worker.department === filterDepartment
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available": return "bg-green-100 text-green-800";
      case "busy": return "bg-yellow-100 text-yellow-800";
      case "unavailable": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "bg-red-100 text-red-800 border-red-200";
      case "high": return "bg-orange-100 text-orange-800 border-orange-200";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleAssignTask = () => {
    if (!selectedWorker || !priority) {
      toast({
        title: "Assignment Failed",
        description: "Please select a worker and set priority",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Task Assigned Successfully",
      description: `Task has been assigned with ${priority} priority`,
    });

    // Reset form
    setSelectedWorker("");
    setPriority("");
    setDeadline(undefined);
    setNotes("");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary">Worker Assignment</h1>
          <p className="text-muted-foreground">Assign tasks to field workers and set priorities</p>
        </div>
        
        <div className="flex gap-2">
          <Select value={filterDepartment} onValueChange={setFilterDepartment}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="Roads & Infrastructure">Roads & Infrastructure</SelectItem>
              <SelectItem value="Water Department">Water Department</SelectItem>
              <SelectItem value="Electrical Department">Electrical Department</SelectItem>
              <SelectItem value="Sanitation Department">Sanitation Department</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Quick Assignment Panel */}
      <Card className="civic-card-enhanced">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" />
            Quick Assignment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Select Worker</Label>
              <Select value={selectedWorker} onValueChange={setSelectedWorker}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose worker" />
                </SelectTrigger>
                <SelectContent>
                  {filteredWorkers.map((worker) => (
                    <SelectItem key={worker.id} value={worker.id.toString()}>
                      {worker.name} - {worker.department}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Priority Level</Label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger>
                  <SelectValue placeholder="Set priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Deadline</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !deadline && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {deadline ? format(deadline, "PPP") : "Pick deadline"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={deadline}
                    onSelect={setDeadline}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex items-end">
              <Button onClick={handleAssignTask} className="w-full">
                Assign Task
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Additional Notes</Label>
            <Textarea
              placeholder="Add any special instructions or notes for the worker..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[80px]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Workers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorkers.map((worker) => (
          <Card key={worker.id} className="civic-card-enhanced hover:shadow-strong transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{worker.name}</h3>
                    <p className="text-sm text-muted-foreground">{worker.designation}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(worker.status)}>
                  {worker.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Badge variant="outline" className="text-xs">
                  {worker.department}
                </Badge>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Current Tasks:</span>
                  <span className="font-medium">{worker.currentTasks}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Rating:</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{worker.rating}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium text-foreground">Expertise:</h4>
                <div className="flex flex-wrap gap-1">
                  {worker.expertise.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-border">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Phone className="w-3 h-3" />
                  <span>{worker.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Mail className="w-3 h-3" />
                  <span>{worker.email}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-3">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="flex-1">
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <User className="w-5 h-5" />
                        {worker.name}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Department:</span>
                          <p className="font-medium">{worker.department}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Designation:</span>
                          <p className="font-medium">{worker.designation}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Current Tasks:</span>
                          <p className="font-medium">{worker.currentTasks}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Rating:</span>
                          <p className="font-medium flex items-center gap-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            {worker.rating}
                          </p>
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground text-sm">Contact:</span>
                        <div className="space-y-1 mt-1">
                          <p className="text-sm">{worker.phone}</p>
                          <p className="text-sm">{worker.email}</p>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Button 
                  size="sm" 
                  className="flex-1"
                  disabled={worker.status === "unavailable"}
                  onClick={() => {
                    setSelectedWorker(worker.id.toString());
                    toast({
                      title: "Worker Selected",
                      description: `${worker.name} selected for assignment`,
                    });
                  }}
                >
                  {worker.status === "available" ? "Assign" : "Busy"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Priority Level Guide */}
      <Card className="civic-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-primary" />
            Priority Level Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Badge className={getPriorityColor("critical")}>Critical</Badge>
              <p className="text-sm text-muted-foreground">
                Immediate safety risks, major infrastructure failures
              </p>
              <p className="text-xs text-muted-foreground">
                Response: Within 1 hour
              </p>
            </div>
            <div className="space-y-2">
              <Badge className={getPriorityColor("high")}>High</Badge>
              <p className="text-sm text-muted-foreground">
                Significant impact on public services or large population
              </p>
              <p className="text-xs text-muted-foreground">
                Response: Within 4 hours
              </p>
            </div>
            <div className="space-y-2">
              <Badge className={getPriorityColor("medium")}>Medium</Badge>
              <p className="text-sm text-muted-foreground">
                Moderate impact, affecting local area or small group
              </p>
              <p className="text-xs text-muted-foreground">
                Response: Within 24 hours
              </p>
            </div>
            <div className="space-y-2">
              <Badge className={getPriorityColor("low")}>Low</Badge>
              <p className="text-sm text-muted-foreground">
                Minor issues, aesthetic problems, non-urgent maintenance
              </p>
              <p className="text-xs text-muted-foreground">
                Response: Within 1 week
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkerAssignment;