import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Clock, Users, AlertTriangle, CheckCircle, Calendar } from "lucide-react";

const DepartmentAssignments = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("roads");

  const departments = [
    {
      id: "roads",
      name: "Roads Department",
      capacity: 75,
      activeIssues: 6,
      avgResolutionTime: "4.2 days",
      onTimeRate: 85,
      staff: 8
    },
    {
      id: "electrical",
      name: "Electrical Department", 
      capacity: 45,
      activeIssues: 3,
      avgResolutionTime: "2.1 days",
      onTimeRate: 92,
      staff: 5
    },
    {
      id: "water",
      name: "Water Department",
      capacity: 60,
      activeIssues: 4,
      avgResolutionTime: "3.5 days",
      onTimeRate: 78,
      staff: 6
    },
    {
      id: "sanitation",
      name: "Sanitation Department",
      capacity: 30,
      activeIssues: 2,
      avgResolutionTime: "1.8 days",
      onTimeRate: 95,
      staff: 4
    },
    {
      id: "parks",
      name: "Parks & Recreation",
      capacity: 40,
      activeIssues: 3,
      avgResolutionTime: "5.1 days",
      onTimeRate: 72,
      staff: 3
    }
  ];

  const issuesByDepartment = {
    roads: [
      {
        id: "CR2024-001",
        title: "Pothole on Main Street",
        priority: "high",
        assignedTo: "Mike Johnson",
        dueDate: "2024-01-25",
        status: "in-progress",
        daysOverdue: 0
      },
      {
        id: "CR2024-007",
        title: "Sidewalk crack repair",
        priority: "medium",
        assignedTo: "Sarah Smith",
        dueDate: "2024-01-28",
        status: "assigned",
        daysOverdue: 0
      },
      {
        id: "CR2024-012",
        title: "Road sign replacement",
        priority: "low",
        assignedTo: "Tom Wilson",
        dueDate: "2024-01-22",
        status: "overdue",
        daysOverdue: 2
      }
    ],
    electrical: [
      {
        id: "CR2024-002",
        title: "Broken streetlight",
        priority: "medium",
        assignedTo: "Lisa Garcia",
        dueDate: "2024-01-26",
        status: "in-progress",
        daysOverdue: 0
      },
      {
        id: "CR2024-009",
        title: "Traffic light malfunction",
        priority: "high",
        assignedTo: "David Brown",
        dueDate: "2024-01-24",
        status: "assigned",
        daysOverdue: 0
      }
    ],
    water: [
      {
        id: "CR2024-003",
        title: "Water main leak",
        priority: "high",
        assignedTo: "Maria Lopez",
        dueDate: "2024-01-23",
        status: "in-progress",
        daysOverdue: 0
      },
      {
        id: "CR2024-011",
        title: "Low water pressure",
        priority: "medium",
        assignedTo: "James Davis",
        dueDate: "2024-01-27",
        status: "assigned",
        daysOverdue: 0
      }
    ],
    sanitation: [
      {
        id: "CR2024-004",
        title: "Overflowing garbage bin",
        priority: "medium",
        assignedTo: "Robert Taylor",
        dueDate: "2024-01-26",
        status: "assigned",
        daysOverdue: 0
      }
    ],
    parks: [
      {
        id: "CR2024-005",
        title: "Damaged park bench",
        priority: "low",
        assignedTo: "Emily Chen",
        dueDate: "2024-01-30",
        status: "assigned",
        daysOverdue: 0
      },
      {
        id: "CR2024-008",
        title: "Playground equipment repair",
        priority: "medium",
        assignedTo: "Alex Rodriguez",
        dueDate: "2024-01-29",
        status: "in-progress",
        daysOverdue: 0
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "assigned": return "status-new";
      case "in-progress": return "status-progress";
      case "overdue": return "bg-red-100 text-red-800";
      default: return "status-new";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCapacityColor = (capacity: number) => {
    if (capacity >= 80) return "text-red-600";
    if (capacity >= 60) return "text-yellow-600";
    return "text-green-600";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-primary">Department Assignments</h1>
        <p className="text-muted-foreground">Manage workload distribution across municipal departments</p>
      </div>

      {/* Department Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {departments.map((dept) => (
          <Card key={dept.id} className={`civic-card cursor-pointer transition-all duration-200 ${
            selectedDepartment === dept.id ? "border-primary/30 bg-primary/5" : "hover:bg-muted/30"
          }`} onClick={() => setSelectedDepartment(dept.id)}>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-primary">{dept.name}</h3>
                  <Badge variant="outline">{dept.activeIssues} active</Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Capacity</span>
                    <span className={`font-medium ${getCapacityColor(dept.capacity)}`}>
                      {dept.capacity}%
                    </span>
                  </div>
                  <Progress value={dept.capacity} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-4 text-center text-sm">
                  <div>
                    <div className="font-medium text-primary">{dept.avgResolutionTime}</div>
                    <div className="text-xs text-muted-foreground">Avg Resolution</div>
                  </div>
                  <div>
                    <div className="font-medium text-secondary">{dept.onTimeRate}%</div>
                    <div className="text-xs text-muted-foreground">On Time</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>{dept.staff} staff members</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Department Details */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Issues List */}
        <div className="xl:col-span-2">
          <Card className="civic-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-primary" />
                {departments.find(d => d.id === selectedDepartment)?.name} - Active Issues
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {(issuesByDepartment[selectedDepartment as keyof typeof issuesByDepartment] || []).map((issue) => (
                <div key={issue.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">#{issue.id}</span>
                      <Badge className={getPriorityColor(issue.priority)}>
                        {issue.priority}
                      </Badge>
                      {issue.daysOverdue > 0 && (
                        <Badge className="bg-red-100 text-red-800">
                          {issue.daysOverdue}d overdue
                        </Badge>
                      )}
                    </div>
                    <h4 className="font-medium">{issue.title}</h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {issue.assignedTo}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Due: {issue.dueDate}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(issue.status)}>
                      {issue.status.replace('-', ' ').toUpperCase()}
                    </Badge>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Department Stats */}
        <div className="space-y-4">
          <Card className="civic-card">
            <CardHeader>
              <CardTitle className="text-lg">Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Active Issues</span>
                  <span className="font-bold text-primary">
                    {departments.find(d => d.id === selectedDepartment)?.activeIssues}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Staff Capacity</span>
                  <span className={`font-bold ${getCapacityColor(departments.find(d => d.id === selectedDepartment)?.capacity || 0)}`}>
                    {departments.find(d => d.id === selectedDepartment)?.capacity}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Avg Resolution</span>
                  <span className="font-bold text-secondary">
                    {departments.find(d => d.id === selectedDepartment)?.avgResolutionTime}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">On-Time Rate</span>
                  <span className="font-bold text-success">
                    {departments.find(d => d.id === selectedDepartment)?.onTimeRate}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="civic-card">
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" variant="outline">
                <Users className="w-4 h-4 mr-2" />
                Reassign Issues
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Clock className="w-4 h-4 mr-2" />
                Extend Deadlines
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <CheckCircle className="w-4 h-4 mr-2" />
                Bulk Complete
              </Button>
            </CardContent>
          </Card>

          <Card className="civic-card">
            <CardHeader>
              <CardTitle className="text-lg">SLA Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Within SLA</span>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium">85%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">At Risk</span>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm font-medium">12%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Overdue</span>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm font-medium">3%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DepartmentAssignments;