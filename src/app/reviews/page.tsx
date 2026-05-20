import { MoveUpRightIcon, StarIcon } from "lucide-react";
import Link from "next/link";

import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const reviews = [
  {
    quote:
      "Very happy with the result and the full experience. Comfortable session, visible passion, and strong attention to detail.",
    name: "Kristi Rouko",
  },
  {
    quote:
      "Clean studio, welcoming energy, chill vibe, and a tattoo that turned out better than expected.",
    name: "Areti Anastasi",
  },
  {
    quote:
      "Clean and welcoming studio with a great vibe. The artist listens, gives advice, and makes the process comfortable.",
    name: "Petros Tzegias",
  },
  {
    quote:
      "Excellent communication from the start, with time spent understanding the idea and helping shape the right design.",
    name: "Hlias Hysos",
  },
];

export default function ReviewsPage() {
  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />
      <section className="mx-auto flex max-w-6xl flex-col gap-8 px-5 pb-20 pt-32 sm:px-8 lg:pb-28">
        <div className="flex flex-col gap-4">
          <h1 className="font-display text-5xl font-bold leading-none sm:text-7xl">
            Reviews
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
            Client words from the review set currently available on the site.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {reviews.map((review) => (
            <Card className="bg-card/70" key={review.name}>
              <CardContent className="flex min-h-56 flex-col gap-5 pt-5">
                <div className="flex gap-1 text-[color:var(--studio-red)]">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <StarIcon
                      className="size-4 fill-current"
                      key={`${review.name}-${index}`}
                    />
                  ))}
                </div>
                <p className="text-base leading-7">&quot;{review.quote}&quot;</p>
                <p className="mt-auto text-sm font-semibold text-muted-foreground">
                  {review.name}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div>
          <Button
            className="rounded-full"
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
