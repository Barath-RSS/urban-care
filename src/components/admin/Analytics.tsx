import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, Download, Calendar, Users, Clock } from "lucide-react";

const Analytics = () => {
  const monthlyStats = [
    { month: "Jan", reports: 45, resolved: 38, avgTime: 3.2 },
    { month: "Feb", reports: 52, resolved: 45, avgTime: 2.8 },
    { month: "Mar", reports: 38, resolved: 41, avgTime: 3.1 },
    { month: "Apr", reports: 61, resolved: 52, avgTime: 2.9 },
    { month: "May", reports: 48, resolved: 49, avgTime: 2.7 },
    { month: "Jun", reports: 55, resolved: 51, avgTime: 3.0 }
  ];

  const categoryTrends = [
    { category: "Road & Infrastructure", thisMonth: 18, lastMonth: 15, trend: "up" },
    { category: "Streetlight", thisMonth: 12, lastMonth: 16, trend: "down" },
    { category: "Sanitation", thisMonth: 8, lastMonth: 7, trend: "up" },
    { category: "Water Supply", thisMonth: 6, lastMonth: 9, trend: "down" },
    { category: "Public Safety", thisMonth: 4, lastMonth: 3, trend: "up" },
    { category: "Parks & Recreation", thisMonth: 7, lastMonth: 6, trend: "up" }
  ];

  const departmentPerformance = [
    {
      department: "Roads Department",
      resolved: 28,
      avgTime: 4.2,
      satisfaction: 4.2,
      efficiency: 82
    },
    {
      department: "Electrical Department", 
      resolved: 15,
      avgTime: 2.1,
      satisfaction: 4.6,
      efficiency: 94
    },
    {
      department: "Water Department",
      resolved: 12,
      avgTime: 3.5,
      satisfaction: 4.1,
      efficiency: 76
    },
    {
      department: "Sanitation Department",
      resolved: 18,
      avgTime: 1.8,
      satisfaction: 4.4,
      efficiency: 89
    },
    {
      department: "Parks & Recreation",
      resolved: 8,
      avgTime: 5.1,
      satisfaction: 3.9,
      efficiency: 68
    }
  ];

  const citizenEngagement = {
    totalUsers: 1247,
    activeUsers: 892,
    newUsers: 156,
    reportsPerUser: 2.3,
    satisfactionRate: 87
  };

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? "📈" : "📉";
  };

  const getTrendColor = (trend: string) => {
    return trend === "up" ? "text-green-600" : "text-red-600";
  };

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 80) return "text-green-600";
    if (efficiency >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary">Analytics & Reports</h1>
          <p className="text-muted-foreground">Comprehensive insights into civic issue resolution</p>
        </div>
        
        <div className="flex gap-2">
          <Select defaultValue="6months">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">Last Month</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="civic-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Total Reports</p>
                <p className="text-2xl font-bold text-primary">299</p>
                <p className="text-xs text-green-600">+12% from last period</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="civic-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Resolution Rate</p>
                <p className="text-2xl font-bold text-success">87%</p>
                <p className="text-xs text-green-600">+5% improvement</p>
              </div>
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="civic-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Avg Resolution Time</p>
                <p className="text-2xl font-bold text-secondary">2.9 days</p>
                <p className="text-xs text-green-600">-0.3 days faster</p>
              </div>
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-secondary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="civic-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                <p className="text-2xl font-bold text-primary">{citizenEngagement.activeUsers}</p>
                <p className="text-xs text-green-600">+{citizenEngagement.newUsers} new users</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends Chart */}
        <Card className="civic-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              Monthly Report Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyStats.map((stat, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{stat.month} 2024</span>
                    <div className="flex gap-4 text-xs text-muted-foreground">
                      <span>Reports: {stat.reports}</span>
                      <span>Resolved: {stat.resolved}</span>
                      <span>Avg: {stat.avgTime}d</span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <div 
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${(stat.reports / 65) * 100}%` }}
                    />
                    <div 
                      className="bg-success h-2 rounded-full"
                      style={{ width: `${(stat.resolved / 65) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
              <div className="flex gap-4 text-xs pt-2">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Reports</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span>Resolved</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category Trends */}
        <Card className="civic-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Category Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryTrends.map((category, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="space-y-1">
                    <div className="font-medium text-sm">{category.category}</div>
                    <div className="text-xs text-muted-foreground">
                      This month: {category.thisMonth} | Last month: {category.lastMonth}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium ${getTrendColor(category.trend)}`}>
                      {getTrendIcon(category.trend)} 
                      {Math.abs(category.thisMonth - category.lastMonth)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Department Performance */}
      <Card className="civic-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Department Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border">
                <tr className="text-left">
                  <th className="p-4 font-medium">Department</th>
                  <th className="p-4 font-medium">Resolved Issues</th>
                  <th className="p-4 font-medium">Avg Resolution Time</th>
                  <th className="p-4 font-medium">Satisfaction</th>
                  <th className="p-4 font-medium">Efficiency</th>
                </tr>
              </thead>
              <tbody>
                {departmentPerformance.map((dept, index) => (
                  <tr key={index} className="border-b border-border hover:bg-muted/50">
                    <td className="p-4 font-medium">{dept.department}</td>
                    <td className="p-4">
                      <Badge variant="outline">{dept.resolved}</Badge>
                    </td>
                    <td className="p-4">{dept.avgTime} days</td>
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        <span>⭐</span>
                        <span>{dept.satisfaction}/5</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`font-medium ${getEfficiencyColor(dept.efficiency)}`}>
                        {dept.efficiency}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Citizen Engagement */}
      <Card className="civic-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Citizen Engagement Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">{citizenEngagement.totalUsers}</div>
              <div className="text-sm text-muted-foreground">Total Users</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-secondary">{citizenEngagement.activeUsers}</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-success">{citizenEngagement.newUsers}</div>
              <div className="text-sm text-muted-foreground">New This Month</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">{citizenEngagement.reportsPerUser}</div>
              <div className="text-sm text-muted-foreground">Reports per User</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-success">{citizenEngagement.satisfactionRate}%</div>
              <div className="text-sm text-muted-foreground">Satisfaction</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;