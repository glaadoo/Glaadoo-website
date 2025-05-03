
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <section className="pt-32 pb-20 px-4 animate-gradient text-white">
      <div className="container mx-auto text-center max-w-4xl animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-float">
          Connect & Support
        </h1>
        <p className="text-xl md:text-2xl mb-8 leading-relaxed animate-scale-in">
          Join GLAADOO, your 24/7 peer-to-peer support network for creating meaningful connections and building lasting relationships.
        </p>
        <Button 
          className="bg-primary hover:bg-primary/90 text-white text-lg px-8 py-6 rounded-full hover-lift"
          asChild
        >
          <Link to="/sign-in">
            Connect Now <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
};
