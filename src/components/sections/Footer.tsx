import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Misiune", href: "#misiune" },
  { label: "Fondatori", href: "#fondatori" },
  { label: "Etape", href: "#etape" },
  { label: "Înscrie-te", href: "#formular" },
];

const SOCIAL_LINKS = [
  { label: "Facebook", href: "https://facebook.com/foriasi" },
  { label: "Instagram", href: "https://instagram.com/foriasi" },
  { label: "WhatsApp", href: "https://wa.me/40000000000" },
];

const LEGAL_LINKS = [
  { label: "Termeni și condiții", href: "/termeni-si-conditii" },
  {
    label: "Politica de confidențialitate",
    href: "/politica-de-confidentialitate",
  },
  { label: "Politica de cookie-uri", href: "/politica-de-cookies" },
  { label: "ANPC", href: "https://anpc.ro", external: true },
];

export function Footer() {
  return (
    <footer className="w-full bg-background">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-16 px-5 py-16 md:px-8 md:py-24 lg:px-20">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-6 lg:px-16">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:gap-6">
            <Image
              src="/images/brand/for-iasi-mono.svg"
              alt=""
              width={82}
              height={72}
              className="h-16 w-auto md:h-[72px]"
            />
            <div className="flex flex-col gap-2 md:max-w-[556px]">
              <h2 className="font-heading text-4xl leading-tight tracking-tight text-foreground md:text-5xl md:leading-[60px] md:tracking-[-1.5px] lg:text-6xl">
                <span className="font-normal">Din pasiune. </span>
                <span className="font-semibold">Pentru Iași.</span>
              </h2>
              <p className="text-base leading-6 text-foreground/90">
                O mișcare comunitară independentă, creată pentru a uni
                suporterii și a pune bazele unui fotbal curat, transparent și
                sustenabil în orașul nostru.
              </p>
            </div>
          </div>

          <div className="flex gap-12 lg:pl-12">
            <nav
              aria-label="Navigare secundară"
              className="flex flex-col gap-4"
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-base text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <nav
              aria-label="Rețele sociale"
              className="flex flex-col gap-4"
            >
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className="flex flex-col-reverse items-start gap-6 border-t border-border pt-12 md:flex-row md:items-center md:justify-between lg:px-16">
          <p className="text-sm text-muted-foreground">
            ©2026 Asociația „For Iași”. Toate drepturile rezervate.
          </p>
          <ul className="flex flex-wrap items-center gap-x-8 gap-y-2">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                {link.external ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-foreground transition-opacity hover:opacity-80"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    className="text-sm text-foreground transition-opacity hover:opacity-80"
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
