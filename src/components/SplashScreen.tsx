import { useState, useEffect } from "react";
import { Shield, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prev + 2;
      });
    }, 60);

    return () => {
      clearTimeout(timer);
      clearInterval(progressTimer);
    };
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-tertiary flex items-center justify-center p-4 overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-white animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 rounded-full bg-white animate-bounce"></div>
        <div className="absolute bottom-1/4 left-1/3 w-16 h-16 rounded-full bg-white animate-pulse delay-300"></div>
      </div>

      <div className="text-center space-y-8 fade-in z-10 relative">
        {/* Government Logo */}
        <div className="government-emblem w-32 h-32 mx-auto mb-8 bounce-in">
          <div className="w-full h-full bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border-4 border-white/30 relative overflow-hidden">
            {/* Ashoka Chakra inspired design */}
            <div className="absolute inset-2 rounded-full border-2 border-white/40">
              <div className="w-full h-full flex items-center justify-center">
                <Shield className="w-16 h-16 text-white drop-shadow-lg" />
              </div>
              {/* Spokes */}
              {Array.from({ length: 24 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-0.5 h-6 bg-white/30 top-1 left-1/2 transform-gpu origin-bottom"
                  style={{
                    transform: `translateX(-50%) rotate(${i * 15}deg)`,
                  }}
                />
              ))}
            </div>
            
            {/* Rotating ring */}
            <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-spin"></div>
          </div>
        </div>

        {/* Badge */}
        <Badge variant="outline" className="px-6 py-3 text-base font-medium border-white/40 text-white bg-white/10 backdrop-blur-sm scale-in">
          <Star className="w-4 h-4 mr-2" />
          Government of India Digital Initiative
        </Badge>

        {/* App Title */}
        <div className="space-y-4 slide-up">
          <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-xl">
            Urban Care
          </h1>
          <div className="text-xl md:text-2xl font-medium text-white/90 italic">
            "My Country, My Responsibility"
          </div>
          <p className="text-white/80 text-lg max-w-md mx-auto">
            Empowering Citizens for a Better Tomorrow
          </p>
        </div>

        {/* Loading Progress */}
        <div className="space-y-4 w-full max-w-xs mx-auto slide-in-right">
          <div className="flex items-center justify-center space-x-2 text-white/80">
            <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-100"></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-200"></div>
            <span className="ml-2 text-sm">Loading...</span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden backdrop-blur-sm">
            <div 
              className="h-full bg-gradient-to-r from-white to-white/80 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <div className="text-white/70 text-sm">
            {progress}% Complete
          </div>
        </div>

        {/* National Colors Accent */}
        <div className="flex justify-center space-x-2 scale-in delay-500">
          <div className="w-8 h-2 bg-orange-500 rounded"></div>
          <div className="w-8 h-2 bg-white rounded"></div>
          <div className="w-8 h-2 bg-green-600 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;