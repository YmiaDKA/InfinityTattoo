import Image from "next/image";
import Link from "next/link";
import { MoveUpRightIcon } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { galleryImages } from "@/lib/site-data";

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />
      <section className="mx-auto flex max-w-6xl flex-col gap-8 px-5 pb-20 pt-32 sm:px-8 lg:pb-28">
        <div className="motion-rise flex flex-col gap-4">
          <h1 className="font-display text-5xl font-bold leading-none sm:text-7xl">
            Work
          </h1>
        </div>

        <div className="motion-stagger grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {galleryImages.map((image) => (
            <div
              className="motion-lift motion-reveal group relative aspect-[4/5] overflow-hidden rounded-lg border bg-card"
              key={image.src}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="motion-media object-cover"
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
              />
            </div>
          ))}
        </div>

        <div className="motion-reveal">
          <Button
            className="motion-lift-subtle rounded-full"
            nativeButton={false}
            render={<Link href="/#work" />}
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
