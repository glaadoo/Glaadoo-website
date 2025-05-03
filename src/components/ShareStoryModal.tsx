
import React, { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface ShareStoryModalProps {
  onClose: () => void;
}

export const ShareStoryModal = ({ onClose }: ShareStoryModalProps) => {
  const [name, setName] = useState("");
  const [storyText, setStoryText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !storyText.trim()) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    // In a real application, this would send data to a server
    console.log("Submitted story:", { name, storyText });
    
    toast({
      title: "Thank you!",
      description: "Your story has been submitted successfully.",
    });
    
    setSubmitted(true);
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 max-w-md w-full z-50 animate-scale-in">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-secondary">
            {submitted ? "Thank You!" : "Share Your Story"}
          </h3>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        {submitted ? (
          <div className="mb-6 text-center">
            <p className="text-lg text-secondary/80 mb-4">
              Your story has been submitted successfully. Thank you for sharing your journey with us!
            </p>
            <Button onClick={onClose}>Close</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-secondary mb-1">
                Your Name or Username
              </label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full"
                placeholder="How you'd like to be known"
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="story" className="block text-sm font-medium text-secondary mb-1">
                Your Story
              </label>
              <Textarea
                id="story"
                value={storyText}
                onChange={(e) => setStoryText(e.target.value)}
                className="min-h-[150px] w-full"
                placeholder="Share your journey, breakthroughs, or how the GLAADOO community has helped you..."
                required
              />
            </div>
            
            <div className="flex justify-end gap-3">
              <Button variant="outline" type="button" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="bg-accent hover:bg-accent/90 text-white">
                Submit Story
              </Button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};
