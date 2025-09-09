import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Smartphone, Monitor, MapPin, Users, Shield, Award, TrendingUp, CheckCircle, Clock, Star } from "lucide-react";
import heroImage from "@/assets/civic-hero.jpg";

const Welcome = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light to-secondary-light">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.1
          }}
        />
        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="text-center space-y-8">
            {/* Government Emblem */}
            <div className="government-emblem w-20 h-20 mx-auto mb-6 fade-in">
              <div className="w-full h-full bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <Shield className="w-10 h-10 text-white" />
              </div>
            </div>
            
            <div className="space-y-4 slide-up">
              <Badge variant="outline" className="px-4 py-2 text-sm font-medium border-primary/30 text-primary">
                Government of India Digital Initiative
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                CivicConnect
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                Empowering citizens and government through intelligent civic issue reporting and swift resolution
              </p>
            </div>

            {/* Platform Selection Cards */}
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-16">
              {/* Citizen App Card */}
              <Card className="civic-card hover:shadow-strong transition-all duration-300 group">
                <CardContent className="p-8 text-center space-y-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                    <Smartphone className="w-8 h-8 text-white" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-semibold text-primary">
                      Citizen App
                    </h3>
                    <p className="text-muted-foreground">
                      Report issues, track progress, and make your community better
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <span className="px-3 py-1 bg-primary-light text-primary text-sm rounded-full">
                      <MapPin className="w-3 h-3 inline mr-1" />
                      Location-based
                    </span>
                    <span className="px-3 py-1 bg-secondary-light text-secondary text-sm rounded-full">
                      Photo Upload
                    </span>
                  </div>
                  <Link to="/citizen">
                    <Button size="lg" className="w-full font-semibold">
                      Open Citizen App
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Admin Portal Card */}
              <Card className="civic-card hover:shadow-strong transition-all duration-300 group">
                <CardContent className="p-8 text-center space-y-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                    <Monitor className="w-8 h-8 text-white" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-semibold text-secondary">
                      Admin Portal
                    </h3>
                    <p className="text-muted-foreground">
                      Manage reports, assign departments, and track city-wide analytics
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <span className="px-3 py-1 bg-secondary-light text-secondary text-sm rounded-full">
                      <Users className="w-3 h-3 inline mr-1" />
                      Multi-department
                    </span>
                    <span className="px-3 py-1 bg-primary-light text-primary text-sm rounded-full">
                      Analytics
                    </span>
                  </div>
                  <Link to="/admin">
                    <Button variant="secondary" size="lg" className="w-full font-semibold">
                      Access Admin Portal
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* Feature Highlights */}
            <div className="mt-20 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold text-primary">Real-time Maps</h4>
                <p className="text-sm text-muted-foreground">Interactive maps showing all reported issues with live status updates</p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                  <Smartphone className="w-6 h-6 text-secondary" />
                </div>
                <h4 className="font-semibold text-secondary">Mobile-First</h4>
                <p className="text-sm text-muted-foreground">Optimized for mobile reporting with photo uploads and GPS location</p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold text-primary">Department Management</h4>
                <p className="text-sm text-muted-foreground">Efficient assignment and tracking across all municipal departments</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Building Section - Resolved Issues Showcase */}
      <div className="bg-gradient-to-b from-background to-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-8 mb-16">
            <div className="slide-in-left">
              <Badge variant="outline" className="px-4 py-2 text-sm font-medium border-tertiary/30 text-tertiary mb-4">
                <Award className="w-4 h-4 mr-2" />
                Proven Results
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Building Trust Through Action
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                See how CivicConnect has transformed communities across India with real solutions
              </p>
            </div>
          </div>

          {/* Success Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            <Card className="civic-card-enhanced text-center p-6 scale-in">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-hover rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">15,847</div>
              <div className="text-sm text-muted-foreground">Issues Resolved</div>
            </Card>
            
            <Card className="civic-card-enhanced text-center p-6 scale-in">
              <div className="w-12 h-12 bg-gradient-to-br from-secondary to-secondary-hover rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-secondary mb-2">2.3 Days</div>
              <div className="text-sm text-muted-foreground">Avg Response Time</div>
            </Card>
            
            <Card className="civic-card-enhanced text-center p-6 scale-in">
              <div className="w-12 h-12 bg-gradient-to-br from-tertiary to-tertiary-hover rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-tertiary mb-2">94%</div>
              <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
            </Card>
            
            <Card className="civic-card-enhanced text-center p-6 scale-in">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-tertiary rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">50,000+</div>
              <div className="text-sm text-muted-foreground">Active Citizens</div>
            </Card>
          </div>

          {/* Recent Success Stories */}
          <div className="space-y-6 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-center mb-8 text-foreground">Recent Success Stories</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="civic-card-enhanced p-6 slide-in-left">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs">Road & Infrastructure</Badge>
                      <div className="flex items-center text-yellow-500">
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                      </div>
                    </div>
                    <h4 className="font-semibold text-foreground mb-2">Pothole Fixed in Connaught Place</h4>
                    <p className="text-sm text-muted-foreground mb-3">Major pothole causing traffic issues was reported and fixed within 24 hours.</p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3 mr-1" />
                      New Delhi • Resolved in 1 day
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="civic-card-enhanced p-6 slide-in-right">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs">Streetlight</Badge>
                      <div className="flex items-center text-yellow-500">
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                      </div>
                    </div>
                    <h4 className="font-semibold text-foreground mb-2">Street Lighting Restored</h4>
                    <p className="text-sm text-muted-foreground mb-3">Dark street corner made safe again with new LED lighting installation.</p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3 mr-1" />
                      Mumbai • Resolved in 3 days
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;