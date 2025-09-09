import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Smartphone, Monitor, MapPin, Users } from "lucide-react";
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
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold text-primary">
                CivicConnect
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                Bridging communities and government through smart civic issue reporting and resolution
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
    </div>
  );
};

export default Welcome;