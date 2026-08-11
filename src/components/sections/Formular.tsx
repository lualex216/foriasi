"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "motion/react";
import {
  CaretDown,
  CheckCircle,
  DownloadSimple,
  MagnifyingGlass,
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import {
  COUNTRIES,
  type Country,
  flagEmoji,
  normalizeForSearch,
} from "@/lib/countries";

const DEFAULT_COUNTRY =
  COUNTRIES.find((c) => c.code === "RO") ?? COUNTRIES[0];

const ROLES = [
  { id: "fost-sportiv", label: "Fost sportiv" },
  { id: "iubitor-sport", label: "Iubitor de sport" },
  { id: "jurnalist", label: "Jurnalist" },
  { id: "om-afaceri", label: "Om de afaceri" },
  { id: "parinte-junior", label: "Părinte junior" },
  { id: "persoana-publica", label: "Persoană publică" },
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
  livesInIasi: z.enum(["da", "nu"], {
    error: "Selectează o opțiune",
  }),
  country: z.string().min(2, "Selectează o țară"),
  city: z
    .string()
    .trim()
    .min(1, "Introdu un oraș")
    .max(80, "Numele orașului e prea lung"),
  roles: z.array(z.string()),
  termsAccepted: z.literal(true, {
    error: "Trebuie să accepți termenii pentru a te înscrie",
  }),
});

type FormValues = z.infer<typeof formSchema>;

function Flag({ code }: { code: string }) {
  return (
    <span
      aria-hidden
      className="inline-block shrink-0 text-base leading-none"
    >
      {flagEmoji(code)}
    </span>
  );
}

export function Formular() {
  const [submitted, setSubmitted] = useState(false);
  const [country, setCountry] = useState<Country>(DEFAULT_COUNTRY);
  const [countryOpen, setCountryOpen] = useState(false);
  const [countryQuery, setCountryQuery] = useState("");

  const filteredCountries = useMemo(() => {
    const raw = countryQuery.trim();
    if (!raw) return COUNTRIES;
    const q = normalizeForSearch(raw);
    const digits = raw.replace(/\D/g, "");
    return COUNTRIES.filter((c) => {
      if (normalizeForSearch(c.name).includes(q)) return true;
      if (digits && c.dial.replace("+", "").startsWith(digits)) return true;
      return false;
    });
  }, [countryQuery]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      livesInIasi: undefined as unknown as "da",
      country: "RO",
      city: "Iași",
      roles: [],
      termsAccepted: false as unknown as true,
    },
  });

  const livesInIasi = form.watch("livesInIasi");
  const locationEditable = livesInIasi === "nu";

  useEffect(() => {
    if (!locationEditable) {
      form.setValue("country", "RO", { shouldValidate: false });
      form.setValue("city", "Iași", { shouldValidate: false });
    }
  }, [locationEditable, form]);

  const [countryFieldOpen, setCountryFieldOpen] = useState(false);
  const [countryFieldQuery, setCountryFieldQuery] = useState("");

  const filteredCountryField = useMemo(() => {
    const raw = countryFieldQuery.trim();
    if (!raw) return COUNTRIES;
    const q = normalizeForSearch(raw);
    return COUNTRIES.filter((c) => normalizeForSearch(c.name).includes(q));
  }, [countryFieldQuery]);

  async function onSubmit(values: FormValues) {
    const phone = `${country.dial}${values.phoneNumber.replace(/[\s-]/g, "")}`;
    const payload = {
      fullName: values.fullName,
      email: values.email,
      phone,
      livesInIasi: values.livesInIasi,
      country: values.country,
      city: values.city,
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
                                onOpenChange={(open) => {
                                  setCountryOpen(open);
                                  if (!open) setCountryQuery("");
                                }}
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
                                  className="w-80 gap-0 p-1"
                                >
                                  <div className="relative p-1">
                                    <MagnifyingGlass
                                      size={14}
                                      weight="regular"
                                      aria-hidden
                                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-primary-foreground/50"
                                    />
                                    <Input
                                      type="search"
                                      placeholder="Caută țară sau prefix..."
                                      value={countryQuery}
                                      onChange={(e) =>
                                        setCountryQuery(e.target.value)
                                      }
                                      className="h-8 pl-8 text-sm"
                                      aria-label="Caută prefix internațional"
                                    />
                                  </div>
                                  <ul
                                    role="listbox"
                                    aria-label="Prefixe internaționale"
                                    className="mt-1 flex max-h-64 flex-col overflow-y-auto"
                                  >
                                    {filteredCountries.length === 0 ? (
                                      <li className="px-3 py-4 text-center text-sm text-muted-foreground">
                                        Niciun rezultat
                                      </li>
                                    ) : (
                                      filteredCountries.map((c) => (
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
                                              setCountryQuery("");
                                            }}
                                            className={cn(
                                              "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-foreground outline-none hover:bg-muted focus-visible:bg-muted",
                                              c.code === country.code &&
                                                "bg-muted",
                                            )}
                                          >
                                            <Flag code={c.code} />
                                            <span className="flex-1 truncate text-left">
                                              {c.name}
                                            </span>
                                            <span className="tabular-nums text-muted-foreground">
                                              {c.dial}
                                            </span>
                                          </button>
                                        </li>
                                      ))
                                    )}
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
                      name="livesInIasi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-normal text-foreground">
                            Locuiești în Iași?
                          </FormLabel>
                          <FormControl>
                            <RadioGroup
                              value={field.value}
                              onValueChange={(v) => field.onChange(v)}
                              className="mt-2 flex flex-row gap-6"
                            >
                              <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
                                <RadioGroupItem value="da" />
                                Da
                              </label>
                              <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
                                <RadioGroupItem value="nu" />
                                Nu
                              </label>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => {
                          const selected =
                            COUNTRIES.find((c) => c.code === field.value) ??
                            DEFAULT_COUNTRY;
                          return (
                            <FormItem>
                              <FormLabel className="text-sm font-normal text-muted-foreground">
                                Țară
                              </FormLabel>
                              <FormControl>
                                <Popover
                                  open={countryFieldOpen && locationEditable}
                                  onOpenChange={(open) => {
                                    if (!locationEditable) return;
                                    setCountryFieldOpen(open);
                                    if (!open) setCountryFieldQuery("");
                                  }}
                                >
                                  <PopoverTrigger
                                    disabled={!locationEditable}
                                    className={cn(
                                      "flex h-9 w-full items-center justify-between gap-2 rounded-lg border border-brand-blue-50 bg-primary px-2.5 text-sm text-primary-foreground outline-none transition-colors focus-visible:border-brand-blue focus-visible:ring-3 focus-visible:ring-brand-blue-50 disabled:cursor-not-allowed disabled:opacity-60",
                                    )}
                                  >
                                    <span className="flex min-w-0 items-center gap-2">
                                      <Flag code={selected.code} />
                                      <span className="truncate">
                                        {selected.name}
                                      </span>
                                    </span>
                                    <CaretDown
                                      size={14}
                                      weight="regular"
                                      className="shrink-0 opacity-60"
                                    />
                                  </PopoverTrigger>
                                  <PopoverContent
                                    align="start"
                                    className="w-80 gap-0 p-1"
                                  >
                                    <div className="relative p-1">
                                      <MagnifyingGlass
                                        size={14}
                                        weight="regular"
                                        aria-hidden
                                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-primary-foreground/50"
                                      />
                                      <Input
                                        type="search"
                                        placeholder="Caută țară..."
                                        value={countryFieldQuery}
                                        onChange={(e) =>
                                          setCountryFieldQuery(e.target.value)
                                        }
                                        className="h-8 pl-8 text-sm"
                                        aria-label="Caută țară"
                                      />
                                    </div>
                                    <ul
                                      role="listbox"
                                      aria-label="Țări"
                                      className="mt-1 flex max-h-64 flex-col overflow-y-auto"
                                    >
                                      {filteredCountryField.length === 0 ? (
                                        <li className="px-3 py-4 text-center text-sm text-muted-foreground">
                                          Niciun rezultat
                                        </li>
                                      ) : (
                                        filteredCountryField.map((c) => (
                                          <li key={c.code}>
                                            <button
                                              type="button"
                                              role="option"
                                              aria-selected={
                                                c.code === field.value
                                              }
                                              onClick={() => {
                                                field.onChange(c.code);
                                                setCountryFieldOpen(false);
                                                setCountryFieldQuery("");
                                              }}
                                              className={cn(
                                                "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-foreground outline-none hover:bg-muted focus-visible:bg-muted",
                                                c.code === field.value &&
                                                  "bg-muted",
                                              )}
                                            >
                                              <Flag code={c.code} />
                                              <span className="flex-1 truncate text-left">
                                                {c.name}
                                              </span>
                                            </button>
                                          </li>
                                        ))
                                      )}
                                    </ul>
                                  </PopoverContent>
                                </Popover>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />

                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-normal text-muted-foreground">
                              Oraș
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                disabled={!locationEditable}
                                placeholder="Iași"
                                autoComplete="address-level2"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

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
                  <button
                    type="button"
                    disabled
                    aria-label="Statut For Iași — indisponibil momentan"
                    title="Statut indisponibil momentan"
                    className="inline-flex h-11 cursor-not-allowed items-center justify-center gap-2 rounded-md border border-border bg-card px-6 text-base font-medium text-foreground opacity-60 shadow-xs"
                  >
                    <DownloadSimple size={18} weight="regular" aria-hidden />
                    Statut &ldquo;ForIași&rdquo;
                  </button>
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
