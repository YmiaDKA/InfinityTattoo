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
        <div className="flex flex-col gap-4">
          <h1 className="font-display text-5xl font-bold leading-none sm:text-7xl">
            Work
          </h1>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {galleryImages.map((image) => (
            <div
              className="group relative aspect-[4/5] overflow-hidden rounded-lg border bg-card"
              key={image.src}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
              />
            </div>
          ))}
        </div>

        <div>
          <Button
            className="rounded-full"
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
