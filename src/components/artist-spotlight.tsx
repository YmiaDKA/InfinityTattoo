import Image from "next/image";
import Link from "next/link";
import { MoveUpRightIcon } from "lucide-react";
import type { ReactNode } from "react";

import { InstagramPill } from "@/components/instagram-pill";
import { LocalizedText } from "@/components/localized-text";
import { InstagramIcon } from "@/components/social-icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ArtistSpotlight({
  name,
  professionEn,
  professionNo,
  image,
  width,
  height,
  href,
  mirrored = false,
  children,
}: {
  name: string;
  professionEn: string;
  professionNo: string;
  image: string;
  width: number;
  height: number;
  href: string;
  mirrored?: boolean;
  children: ReactNode;
}) {
  return (
    <article className="relative isolate mx-auto grid w-full max-w-lg overflow-hidden rounded-3xl border bg-card/60 sm:max-w-5xl sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
      <div className="relative h-[28rem] sm:h-auto sm:min-h-[30rem] lg:min-h-[32rem]">
        <h3
          className={cn(
            "artist-name pointer-events-none relative z-0 px-4 text-center font-display font-extrabold uppercase leading-[0.9] tracking-tight",
            mirrored
              ? "artist-name-red mt-6 text-[clamp(4rem,12vw,6rem)] sm:text-5xl lg:text-6xl"
              : "artist-name-gold mt-6 text-[clamp(5rem,15vw,8rem)] sm:text-5xl lg:text-7xl",
          )}
        >
          {name}
        </h3>
        <Link
          href={href}
          aria-label={name}
          className="artist-cutout absolute inset-0 focus-visible:outline-2 focus-visible:outline-ring"
        >
          <Image
            src={image}
            alt={name}
            width={width}
            height={height}
            draggable={false}
            className="h-full w-full object-contain object-left-bottom"
            sizes="(min-width: 1088px) 410px, (min-width: 640px) 38vw, 90vw"
          />
        </Link>
      </div>
      <div className="relative z-20 flex flex-col justify-center px-6 pb-6 sm:p-8 lg:p-10">
        <div className="mx-auto w-full max-w-xl">
          <p className="mb-4 text-base font-semibold text-foreground">
            <LocalizedText en={professionEn} no={professionNo} />
          </p>
          {children}
        </div>
        <div className="flex items-center justify-center gap-3 pt-7 sm:justify-start">
          {mirrored ? (
            <>
              <Button
                nativeButton={false}
                render={<Link href={href} />}
                size="lg"
                variant="outline"
                className="h-12 rounded-full"
              >
                <LocalizedText en="See details" no="Se detaljer" />
                <MoveUpRightIcon data-icon="inline-end" />
              </Button>
              <a
                href="https://www.instagram.com/infinitytattoo.lorenskog/"
                target="_blank"
                rel="noreferrer"
                aria-label={`${name} Instagram`}
                className="flex size-12 shrink-0 items-center justify-center rounded-full border bg-card/60 text-muted-foreground transition-colors hover:bg-card hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
              >
                <InstagramIcon
                  aria-hidden="true"
                  className="size-5 text-[color:var(--studio-gold)]"
                />
              </a>
            </>
          ) : (
            <InstagramPill className="h-12 w-fit py-0" />
          )}
        </div>
      </div>
    </article>
  );
}
