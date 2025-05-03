import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { StoriesSection } from "@/components/StoriesSection";
import { FaqSection } from "@/components/FaqSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  const handleShareStory = () => {
    console.log("Share Your Story clicked");
  };

  const stories = [
    {
      id: 1,
      quote: "The daily reflections and peer support helped me develop a more positive mindset. I'm grateful for this community.",
      user: "GratefulHeart",
      fullStory: "When I first started my health journey, I felt alone and overwhelmed. Finding the GLAADOO community changed everything for me. The daily reflections gave me structure, and the peer support kept me accountable. Over time, I noticed not just physical changes, but a complete shift in my mindset. I'm now able to face challenges with gratitude and optimism. This community has truly become a cornerstone of my wellness practice."
    },
    {
      id: 2,
      quote: "Having 24/7 peer support made me feel less alone. The connections I've made here are truly meaningful.",
      user: "ConnectedSpirit",
      fullStory: "There were many nights when I struggled with my health decisions and needed someone to talk to. The 24/7 peer support feature of GLAADOO meant I always had someone there who understood what I was going through. The connections I've made aren't just surface-level - they're deep friendships with people who genuinely care about my wellbeing. I've learned so much from my peers and have been able to support others in their journeys too."
    },
    {
      id: 3,
      quote: "The GLAADOO framework helped me focus on personal growth while supporting others. It's a beautiful cycle of giving and receiving.",
      user: "GrowthMindset",
      fullStory: "Before discovering the GLAADOO framework, my approach to health was all about numbers and measurements. Now, I understand that true wellness encompasses gratitude, learning, affirmation, achievement, delight, and supporting others. By focusing on these aspects each day, I've created sustainable habits that nurture both my body and mind. The most unexpected joy has been in supporting others - there's something powerful about helping someone else while also growing yourself."
    },
  ];

  const acronymMeanings = [
    {
      letter: "G",
      word: "Gratitude",
      description: "Reflect on something you're thankful for.",
    },
    {
      letter: "L",
      word: "Lesson Learned",
      description: "Share a valuable lesson from recent experiences.",
    },
    {
      letter: "A",
      word: "Affirmation",
      description: "Express a positive statement about yourself. I am __",
    },
    {
      letter: "A",
      word: "Achievement",
      description: "Celebrate a recent success.",
    },
    {
      letter: "D",
      word: "Delight",
      description: "Describe something that brought you joy.",
    },
    {
      letter: "O",
      word: "Opportunity for Improvement",
      description: "Identify an area for growth.",
    },
    {
      letter: "O",
      word: "Opportunity to Help Another",
      description: "Reflect on how you can support others.",
    },
  ];

  const faqs = [
    {
      question: "What is GLAADOO?",
      answer: "GLAADOO is a 24/7 peer-to-peer support network designed to create meaningful connections and support for individuals on their fitness journey. Our platform focuses on creating connections before crisis and fostering a supportive community."
    },
    {
      question: "How does the matching process work?",
      answer: "Our matching process pairs you with peers based on shared goals, experience levels, and availability. We use a careful algorithm to ensure meaningful connections while maintaining everyone's privacy and comfort level."
    },
    {
      question: "How is my privacy protected on GLAADOO?",
      answer: "We take privacy seriously. All personal information is encrypted, and you have full control over what you share. You can choose to remain anonymous in the community, and we never share your information with third parties without your explicit consent."
    },
    {
      question: "What kind of technical support is available?",
      answer: "We provide 24/7 technical support through our help center, email support, and live chat. Our support team is ready to assist with any platform-related issues, account questions, or general inquiries you may have."
    },
    {
      question: "How can I join GLAADOO?",
      answer: "You can join GLAADOO by clicking the 'Connect Now' button at the top of the page. The registration process is simple and will give you immediate access to our supportive community."
    },
    {
      question: "What makes GLAADOO different from other support networks?",
      answer: "GLAADOO's unique approach combines personal reflection through our GLAADOO framework with peer support. We focus on creating meaningful connections and providing support before crisis points, rather than just during difficult times."
    },
    {
      question: "What if I need help using the platform?",
      answer: "We offer comprehensive onboarding support, including tutorial videos, user guides, and a dedicated support team to help you navigate the platform. You can access these resources through your dashboard or contact our support team directly."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <AboutSection acronymMeanings={acronymMeanings} />
      <StoriesSection stories={stories} onShareStory={handleShareStory} />
      <FaqSection faqs={faqs} />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
