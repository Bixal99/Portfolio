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
    <section id={id} className={`scroll-mt-24 py-20 sm:py-24 lg:py-28 ${className}`}>
      {children}
    </section>
  );
}

