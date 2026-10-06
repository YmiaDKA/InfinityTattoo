import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { LocalizedText } from "@/components/localized-text";
import { InstagramIcon } from "@/components/social-icons";
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
    <article
      className={cn(
        "relative isolate w-full lg:w-3/4",
        mirrored && "self-end lg:-mt-20",
      )}
    >
      <div
        className={cn(
          "relative z-20 mb-2 flex items-center gap-3 px-2",
          mirrored && "justify-end",
        )}
      >
        <p className="text-sm font-semibold text-foreground sm:text-base">
          <LocalizedText en={professionEn} no={professionNo} />
        </p>
        <a
          href="https://www.instagram.com/infinitytattoo.lorenskog/"
          target="_blank"
          rel="noreferrer"
          aria-label={`${name} Instagram`}
          className="flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
        >
          <InstagramIcon aria-hidden="true" className="size-4" />
        </a>
      </div>
      <h3
        className={cn(
          "artist-name pointer-events-none relative z-0 font-display text-[clamp(4.5rem,13vw,9rem)] font-extrabold uppercase leading-[0.9] tracking-tight",
          mirrored ? "artist-name-red text-right" : "artist-name-gold",
        )}
      >
        {name}
      </h3>
      <div className="relative z-10 -mt-16 grid grid-cols-1 items-center gap-5 sm:-mt-24 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] sm:gap-8">
        <Link
          href={href}
          aria-label={name}
          className={cn(
            "artist-cutout relative w-[72%] self-start sm:w-full focus-visible:outline-2 focus-visible:outline-ring",
            mirrored && "justify-self-end sm:order-2",
          )}
        >
          <Image
            src={image}
            alt={name}
            width={width}
            height={height}
            draggable={false}
            className={cn(
              "h-auto max-h-[26rem] w-full object-contain",
              mirrored ? "object-right" : "object-left",
            )}
            sizes="(min-width: 1152px) 392px, (min-width: 1024px) 34vw, (min-width: 640px) 45vw, 68vw"
          />
        </Link>
        <div
          className={cn(
            "relative z-20 sm:pt-20",
            mirrored && "text-right sm:order-1",
          )}
        >
          {children}
        </div>
      </div>
    </article>
  );
}
