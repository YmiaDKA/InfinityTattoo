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
    <article className="relative isolate mx-auto grid w-full max-w-lg overflow-hidden rounded-3xl border bg-card/60 sm:max-w-none sm:grid-cols-2">
      <div className="relative h-[32rem] sm:h-[36rem] lg:h-[34rem]">
        <p className="relative z-20 px-6 pt-6 text-center text-sm font-semibold text-foreground sm:text-base">
          <LocalizedText en={professionEn} no={professionNo} />
        </p>
        <h3
          className={cn(
            "artist-name pointer-events-none relative z-0 px-4 text-center font-display font-extrabold uppercase leading-[0.9] tracking-tight",
            mirrored
              ? "artist-name-red mt-3 text-[clamp(4rem,12vw,6rem)] lg:text-[4.5rem]"
              : "artist-name-gold mt-1 text-[clamp(5rem,15vw,8rem)]",
          )}
        >
          {name}
        </h3>
        <Link
          href={href}
          aria-label={name}
          className={cn(
            "artist-cutout absolute bottom-0 top-20 mx-auto focus-visible:outline-2 focus-visible:outline-ring",
            mirrored ? "inset-x-0" : "inset-x-4 max-w-lg",
          )}
        >
          <Image
            src={image}
            alt={name}
            width={width}
            height={height}
            draggable={false}
            className={cn(
              "w-full",
              mirrored
                ? "absolute bottom-0 h-auto"
                : "h-full object-contain object-bottom",
            )}
            sizes={
              mirrored
                ? "(min-width: 1152px) 544px, (min-width: 640px) 48vw, 90vw"
                : "(min-width: 1152px) 512px, (min-width: 640px) 44vw, 84vw"
            }
          />
        </Link>
      </div>
      <div className="relative z-20 flex flex-col justify-center px-6 pb-6 sm:p-8 lg:p-10">
        <div className="mx-auto w-full max-w-xl">{children}</div>
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
