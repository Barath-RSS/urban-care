import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Smartphone, Monitor, Eye, EyeOff, User, Phone, MapPin, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    phone: "",
    name: "",
    address: "",
    age: "",
    gender: "",
    occupation: "",
    department: "",
    employeeId: "",
    designation: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setLoginData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCitizenLogin = () => {
    // Validate required fields
    if (!loginData.email || !loginData.password || !loginData.phone || !loginData.name) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Login Successful",
      description: "Welcome to CivicConnect Citizen App",
    });
    navigate("/citizen");
  };

  const handleAdminLogin = () => {
    // Validate required fields
    if (!loginData.email || !loginData.password || !loginData.employeeId || !loginData.department) {
      toast({
        title: "Missing Information", 
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Admin Login Successful",
      description: "Welcome to Municipal Admin Portal",
    });
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light to-secondary-light p-4 flex items-center justify-center">
      <div className="w-full max-w-md space-y-6 fade-in">
        {/* Government Header */}
        <div className="text-center space-y-4">
          <div className="government-emblem w-16 h-16 mx-auto mb-4">
            <div className="w-full h-full bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
          <Badge variant="outline" className="px-4 py-2 text-sm font-medium border-primary/30 text-primary">
            Government of India Digital Initiative
          </Badge>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            CivicConnect
          </h1>
          <p className="text-sm text-muted-foreground">
            Secure Login Portal
          </p>
        </div>

        <Card className="civic-card-enhanced">
          <CardHeader className="text-center">
            <CardTitle className="text-primary">Select Login Type</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="citizen" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="citizen" className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4" />
                  Citizen
                </TabsTrigger>
                <TabsTrigger value="admin" className="flex items-center gap-2">
                  <Monitor className="w-4 h-4" />
                  Municipal
                </TabsTrigger>
              </TabsList>

              {/* Citizen Login */}
              <TabsContent value="citizen" className="space-y-4 mt-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="citizen-name">Full Name *</Label>
                      <Input
                        id="citizen-name"
                        placeholder="Enter your full name"
                        value={loginData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="citizen-phone">Phone *</Label>
                      <Input
                        id="citizen-phone"
                        placeholder="Mobile number"
                        value={loginData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="citizen-email">Email Address *</Label>
                    <Input
                      id="citizen-email"
                      type="email"
                      placeholder="Enter your email"
                      value={loginData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="citizen-address">Address</Label>
                    <Input
                      id="citizen-address"
                      placeholder="Your residential address"
                      value={loginData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="citizen-age">Age</Label>
                      <Input
                        id="citizen-age"
                        placeholder="Your age"
                        value={loginData.age}
                        onChange={(e) => handleInputChange("age", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="citizen-gender">Gender</Label>
                      <Select value={loginData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="citizen-occupation">Occupation</Label>
                    <Input
                      id="citizen-occupation"
                      placeholder="Your occupation"
                      value={loginData.occupation}
                      onChange={(e) => handleInputChange("occupation", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="citizen-password">Password *</Label>
                    <div className="relative">
                      <Input
                        id="citizen-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        value={loginData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                </div>

                <Button onClick={handleCitizenLogin} className="w-full">
                  <User className="w-4 h-4 mr-2" />
                  Login as Citizen
                </Button>
              </TabsContent>

              {/* Municipal Admin Login */}
              <TabsContent value="admin" className="space-y-4 mt-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="admin-name">Full Name *</Label>
                      <Input
                        id="admin-name"
                        placeholder="Enter your full name"
                        value={loginData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="admin-employee-id">Employee ID *</Label>
                      <Input
                        id="admin-employee-id"
                        placeholder="Government employee ID"
                        value={loginData.employeeId}
                        onChange={(e) => handleInputChange("employeeId", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="admin-email">Official Email *</Label>
                    <Input
                      id="admin-email"
                      type="email"
                      placeholder="Official government email"
                      value={loginData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="admin-department">Department *</Label>
                      <Select value={loginData.department} onValueChange={(value) => handleInputChange("department", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="roads">Roads & Infrastructure</SelectItem>
                          <SelectItem value="water">Water Department</SelectItem>
                          <SelectItem value="electrical">Electrical Department</SelectItem>
                          <SelectItem value="sanitation">Sanitation Department</SelectItem>
                          <SelectItem value="parks">Parks & Recreation</SelectItem>
                          <SelectItem value="admin">Administration</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="admin-designation">Designation</Label>
                      <Input
                        id="admin-designation"
                        placeholder="Your designation"
                        value={loginData.designation}
                        onChange={(e) => handleInputChange("designation", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="admin-phone">Contact Number</Label>
                    <Input
                      id="admin-phone"
                      placeholder="Official contact number"
                      value={loginData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="admin-password">Password *</Label>
                    <div className="relative">
                      <Input
                        id="admin-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={loginData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                </div>

                <Button onClick={handleAdminLogin} className="w-full" variant="secondary">
                  <Shield className="w-4 h-4 mr-2" />
                  Login as Municipal Officer
                </Button>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center text-xs text-muted-foreground">
              By logging in, you agree to our Terms of Service and Privacy Policy
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;