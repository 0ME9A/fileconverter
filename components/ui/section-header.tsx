import { ReactNode } from "react";

type TProps = {
  title: ReactNode;
  desc: string;
};

export default function SectionHeader({ title, desc }: TProps) {
  return (
    <header className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
      <p className="text-muted-foreground text-lg">{desc}</p>
    </header>
  );
}
