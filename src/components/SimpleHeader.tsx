
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export const SimpleHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = JSON.parse(localStorage.getItem("userData") || "null");
  const isSignInPage = location.pathname === "/sign-in";
  const isGlaadooFormPage = location.pathname === "/glaadoo-form";

  const handleLogoClick = () => {
    // Navigate to home page
    navigate("/");
  };

  const handleSignOut = () => {
    localStorage.removeItem("userData");
    navigate("/sign-in");
  };

  return (
    <header className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span 
              onClick={handleLogoClick}
              className="text-2xl font-bold text-primary p-0 mr-2 cursor-pointer"
            >
              GLAADOO
            </span>
          </div>

          {/* User Profile */}
          <div>
            {userData ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 rounded-full p-0">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-white">
                        {userData.fullName ? userData.fullName.charAt(0).toUpperCase() : "G"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              !isSignInPage && !isGlaadooFormPage && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate("/sign-in")}
                >
                  Sign In
                </Button>
              )
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
