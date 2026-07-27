import Image from "next/image";
import Link from "next/link";
import {
  BellRinging,
  CaretDown,
  ChatTeardropText,
  Megaphone,
  Scroll,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/Reveal";

type Benefit = {
  icon: Icon;
  description: string;
};

const BENEFITS: Benefit[] = [
  {
    icon: Scroll,
    description:
      "Numele tău va fi înscris în registrul inițial al comunității de suporteri care au pornit această mișcare.",
  },
  {
    icon: BellRinging,
    description:
      "Vei fi primul notificat în momentul în care asociația va fi înființată și se va deschide etapa de organizare/cotizații.",
  },
  {
    icon: ChatTeardropText,
    description:
      "Vei primi pe email chestionare și sondaje prin care poți contribui direct la conturarea regulilor și principiilor noastre.",
  },
  {
    icon: Megaphone,
    description:
      "Vei fi informat în premieră despre pașii pe care îi face comunitatea noastră pentru unificarea tuturor energiilor din oraș.",
  },
];

export function Fondatori() {
  return (
    <section
      id="fondatori"
      aria-labelledby="fondatori-title"
      className="w-full bg-background"
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 px-5 py-16 md:px-8 md:py-20 lg:px-20">
        <Reveal variant="title" className="flex flex-col gap-4 lg:px-16">
          <Badge
            variant="outline"
            className="h-7 self-start rounded-full border-border bg-background px-3 text-sm font-normal text-foreground"
          >
            Fondatori
          </Badge>
          <h2
            id="fondatori-title"
            className="font-heading text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl md:leading-10 md:tracking-[-1px]"
          >
            De ce să te înscrii în această etapă?
          </h2>
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <p className="max-w-[720px] text-base leading-6 text-muted-foreground">
              Înscrierea pe listă este 100% gratuită și nu implică nicio
              obligație financiară imediată. Este un act de adeziune civică și
              morală care îți garantează: statutul de membru fondator, acces
              prioritar, o voce în consultările inițiale și transparență de la
              prima zi.
            </p>
            <Link
              href="#formular"
              className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full border border-border bg-primary px-5 text-sm font-medium text-primary-foreground shadow-lg transition-[background-color,transform] duration-150 ease-out hover:bg-primary/90 active:scale-[0.98]"
            >
              Completează formularul
              <CaretDown size={16} weight="regular" />
            </Link>
          </div>
        </Reveal>

        <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2 lg:px-16">
          <Reveal
            as="figure"
            variant="card-slide"
            className="relative aspect-[4/3] overflow-hidden rounded-lg lg:aspect-auto lg:h-[520px]"
          >
            <Image
              src="/images/fondatori/supporters.png"
              alt="Suporteri ai fotbalului ieșean cu steaguri și eșarfe albastru-albe pe stadion"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-center"
            />
            <div
              aria-hidden
              className="absolute inset-0 opacity-70 mix-blend-color blur-[80px]"
              style={{
                background:
                  "radial-gradient(ellipse 100% 100% at 0% 50%, rgba(56,189,248,0.15) 13.294%, rgba(29,98,133,0.55) 33.397%, rgba(16,52,75,0.775) 43.449%, rgba(10,30,47,0.8875) 48.474%, rgba(6,18,32,0.94375) 50.987%, rgba(3,7,18,1) 53.5%, rgba(19,20,22,0.94375) 55.783%, rgba(34,32,25,0.8875) 58.066%, rgba(65,58,33,0.775) 62.633%, rgba(96,83,40,0.6625) 67.199%, rgba(127,109,47,0.55) 71.766%, rgba(190,160,62,0.325) 80.899%, rgba(252,211,77,0.15) 90.032%)",
              }}
            />
            <blockquote className="absolute inset-8 flex items-center rounded-md bg-background/80 p-8 backdrop-blur-sm md:inset-16 md:p-10">
              <p className="font-sans text-2xl font-medium leading-snug tracking-tight text-foreground md:text-4xl md:leading-10 md:tracking-[-1px]">
                „Singuri putem face atât de puțin; împreună putem face atât de
                mult.”
              </p>
            </blockquote>
          </Reveal>

          <ul
            role="list"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:h-[520px] lg:grid-rows-2"
          >
            {BENEFITS.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <Reveal
                  key={i}
                  as="li"
                  variant="card-slide"
                  delay={0.1 + i * 0.1}
                  className="flex flex-col justify-between gap-8 rounded-lg bg-blue-950/30 p-8"
                >
                  <Icon
                    size={32}
                    weight="duotone"
                    className="shrink-0 text-brand-blue"
                    aria-hidden
                  />
                  <p className="text-base leading-6 text-foreground">
                    {benefit.description}
                  </p>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
