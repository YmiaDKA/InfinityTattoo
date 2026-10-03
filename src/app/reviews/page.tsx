import {
  CalendarDaysIcon,
  MapPinIcon,
  MoveUpRightIcon,
  ShieldCheckIcon,
  StarIcon,
} from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

import { LocalizedText } from "@/components/localized-text";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { testimonials } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Anmeldelser | Infinity Tattoo Lørenskog",
  description:
    "Les kundeanmeldelser for Infinity Tattoo i Lørenskog. Studioet har 135+ Google-anmeldelser og lager custom realisme, black and grey og større prosjekter.",
  alternates: {
    canonical: "https://infinitytattoo.no/reviews",
  },
};

export default function ReviewsPage() {
  const featuredReviews = testimonials.slice(0, 3);
  const remainingReviews = testimonials.slice(3);

  return (
    <main className="min-h-screen overflow-hidden bg-background">
      <SiteHeader />

      <section className="relative isolate border-b border-border/70">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_15%,color-mix(in_oklch,var(--studio-red)_26%,transparent),transparent_35%),linear-gradient(180deg,color-mix(in_oklch,var(--card)_55%,transparent),var(--background))]" />
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 pb-12 pt-32 sm:px-8 sm:pb-16 lg:pt-36">
          <div className="motion-rise grid min-w-0 gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div className="flex min-w-0 flex-col gap-5">
              <div className="flex w-fit items-center gap-2 rounded-full border border-foreground/10 bg-background/55 px-3 py-2 text-sm font-semibold text-foreground/85 backdrop-blur">
                <StarIcon className="size-4 fill-current text-[color:var(--studio-red)]" />
                <LocalizedText en="135+ Google reviews" no="135+ Google-anmeldelser" />
              </div>
              <h1 className="font-display text-[3.45rem] font-bold leading-[0.92] sm:text-7xl">
                <LocalizedText en="Reviews" no="Anmeldelser" />
              </h1>
              <p className="max-w-2xl text-xl leading-8 text-muted-foreground">
                <LocalizedText
                  en="Clients choose Infinity Tattoo for custom work, clear consultation, and a calm studio experience in Lørenskog."
                  no="Kunder velger Infinity Tattoo for custom arbeid, tydelig konsultasjon og en rolig studio-opplevelse i Lørenskog."
                />
              </p>
              <div className="grid grid-cols-2 gap-2.5 text-sm font-semibold text-foreground/85 sm:max-w-md">
                <div className="flex min-h-12 items-center gap-2 rounded-lg border border-foreground/10 bg-background/55 px-3 backdrop-blur">
                  <MapPinIcon className="size-4 shrink-0 text-[color:var(--studio-red)]" />
                  Lørenskog
                </div>
                <div className="flex min-h-12 items-center gap-2 rounded-lg border border-foreground/10 bg-background/55 px-3 backdrop-blur">
                  <ShieldCheckIcon className="size-4 shrink-0 text-[color:var(--studio-red)]" />
                  <LocalizedText en="Calm studio" no="Rolig studio" />
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  className="motion-lift-subtle rounded-full max-sm:min-h-14 max-sm:w-full max-sm:text-base"
                  nativeButton={false}
                  render={<Link href="/#booking" />}
                  size="lg"
                >
                  <LocalizedText en="Book free consultation" no="Book gratis konsultasjon" />
                  <CalendarDaysIcon data-icon="inline-end" />
                </Button>
                <Button
                  className="motion-lift-subtle rounded-full max-sm:min-h-14 max-sm:w-full max-sm:text-base"
                  nativeButton={false}
                  render={
                    <a
                      href="https://www.google.com/search?q=Infinity+Tattoo+L%C3%B8renskog+reviews"
                      rel="noreferrer"
                      target="_blank"
                    />
                  }
                  size="lg"
                  variant="outline"
                >
                  Google reviews
                  <MoveUpRightIcon data-icon="inline-end" />
                </Button>
              </div>
            </div>

            <div className="motion-stagger grid gap-3">
              {featuredReviews.map((review) => (
                <Card
                  className="motion-lift-subtle bg-background/65 backdrop-blur"
                  key={`${review.name}-${review.date}`}
                >
                  <CardContent className="flex flex-col gap-3 p-5">
                    <div className="flex gap-1 text-[color:var(--studio-red)]">
                      {Array.from({ length: review.rating }).map((_, index) => (
                        <StarIcon
                          className="size-4 fill-current"
                          key={`${review.name}-${review.date}-${index}`}
                        />
                      ))}
                    </div>
                    <p className="text-base leading-6 text-foreground">
                      &quot;
                      <LocalizedText en={review.quoteEn} no={review.quoteNo} />
                      &quot;
                    </p>
                    <p className="text-sm font-semibold text-muted-foreground">
                      {review.name}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 sm:px-8 lg:py-16">
        <div className="motion-stagger grid gap-3 md:grid-cols-2">
          {remainingReviews.map((review) => (
            <Card
              className="motion-lift motion-reveal bg-card/70"
              key={`${review.name}-${review.date}`}
            >
              <CardContent className="flex min-h-44 flex-col gap-4 px-5 py-4">
                <div className="flex gap-1 text-[color:var(--studio-red)]">
                  {Array.from({ length: review.rating }).map((_, index) => (
                    <StarIcon
                      className="size-4 fill-current"
                      key={`${review.name}-${review.date}-${index}`}
                    />
                  ))}
                </div>
                <p className="text-base leading-6">
                  &quot;
                  <LocalizedText en={review.quoteEn} no={review.quoteNo} />
                  &quot;
                </p>
                <p className="mt-auto text-sm font-semibold text-muted-foreground">
                  {review.name}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="motion-reveal">
          <Button
            className="motion-lift-subtle rounded-full"
            nativeButton={false}
            render={<Link href="/#reviews" />}
            size="lg"
            variant="outline"
          >
            Back home
            <MoveUpRightIcon data-icon="inline-end" />
          </Button>
        </div>
      </section>
    </main>
  );
}
