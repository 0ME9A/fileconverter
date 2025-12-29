import { ReactNode } from "react";

type TProps = {
  title: ReactNode;
  desc: string;
};

export default function PageHeader({ title, desc }: TProps) {
  return (
    <header className="text-center space-y-4">
      <h1 className="text-4xl md:text-5xl font-bold">{title}</h1>
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{desc}</p>
    </header>
  );
}
