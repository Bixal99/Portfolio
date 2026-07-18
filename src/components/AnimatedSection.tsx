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
    <section id={id} className={`scroll-mt-24 py-14 sm:py-16 lg:py-20 ${className}`}>
      {children}
    </section>
  );
}

