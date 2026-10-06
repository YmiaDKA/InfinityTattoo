import Image from "next/image";
import Link from "next/link";
import { type LucideIcon } from "lucide-react";

import { type ReactNode } from "react";
import { InstagramIcon } from "@/components/social-icons";
import { LocalizedText } from "@/components/localized-text";
import { cn } from "@/lib/utils";

type ArtistProfileCardProps = {
  name: string;
  href: string;
  bioEn?: string;
  bioNo?: string;
  image?: string;
  icon: LucideIcon;
  large?: boolean;
  side?: "left" | "right";
  instagramHref?: string;
  children?: ReactNode;
};

export function ArtistProfileCard({
  name,
  href,
  bioEn,
  bioNo,
  image,
  icon: Icon,
  large = false,
  side,
  instagramHref = "https://www.instagram.com/infinitytattoo.lorenskog/",
  children,
}: ArtistProfileCardProps) {
  return (
    <article
      className={cn(
        "flex min-w-0 flex-col rounded-3xl border border-border bg-card/80 p-3 sm:rounded-none sm:border-0 sm:bg-transparent sm:p-0",
        large && "w-full sm:max-w-96",
      )}
    >
      <div className="relative z-30 mb-2 mt-2 flex min-h-9 items-center justify-between gap-1 px-2 sm:px-3">
        <h3 className="font-display text-base font-bold text-foreground sm:text-2xl">
          {name}
        </h3>
        {instagramHref ? (
          <a
            href={instagramHref}
            target="_blank"
            rel="noreferrer"
            aria-label={`${name} Instagram`}
            className="flex size-9 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
          >
            <InstagramIcon aria-hidden="true" className="size-4" />
          </a>
        ) : (
          <span className="flex size-9 shrink-0 items-center justify-center text-muted-foreground">
            <InstagramIcon aria-hidden="true" className="size-4" />
            <span className="sr-only">
              <LocalizedText
                en="Instagram profile coming soon"
                no="Instagram profil kommer snart"
              />
            </span>
          </span>
        )}
      </div>
      <div
        className={cn(
          "relative aspect-[3/4] w-full shrink-0 overflow-hidden rounded-2xl border border-border bg-card sm:rounded-[2rem]",
          large && "z-20",
          side && "sm:w-[calc(100%+clamp(0px,calc((900px-100vw)*0.1),52px))]",
          side === "right" && "self-end",
        )}
      >
        <Link
          href={href}
          aria-label={name}
          className="absolute inset-0 focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-ring"
        >
          {image ? (
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover object-[50%_18%]"
              sizes="(min-width: 640px) 384px, calc(100vw - 40px)"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-muted/40 to-background px-2 text-center sm:px-5">
              <Icon
                aria-hidden="true"
                className="size-5 stroke-1 text-foreground/45 sm:size-12"
              />
              <p className="text-xs text-muted-foreground sm:text-sm">
                <LocalizedText
                  en="Artist photo coming soon"
                  no="Artistbilde kommer snart"
                />
              </p>
            </div>
          )}
        </Link>
      </div>
      <div
        className={cn(
          "relative z-30 flex min-w-0 flex-col gap-2 px-2 pb-2 pt-5 sm:px-0 sm:pb-1",
          side === "right" && "text-right",
        )}
      >
        {bioEn && bioNo && (
          <p className="max-w-xl text-xs leading-5 text-muted-foreground sm:text-sm sm:leading-6">
            <LocalizedText en={bioEn} no={bioNo} />
          </p>
        )}
        {children}
      </div>
    </article>
  );
}
