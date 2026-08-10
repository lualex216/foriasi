import { Fragment } from "react";
import {
  Envelope,
  UserCirclePlus,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/Reveal";

type Step = {
  icon: Icon;
  title: string;
  description: string;
  bullets: string[];
};

const STEPS: Step[] = [
  {
    icon: UserCirclePlus,
    title: "Te înscrii în waiting-list",
    description:
      "Completezi în mai puțin de un minut formularul de pe site și îți exprimi dorința de a face parte din prima asociație independentă a suporterilor ieșeni.",
    bullets: [
      "Înscriere 100% gratuită",
      "Fără nicio obligație financiară",
      "Rezervare loc de Membru Fondator",
    ],
  },
  {
    icon: UsersThree,
    title: "Validăm înscrierile",
    description:
      "Echipa noastră centralizează datele și pregătește lista inițială a susținătorilor, demonstrând masa critică necesară pentru înființarea oficială.",
    bullets: [
      "Preluare și verificare date",
      "Construirea masei critice",
      "Confirmarea comunității unite",
    ],
  },
  {
    icon: Envelope,
    title: "Primești pe e-mail detaliile",
    description:
      "Îți trimitem pe e-mail invitația oficială, locația, data și toți pașii necesari pentru a participa la prima Adunare Generală de constituire.",
    bullets: [
      "Invitație la Adunarea Generală",
      "Ghid cu următorii pași",
      "Participare la momentul fondării",
    ],
  },
];

function CardContent({ step }: { step: Step }) {
  const Icon = step.icon;
  return (
    <>
      <span
        aria-hidden
        className="grid size-12 place-items-center rounded-md bg-muted"
      >
        <Icon size={32} weight="duotone" className="text-brand-blue" />
      </span>
      <div className="flex flex-col gap-4">
        <h3 className="font-heading text-2xl font-semibold leading-9 tracking-tight text-foreground md:text-3xl">
          {step.title}
        </h3>
        <p className="text-base leading-6 text-foreground">
          {step.description}
        </p>
        <ul role="list" className="flex flex-col gap-4">
          {step.bullets.map((bullet) => (
            <li
              key={bullet}
              className="flex items-center gap-2 text-base leading-6 text-foreground"
            >
              <span
                aria-hidden
                className="grid size-4 shrink-0 place-items-center"
              >
                <span className="size-2 rounded-full bg-brand-amber" />
              </span>
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export function Etape() {
  return (
    <section
      id="etape"
      aria-labelledby="etape-title"
      className="w-full bg-background"
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 px-5 py-16 md:px-8 md:py-20 lg:px-20">
        <Reveal
          variant="title"
          className="flex flex-col items-center gap-4 text-center lg:px-16"
        >
          <Badge
            variant="outline"
            className="h-7 rounded-full border-border bg-background px-3 text-sm font-normal text-foreground"
          >
            Etape
          </Badge>
          <h2
            id="etape-title"
            className="font-heading text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl md:leading-10 md:tracking-[-1px]"
          >
            Drumul de la susținător la membru fondator
          </h2>
        </Reveal>

        <div className="flex flex-col gap-6 lg:px-16">
          {/* Mobile + tablet: vertical timeline (stepper column + card) */}
          <ol
            aria-label="Etapele înscrierii"
            className="relative flex flex-col gap-8 lg:hidden"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute bottom-4 left-4 top-4 w-px -translate-x-1/2 bg-border"
            />
            {STEPS.map((step, i) => (
              <li key={step.title} className="relative flex items-start gap-4">
                <span
                  aria-hidden
                  className="relative z-10 mt-1 grid size-8 shrink-0 place-items-center rounded-full bg-muted text-lg font-medium text-foreground"
                >
                  {i + 1}
                </span>
                <Reveal
                  variant="card-scale"
                  delay={i * 0.1}
                  className="flex flex-1 flex-col gap-6 rounded-lg border border-border bg-card p-6"
                >
                  <CardContent step={step} />
                </Reveal>
              </li>
            ))}
          </ol>

          {/* Desktop: horizontal stepper above 3-col grid */}
          <ol
            aria-label="Etapele înscrierii"
            className="hidden items-center px-16 lg:flex lg:px-32"
          >
            {STEPS.map((_, i, arr) => (
              <Fragment key={i}>
                <li className="grid size-8 shrink-0 place-items-center rounded-full bg-muted text-lg font-medium text-foreground">
                  {i + 1}
                </li>
                {i < arr.length - 1 && (
                  <span aria-hidden className="h-px flex-1 bg-border" />
                )}
              </Fragment>
            ))}
          </ol>

          <ol className="hidden w-full grid-cols-3 gap-6 lg:grid">
            {STEPS.map((step, i) => (
              <Reveal
                key={step.title}
                as="li"
                variant="card-scale"
                delay={i * 0.12}
                hover
                className="flex flex-col gap-8 rounded-lg border border-border bg-card p-8 transition-colors duration-300 ease-out hover:border-brand-blue/40 hover:bg-brand-blue/5 hover:shadow-xl"
              >
                <CardContent step={step} />
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
