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
        "relative isolate w-full lg:row-start-1",
        mirrored
          ? "lg:col-span-6 lg:col-start-7 lg:pt-56"
          : "lg:col-span-8 lg:col-start-1",
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
          mirrored
            ? "artist-name-red text-right"
            : "artist-name-gold pl-4 sm:pl-8",
        )}
      >
        {name}
      </h3>
      <div
        className={cn(
          "relative z-10 -mt-16 grid grid-cols-1 items-center gap-5 sm:-mt-24",
          mirrored
            ? "sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] sm:gap-4"
            : "sm:grid-cols-[minmax(0,1.12fr)_minmax(0,1fr)] sm:gap-0",
        )}
      >
        <Link
          href={href}
          aria-label={name}
          className={cn(
            "artist-cutout relative self-start sm:w-full focus-visible:outline-2 focus-visible:outline-ring",
            mirrored ? "w-[72%] justify-self-end sm:order-2" : "w-[85%]",
          )}
        >
          <Image
            src={image}
            alt={name}
            width={width}
            height={height}
            draggable={false}
            className={cn(
              "h-auto w-full object-contain",
              mirrored
                ? "max-h-[26rem] object-right"
                : "max-h-[36rem] object-left",
            )}
            sizes={
              mirrored
                ? "(min-width: 1024px) 30vw, (min-width: 640px) 52vw, 68vw"
                : "(min-width: 1024px) 36vw, (min-width: 640px) 50vw, 80vw"
            }
          />
        </Link>
        <div
          className={cn(
            "relative z-20 sm:pt-20",
            mirrored
              ? "ml-auto w-full max-w-56 text-right sm:order-1 lg:pt-80"
              : "sm:-ml-4 sm:max-w-64 lg:max-w-56",
          )}
        >
          {children}
        </div>
      </div>
    </article>
  );
}
