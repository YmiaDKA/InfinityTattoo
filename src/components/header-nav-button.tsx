import { type ComponentProps } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function HeaderNavButton({
  className,
  ...props
}: ComponentProps<typeof Button>) {
  return (
    <Button
      variant="ghost"
      {...props}
      className={cn(
        "h-10 rounded-full px-4 text-sm text-muted-foreground transition hover:bg-muted/50 hover:text-foreground aria-expanded:bg-muted/50",
        className,
      )}
    />
  );
}
