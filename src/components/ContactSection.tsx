
import { Button } from "@/components/ui/button";

export const ContactSection = () => {
  return (
    <section id="contact" className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6 animate-fade-in">
          Get in Touch
        </h2>
        <p className="text-lg text-secondary/80 mb-8 animate-scale-in">
          Have questions or want to learn more about GLAADOO? We'd love to hear from you.
        </p>
        <Button 
          className="bg-primary hover:bg-primary/90 text-white px-8 py-6 rounded-full hover-lift"
          onClick={() => window.location.href = "mailto:contact@glaadoo.com"}
        >
          Email Us
        </Button>
      </div>
    </section>
  );
};
