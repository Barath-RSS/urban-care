import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Settings as SettingsIcon, Users, Bell, Shield, Database, Download } from "lucide-react";

const Settings = () => {
  const adminUsers = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah@city.gov",
      role: "System Admin",
      department: "IT Department",
      lastActive: "2 hours ago",
      status: "active"
    },
    {
      id: 2,
      name: "Mike Davis",
      email: "mike@city.gov", 
      role: "Department Manager",
      department: "Roads Department",
      lastActive: "1 day ago",
      status: "active"
    },
    {
      id: 3,
      name: "Lisa Garcia",
      email: "lisa@city.gov",
      role: "Officer",
      department: "Electrical Department",
      lastActive: "3 hours ago",
      status: "active"
    },
    {
      id: 4,
      name: "Tom Wilson",
      email: "tom@city.gov",
      role: "Viewer",
      department: "Water Department",
      lastActive: "1 week ago",
      status: "inactive"
    }
  ];

  const issueCategories = [
    "Road & Infrastructure",
    "Streetlight",
    "Sanitation & Waste",
    "Water Supply", 
    "Public Safety",
    "Parks & Recreation",
    "Other"
  ];

  const departments = [
    "Roads Department",
    "Electrical Department",
    "Water Department", 
    "Sanitation Department",
    "Parks & Recreation",
    "IT Department"
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case "System Admin": return "bg-red-100 text-red-800";
      case "Department Manager": return "bg-blue-100 text-blue-800";
      case "Officer": return "bg-green-100 text-green-800";
      case "Viewer": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    return status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-primary">Settings & Administration</h1>
        <p className="text-muted-foreground">Manage system configuration and user access</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main Settings */}
        <div className="xl:col-span-2 space-y-6">
          {/* System Configuration */}
          <Card className="civic-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="w-5 h-5 text-primary" />
                System Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cityName">City Name</Label>
                  <Input id="cityName" defaultValue="Springfield" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="est">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="est">Eastern Time (EST)</SelectItem>
                      <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                      <SelectItem value="cst">Central Time (CST)</SelectItem>
                      <SelectItem value="mst">Mountain Time (MST)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Auto-assign Reports</Label>
                    <p className="text-sm text-muted-foreground">Automatically assign reports to departments based on category</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Public Map View</Label>
                    <p className="text-sm text-muted-foreground">Allow citizens to view all reported issues on the map</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Send email notifications for status updates</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Issue Categories Management */}
          <Card className="civic-card">
            <CardHeader>
              <CardTitle>Issue Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input placeholder="Add new category..." className="flex-1" />
                  <Button>Add Category</Button>
                </div>
                
                <div className="space-y-2">
                  {issueCategories.map((category, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <span className="font-medium">{category}</span>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">Edit</Button>
                        <Button variant="ghost" size="sm" className="text-red-600">Delete</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Departments Management */}
          <Card className="civic-card">
            <CardHeader>
              <CardTitle>Departments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input placeholder="Add new department..." className="flex-1" />
                  <Button>Add Department</Button>
                </div>
                
                <div className="space-y-2">
                  {departments.map((department, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <span className="font-medium">{department}</span>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">Edit</Button>
                        <Button variant="ghost" size="sm" className="text-red-600">Delete</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* User Management Sidebar */}
        <div className="space-y-6">
          {/* User Management */}
          <Card className="civic-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                User Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full">
                <Users className="w-4 h-4 mr-2" />
                Add New User
              </Button>

              <Separator />

              <div className="space-y-3">
                {adminUsers.map((user) => (
                  <div key={user.id} className="space-y-2 p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{user.name}</span>
                      <Badge className={getStatusColor(user.status)}>
                        {user.status}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">{user.email}</div>
                    <div className="flex items-center justify-between">
                      <Badge className={getRoleColor(user.role)}>
                        {user.role}
                      </Badge>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="civic-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="text-sm font-medium">New Reports</div>
                    <div className="text-xs text-muted-foreground">Notify on new issue reports</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="text-sm font-medium">High Priority</div>
                    <div className="text-xs text-muted-foreground">Instant alerts for urgent issues</div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="text-sm font-medium">Overdue Items</div>
                    <div className="text-xs text-muted-foreground">Daily digest of overdue reports</div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data & Backup */}
          <Card className="civic-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5 text-primary" />
                Data Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Download className="w-4 h-4 mr-2" />
                Export All Data
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Shield className="w-4 h-4 mr-2" />
                Backup System
              </Button>
              <div className="text-xs text-muted-foreground pt-2">
                Last backup: January 20, 2024 at 2:00 AM
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Save Changes */}
      <div className="flex justify-end gap-4">
        <Button variant="outline">Cancel Changes</Button>
        <Button>Save All Changes</Button>
      </div>
    </div>
  );
};

export default Settings;