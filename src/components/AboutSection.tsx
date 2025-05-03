
interface AcronymMeaning {
  letter: string;
  word: string;
  description: string;
}

interface AboutSectionProps {
  acronymMeanings: AcronymMeaning[];
}

export const AboutSection = ({ acronymMeanings }: AboutSectionProps) => {
  return (
    <section id="about" className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-8 text-center animate-fade-in">
          Our Mission
        </h2>
        <p className="text-lg text-secondary/80 mb-12 text-center leading-relaxed animate-scale-in">
          GLAADOO aims to create the largest network for peer-to-peer human connection and support,
          providing 24/7 support with a mission to create connection before crisis.
        </p>
        <div className="space-y-4">
          {acronymMeanings.map((item, index) => (
            <div 
              key={index}
              className="p-6 bg-primary text-white rounded-lg card-hover animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex items-start space-x-4">
                <span className="text-5xl font-bold text-white/90">
                  {item.letter}
                </span>
                <div>
                  <h3 className="font-bold text-xl mb-2">{item.word}</h3>
                  <p className="text-white/90">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
