
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { AlertTriangle, User } from "lucide-react";
import { SimpleHeader } from "@/components/SimpleHeader";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

type FormEntry = {
  gratitude: string;
  lessonLearned: string;
  affirmation: string;
  achievement: string;
  delight: string;
  opportunityBetter: string;
  opportunityHelp: string;
};

const GlaadooForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormEntry>({
    gratitude: "",
    lessonLearned: "",
    affirmation: "",
    achievement: "",
    delight: "",
    opportunityBetter: "",
    opportunityHelp: ""
  });
  
  const [invalidFields, setInvalidFields] = useState<string[]>([]);
  const [userData] = useState(() => {
    const savedData = localStorage.getItem("userData");
    return savedData ? JSON.parse(savedData) : null;
  });

  const handleInputChange = (field: keyof FormEntry, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Remove field from invalid fields when user starts typing
    if (invalidFields.includes(field)) {
      setInvalidFields(prev => prev.filter(f => f !== field));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if all fields are filled
    const emptyFields = Object.entries(formData)
      .filter(([_, value]) => !value.trim())
      .map(([key, _]) => key);

    if (emptyFields.length > 0) {
      // Set invalid fields to highlight them
      setInvalidFields(emptyFields);
      
      // Display toast with missing entries
      toast.error("Please fill in all missing entries", {
        icon: <AlertTriangle className="h-5 w-5 text-red-500" />,
        description: `Missing: ${emptyFields.map(field => 
          formSections.find(section => section.field === field)?.title
        ).join(", ")}`,
      });
      return;
    }

    // Clear any invalid fields
    setInvalidFields([]);

    // Submit the form
    toast.success("Your GLAADOO reflection has been saved!");
    console.log("Form submitted:", formData);
    
    // Navigate to video conference page with form data
    setTimeout(() => {
      navigate("/video-conference", { 
        state: { glaadooData: formData } 
      });
    }, 1500);
  };

  const formSections = [
    {
      letter: "G",
      title: "Gratitude",
      field: "gratitude",
      prompt: "Today I'm grateful for..."
    },
    {
      letter: "L",
      title: "Lesson Learned",
      field: "lessonLearned",
      prompt: "Advice I would give my younger self from today would be..."
    },
    {
      letter: "A",
      title: "Affirmation",
      field: "affirmation",
      prompt: "Today I affirm I am (e.g. \"I'm Beautiful\")"
    },
    {
      letter: "A",
      title: "Achievement",
      field: "achievement",
      prompt: "In the last 24hr I've achieved... (This could be as simple as waking up)"
    },
    {
      letter: "D",
      title: "Delight",
      field: "delight",
      prompt: "Today I am delighted by... (Think of something that brought you joy in the last 24 hours)"
    },
    {
      letter: "O",
      title: "Opportunity to Better",
      field: "opportunityBetter",
      prompt: "Something I would like to work out within myself would be..."
    },
    {
      letter: "O",
      title: "Opportunity to Help Another",
      field: "opportunityHelp",
      prompt: "Opportunity to make someones day a little better."
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="sticky top-0 z-10">
        <SimpleHeader />
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="container mx-auto px-4 flex justify-between items-center h-12">
            <div className="text-sm text-secondary font-medium">
              GLAADOO Reflection Form
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 py-12 px-4 mt-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary">Reflection</h1>
            <p className="text-muted-foreground mt-2">
              Take a moment to reflect on your day and fill out this form.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {formSections.map((section) => {
              const isInvalid = invalidFields.includes(section.field);
              
              return (
                <div 
                  key={section.field}
                  className={`rounded-lg overflow-hidden ${isInvalid 
                    ? "ring-2 ring-red-500 shadow-[0_0_15px_rgba(234,56,76,0.3)]" 
                    : ""}`}
                >
                  <div className="flex items-stretch bg-primary">
                    <div className="flex items-center justify-center text-white text-7xl font-bold p-6 w-32">
                      {section.letter}
                    </div>
                    <div className="flex-1 p-6">
                      <h3 className="text-xl font-semibold text-white">{section.title}</h3>
                      <p className="text-white/90 text-sm mb-4">{section.prompt}</p>
                      <Textarea
                        value={formData[section.field as keyof FormEntry]}
                        onChange={(e) => handleInputChange(section.field as keyof FormEntry, e.target.value)}
                        placeholder="Type your response here..."
                        className={`min-h-[80px] w-full bg-white border-white resize-none ${
                          isInvalid 
                            ? "border-red-500 bg-red-50 text-gray-800 placeholder:text-red-300"
                            : "text-gray-800 placeholder:text-gray-400"
                        }`}
                      />
                      {isInvalid && (
                        <div className="text-red-500 text-sm mt-2 flex items-center">
                          <AlertTriangle className="h-4 w-4 mr-1" /> 
                          This field is required
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            <Button 
              type="submit"
              className="w-full mt-8 bg-primary hover:bg-primary/90 text-white py-6 text-lg"
            >
              Submit Reflection
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GlaadooForm;
