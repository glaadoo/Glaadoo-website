
import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Story {
  id: number;
  quote: string;
  user: string;
  fullStory?: string;
}

interface StoryModalProps {
  story: Story;
  onClose: () => void;
}

export const StoryModal = ({ story, onClose }: StoryModalProps) => {
  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 max-w-md w-full z-50 animate-scale-in">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-secondary">{story.user}'s Story</h3>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="mb-6">
          <blockquote className="text-lg italic text-secondary/80 mb-4">
            "{story.quote}"
          </blockquote>
          
          <div className="text-secondary/80">
            {story.fullStory || 
              "The journey to better health and wellness isn't always easy, but through the support of our GLAADOO community, I've found the strength and motivation to make lasting changes. The daily practice of gratitude and reflection has transformed not just my physical health, but my entire outlook on life."}
          </div>
        </div>
        
        <div className="text-right">
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </>
  );
};
