
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { StoryModal } from "@/components/StoryModal";
import { ShareStoryModal } from "@/components/ShareStoryModal";

interface Story {
  id: number;
  quote: string;
  user: string;
  fullStory?: string;
}

interface StoriesSectionProps {
  stories: Story[];
  onShareStory: () => void;
}

export const StoriesSection = ({ stories, onShareStory }: StoriesSectionProps) => {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Get the user's full name from localStorage if available
    const savedUserData = localStorage.getItem("userData");
    if (savedUserData) {
      const userData = JSON.parse(savedUserData);
      setUserName(userData.fullName || "");
    }
  }, []);

  const openStoryModal = (story: Story) => {
    setSelectedStory(story);
  };

  const closeStoryModal = () => {
    setSelectedStory(null);
  };

  const handleOpenShareModal = () => {
    if (onShareStory) {
      onShareStory();
    }
    setShowShareModal(true);
  };

  const handleCloseShareModal = () => {
    setShowShareModal(false);
  };

  return (
    <section id="stories" className="py-20 px-4" style={{ backgroundColor: "#f0f7f7" }}>
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4 text-center animate-fade-in">
          {userName ? `${userName}'s Better Body Breakthroughs` : "Better Body Breakthroughs"}
        </h2>
        <p className="text-lg text-secondary/80 mb-12 text-center max-w-2xl mx-auto animate-scale-in">
          Real stories from our community members who have transformed their lives through connection and support.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {stories.map((story) => (
            <div
              key={story.id}
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 animate-fade-in card-hover"
              style={{ animationDelay: `${story.id * 0.2}s` }}
            >
              <div className="flex flex-col h-full">
                <blockquote className="text-secondary/80 mb-4 flex-grow">
                  "{story.quote}"
                </blockquote>
                <div className="mt-4">
                  <p className="font-medium text-primary">{story.user}</p>
                  <Button
                    variant="ghost"
                    className="mt-2 text-white bg-primary hover:bg-primary/90"
                    onClick={() => openStoryModal(story)}
                  >
                    Read More
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center animate-fade-in mb-16">
          <Button
            className="bg-primary hover:bg-primary/90 text-white px-8 py-6 rounded-full hover-lift"
            onClick={handleOpenShareModal}
          >
            Share Your Story
          </Button>
        </div>
      </div>

      {selectedStory && (
        <StoryModal story={selectedStory} onClose={closeStoryModal} />
      )}

      {showShareModal && (
        <ShareStoryModal onClose={handleCloseShareModal} />
      )}
    </section>
  );
};
