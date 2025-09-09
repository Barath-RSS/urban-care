import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, CheckCircle, Clock, AlertTriangle } from "lucide-react";

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      type: "status_update",
      title: "Report Status Updated",
      message: "Your sidewalk repair request (#CR2024-001) has been assigned to the Roads Department.",
      timestamp: "2 hours ago",
      read: false,
      priority: "medium",
      reportId: "CR2024-001"
    },
    {
      id: 2,
      type: "resolution",
      title: "Issue Resolved",
      message: "Great news! Your streetlight repair (#CR2024-002) has been completed.",
      timestamp: "1 day ago",
      read: false,
      priority: "high",
      reportId: "CR2024-002"
    },
    {
      id: 3,
      type: "acknowledgment",
      title: "Report Acknowledged",
      message: "We've received your garbage bin report (#CR2024-003) and it's being reviewed.",
      timestamp: "2 days ago",
      read: true,
      priority: "low",
      reportId: "CR2024-003"
    },
    {
      id: 4,
      type: "community",
      title: "Community Update",
      message: "New waste collection schedule starts next Monday. Check your area's pickup times.",
      timestamp: "3 days ago",
      read: true,
      priority: "medium",
      reportId: null
    },
    {
      id: 5,
      type: "reminder",
      title: "Follow-up Available",
      message: "You can now provide feedback on the completed streetlight repair.",
      timestamp: "1 week ago",
      read: true,
      priority: "low",
      reportId: "CR2024-002"
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "status_update": return <Clock className="w-4 h-4 text-primary" />;
      case "resolution": return <CheckCircle className="w-4 h-4 text-success" />;
      case "acknowledgment": return <Bell className="w-4 h-4 text-secondary" />;
      case "community": return <AlertTriangle className="w-4 h-4 text-warning" />;
      case "reminder": return <Bell className="w-4 h-4 text-muted-foreground" />;
      default: return <Bell className="w-4 h-4" />;
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

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <Card className="civic-card">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              Notifications
              {unreadCount > 0 && (
                <Badge className="bg-primary text-primary-foreground">
                  {unreadCount}
                </Badge>
              )}
            </CardTitle>
            <Button variant="outline" size="sm">
              Mark All Read
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.map((notification) => (
          <Card 
            key={notification.id} 
            className={`civic-card transition-all duration-200 ${
              !notification.read 
                ? "border-primary/30 bg-primary/5" 
                : "hover:bg-muted/30"
            }`}
          >
            <CardContent className="p-4">
              <div className="flex gap-3">
                {/* Icon */}
                <div className="flex-shrink-0 mt-1">
                  {getNotificationIcon(notification.type)}
                </div>

                {/* Content */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h4 className={`text-sm font-medium ${!notification.read ? "text-primary" : ""}`}>
                        {notification.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {notification.message}
                      </p>
                    </div>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {notification.timestamp}
                      </span>
                      {notification.reportId && (
                        <Badge variant="outline" className="text-xs">
                          {notification.reportId}
                        </Badge>
                      )}
                    </div>
                    <Badge className={getPriorityColor(notification.priority)}>
                      {notification.priority}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Notification Settings */}
      <Card className="civic-card">
        <CardContent className="p-4">
          <div className="space-y-3">
            <h4 className="font-medium">Notification Preferences</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Status Updates</span>
                <div className="w-10 h-6 bg-primary rounded-full flex items-center px-1">
                  <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Community Announcements</span>
                <div className="w-10 h-6 bg-primary rounded-full flex items-center px-1">
                  <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Reminders</span>
                <div className="w-10 h-6 bg-muted rounded-full flex items-center px-1">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Notifications;