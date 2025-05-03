import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { User, Lock } from "lucide-react";

const SignIn = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<"signin" | "google" | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [savedEmail, setSavedEmail] = useState("");

  useEffect(() => {
    // Check if we have user data in localStorage
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      if (parsedData.email) {
        setSavedEmail(parsedData.email);
        setEmail(parsedData.email);
      }
    }
  }, []);

  // Simulate simple login (no backend logic, just UI feedback)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading("signin");
    
    // If there's no saved data, create a simple object
    if (!localStorage.getItem("userData")) {
      localStorage.setItem("userData", JSON.stringify({ 
        email,
        fullName: email.split('@')[0] // Simple fallback for name
      }));
    }
    
    setTimeout(() => {
      setIsLoading(null);
      toast.success("Signed in successfully!");
      navigate("/glaadoo-form");
    }, 1500);
  };

  // Simulate Google login
  const handleGoogleLogin = () => {
    setIsLoading("google");
    
    // Create mock Google user data
    const googleUserData = {
      email: "user@gmail.com",
      fullName: "Google User"
    };
    
    localStorage.setItem("userData", JSON.stringify(googleUserData));
    
    setTimeout(() => {
      setIsLoading(null);
      toast.success("Signed in with Google successfully!");
      navigate("/glaadoo-form");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-lg animate-fade-in">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-primary">GLAADOO</h2>
          <p className="mt-2 text-muted-foreground">
            Sign in to access your GLAADOO account
          </p>
        </div>
        
        {/* Email/Password Login Form */}
        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-secondary mb-1">
              Email
            </label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pr-10"
                disabled={isLoading !== null}
              />
              <User className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5"/>
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-secondary mb-1">
              Password
            </label>
            <div className="relative">
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pr-10"
                disabled={isLoading !== null}
              />
              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5"/>
            </div>
          </div>
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading !== null}>
            {isLoading === "signin" ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-muted"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-muted-foreground">Or</span>
          </div>
        </div>
        
        {/* Google Login Button */}
        <Button
          type="button"
          variant="outline"
          className="w-full flex items-center justify-center gap-2 hover:bg-primary hover:text-primary-foreground"
          onClick={handleGoogleLogin}
          disabled={isLoading !== null}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
            <path d="M1 1h22v22H1z" fill="none" />
          </svg>
          {isLoading === "google" ? "Signing in..." : "Sign in with Google"}
        </Button>

        <div className="text-center text-sm text-muted-foreground space-y-2">
          <p>
            Forgot your password?{" "}
            <Link to="/reset-password" className="text-primary hover:underline cursor-pointer">Reset</Link>
          </p>
          <p>
            Don&apos;t have an account?{" "}
            <Link to="/sign-up" className="text-primary hover:underline font-medium">
              Sign Up
            </Link>
          </p>
          <p>
            By signing in, you agree to our{" "}
            <a href="/terms" className="text-primary hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
