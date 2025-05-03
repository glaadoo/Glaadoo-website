
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Mail } from "lucide-react";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate password reset email being sent
    setTimeout(() => {
      setIsLoading(false);
      setResetSent(true);
      toast.success("Password reset instructions sent to your email!");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-lg animate-fade-in">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-primary">Reset Password</h2>
          <p className="mt-2 text-muted-foreground">
            {!resetSent 
              ? "Enter your email to receive password reset instructions" 
              : "Check your email for reset instructions"}
          </p>
        </div>

        {!resetSent ? (
          <form className="space-y-5" onSubmit={handleSubmit}>
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
                  disabled={isLoading}
                />
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Sending..." : "Confirm"}
            </Button>
          </form>
        ) : (
          <div className="space-y-5">
            <p className="text-center">
              We've sent an email to <strong>{email}</strong> with instructions to reset your password.
            </p>
            <Button onClick={() => navigate("/sign-in")} className="w-full">
              Return to Sign In
            </Button>
          </div>
        )}

        <div className="text-center text-sm text-muted-foreground mt-2">
          <p>
            Remember your password?{" "}
            <Link to="/sign-in" className="text-primary hover:underline font-medium">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
