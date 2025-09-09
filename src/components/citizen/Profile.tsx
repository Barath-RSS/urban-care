import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { User, Settings, LogOut, Award, MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Profile = () => {
  const userStats = {
    reportsSubmitted: 3,
    issuesResolved: 1,
    communityPoints: 245,
    memberSince: "January 2024"
  };

  const achievements = [
    { title: "First Reporter", description: "Submitted your first issue report", earned: true },
    { title: "Community Helper", description: "Helped confirm 5 duplicate reports", earned: true },
    { title: "Problem Solver", description: "Had 3 reports successfully resolved", earned: false },
    { title: "Active Citizen", description: "Active for 6 months", earned: false }
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <Card className="civic-card">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            Profile & Settings
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Profile Card */}
      <Card className="civic-card-hero">
        <CardContent className="p-6 text-center">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-10 h-10 text-primary-foreground" />
          </div>
          <h2 className="text-xl font-bold mb-2">John Citizen</h2>
          <p className="text-primary-foreground/80 mb-4">Active Community Member</p>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">{userStats.reportsSubmitted}</div>
              <div className="text-xs text-primary-foreground/80">Reports</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{userStats.communityPoints}</div>
              <div className="text-xs text-primary-foreground/80">Points</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User Information */}
      <Card className="civic-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" defaultValue="John Citizen" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="flex gap-2">
                <Mail className="w-4 h-4 mt-3 text-muted-foreground" />
                <Input id="email" defaultValue="john@example.com" className="flex-1" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="flex gap-2">
                <Phone className="w-4 h-4 mt-3 text-muted-foreground" />
                <Input id="phone" defaultValue="+1 (555) 123-4567" className="flex-1" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Home Address</Label>
              <div className="flex gap-2">
                <MapPin className="w-4 h-4 mt-3 text-muted-foreground" />
                <Input id="address" defaultValue="123 Main St, City, State 12345" className="flex-1" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">Preferred Language</Label>
              <Select defaultValue="en">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button className="w-full">Save Changes</Button>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="civic-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {achievements.map((achievement, index) => (
            <div key={index} className="flex items-center gap-3 p-3 rounded-lg border border-border">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                achievement.earned ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}>
                <Award className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className={`font-medium ${achievement.earned ? "text-primary" : "text-muted-foreground"}`}>
                  {achievement.title}
                </h4>
                <p className="text-sm text-muted-foreground">{achievement.description}</p>
              </div>
              {achievement.earned && (
                <Badge className="bg-success text-success-foreground">Earned</Badge>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* App Settings */}
      <Card className="civic-card">
        <CardHeader>
          <CardTitle>App Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Push Notifications</span>
              <div className="w-10 h-6 bg-primary rounded-full flex items-center px-1">
                <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Location Services</span>
              <div className="w-10 h-6 bg-primary rounded-full flex items-center px-1">
                <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Auto-submit Reports</span>
              <div className="w-10 h-6 bg-muted rounded-full flex items-center px-1">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="space-y-3">
        <Link to="/">
          <Button variant="outline" className="w-full justify-start">
            <LogOut className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Profile;