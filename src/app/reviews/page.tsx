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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { testimonials, type Testimonial } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Anmeldelser | Infinity Tattoo Lørenskog",
  description:
    "Les kundeanmeldelser for Infinity Tattoo i Lørenskog. Studioet har 135+ Google-anmeldelser og lager custom realisme, black and grey og større prosjekter.",
  alternates: {
    canonical: "https://infinitytattoo.no/reviews",
  },
};

function ReviewCard({ review }: { review: Testimonial }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{review.name}</CardTitle>
        <div
          aria-label={`${review.rating}/5`}
          className="flex gap-1 text-foreground"
        >
          {Array.from({ length: review.rating }).map((_, index) => (
            <StarIcon
              aria-hidden="true"
              className="size-4 fill-current"
              key={index}
            />
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <blockquote className="text-base leading-7">
          &quot;
          <LocalizedText en={review.quoteEn} no={review.quoteNo} />
          &quot;
        </blockquote>
      </CardContent>
    </Card>
  );
}

export default function ReviewsPage() {
  const featuredReviews = testimonials.slice(0, 3);
  const remainingReviews = testimonials.slice(3);

  return (
    <main className="min-h-screen overflow-hidden bg-background">
      <SiteHeader />

      <section className="border-b border-border/70">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 pb-12 pt-32 sm:px-8 sm:pb-16 lg:pt-36">
          <div className="motion-rise flex min-w-0 flex-col gap-8">
            <div className="flex min-w-0 flex-col gap-5">
              <div className="flex w-fit items-center gap-2 rounded-full border border-foreground/10 bg-background/55 px-3 py-2 text-sm font-semibold text-foreground/85 backdrop-blur">
                <StarIcon className="size-4 fill-current text-[color:var(--studio-red)]" />
                <LocalizedText
                  en="135+ Google reviews"
                  no="135+ Google-anmeldelser"
                />
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
                  <LocalizedText
                    en="Book free consultation"
                    no="Book gratis konsultasjon"
                  />
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

            <div className="motion-stagger grid gap-3 md:grid-cols-3">
              {featuredReviews.map((review) => (
                <ReviewCard
                  review={review}
                  key={`${review.name}-${review.date}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 sm:px-8 lg:py-16">
        <div className="motion-stagger grid gap-3 md:grid-cols-2">
          {remainingReviews.map((review) => (
            <ReviewCard review={review} key={`${review.name}-${review.date}`} />
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
            <LocalizedText en="Back home" no="Til forsiden" />
            <MoveUpRightIcon data-icon="inline-end" />
          </Button>
        </div>
      </section>
    </main>
  );
}
