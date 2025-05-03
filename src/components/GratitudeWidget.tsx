
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import * as tf from '@tensorflow/tfjs';
import * as toxicity from '@tensorflow-models/toxicity';
import { Smile, Frown, AlertTriangle, Loader2 } from "lucide-react";

type ReflectionEntry = {
  gratitude: string;
  lessonLearned: string;
  affirmation: string;
  achievement: string;
  delight: string;
  improvementOpportunity: string;
  helpOpportunity: string;
};

type SentimentResult = {
  label: string;
  score: number;
} | null;

const emptyReflection: ReflectionEntry = {
  gratitude: "",
  lessonLearned: "",
  affirmation: "",
  achievement: "",
  delight: "",
  improvementOpportunity: "",
  helpOpportunity: "",
};

export const GratitudeWidget = () => {
  const [reflection, setReflection] = useState<ReflectionEntry>(emptyReflection);
  const [sentimentModel, setSentimentModel] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [sentiment, setSentiment] = useState<SentimentResult>(null);
  const [aiLoading, setAiLoading] = useState(true);
  const { toast } = useToast();

  // Initialize the TensorFlow toxicity model for sentiment analysis
  useEffect(() => {
    const loadModel = async () => {
      try {
        setAiLoading(true);
        // Load the toxicity model
        await tf.ready();
        const threshold = 0.5;
        const model = await toxicity.load(threshold, ['toxicity']);
        setSentimentModel(model);
      } catch (error) {
        console.error("Error loading TensorFlow model:", error);
        toast({
          variant: "destructive",
          title: "Model Loading Error",
          description: "Could not load the sentiment analysis model. Some features may be limited.",
        });
      } finally {
        setAiLoading(false);
      }
    };

    loadModel();
  }, [toast]);

  const handleInputChange = (field: keyof ReflectionEntry, value: string) => {
    setReflection(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const analyzeSentiment = async () => {
    if (!sentimentModel) return;
    
    try {
      setIsAnalyzing(true);
      
      // Combine all reflection entries for sentiment analysis
      const combinedText = Object.values(reflection).join(" ");
      
      if (!combinedText.trim()) {
        toast({
          title: "Nothing to analyze",
          description: "Please fill in some reflection entries first.",
        });
        return;
      }
      
      // Run inference with TensorFlow model
      const predictions = await sentimentModel.classify([combinedText]);
      const toxicityResult = predictions[0];
      const isToxic = toxicityResult.results[0].match;
      const toxicityScore = toxicityResult.results[0].probabilities[1]; // Probability of being toxic
      
      // Convert toxicity score to sentiment (inverse relationship - high toxicity means negative sentiment)
      const sentimentResult = {
        label: isToxic ? "NEGATIVE" : "POSITIVE",
        score: isToxic ? toxicityScore : 1 - toxicityScore
      };
      
      setSentiment(sentimentResult);
      
      // Show toast with sentiment result
      if (sentimentResult.label === "POSITIVE") {
        toast({
          title: "Positive Reflection",
          description: "Your reflection has a positive sentiment! Keep up the good mindset.",
        });
      } else {
        toast({
          title: "Growth Opportunity",
          description: "Your reflection seems to focus on challenges. That's okay - growth often comes from difficulties.",
        });
      }
    } catch (error) {
      console.error("Error analyzing sentiment:", error);
      toast({
        variant: "destructive",
        title: "Analysis Error",
        description: "Could not analyze the sentiment of your reflection.",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if all fields are filled
    const emptyFields = Object.entries(reflection)
      .filter(([_, value]) => !value.trim())
      .map(([key, _]) => key);

    if (emptyFields.length > 0) {
      toast({
        variant: "destructive",
        title: "Please fill in all fields",
        description: `Missing entries: ${emptyFields.join(", ")}`,
      });
      return;
    }

    console.log("GLAADOO reflection submitted:", reflection);
    toast({
      title: "Thank you!",
      description: "Your reflection has been recorded.",
    });
    setReflection(emptyReflection);
    setSentiment(null);
  };

  const sections = [
    {
      id: "gratitude",
      label: "Gratitude",
      placeholder: "What are you thankful for today?",
    },
    {
      id: "lessonLearned",
      label: "Lesson Learned",
      placeholder: "What valuable lesson did you learn recently?",
    },
    {
      id: "affirmation",
      label: "Affirmation",
      placeholder: "Express a positive statement about yourself. I am...",
    },
    {
      id: "achievement",
      label: "Achievement",
      placeholder: "What recent success would you like to celebrate?",
    },
    {
      id: "delight",
      label: "Delight",
      placeholder: "What brought you joy today?",
    },
    {
      id: "improvementOpportunity",
      label: "Opportunity for Improvement",
      placeholder: "What area would you like to grow in?",
    },
    {
      id: "helpOpportunity",
      label: "Opportunity to Help Another",
      placeholder: "How can you support someone else?",
    },
  ];

  const renderSentimentIndicator = () => {
    if (aiLoading) {
      return (
        <div className="flex items-center justify-center space-x-2 text-secondary text-sm">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Loading AI model...</span>
        </div>
      );
    }
    
    if (!sentiment) return null;
    
    return (
      <div className={`flex items-center mt-4 p-3 rounded-md ${
        sentiment.label === "POSITIVE" 
          ? "bg-green-50 text-green-700" 
          : "bg-amber-50 text-amber-700"
      }`}>
        {sentiment.label === "POSITIVE" ? (
          <Smile className="h-5 w-5 mr-2" />
        ) : (
          <Frown className="h-5 w-5 mr-2" />
        )}
        <span className="font-medium">
          {sentiment.label === "POSITIVE" 
            ? "Your reflection has a positive tone" 
            : "Your reflection is focused on challenges"}
        </span>
        <span className="ml-1 text-sm opacity-75">
          ({Math.round(sentiment.score * 100)}% confidence)
        </span>
      </div>
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6 border border-gray-200 animate-fade-in">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-secondary">
            GLAADOO Reflection
          </h3>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={aiLoading || isAnalyzing || Object.values(reflection).every(v => !v.trim())}
            onClick={analyzeSentiment}
            className="flex items-center gap-1"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <AlertTriangle className="h-4 w-4" />
                <span>Analyze Sentiment</span>
              </>
            )}
          </Button>
        </div>
        
        {renderSentimentIndicator()}
        
        <div className="space-y-6">
          {sections.map((section) => (
            <div key={section.id} className="space-y-2">
              <label 
                htmlFor={section.id}
                className="block text-sm font-medium text-secondary"
              >
                {section.label}
              </label>
              <Textarea
                id={section.id}
                value={reflection[section.id as keyof ReflectionEntry]}
                onChange={(e) => handleInputChange(section.id as keyof ReflectionEntry, e.target.value)}
                placeholder={section.placeholder}
                className="min-h-[80px] resize-none"
              />
            </div>
          ))}
        </div>

        <Button 
          type="submit"
          className="w-full bg-accent hover:bg-accent/90 text-white"
        >
          Submit Reflection
        </Button>
      </form>
    </div>
  );
};
