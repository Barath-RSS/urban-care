import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Calendar, MapPin, Eye } from "lucide-react";

const MyReports = () => {
  const reports = [
    {
      id: "CR2024-001",
      title: "Broken sidewalk near school",
      category: "Road & Infrastructure",
      status: "in-progress",
      priority: "high",
      location: "Main St & 3rd Ave",
      submittedDate: "2024-01-15",
      lastUpdate: "2024-01-18",
      description: "Large crack in sidewalk creating trip hazard",
      timeline: [
        { date: "2024-01-15", status: "Submitted", message: "Report received and logged" },
        { date: "2024-01-16", status: "Acknowledged", message: "Assigned to Roads Department" },
        { date: "2024-01-18", status: "In Progress", message: "Work crew scheduled for next week" }
      ]
    },
    {
      id: "CR2024-002",
      title: "Streetlight outage",
      category: "Streetlight",
      status: "resolved",
      priority: "medium",
      location: "Park Ave & Oak St",
      submittedDate: "2024-01-10",
      lastUpdate: "2024-01-14",
      description: "Multiple streetlights not working",
      timeline: [
        { date: "2024-01-10", status: "Submitted", message: "Report received and logged" },
        { date: "2024-01-11", status: "Acknowledged", message: "Assigned to Electrical Department" },
        { date: "2024-01-12", status: "In Progress", message: "Technician dispatched" },
        { date: "2024-01-14", status: "Resolved", message: "All streetlights repaired and tested" }
      ]
    },
    {
      id: "CR2024-003",
      title: "Overflowing garbage bin",
      category: "Sanitation & Waste",
      status: "new",
      priority: "low",
      location: "Central Park Entrance",
      submittedDate: "2024-01-20",
      lastUpdate: "2024-01-20",
      description: "Garbage bin needs regular emptying",
      timeline: [
        { date: "2024-01-20", status: "Submitted", message: "Report received and logged" }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new": return "status-new";
      case "in-progress": return "status-progress";
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "new": return "🆕";
      case "in-progress": return "⚠️";
      case "resolved": return "✅";
      default: return "📝";
    }
  };

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <Card className="civic-card">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            My Reports
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Reports Timeline */}
      <div className="space-y-4">
        {reports.map((report) => (
          <Card key={report.id} className="civic-card">
            <CardContent className="p-4">
              <div className="space-y-4">
                {/* Report Header */}
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-primary">{report.title}</h3>
                      <span className="text-sm text-muted-foreground">#{report.id}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      {report.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      Submitted {report.submittedDate}
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>

                {/* Status and Priority */}
                <div className="flex gap-2">
                  <Badge className={getStatusColor(report.status)}>
                    {getStatusIcon(report.status)} {report.status.replace('-', ' ').toUpperCase()}
                  </Badge>
                  <Badge className={getPriorityColor(report.priority)}>
                    {report.priority.toUpperCase()}
                  </Badge>
                  <Badge variant="outline">{report.category}</Badge>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground">{report.description}</p>

                {/* Timeline */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Progress Timeline</h4>
                  <div className="space-y-2">
                    {report.timeline.map((event, index) => (
                      <div key={index} className="flex gap-3">
                        <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                          index === report.timeline.length - 1 ? "bg-primary" : "bg-muted"
                        }`} />
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{event.status}</span>
                            <span className="text-xs text-muted-foreground">{event.date}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">{event.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Stats */}
      <Card className="civic-card">
        <CardContent className="p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">3</div>
              <div className="text-xs text-muted-foreground">Total Reports</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-warning">1</div>
              <div className="text-xs text-muted-foreground">In Progress</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-success">1</div>
              <div className="text-xs text-muted-foreground">Resolved</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MyReports;