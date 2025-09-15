import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Camera, Upload, CheckCircle, MapPin, Calendar } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import CameraCapture from "@/components/CameraCapture";

const TaskCapture = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [completionData, setCompletionData] = useState({
    taskId: 3, // Current in-progress task
    photos: [] as { file: File; preview: string; metadata: any }[],
    notes: "",
    completionDate: new Date().toISOString().split('T')[0]
  });

  const currentTask = {
    id: 3,
    title: "Garbage Collection Issue",
    description: "Clear accumulated waste at Community Center", 
    location: "Community Center, Zone 3",
    deadline: "2024-01-18"
  };

  const handleCameraCapture = (photoData: { file: File; preview: string; metadata: any }) => {
    setCompletionData(prev => ({
      ...prev,
      photos: [...prev.photos, photoData]
    }));
    
    toast({
      title: "Photo Captured",
      description: photoData.metadata.geoTagged ? "Photo captured with GPS location" : "Photo captured successfully",
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const preview = URL.createObjectURL(file);
        setCompletionData(prev => ({
          ...prev,
          photos: [...prev.photos, { file, preview, metadata: { uploaded: true } }]
        }));
      });
      toast({
        title: "Photos Added",
        description: `${files.length} photo(s) uploaded successfully`,
      });
    }
  };

  const removePhoto = (index: number) => {
    setCompletionData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const submitCompletion = () => {
    if (completionData.photos.length === 0) {
      toast({
        title: "Photos Required",
        description: "Please add at least one completion photo",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Task Completed Successfully",
      description: "Completion report submitted with photos and GPS data",
    });

    // Reset form
    setCompletionData({
      taskId: 0,
      photos: [],
      notes: "",
      completionDate: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Task Completion</h1>
        <p className="text-muted-foreground">Document your completed work with photos and notes</p>
      </div>

      {/* Current Task Info */}
      <Card className="border-secondary/30">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-lg text-secondary">{currentTask.title}</CardTitle>
              <p className="text-muted-foreground mt-1">{currentTask.description}</p>
            </div>
            <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/30">
              In Progress
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{currentTask.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>Due: {currentTask.deadline}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Photo Capture Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-primary" />
            Completion Photos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Photo Grid */}
          {completionData.photos.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {completionData.photos.map((photo, index) => (
                <div key={index} className="relative group">
                  <img 
                    src={photo.preview} 
                    alt={`Completion photo ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg border"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="text-xs">
                      {photo.metadata.geoTagged ? (
                        <><MapPin className="w-3 h-3 mr-1" />GPS</>
                      ) : (
                        'Photo'
                      )}
                    </Badge>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-6 px-2 text-xs"
                    onClick={() => removePhoto(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* Camera Controls */}
          <div className="space-y-3">
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1 h-16 flex-col space-y-1 hover:bg-primary/5 border-primary/30"
                onClick={() => setShowCamera(true)}
              >
                <Camera className="w-6 h-6 text-primary" />
                <span className="text-sm">Take Photo</span>
              </Button>
              
              <Button
                type="button"
                variant="outline"
                className="flex-1 h-16 flex-col space-y-1 hover:bg-secondary/5 border-secondary/30"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-6 h-6 text-secondary" />
                <span className="text-sm">Upload Photos</span>
              </Button>
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFileUpload}
            />
            
            <p className="text-xs text-muted-foreground text-center">
              Photos are automatically geo-tagged for location verification
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Completion Notes */}
      <Card>
        <CardHeader>
          <CardTitle>Completion Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Add any additional notes about the completed work..."
            value={completionData.notes}
            onChange={(e) => setCompletionData(prev => ({ ...prev, notes: e.target.value }))}
            className="min-h-[100px]"
          />
        </CardContent>
      </Card>

      {/* Submit Button */}
      <Button 
        onClick={submitCompletion}
        className="w-full" 
        size="lg"
        disabled={completionData.photos.length === 0}
      >
        <CheckCircle className="w-5 h-5 mr-2" />
        Submit Completion Report
      </Button>

      {/* Camera Capture Component */}
      <CameraCapture 
        isOpen={showCamera}
        onCapture={handleCameraCapture}
        onClose={() => setShowCamera(false)}
      />
    </div>
  );
};

export default TaskCapture;