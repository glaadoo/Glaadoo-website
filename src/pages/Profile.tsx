
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { User, Mail, Lock, ArrowLeft } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Simulate fetching user data from localStorage or a state management system
    const savedUserData = localStorage.getItem("userData");
    if (savedUserData) {
      const userData = JSON.parse(savedUserData);
      setFullName(userData.fullName || "");
      setEmail(userData.email || "");
    } else {
      toast.error("Please sign in to view your profile");
      navigate("/sign-in");
    }
  }, [navigate]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate saving profile changes
    setTimeout(() => {
      // Save to localStorage for demo purposes
      const userData = { fullName, email };
      localStorage.setItem("userData", JSON.stringify(userData));

      setIsLoading(false);
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Button 
          variant="ghost" 
          className="mb-4 text-primary"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <Card className="bg-white p-8 rounded-xl shadow-lg animate-fade-in">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-primary">Your Profile</h2>
            <p className="mt-2 text-muted-foreground">
              Manage your GLAADOO account information
            </p>
          </div>

          <div className="mb-6 flex justify-center">
            <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-semibold">
              {fullName ? fullName.charAt(0).toUpperCase() : "G"}
            </div>
          </div>

          <form className="space-y-5" onSubmit={handleSave}>
            <div>
              <label htmlFor="fullname" className="block text-sm font-medium text-secondary mb-1">
                Full Name
              </label>
              <div className="relative">
                <Input
                  id="fullname"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pr-10"
                  disabled={!isEditing || isLoading}
                />
                <User className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-secondary mb-1">
                Email
              </label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pr-10"
                  disabled={!isEditing || isLoading}
                />
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
              </div>
            </div>
            
            <div className="pt-2">
              {isEditing ? (
                <div className="flex gap-3">
                  <Button 
                    type="submit" 
                    className="flex-1 bg-primary hover:bg-primary/90" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setIsEditing(false)}
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button 
                  type="button" 
                  className="w-full bg-primary hover:bg-primary/90" 
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </Button>
              )}
            </div>
          </form>

          <div className="mt-6 text-center">
            <Button 
              variant="outline" 
              className="w-full mt-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
              onClick={() => {
                localStorage.removeItem("userData");
                toast.success("Signed out successfully");
                navigate("/sign-in");
              }}
            >
              Sign Out
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
