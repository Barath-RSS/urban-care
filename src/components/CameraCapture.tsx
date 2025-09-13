import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, RotateCcw, Check, X, MapPin, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CameraCaptureProps {
  onCapture: (photoData: { file: File; preview: string; metadata: any }) => void;
  onClose: () => void;
  isOpen: boolean;
}

const CameraCapture = ({ onCapture, onClose, isOpen }: CameraCaptureProps) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("environment");
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: facingMode,
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        },
        audio: false
      });
      
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }

      // Get location for geo-tagging
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            });
          },
          (error) => console.log("Location not available")
        );
      }
    } catch (error) {
      console.error("Camera access denied:", error);
    }
  }, [facingMode]);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  }, [stream]);

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      setIsCapturing(true);
      
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        const photoData = canvas.toDataURL('image/jpeg', 0.9);
        setCapturedPhoto(photoData);
      }
      
      setTimeout(() => setIsCapturing(false), 300);
    }
  };

  const confirmPhoto = () => {
    if (capturedPhoto && canvasRef.current) {
      canvasRef.current.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], `issue-photo-${Date.now()}.jpg`, {
            type: 'image/jpeg'
          });
          
          const metadata = {
            timestamp: new Date().toISOString(),
            location: location,
            quality: 'HD',
            geoTagged: !!location
          };
          
          onCapture({
            file,
            preview: capturedPhoto,
            metadata
          });
          
          handleClose();
        }
      }, 'image/jpeg', 0.9);
    }
  };

  const retakePhoto = () => {
    setCapturedPhoto(null);
  };

  const handleClose = () => {
    stopCamera();
    setCapturedPhoto(null);
    onClose();
  };

  const switchCamera = () => {
    setFacingMode(prev => prev === "user" ? "environment" : "user");
    stopCamera();
    setTimeout(startCamera, 100);
  };

  // Start camera when component opens
  useState(() => {
    if (isOpen && !stream) {
      startCamera();
    }
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <Card className="w-full h-full max-w-2xl border-0 rounded-none bg-black">
        <CardContent className="p-0 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-black/80 backdrop-blur-sm absolute top-0 left-0 right-0 z-10">
            <div className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-white" />
              <span className="text-white font-medium">Capture Issue Photo</span>
            </div>
            <div className="flex items-center gap-2">
              {location && (
                <Badge variant="outline" className="border-white/30 text-white bg-white/10">
                  <MapPin className="w-3 h-3 mr-1" />
                  GPS
                </Badge>
              )}
              <Button variant="ghost" size="icon" onClick={handleClose}>
                <X className="w-5 h-5 text-white" />
              </Button>
            </div>
          </div>

          {/* Camera View */}
          <div className="flex-1 relative overflow-hidden">
            {!capturedPhoto ? (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                <canvas ref={canvasRef} className="hidden" />
                
                {/* Camera overlay */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* Grid lines */}
                  <div className="absolute inset-4 border border-white/30 grid grid-cols-3 grid-rows-3">
                    <div className="border-r border-b border-white/20"></div>
                    <div className="border-r border-b border-white/20"></div>
                    <div className="border-b border-white/20"></div>
                    <div className="border-r border-b border-white/20"></div>
                    <div className="border-r border-b border-white/20"></div>
                    <div className="border-b border-white/20"></div>
                    <div className="border-r border-white/20"></div>
                    <div className="border-r border-white/20"></div>
                    <div></div>
                  </div>
                  
                  {/* Center focus */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-2 border-white rounded-lg animate-pulse"></div>
                </div>
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-black">
                <img 
                  src={capturedPhoto} 
                  alt="Captured" 
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            )}
            
            {/* Flash effect */}
            {isCapturing && (
              <div className="absolute inset-0 bg-white animate-ping opacity-50"></div>
            )}
          </div>

          {/* Controls */}
          <div className="p-6 bg-black/90 backdrop-blur-sm">
            {!capturedPhoto ? (
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={switchCamera}
                  className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 text-white"
                >
                  <RotateCcw className="w-6 h-6" />
                </Button>
                
                <Button
                  size="icon"
                  onClick={capturePhoto}
                  className="w-20 h-20 rounded-full bg-white hover:bg-white/90 text-black border-4 border-white/50"
                  disabled={isCapturing}
                >
                  <Camera className="w-8 h-8" />
                </Button>
                
                <div className="w-12 h-12"></div>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-4">
                <Button
                  variant="ghost"
                  onClick={retakePhoto}
                  className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-white border border-red-500/50"
                >
                  <X className="w-4 h-4 mr-2" />
                  Retake
                </Button>
                
                <Button
                  onClick={confirmPhoto}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Use Photo
                </Button>
              </div>
            )}
            
            {/* Metadata display */}
            <div className="mt-4 flex items-center justify-center gap-4 text-xs text-white/70">
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {new Date().toLocaleTimeString()}
              </div>
              {location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  GPS Enabled
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CameraCapture;