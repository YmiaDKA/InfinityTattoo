import { MoveUpRightIcon, StarIcon } from "lucide-react";
import Link from "next/link";

import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { testimonials } from "@/lib/site-data";

export default function ReviewsPage() {
  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />
      <section className="mx-auto flex max-w-6xl flex-col gap-8 px-5 pb-20 pt-32 sm:px-8 lg:pb-28">
        <div className="motion-rise flex flex-col gap-4">
          <h1 className="font-display text-5xl font-bold leading-none sm:text-7xl">
            Reviews
          </h1>
        </div>

        <div className="motion-stagger grid gap-3 md:grid-cols-2">
          {testimonials.map((review) => (
            <Card className="motion-lift motion-reveal bg-card/70" key={review.name}>
              <CardContent className="flex min-h-44 flex-col gap-4 px-5 py-4">
                <div className="flex gap-1 text-[color:var(--studio-red)]">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <StarIcon
                      className="size-4 fill-current"
                      key={`${review.name}-${index}`}
                    />
                  ))}
                </div>
                <p className="text-base leading-6">&quot;{review.quote}&quot;</p>
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
