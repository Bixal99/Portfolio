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
    <section className="grid w-full place-items-center bg-black px-4 py-8 text-center sm:px-6 sm:py-12 lg:py-14">
      <h1 className="mx-auto flex max-w-full flex-wrap items-baseline justify-center gap-x-2 gap-y-1 text-center text-[clamp(1.25rem,6.5vw,5.4rem)] font-bold leading-tight tracking-tight text-white sm:flex-nowrap sm:gap-x-0 sm:whitespace-nowrap sm:text-[clamp(1.5rem,4.8vw,5.4rem)]">
        <span className="text-balance sm:whitespace-nowrap">
          Building the future with&nbsp;
        </span>
        <span className="inline-flex min-w-[5.5ch] justify-center sm:min-w-[6ch] sm:justify-start">
          <FlipWords
            words={words}
            className="theme-flip-word inline-block px-1"
          />
        </span>
      </h1>
    </section>
  );
}
