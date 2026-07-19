type AnimatedSectionProps = {
  id: string;
  className?: string;
  children: React.ReactNode;
};

export function AnimatedSection({
  id,
  className = "",
  children,
}: AnimatedSectionProps) {
  return (
    <section
      id={id}
      className={`relative isolate scroll-mt-24 overflow-x-clip py-28 sm:py-32 lg:py-36 ${className}`}
    >
      {children}
    </section>
  );
}

