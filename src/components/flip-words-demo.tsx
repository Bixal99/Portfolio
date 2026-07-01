import { FlipWords } from "@/components/ui/flip-words";

export default function FlipWordsHero() {
  const words = [
    "Dream",
    "Focus",
    "Logic",
    "Heart",
    "Skill",
    "Power",
    "Value",
    "Trust",
    "Speed",
    "Grace",
    "Grits",
    "Unity",
    "Faith",
    "Drive",
    "Spark",
    "Goals",
    "Ideas",
    "Minds",
    "Teams",
    "Hopes",
  ];

  return (
    <section className="flex w-full items-center justify-start bg-black py-10 text-left sm:py-12 lg:py-14">
      <h1 className="inline-flex items-baseline justify-start whitespace-nowrap text-[clamp(2.1rem,5vw,4.8rem)] font-bold leading-tight tracking-tight text-white">
        <span>Building the future with&nbsp;</span>
        <span className="inline-flex w-[9ch] justify-start text-left">
          <FlipWords
            words={words}
            className="theme-flip-word inline-block px-1"
          />
        </span>
      </h1>
    </section>
  );
}
