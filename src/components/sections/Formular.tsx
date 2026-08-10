"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "motion/react";
import {
  CaretDown,
  CheckCircle,
  DownloadSimple,
} from "@phosphor-icons/react/dist/ssr";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

type CountryCode = "RO" | "MD" | "GB" | "DE" | "FR" | "IT" | "ES" | "US";

type Country = {
  code: CountryCode;
  dial: string;
  name: string;
};

const COUNTRIES: Country[] = [
  { code: "RO", dial: "+40", name: "România" },
  { code: "MD", dial: "+373", name: "Republica Moldova" },
  { code: "GB", dial: "+44", name: "Marea Britanie" },
  { code: "DE", dial: "+49", name: "Germania" },
  { code: "FR", dial: "+33", name: "Franța" },
  { code: "IT", dial: "+39", name: "Italia" },
  { code: "ES", dial: "+34", name: "Spania" },
  { code: "US", dial: "+1", name: "Statele Unite" },
];

const ROLES = [
  { id: "fost-sportiv", label: "Fost sportiv" },
  { id: "iubitor-sport", label: "Iubitor de sport" },
  { id: "jurnalist", label: "Jurnalist" },
  { id: "om-afaceri", label: "Om de afaceri" },
  { id: "parinte-junior", label: "Părinte junior" },
  { id: "persoana-publica", label: "Persoană publică" },
  { id: "politician", label: "Politician" },
  { id: "suporter-activ", label: "Suporter activ" },
] as const;

const formSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Numele trebuie să aibă cel puțin 2 caractere")
    .max(120, "Numele este prea lung"),
  email: z.email("Adresa de email nu este validă"),
  phoneNumber: z
    .string()
    .trim()
    .regex(
      /^[0-9\s-]{6,15}$/,
      "Introdu doar cifrele numărului (ex: 755 123 456)",
    ),
  roles: z.array(z.string()),
  termsAccepted: z.literal(true, {
    error: "Trebuie să accepți termenii pentru a te înscrie",
  }),
});

type FormValues = z.infer<typeof formSchema>;

function Flag({ code }: { code: CountryCode }) {
  return (
    <span
      aria-hidden
      className="inline-flex h-3 w-[18px] shrink-0 items-center justify-center overflow-hidden rounded-[2px] ring-1 ring-inset ring-border/60"
    >
      {FLAGS[code]}
    </span>
  );
}

const FLAGS: Record<CountryCode, React.ReactElement> = {
  RO: (
    <svg viewBox="0 0 3 2" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect x="0" width="1" height="2" fill="#002B7F" />
      <rect x="1" width="1" height="2" fill="#FCD116" />
      <rect x="2" width="1" height="2" fill="#CE1126" />
    </svg>
  ),
  MD: (
    <svg viewBox="0 0 3 2" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect x="0" width="1" height="2" fill="#0046AE" />
      <rect x="1" width="1" height="2" fill="#FFD200" />
      <rect x="2" width="1" height="2" fill="#CC092F" />
    </svg>
  ),
  GB: (
    <svg viewBox="0 0 60 40" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="60" height="40" fill="#012169" />
      <path d="M0,0 L60,40 M60,0 L0,40" stroke="#fff" strokeWidth="8" />
      <path d="M0,0 L60,40 M60,0 L0,40" stroke="#C8102E" strokeWidth="4" />
      <path d="M30,0 v40 M0,20 h60" stroke="#fff" strokeWidth="12" />
      <path d="M30,0 v40 M0,20 h60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  ),
  DE: (
    <svg viewBox="0 0 3 2" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="3" height="0.667" y="0" fill="#000" />
      <rect width="3" height="0.667" y="0.667" fill="#DD0000" />
      <rect width="3" height="0.667" y="1.333" fill="#FFCE00" />
    </svg>
  ),
  FR: (
    <svg viewBox="0 0 3 2" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect x="0" width="1" height="2" fill="#0055A4" />
      <rect x="1" width="1" height="2" fill="#fff" />
      <rect x="2" width="1" height="2" fill="#EF4135" />
    </svg>
  ),
  IT: (
    <svg viewBox="0 0 3 2" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect x="0" width="1" height="2" fill="#009246" />
      <rect x="1" width="1" height="2" fill="#fff" />
      <rect x="2" width="1" height="2" fill="#CE2B37" />
    </svg>
  ),
  ES: (
    <svg viewBox="0 0 3 2" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="3" height="0.5" y="0" fill="#AA151B" />
      <rect width="3" height="1" y="0.5" fill="#F1BF00" />
      <rect width="3" height="0.5" y="1.5" fill="#AA151B" />
    </svg>
  ),
  US: (
    <svg viewBox="0 0 19 10" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="19" height="10" fill="#B22234" />
      <rect y="0.77" width="19" height="0.77" fill="#fff" />
      <rect y="2.31" width="19" height="0.77" fill="#fff" />
      <rect y="3.85" width="19" height="0.77" fill="#fff" />
      <rect y="5.38" width="19" height="0.77" fill="#fff" />
      <rect y="6.92" width="19" height="0.77" fill="#fff" />
      <rect y="8.46" width="19" height="0.77" fill="#fff" />
      <rect width="7.6" height="5.38" fill="#3C3B6E" />
    </svg>
  ),
};

export function Formular() {
  const [submitted, setSubmitted] = useState(false);
  const [country, setCountry] = useState<Country>(COUNTRIES[0]);
  const [countryOpen, setCountryOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      roles: [],
      termsAccepted: false as unknown as true,
    },
  });

  async function onSubmit(values: FormValues) {
    const phone = `${country.dial}${values.phoneNumber.replace(/[\s-]/g, "")}`;
    const payload = {
      fullName: values.fullName,
      email: values.email,
      phone,
      roles: values.roles,
      termsAccepted: values.termsAccepted,
    };
    // TODO: Wire up API endpoint (e.g., POST /api/subscribe)
    console.log("Înregistrare For Iași:", payload);
    await new Promise((r) => setTimeout(r, 400));
    setSubmitted(true);
  }

  return (
    <section
      id="formular"
      aria-labelledby="formular-title"
      className="w-full bg-background"
    >
      <div className="mx-auto flex w-full max-w-[1440px] justify-center px-5 py-16 md:px-8 md:py-20 lg:px-16">
        <div className="w-full max-w-[760px]">
          <AnimatePresence mode="wait" initial={false}>
          {submitted ? (
            <motion.div
              key="success"
              role="status"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-4 rounded-lg border border-border bg-card p-10 text-center shadow-xs"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.35,
                  delay: 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <CheckCircle
                  size={48}
                  weight="fill"
                  className="text-brand-blue"
                  aria-hidden
                />
              </motion.div>
              <h2 className="font-heading text-2xl font-semibold text-foreground">
                Bine ai venit în comunitatea For Iași
              </h2>
              <p className="max-w-md text-base leading-6 text-muted-foreground">
                Înscrierea ta a fost primită. Vei fi contactat pe email atunci
                când asociația este înființată și se deschide etapa de
                organizare.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                noValidate
                className="overflow-hidden rounded-lg border border-border bg-blue-950/30 shadow-xs"
              >
                <div className="flex items-center border-b border-border px-6 py-4">
                  <h2
                    id="formular-title"
                    className="text-base font-medium text-card-foreground"
                  >
                    Formular de înscriere
                  </h2>
                </div>

                <div className="flex flex-col gap-6 border-b border-border px-6 py-4 md:flex-row">
                  <div className="flex flex-col items-center justify-center gap-6 md:w-1/3">
                    <Image
                      src="/images/brand/for-iasi-color.svg"
                      alt=""
                      width={148}
                      height={48}
                      className="h-24 w-auto"
                    />
                    <p className="text-center text-sm leading-5 text-muted-foreground">
                      Înscrierea durează mai puțin de un minut, este gratuită și
                      reprezintă primul pas spre adunarea suporterilor ieșeni
                      sub o singură voce.
                    </p>
                    <div className="text-center">
                      <p className="text-base font-medium leading-6 text-foreground">
                        For Iași
                      </p>
                      <p className="text-sm leading-5 text-muted-foreground">
                        www.foriasi.ro
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 md:flex-1 md:border-l md:border-border md:pl-10">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-normal text-muted-foreground">
                            Nume și prenume
                          </FormLabel>
                          <FormControl>
                            <Input
                              autoComplete="name"
                              placeholder="ex: Pavel Nedelcu"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-normal text-muted-foreground">
                            Email
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              autoComplete="email"
                              placeholder="ex: nume@email.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-normal text-muted-foreground">
                            Număr de telefon
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Popover
                                open={countryOpen}
                                onOpenChange={setCountryOpen}
                              >
                                <PopoverTrigger
                                  aria-label="Selectează prefixul țării"
                                  className="absolute left-1 top-1/2 z-10 flex -translate-y-1/2 items-center gap-1 rounded-md px-1.5 py-1 text-sm text-primary-foreground outline-none hover:bg-primary-foreground/10 focus-visible:ring-2 focus-visible:ring-brand-blue-50"
                                >
                                  <Flag code={country.code} />
                                  <span className="tabular-nums">
                                    {country.dial}
                                  </span>
                                  <CaretDown size={12} weight="regular" />
                                </PopoverTrigger>
                                <PopoverContent
                                  align="start"
                                  className="w-64 gap-0 p-1"
                                >
                                  <ul
                                    role="listbox"
                                    aria-label="Prefixe internaționale"
                                    className="flex flex-col"
                                  >
                                    {COUNTRIES.map((c) => (
                                      <li key={c.code}>
                                        <button
                                          type="button"
                                          role="option"
                                          aria-selected={
                                            c.code === country.code
                                          }
                                          onClick={() => {
                                            setCountry(c);
                                            setCountryOpen(false);
                                          }}
                                          className={cn(
                                            "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-foreground outline-none hover:bg-muted focus-visible:bg-muted",
                                            c.code === country.code &&
                                              "bg-muted",
                                          )}
                                        >
                                          <Flag code={c.code} />
                                          <span className="flex-1 text-left">
                                            {c.name}
                                          </span>
                                          <span className="tabular-nums text-muted-foreground">
                                            {c.dial}
                                          </span>
                                        </button>
                                      </li>
                                    ))}
                                  </ul>
                                </PopoverContent>
                              </Popover>
                              <Input
                                type="tel"
                                autoComplete="tel-national"
                                inputMode="tel"
                                placeholder="755 123 456"
                                className="pl-24"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="roles"
                      render={() => (
                        <FormItem>
                          <div className="flex flex-col gap-1">
                            <FormLabel className="text-base font-normal text-foreground">
                              Cine ești în comunitate?
                            </FormLabel>
                            <p className="text-sm leading-5 text-muted-foreground">
                              Poți bifa una sau mai multe opțiuni care ți se
                              potrivesc
                            </p>
                          </div>
                          <div className="mt-4 flex flex-col gap-4">
                            {ROLES.map((role) => (
                              <FormField
                                key={role.id}
                                control={form.control}
                                name="roles"
                                render={({ field }) => (
                                  <FormItem className="flex items-center gap-3 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(role.id)}
                                        onCheckedChange={(checked) => {
                                          const next = checked
                                            ? [...(field.value ?? []), role.id]
                                            : (field.value ?? []).filter(
                                                (v) => v !== role.id,
                                              );
                                          field.onChange(next);
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="cursor-pointer text-sm font-normal text-foreground">
                                      {role.label}
                                    </FormLabel>
                                  </FormItem>
                                )}
                              />
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="termsAccepted"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start gap-3 space-y-0 pt-2">
                          <div className="flex-1">
                            <FormLabel className="block text-sm font-normal leading-5 text-muted-foreground [&]:gap-0">
                              Doresc să mă înscriu pe lista de Membri Fondatori
                              și sunt de acord cu prelucrarea datelor mele cu
                              caracter personal conform{" "}
                              <Link
                                href="/politica-de-confidentialitate"
                                className="text-brand-blue underline underline-offset-2"
                              >
                                Politicii de confidențialitate
                              </Link>{" "}
                              și{" "}
                              <Link
                                href="/termeni-si-conditii"
                                className="text-brand-blue underline underline-offset-2"
                              >
                                Termenilor și condițiilor
                              </Link>
                              .
                            </FormLabel>
                            <FormMessage />
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value === true}
                              onCheckedChange={field.onChange}
                              aria-label="Accept termenii și condițiile"
                              className="mt-0.5"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="flex flex-col-reverse gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                  <a
                    href="/statut-for-iasi.pdf"
                    download
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-border bg-card px-6 text-base font-medium text-foreground shadow-xs transition-[background-color,transform] duration-150 ease-out hover:bg-muted/40 active:scale-[0.98]"
                  >
                    <DownloadSimple size={18} weight="regular" aria-hidden />
                    Statut &ldquo;ForIași&rdquo;
                  </a>
                  <Button
                    type="submit"
                    disabled={form.formState.isSubmitting}
                    className="h-11 rounded-md bg-brand-blue px-6 text-base text-white hover:bg-brand-blue/90"
                  >
                    {form.formState.isSubmitting
                      ? "Se trimite..."
                      : "Trimite formular"}
                  </Button>
                </div>
              </form>
            </Form>
            </motion.div>
          )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
