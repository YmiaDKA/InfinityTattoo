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
  bioEn: string;
  bioNo: string;
  image?: string;
  icon: LucideIcon;
  large?: boolean;
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
  instagramHref,
  children,
}: ArtistProfileCardProps) {
  return (
    <article
      className={cn(
        "relative isolate flex min-w-0 flex-col pt-5 sm:pt-7",
        large && "w-full max-w-96",
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute top-0 -z-10 max-w-full truncate font-display font-bold leading-none tracking-tight text-foreground/15",
          large
            ? "text-3xl sm:text-5xl lg:text-6xl"
            : "text-xl sm:text-3xl lg:text-4xl",
        )}
      >
        {name}
      </span>
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-border bg-card sm:rounded-[2rem]">
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
            <div className="flex h-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-muted/40 to-background px-2 pb-10 text-center sm:px-5">
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
        <span className="absolute -bottom-px -right-px flex size-12 items-center justify-center rounded-tl-2xl border-l border-t border-border bg-background p-1 sm:size-20 sm:rounded-tl-[2rem] sm:p-2">
          {instagramHref ? (
            <a
              href={instagramHref}
              target="_blank"
              rel="noreferrer"
              aria-label={`${name} Instagram`}
              className="flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:size-14"
            >
              <InstagramIcon aria-hidden="true" className="size-5 sm:size-6" />
            </a>
          ) : (
            <span className="flex size-11 items-center justify-center rounded-full border text-muted-foreground sm:size-14">
              <InstagramIcon aria-hidden="true" className="size-5 sm:size-6" />
              <span className="sr-only">
                <LocalizedText
                  en="Instagram profile coming soon"
                  no="Instagram profil kommer snart"
                />
              </span>
            </span>
          )}
        </span>
      </div>
      <div className="flex flex-col gap-2 px-2 pb-1 pt-5">
        <h3 className="font-display text-base font-bold text-foreground sm:text-2xl">
          {name}
        </h3>
        <p className="max-w-xl text-xs leading-5 sm:text-sm sm:leading-6 text-muted-foreground">
          <LocalizedText en={bioEn} no={bioNo} />
        </p>
        {children}
      </div>
    </article>
  );
}
