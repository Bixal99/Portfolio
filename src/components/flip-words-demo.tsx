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
    <section className="flex w-full items-center justify-center overflow-x-hidden bg-black py-10 text-center sm:py-12 lg:py-14">
      <h1 className="flex shrink-0 translate-x-16 items-baseline justify-center whitespace-nowrap text-[clamp(1.5rem,4.8vw,5.4rem)] font-bold leading-tight tracking-tight text-white sm:translate-x-24 lg:translate-x-32">
        <span className="whitespace-nowrap">Building the future with&nbsp;</span>
        <span className="inline-flex w-[9ch] shrink-0 justify-start whitespace-nowrap text-left">
          <FlipWords
            words={words}
            className="theme-flip-word inline-block px-1"
          />
        </span>
      </h1>
    </section>
  );
}
