import { MoveUpRightIcon } from "lucide-react";

import { InstagramIcon } from "@/components/social-icons";
import { cn } from "@/lib/utils";

export function InstagramPill({ className }: { className?: string }) {
  return (
    <a
      className={cn(
        "motion-lift-subtle flex items-center justify-center gap-3 rounded-full border bg-card/60 p-4 text-sm text-muted-foreground transition hover:bg-card hover:text-foreground",
        className,
      )}
      href="https://www.instagram.com/infinitytattoo.lorenskog/"
      rel="noreferrer"
      target="_blank"
    >
      <InstagramIcon className="size-5 text-[color:var(--studio-gold)]" />
      Instagram
      <MoveUpRightIcon
        aria-hidden="true"
        data-icon="inline-end"
        className="size-4 text-[color:var(--studio-gold)]"
      />
    </a>
  );
}
