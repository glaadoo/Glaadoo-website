
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Faq {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  faqs: Faq[];
}

export const FaqSection = ({ faqs }: FaqSectionProps) => {
  return (
    <section id="faq" className="py-20 px-4 bg-muted">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-8 text-center animate-fade-in">
          Frequently Asked Questions
        </h2>
        <p className="text-lg text-secondary/80 mb-12 text-center leading-relaxed animate-scale-in">
          Get answers to common questions about GLAADOO and how we can support your journey.
        </p>
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-white rounded-lg overflow-hidden border border-gray-200"
            >
              <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-gray-50">
                <span className="text-left font-semibold text-secondary">
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 text-secondary/80">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

