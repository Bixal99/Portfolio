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
    <section className="flex items-center justify-center bg-black px-4 py-24 text-center sm:py-28 lg:translate-x-12 lg:py-32 xl:translate-x-20">
      <h1 className="inline-flex items-baseline justify-center whitespace-nowrap text-[clamp(1.25rem,5vw,4.8rem)] font-bold leading-tight tracking-tight text-white">
        <span>Build the future with&nbsp;</span>
        <span className="inline-flex w-[10ch] justify-start text-left">
          <FlipWords
            words={words}
            className="theme-flip-word inline-block px-1"
          />
        </span>
      </h1>
    </section>
  );
}
