import Image from "next/image";
import Link from "next/link";
import { CaretDown, PencilSimpleLine } from "@phosphor-icons/react/dist/ssr";
import { GoalProgress } from "@/components/GoalProgress";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Misiunea", href: "#misiune", active: true },
  { label: "Fondatori", href: "#fondatori" },
  { label: "Etape", href: "#etape" },
  { label: "Formular", href: "#formular" },
];

export function Hero() {
  return (
    <section
      aria-label="Introducere"
      className="relative isolate flex w-full flex-col overflow-hidden bg-background md:h-[75vh] md:min-h-[640px]"
    >
      <div className="absolute inset-0 -z-10">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/videos/hero/poster.jpeg"
          className="absolute inset-0 h-full w-full object-cover object-center opacity-70"
          aria-hidden
        >
          <source src="/videos/hero/foriasi-hero.webm" type="video/webm" />
          <source src="/videos/hero/foriasi-hero.mp4" type="video/mp4" />
        </video>
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background"
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-80 blur-[150px]"
          style={{
            background:
              "radial-gradient(ellipse 100% 100% at 0% 50%, rgba(56,189,248,0.1) 13.294%, rgba(29,98,133,0.55) 33.397%, rgba(16,52,75,0.775) 43.449%, rgba(10,30,47,0.8875) 48.474%, rgba(6,18,32,0.94375) 50.987%, rgba(3,7,18,1) 53.5%, rgba(19,20,22,0.94375) 55.783%, rgba(34,32,25,0.8875) 58.066%, rgba(65,58,33,0.775) 62.633%, rgba(96,83,40,0.6625) 67.199%, rgba(127,109,47,0.55) 71.766%, rgba(190,160,62,0.325) 80.899%, rgba(252,211,77,0.1) 90.032%)",
          }}
        />
      </div>

      <header className="relative z-10 mx-auto grid w-full max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center px-5 py-5 md:px-8 lg:px-20">
        <Link
          href="/"
          aria-label="For Iași — pagina principală"
          className="col-start-1 inline-flex items-center justify-self-start"
        >
          <Image
            src="/images/brand/for-iasi-color.svg"
            alt=""
            width={148}
            height={48}
            priority
            className="h-10 w-auto md:h-12"
          />
        </Link>

        <nav
          aria-label="Navigare principală"
          data-glass
          className="col-start-2 hidden items-center gap-0.5 rounded-full border border-white/10 bg-muted/30 p-0.5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_8px_32px_rgba(0,0,0,0.24)] backdrop-blur-xl backdrop-saturate-150 md:flex"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                item.active
                  ? "bg-brand-blue text-white shadow-xs"
                  : "text-muted-foreground hover:text-foreground",
              )}
              aria-current={item.active ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="#formular"
          aria-label="Devino membru"
          className="col-start-3 hidden size-10 place-items-center justify-self-end rounded-full bg-blue-500 text-white shadow-xs transition-[opacity,transform] duration-150 ease-out hover:opacity-90 active:scale-[0.98] md:grid"
        >
          <PencilSimpleLine size={18} weight="regular" />
        </Link>
      </header>

      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col items-center justify-center gap-10 px-5 py-16 md:px-8 md:py-12 lg:px-20">
        <div className="flex w-full flex-col items-center gap-16 px-4 lg:px-16">
          <div className="flex w-full max-w-[936px] flex-col items-center gap-6 text-center">
            <Reveal
              as="h1"
              variant="title"
              immediate
              className="font-heading text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-[72px] lg:leading-[72px] lg:tracking-[-1.5px]"
            >
              Rezervă-ți locul de{" "}
              <span className="font-serif font-normal italic tracking-tight">
                membru fondator
              </span>{" "}
              pentru un fotbal curat în Iași.
            </Reveal>
            <Reveal
              as="p"
              variant="title"
              immediate
              delay={0.15}
              className="max-w-[760px] text-base leading-6 text-muted-foreground"
            >
              A venit timpul ca suporterii ieșeni să se adune în jurul valorilor
              reale: transparență, integritate și o construcție de la bază.
              Înscrie-te pe listă și fii printre primii care pun temelia noii
              mișcări comunitare.
            </Reveal>
          </div>

          <div className="flex w-full flex-col items-center gap-8">
            <GoalProgress
              count={342}
              target={1945}
              targetLabel="Ținta simbolică"
              goalLabel="1945 de semnături"
            />
            <Link
              href="#misiune"
              className="inline-flex h-9 items-center gap-1.5 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground shadow-xs transition-[opacity,transform] duration-150 ease-out hover:opacity-90 active:scale-[0.98]"
            >
              Află mai multe
              <CaretDown size={16} weight="regular" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
