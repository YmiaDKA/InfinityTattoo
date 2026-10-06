import Image from "next/image";
import Link from "next/link";
import { MoveUpRightIcon, type LucideIcon } from "lucide-react";

import { LocalizedText } from "@/components/localized-text";
import { cn } from "@/lib/utils";

type ArtistProfileCardProps = {
  label: string;
  name: string;
  href: string;
  bioEn: string;
  bioNo: string;
  image?: string;
  icon: LucideIcon;
  large?: boolean;
};

export function ArtistProfileCard({
  label,
  name,
  href,
  bioEn,
  bioNo,
  image,
  icon: Icon,
  large = false,
}: ArtistProfileCardProps) {
  return (
    <article
      className={cn(
        "relative isolate flex min-w-0 flex-col pt-7",
        large && "w-full max-w-96",
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute top-0 -z-10 max-w-full truncate font-display font-bold leading-none tracking-tight text-foreground/15",
          large
            ? "text-5xl sm:text-6xl"
            : "text-2xl sm:text-4xl lg:text-3xl xl:text-4xl",
        )}
      >
        {label}
      </span>
      <Link
        href={href}
        aria-label={name}
        className={cn(
          "group relative block overflow-hidden rounded-[2rem] border border-border bg-card focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring",
          "aspect-[3/4]",
        )}
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
          <div className="flex h-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-muted/40 to-background px-3 pb-12 text-center sm:px-5">
            <Icon
              aria-hidden="true"
              className="size-8 stroke-1 text-foreground/45 sm:size-12"
            />
            <p className="text-xs text-muted-foreground sm:text-sm">
              <LocalizedText
                en="Artist photo coming soon"
                no="Artistbilde kommer snart"
              />
            </p>
          </div>
        )}
        <span className="absolute -bottom-px -right-px flex size-16 items-center justify-center rounded-tl-[1.5rem] sm:size-20 sm:rounded-tl-[2rem] border-l border-t border-border bg-background p-2">
          <span className="flex size-11 items-center justify-center rounded-full sm:size-14 bg-foreground text-background transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            <MoveUpRightIcon aria-hidden="true" className="size-6" />
          </span>
        </span>
      </Link>
      <div className="flex flex-col gap-2 px-2 pb-1 pt-5">
        <h3 className="font-display text-xl font-bold text-foreground sm:text-2xl">
          {name}
        </h3>
        <p className="max-w-xl text-sm leading-6 text-muted-foreground">
          <LocalizedText en={bioEn} no={bioNo} />
        </p>
      </div>
    </article>
  );
}
