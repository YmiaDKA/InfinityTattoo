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
    <article className="relative isolate mx-auto flex h-full w-full max-w-lg flex-col overflow-hidden rounded-3xl border bg-card/60 lg:max-w-none">
      <div
        className={cn(
          "relative",
          mirrored
            ? "h-96 sm:h-[26rem] lg:h-96"
            : "h-[26rem] sm:h-[30rem] lg:h-[34rem]",
        )}
      >
        <p className="relative z-20 px-6 pt-6 text-center text-sm font-semibold text-foreground sm:text-base">
          <LocalizedText en={professionEn} no={professionNo} />
        </p>
        <h3
          className={cn(
            "artist-name pointer-events-none relative z-0 mt-3 px-4 text-center font-display font-extrabold uppercase leading-[0.9] tracking-tight",
            mirrored
              ? "artist-name-red text-[clamp(4rem,12vw,6rem)] lg:text-[4.5rem]"
              : "artist-name-gold text-[clamp(5rem,15vw,8rem)]",
          )}
        >
          {name}
        </h3>
        <Link
          href={href}
          aria-label={name}
          className={cn(
            "artist-cutout absolute inset-x-4 bottom-0 top-20 mx-auto focus-visible:outline-2 focus-visible:outline-ring",
            mirrored ? "max-w-80" : "max-w-lg",
          )}
        >
          <Image
            src={image}
            alt={name}
            width={width}
            height={height}
            draggable={false}
            className="h-full w-full object-contain object-top"
            sizes={
              mirrored
                ? "(min-width: 1024px) 28vw, (min-width: 640px) 440px, 84vw"
                : "(min-width: 1024px) 512px, (min-width: 640px) 480px, 84vw"
            }
          />
        </Link>
      </div>
      <div className="relative z-20 flex flex-1 flex-col px-6 pb-6 sm:px-8 sm:pb-8">
        <div
          className={cn("mx-auto w-full", mirrored ? "max-w-64" : "max-w-xl")}
        >
          {children}
        </div>
        <div className="mt-auto flex items-center justify-center gap-3 pt-7">
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
