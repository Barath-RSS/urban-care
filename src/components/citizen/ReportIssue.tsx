import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Camera, MapPin, Upload, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ReportIssue = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    category: "",
    priority: "",
    description: "",
    location: "Current Location (GPS)",
    photo: null as File | null,
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
      photo: null,
    });

    setIsSubmitting(false);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, photo: file }));
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Hero Section */}
      <Card className="civic-card-hero">
        <CardContent className="p-6 text-center">
          <Camera className="w-12 h-12 mx-auto mb-4 text-primary-foreground" />
          <h2 className="text-2xl font-bold mb-2">Report an Issue</h2>
          <p className="text-primary-foreground/80">
            Help make your community better by reporting problems that need attention
          </p>
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

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <div className="flex gap-2">
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Enter specific address or landmark"
                  className="flex-1"
                />
                <Button type="button" variant="outline" size="icon">
                  <MapPin className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">GPS location will be automatically detected</p>
            </div>

            {/* Photo Upload */}
            <div className="space-y-2">
              <Label htmlFor="photo">Photo Evidence</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                {formData.photo ? (
                  <div className="space-y-2">
                    <CheckCircle className="w-8 h-8 text-success mx-auto" />
                    <p className="text-sm font-medium">Photo uploaded: {formData.photo.name}</p>
                    <Button type="button" variant="outline" size="sm" onClick={() => setFormData(prev => ({ ...prev, photo: null }))}>
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto" />
                    <div>
                      <label htmlFor="photo-upload" className="cursor-pointer">
                        <span className="text-primary font-medium">Upload a photo</span>
                        <span className="text-muted-foreground"> or drag and drop</span>
                      </label>
                      <input
                        id="photo-upload"
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB</p>
                  </div>
                )}
              </div>
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