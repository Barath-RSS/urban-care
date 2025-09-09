import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Filter, Download, Eye, User, Calendar } from "lucide-react";

const IssuesManagement = () => {
  const [selectedIssues, setSelectedIssues] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const issues = [
    {
      id: 1,
      reportId: "CR2024-001",
      title: "Pothole on Main Street",
      category: "Road & Infrastructure",
      status: "new",
      priority: "high",
      location: "Main St & 2nd Ave",
      submittedBy: "John Citizen",
      assignedTo: null,
      createdAt: "2024-01-20",
      department: null,
      description: "Large pothole causing traffic issues"
    },
    {
      id: 2,
      reportId: "CR2024-002",
      title: "Broken streetlight",
      category: "Streetlight",
      status: "assigned",
      priority: "medium",
      location: "Park Ave & Oak St",
      submittedBy: "Jane Smith",
      assignedTo: "Mike Johnson",
      createdAt: "2024-01-19",
      department: "Electrical",
      description: "Streetlight not working for 3 days"
    },
    {
      id: 3,
      reportId: "CR2024-003",
      title: "Water main leak",
      category: "Water Supply",
      status: "in-progress",
      priority: "high",
      location: "Downtown Plaza",
      submittedBy: "Bob Wilson",
      assignedTo: "Sarah Davis",
      createdAt: "2024-01-18",
      department: "Water",
      description: "Water leak affecting multiple buildings"
    },
    {
      id: 4,
      reportId: "CR2024-004",
      title: "Graffiti removal needed",
      category: "Public Safety",
      status: "resolved",
      priority: "low",
      location: "City Park Wall",
      submittedBy: "Alice Brown",
      assignedTo: "Tom Garcia",
      createdAt: "2024-01-15",
      department: "Sanitation",
      description: "Offensive graffiti removed successfully"
    },
    {
      id: 5,
      reportId: "CR2024-005",
      title: "Damaged park bench",
      category: "Parks & Recreation",
      status: "new",
      priority: "low",
      location: "Central Park",
      submittedBy: "David Lee",
      assignedTo: null,
      createdAt: "2024-01-21",
      department: null,
      description: "Park bench broken and unsafe"
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
      case "new": return "status-new";
      case "assigned": return "status-progress";
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

  const filteredIssues = issues.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.reportId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || issue.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIssues(filteredIssues.map(issue => issue.id));
    } else {
      setSelectedIssues([]);
    }
  };

  const handleSelectIssue = (issueId: number, checked: boolean) => {
    if (checked) {
      setSelectedIssues([...selectedIssues, issueId]);
    } else {
      setSelectedIssues(selectedIssues.filter(id => id !== issueId));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary">Issues Management</h1>
          <p className="text-muted-foreground">Manage and track all reported issues</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          <Button>
            <Filter className="w-4 h-4 mr-2" />
            Advanced Filter
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="civic-card">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search by ID, title, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="assigned">Assigned</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedIssues.length > 0 && (
        <Card className="civic-card border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {selectedIssues.length} issue{selectedIssues.length !== 1 ? 's' : ''} selected
              </span>
              <div className="flex gap-2">
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Assign to dept" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button size="sm">Assign</Button>
                <Button variant="outline" size="sm">Mark Resolved</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Issues Table */}
      <Card className="civic-card">
        <CardHeader>
          <CardTitle>All Issues ({filteredIssues.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border">
                <tr className="text-left">
                  <th className="p-4 w-12">
                    <Checkbox
                      checked={selectedIssues.length === filteredIssues.length && filteredIssues.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </th>
                  <th className="p-4 font-medium">ID</th>
                  <th className="p-4 font-medium">Title</th>
                  <th className="p-4 font-medium">Category</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Priority</th>
                  <th className="p-4 font-medium">Assigned To</th>
                  <th className="p-4 font-medium">Created</th>
                  <th className="p-4 font-medium w-20">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredIssues.map((issue) => (
                  <tr key={issue.id} className="border-b border-border hover:bg-muted/50">
                    <td className="p-4">
                      <Checkbox
                        checked={selectedIssues.includes(issue.id)}
                        onCheckedChange={(checked) => handleSelectIssue(issue.id, checked as boolean)}
                      />
                    </td>
                    <td className="p-4">
                      <span className="font-mono text-sm">{issue.reportId}</span>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <div className="font-medium">{issue.title}</div>
                        <div className="text-sm text-muted-foreground">{issue.location}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline">{issue.category}</Badge>
                    </td>
                    <td className="p-4">
                      <Badge className={getStatusColor(issue.status)}>
                        {issue.status.replace('-', ' ').toUpperCase()}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Badge className={getPriorityColor(issue.priority)}>
                        {issue.priority.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="p-4">
                      {issue.assignedTo ? (
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{issue.assignedTo}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">Unassigned</span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{issue.createdAt}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="civic-card text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">{issues.filter(i => i.status === "new").length}</div>
            <div className="text-sm text-muted-foreground">New Issues</div>
          </CardContent>
        </Card>
        <Card className="civic-card text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-warning">{issues.filter(i => i.status === "assigned" || i.status === "in-progress").length}</div>
            <div className="text-sm text-muted-foreground">Active</div>
          </CardContent>
        </Card>
        <Card className="civic-card text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-destructive">{issues.filter(i => i.priority === "high").length}</div>
            <div className="text-sm text-muted-foreground">High Priority</div>
          </CardContent>
        </Card>
        <Card className="civic-card text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-success">{issues.filter(i => i.status === "resolved").length}</div>
            <div className="text-sm text-muted-foreground">Resolved</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IssuesManagement;