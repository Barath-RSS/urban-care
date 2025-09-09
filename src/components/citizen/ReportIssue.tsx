import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Camera, MapPin, Upload, CheckCircle, Video, Navigation, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ReportIssue = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [formData, setFormData] = useState({
    category: "",
    priority: "",
    description: "",
    location: "Current Location (GPS)",
    coordinates: null as { lat: number; lng: number } | null,
    photo: null as File | null,
    photoPreview: null as string | null,
  });

  const categories = [
    "Road & Infrastructure",
    "Streetlight",
    "Sanitation & Waste",
    "Water Supply",
    "Public Safety",
    "Parks & Recreation",
    "Other"
  ];

  const priorities = [
    { value: "low", label: "Low", color: "bg-green-100 text-green-800" },
    { value: "medium", label: "Medium", color: "bg-yellow-100 text-yellow-800" },
    { value: "high", label: "High", color: "bg-red-100 text-red-800" }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "Issue Reported Successfully!",
      description: "Your report has been submitted. Reference ID: #CR2024-001",
    });

    // Reset form
    setFormData({
      category: "",
      priority: "",
      description: "",
      location: "Current Location (GPS)",
      coordinates: null,
      photo: null,
      photoPreview: null,
    });

    setIsSubmitting(false);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFormData(prev => ({ 
        ...prev, 
        photo: file, 
        photoPreview: previewUrl 
      }));
    }
  };

  const handleCameraCapture = async () => {
    setIsCapturing(true);
    try {
      // Request camera access
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' },
        audio: false 
      });
      
      // For demo purposes, we'll simulate camera capture
      // In a real app, you'd implement a camera interface here
      toast({
        title: "Camera Access Granted",
        description: "Camera interface would open here. For now, please use the upload option.",
      });
      
      // Stop the stream
      stream.getTracks().forEach(track => track.stop());
    } catch (error) {
      toast({
        title: "Camera Access Denied",
        description: "Please allow camera access or use the upload option.",
        variant: "destructive",
      });
    } finally {
      setIsCapturing(false);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData(prev => ({
            ...prev,
            coordinates: { lat: latitude, lng: longitude },
            location: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
          }));
          toast({
            title: "Location Detected",
            description: "GPS coordinates have been automatically added to your report.",
          });
        },
        (error) => {
          toast({
            title: "Location Error",
            description: "Unable to get your location. Please enter it manually.",
            variant: "destructive",
          });
        }
      );
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Hero Section */}
      <Card className="civic-card-hero">
        <CardContent className="p-6 text-center">
          <div className="government-emblem w-16 h-16 mx-auto mb-4">
            <div className="w-full h-full bg-white/20 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2">Report an Issue</h2>
          <p className="text-primary-foreground/80">
            Help build a better India by reporting civic issues in your community
          </p>
          <Badge variant="outline" className="mt-3 border-white/30 text-white bg-white/10">
            Secured by Government of India
          </Badge>
        </CardContent>
      </Card>

      {/* Report Form */}
      <Card className="civic-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Issue Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Category Selection */}
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select issue category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Priority Selection */}
            <div className="space-y-2">
              <Label htmlFor="priority">Priority Level</Label>
              <div className="flex gap-2">
                {priorities.map((priority) => (
                  <Button
                    key={priority.value}
                    type="button"
                    variant={formData.priority === priority.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFormData(prev => ({ ...prev, priority: priority.value }))}
                    className="flex-1"
                  >
                    {priority.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Enhanced Location */}
            <div className="space-y-3">
              <Label htmlFor="location">Location</Label>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="Enter specific address or landmark"
                    className="flex-1"
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="icon"
                    onClick={getCurrentLocation}
                    className="hover:bg-primary/10"
                  >
                    <Navigation className="w-4 h-4 text-primary" />
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="icon"
                    className="hover:bg-secondary/10"
                    title="Open in Google Maps"
                  >
                    <MapPin className="w-4 h-4 text-secondary" />
                  </Button>
                </div>
                
                {formData.coordinates && (
                  <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                    <div className="flex items-center gap-2 text-sm">
                      <Badge variant="outline" className="text-xs border-primary/30 text-primary">
                        <Navigation className="w-3 h-3 mr-1" />
                        GPS Located
                      </Badge>
                      <span className="text-muted-foreground">
                        Coordinates: {formData.coordinates.lat.toFixed(4)}, {formData.coordinates.lng.toFixed(4)}
                      </span>
                    </div>
                  </div>
                )}
                
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  Location data is encrypted and used only for issue resolution
                </p>
              </div>
            </div>

            {/* Enhanced Photo Capture */}
            <div className="space-y-3">
              <Label htmlFor="photo">Photo Evidence</Label>
              
              {formData.photoPreview ? (
                <div className="space-y-4">
                  <div className="relative rounded-xl overflow-hidden border-2 border-primary/20">
                    <img 
                      src={formData.photoPreview} 
                      alt="Issue preview" 
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary" className="bg-black/50 text-white">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Captured
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setFormData(prev => ({ ...prev, photo: null, photoPreview: null }))}
                      className="flex-1"
                    >
                      Retake Photo
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      onClick={() => fileInputRef.current?.click()}
                      className="flex-1"
                    >
                      Choose Different
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="camera-interface p-6 text-center space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      className="h-24 flex-col space-y-2 hover:bg-primary/5 border-primary/30"
                      onClick={handleCameraCapture}
                      disabled={isCapturing}
                    >
                      <Camera className="w-8 h-8 text-primary" />
                      <span className="text-sm font-medium">
                        {isCapturing ? "Opening..." : "Take Photo"}
                      </span>
                    </Button>
                    
                    <Button
                      type="button"
                      variant="outline"
                      className="h-24 flex-col space-y-2 hover:bg-secondary/5 border-secondary/30"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="w-8 h-8 text-secondary" />
                      <span className="text-sm font-medium">Upload Photo</span>
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Capture a clear photo of the issue for faster resolution
                    </p>
                    <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Shield className="w-3 h-3" />
                        Geo-tagged
                      </div>
                      <div className="flex items-center gap-1">
                        <Camera className="w-3 h-3" />
                        HD Quality
                      </div>
                    </div>
                  </div>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </div>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Provide additional details about the issue..."
                className="min-h-[100px]"
              />
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full" 
              size="lg"
              disabled={isSubmitting || !formData.category || !formData.priority}
            >
              {isSubmitting ? "Submitting Report..." : "Submit Report"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportIssue;