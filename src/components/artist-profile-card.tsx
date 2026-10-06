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
    <article className="relative isolate flex min-w-0 flex-col pt-7">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-0 -z-10 max-w-full truncate font-display text-5xl font-bold leading-none tracking-tight text-foreground/15 sm:text-6xl"
      >
        {label}
      </span>
      <Link
        href={href}
        aria-label={name}
        className={cn(
          "group relative block overflow-hidden rounded-[2rem] border border-border bg-card focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring",
          large
            ? "h-[30rem] sm:h-[38rem] lg:min-h-[40rem] lg:flex-1"
            : "h-56 sm:h-60",
        )}
      >
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover object-[50%_18%]"
            sizes="(min-width: 1024px) 50vw, 92vw"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-4 bg-gradient-to-br from-muted/40 to-background px-6">
            <Icon
              aria-hidden="true"
              className="size-12 stroke-1 text-foreground/45"
            />
            <p className="text-sm text-muted-foreground">
              <LocalizedText
                en="Artist photo coming soon"
                no="Artistbilde kommer snart"
              />
            </p>
          </div>
        )}
        <span className="absolute -bottom-px -right-px flex size-20 items-center justify-center rounded-tl-[2rem] border-l border-t border-border bg-background p-2">
          <span className="flex size-14 items-center justify-center rounded-full bg-foreground text-background transition-colors group-hover:bg-[color:var(--studio-red)] group-hover:text-white">
            <MoveUpRightIcon aria-hidden="true" className="size-6" />
          </span>
        </span>
      </Link>
      <div className="flex flex-col gap-2 px-2 pb-1 pt-5">
        <h3 className="font-display text-2xl font-bold text-foreground">
          {name}
        </h3>
        <p className="max-w-xl text-sm leading-6 text-muted-foreground">
          <LocalizedText en={bioEn} no={bioNo} />
        </p>
      </div>
    </article>
  );
}
