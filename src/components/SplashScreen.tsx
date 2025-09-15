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
    <div className="min-h-screen bg-white/80 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="text-center space-y-6 fade-in">
        {/* Simple Logo */}
        <div className="w-20 h-20 mx-auto">
          <div className="w-full h-full bg-primary/10 rounded-full flex items-center justify-center border border-primary/20 backdrop-blur-sm">
            <Shield className="w-10 h-10 text-primary" />
          </div>
        </div>

        {/* App Title */}
        <h1 className="text-4xl font-bold text-primary">
          Urban Care
        </h1>

        {/* Small Loading Animation */}
        <div className="flex items-center justify-center space-x-1">
          <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"></div>
          <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce delay-100"></div>
          <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce delay-200"></div>
        </div>

        {/* Quote in small font */}
        <p className="text-sm text-muted-foreground italic">
          "My Country, My Responsibility"
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;