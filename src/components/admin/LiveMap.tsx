import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Filter, Layers, Users } from "lucide-react";

const LiveMap = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedIssue, setSelectedIssue] = useState<number | null>(null);

  const mapIssues = [
    {
      id: 1,
      title: "Pothole on Main Street",
      category: "Road & Infrastructure",
      priority: "high",
      status: "new",
      location: "Main St & 2nd Ave",
      assignedTo: null,
      description: "Large pothole causing traffic issues",
      coordinates: { x: 25, y: 35 }
    },
    {
      id: 2,
      title: "Broken streetlight",
      category: "Streetlight",
      priority: "medium",
      status: "assigned",
      location: "Park Ave & Oak St",
      assignedTo: "Electrical Dept",
      description: "Streetlight not working for 3 days",
      coordinates: { x: 45, y: 55 }
    },
    {
      id: 3,
      title: "Water main leak",
      category: "Water Supply",
      priority: "high",
      status: "in-progress",
      location: "Downtown Plaza",
      assignedTo: "Water Dept",
      description: "Water leak affecting multiple buildings",
      coordinates: { x: 65, y: 25 }
    },
    {
      id: 4,
      title: "Graffiti removal needed",
      category: "Public Safety",
      priority: "low",
      status: "new",
      location: "City Park Wall",
      assignedTo: null,
      description: "Offensive graffiti on public wall",
      coordinates: { x: 75, y: 65 }
    }
  ];

  const departments = [
    "Roads Department",
    "Electrical Department", 
    "Water Department",
    "Sanitation Department",
    "Parks & Recreation"
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new": return "bg-red-500";
      case "assigned": return "bg-yellow-500";
      case "in-progress": return "bg-blue-500";
      case "resolved": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high": return "🔴";
      case "medium": return "🟡";
      case "low": return "🟢";
      default: return "⚪";
    }
  };

  const filteredIssues = selectedFilter === "all" 
    ? mapIssues 
    : mapIssues.filter(issue => issue.status === selectedFilter);

  return (
    <div className="space-y-6">
      {/* Map Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary">Live Issues Map</h1>
          <p className="text-muted-foreground">Real-time view of all reported issues</p>
        </div>
        
        <div className="flex gap-2">
          <Select value={selectedFilter} onValueChange={setSelectedFilter}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Issues</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="assigned">Assigned</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline">
            <Layers className="w-4 h-4 mr-2" />
            Heatmap
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Map Container */}
        <div className="xl:col-span-2">
          <Card className="civic-card">
            <CardContent className="p-0">
              <div className="relative h-96 bg-gradient-to-br from-primary-light to-secondary-light rounded-lg overflow-hidden">
                {/* Map Background */}
                <div className="absolute inset-0 opacity-20">
                  <div className="w-full h-full" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-opacity='0.1'%3E%3Cpath d='m0 40 40-40h-40z'/%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '40px 40px'
                  }} />
                </div>

                {/* Issue Pins */}
                {filteredIssues.map((issue) => (
                  <div
                    key={issue.id}
                    className={`absolute cursor-pointer transform transition-all duration-200 hover:scale-110 ${
                      selectedIssue === issue.id ? "scale-125 z-10" : ""
                    }`}
                    style={{
                      left: `${issue.coordinates.x}%`,
                      top: `${issue.coordinates.y}%`,
                    }}
                    onClick={() => setSelectedIssue(selectedIssue === issue.id ? null : issue.id)}
                  >
                    <div className={`w-8 h-8 ${getStatusColor(issue.status)} rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg border-2 border-white`}>
                      {issue.id}
                    </div>
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs">
                      {getPriorityIcon(issue.priority)}
                    </div>
                  </div>
                ))}

                {/* Map Legend */}
                <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 space-y-2">
                  <div className="text-xs font-medium">Status Legend</div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-xs">New</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-xs">Assigned</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-xs">In Progress</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-xs">Resolved</span>
                    </div>
                  </div>
                </div>

                {/* Stats Overlay */}
                <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-3">
                  <div className="text-sm font-medium">Active Issues: {filteredIssues.length}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Issue Details Panel */}
        <div className="space-y-4">
          {selectedIssue ? (
            (() => {
              const issue = mapIssues.find(i => i.id === selectedIssue);
              if (!issue) return null;
              
              return (
                <Card className="civic-card border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Issue #{issue.id}</span>
                      <Button variant="ghost" size="sm" onClick={() => setSelectedIssue(null)}>
                        ✕
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-primary">{issue.title}</h3>
                      <p className="text-sm text-muted-foreground">{issue.location}</p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Badge className={issue.status === "new" ? "status-new" : 
                                     issue.status === "assigned" ? "status-progress" :
                                     issue.status === "in-progress" ? "status-progress" : "status-resolved"}>
                        {issue.status.toUpperCase()}
                      </Badge>
                      <Badge variant="outline">{issue.priority.toUpperCase()}</Badge>
                    </div>

                    <p className="text-sm">{issue.description}</p>

                    {issue.assignedTo ? (
                      <div className="p-3 bg-muted rounded-lg">
                        <div className="text-sm font-medium">Assigned to:</div>
                        <div className="text-sm text-muted-foreground">{issue.assignedTo}</div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="text-sm font-medium">Assign Department:</div>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent>
                            {departments.map((dept) => (
                              <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button className="w-full" size="sm">Assign Issue</Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })()
          ) : (
            <Card className="civic-card">
              <CardContent className="p-6 text-center">
                <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Click on a map pin to view issue details</p>
              </CardContent>
            </Card>
          )}

          {/* Quick Stats */}
          <Card className="civic-card">
            <CardHeader>
              <CardTitle className="text-lg">Issue Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">New Issues</span>
                <Badge className="status-new">{mapIssues.filter(i => i.status === "new").length}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">In Progress</span>
                <Badge className="status-progress">{mapIssues.filter(i => i.status === "in-progress").length}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">High Priority</span>
                <Badge variant="destructive">{mapIssues.filter(i => i.priority === "high").length}</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LiveMap;