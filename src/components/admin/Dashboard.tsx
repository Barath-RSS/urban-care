import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, Clock, MapPin, Users, AlertTriangle } from "lucide-react";

const Dashboard = () => {
  const kpis = [
    {
      title: "Total Open Reports",
      value: "24",
      change: "+3 from yesterday",
      trend: "up",
      icon: AlertTriangle
    },
    {
      title: "Average Resolution Time",
      value: "3.2 days",
      change: "-0.5 days improvement",
      trend: "down",
      icon: Clock
    },
    {
      title: "Department Load",
      value: "8 departments",
      change: "Roads: 45% capacity",
      trend: "neutral",
      icon: Users
    },
    {
      title: "Hotspot Areas",
      value: "Downtown",
      change: "12 reports this week",
      trend: "up",
      icon: MapPin
    }
  ];

  const recentReports = [
    {
      id: "CR2024-015",
      category: "Road & Infrastructure",
      priority: "high",
      location: "Main St & 2nd Ave",
      timeAgo: "2 min ago",
      status: "new"
    },
    {
      id: "CR2024-014",
      category: "Streetlight",
      priority: "medium",
      location: "Park Ave & Oak St",
      timeAgo: "15 min ago",
      status: "assigned"
    },
    {
      id: "CR2024-013",
      category: "Sanitation",
      priority: "low",
      location: "Central Park",
      timeAgo: "1 hour ago",
      status: "new"
    }
  ];

  const categoryStats = [
    { category: "Road & Infrastructure", count: 8, percentage: 33 },
    { category: "Streetlight", count: 6, percentage: 25 },
    { category: "Sanitation", count: 4, percentage: 17 },
    { category: "Water Supply", count: 3, percentage: 13 },
    { category: "Public Safety", count: 2, percentage: 8 },
    { category: "Other", count: 1, percentage: 4 }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new": return "status-new";
      case "assigned": return "status-progress";
      case "resolved": return "status-resolved";
      default: return "status-new";
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-primary">Dashboard Overview</h1>
        <p className="text-muted-foreground">Municipal issue reporting system analytics</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, index) => (
          <Card key={index} className="civic-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">{kpi.title}</p>
                  <p className="text-2xl font-bold text-primary">{kpi.value}</p>
                  <p className="text-xs text-muted-foreground">{kpi.change}</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <kpi.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Reports */}
        <Card className="civic-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              Recent Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReports.map((report) => (
                <div key={report.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">#{report.id}</span>
                      <Badge className={getPriorityColor(report.priority)}>
                        {report.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{report.category}</p>
                    <p className="text-xs text-muted-foreground">{report.location}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <Badge className={getStatusColor(report.status)}>
                      {report.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground">{report.timeAgo}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card className="civic-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Issue Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryStats.map((stat, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{stat.category}</span>
                    <span className="text-muted-foreground">{stat.count} reports</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${stat.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="civic-card">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-primary/5 rounded-lg cursor-pointer hover:bg-primary/10 transition-colors">
              <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium">View Map</p>
            </div>
            <div className="text-center p-4 bg-secondary/5 rounded-lg cursor-pointer hover:bg-secondary/10 transition-colors">
              <Users className="w-8 h-8 text-secondary mx-auto mb-2" />
              <p className="text-sm font-medium">Assign Bulk</p>
            </div>
            <div className="text-center p-4 bg-warning/5 rounded-lg cursor-pointer hover:bg-warning/10 transition-colors">
              <AlertTriangle className="w-8 h-8 text-warning mx-auto mb-2" />
              <p className="text-sm font-medium">High Priority</p>
            </div>
            <div className="text-center p-4 bg-success/5 rounded-lg cursor-pointer hover:bg-success/10 transition-colors">
              <BarChart3 className="w-8 h-8 text-success mx-auto mb-2" />
              <p className="text-sm font-medium">Generate Report</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;