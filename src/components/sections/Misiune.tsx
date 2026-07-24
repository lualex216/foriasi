import {
  CastleTurret,
  Megaphone,
  ShieldCheckered,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

type Pillar = {
  icon: Icon;
  title: string;
  description: string;
  highlighted?: boolean;
};

const PILLARS: Pillar[] = [
  {
    icon: Megaphone,
    title: "O singură voce reprezentativă",
    description:
      "Atâta timp cât vocile noastre rămân răzlețe, lucrurile nu se vor schimba. Ne adunăm pe o listă unică pentru a demonstra că există o masă critică de oameni maturi, gata să susțină un model fotbalistic sănătos în Iași.",
  },
  {
    icon: CastleTurret,
    title: "O fundație bazată pe principii",
    description:
      "Ne unim în jurul unor valori clare: transparență, gestiune responsabilă și respect față de comunitate. Strângem rândurile de acum pentru ca viitorul proiect fotbalistic al orașului să aibă o temelie de neclintit.",
    highlighted: true,
  },
  {
    icon: ShieldCheckered,
    title: "Un spațiu independent",
    description:
      "Această mișcare nu aparține unui club, unei firme sau vreunui partid politic. Este o platformă civică a tuturor ieșenilor — suporteri, foste legende și părinți — creată exclusiv din dorința de a construi curat, de la firul ierbii.",
  },
];

export function Misiune() {
  return (
    <section
      id="misiune"
      aria-labelledby="misiune-title"
      className="w-full bg-background"
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-16 px-5 py-16 md:px-8 md:py-20 lg:px-20">
        <Reveal
          variant="title"
          className="flex w-full max-w-[720px] flex-col items-center gap-4 px-4 text-center lg:px-16"
        >
          <Badge
            variant="outline"
            className="h-7 rounded-full border-border bg-background px-3 text-sm font-normal text-foreground"
          >
            Misiunea
          </Badge>
          <h2
            id="misiune-title"
            className="font-heading text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl md:leading-[48px] md:tracking-[-1px]"
          >
            De la idei izolate, la o comunitate organizată
          </h2>
          <p className="text-base leading-6 text-muted-foreground">
            Iubitorii de fotbal din Iași s-au săturat de dezamăgiri și decizii
            luate fără consultare. Această platformă este un spațiu neutru de
            organizare pentru toți cei care cred că fotbalul local merită un nou
            început.
          </p>
        </Reveal>

        <ul
          role="list"
          className="grid w-full grid-cols-1 gap-6 lg:grid-cols-3 lg:px-16"
        >
          {PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <Reveal
                key={pillar.title}
                as="li"
                variant="card-scale"
                delay={i * 0.1}
                className={cn(
                  "relative flex flex-col gap-6 overflow-hidden rounded-lg border border-border bg-card px-8 py-10",
                  pillar.highlighted && "shadow-lg",
                )}
              >
                {pillar.highlighted ? (
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-1 bg-brand-blue"
                  />
                ) : null}
                <Icon
                  size={32}
                  weight="duotone"
                  className="shrink-0 text-brand-blue"
                  aria-hidden
                />
                <div className="flex flex-col gap-3">
                  <h3 className="font-heading text-2xl font-semibold leading-9 tracking-tight text-card-foreground md:text-3xl">
                    {pillar.title}
                  </h3>
                  <p className="text-base leading-6 text-muted-foreground">
                    {pillar.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
