import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Filter, Eye, ThumbsUp } from "lucide-react";

const IssueMap = () => {
  const [selectedIssue, setSelectedIssue] = useState<number | null>(null);

  // Mock data for map pins
  const issues = [
    {
      id: 1,
      category: "Road & Infrastructure",
      title: "Pothole on Main Street",
      status: "new",
      priority: "high",
      location: "Main St & 2nd Ave",
      description: "Large pothole causing traffic issues",
      upvotes: 12,
      image: "🛣️"
    },
    {
      id: 2,
      category: "Streetlight",
      title: "Broken streetlight",
      status: "progress",
      priority: "medium",
      location: "Park Ave & Oak St",
      description: "Streetlight not working for 3 days",
      upvotes: 8,
      image: "💡"
    },
    {
      id: 3,
      category: "Sanitation & Waste",
      title: "Overflowing garbage bin",
      status: "resolved",
      priority: "low",
      location: "City Park Entrance",
      description: "Garbage bin needs emptying",
      upvotes: 5,
      image: "🗑️"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new": return "status-new";
      case "progress": return "status-progress";
      case "resolved": return "status-resolved";
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

  return (
    <div className="p-4 space-y-4">
      {/* Map Header */}
      <Card className="civic-card">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Community Issues Map
            </CardTitle>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Map Container (Simulated) */}
      <Card className="civic-card">
        <CardContent className="p-0">
          <div className="relative h-64 bg-gradient-to-br from-primary-light to-secondary-light rounded-lg overflow-hidden">
            {/* Simulated Map Background */}
            <div className="absolute inset-0 opacity-20">
              <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10"></div>
            </div>
            
            {/* Map Pins */}
            {issues.map((issue, index) => (
              <div
                key={issue.id}
                className={`absolute cursor-pointer transform transition-all duration-200 hover:scale-110 ${
                  selectedIssue === issue.id ? "scale-125 z-10" : ""
                }`}
                style={{
                  left: `${20 + index * 25}%`,
                  top: `${30 + index * 15}%`,
                }}
                onClick={() => setSelectedIssue(selectedIssue === issue.id ? null : issue.id)}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold shadow-lg ${
                  issue.priority === "high" ? "bg-red-500" :
                  issue.priority === "medium" ? "bg-yellow-500" : "bg-green-500"
                }`}>
                  {issue.id}
                </div>
              </div>
            ))}

            {/* Map Legend */}
            <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 space-y-2">
              <div className="text-xs font-medium">Priority Levels</div>
              <div className="flex gap-2">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-xs">High</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-xs">Medium</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-xs">Low</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Issue Details */}
      {selectedIssue && (
        <Card className="civic-card border-primary/20 animate-in slide-in-from-bottom">
          {(() => {
            const issue = issues.find(i => i.id === selectedIssue);
            if (!issue) return null;
            
            return (
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h3 className="font-semibold text-primary">{issue.title}</h3>
                      <p className="text-sm text-muted-foreground">{issue.location}</p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setSelectedIssue(null)}>
                      ✕
                    </Button>
                  </div>
                  
                  <div className="flex gap-2">
                    <Badge className={getStatusColor(issue.status)}>
                      {issue.status.toUpperCase()}
                    </Badge>
                    <Badge className={getPriorityColor(issue.priority)}>
                      {issue.priority.toUpperCase()}
                    </Badge>
                  </div>

                  <p className="text-sm">{issue.description}</p>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-4">
                      <Button variant="outline" size="sm">
                        <ThumbsUp className="w-4 h-4 mr-1" />
                        {issue.upvotes}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            );
          })()}
        </Card>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="civic-card text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">24</div>
            <div className="text-xs text-muted-foreground">Active Issues</div>
          </CardContent>
        </Card>
        <Card className="civic-card text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-secondary">8</div>
            <div className="text-xs text-muted-foreground">In Progress</div>
          </CardContent>
        </Card>
        <Card className="civic-card text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-success">142</div>
            <div className="text-xs text-muted-foreground">Resolved</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IssueMap;