"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDaysIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Work", href: "#work" },
  { label: "Artist", href: "#artist" },
  { label: "Contact", href: "#contact" },
];

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let animationFrame = 0;
    let lastValue = false;

    const updateScrollState = () => {
      const nextValue = window.scrollY > 36;

      if (nextValue !== lastValue) {
        lastValue = nextValue;
        setIsScrolled(nextValue);
      }
    };

    const scheduleScrollState = () => {
      if (animationFrame) {
        return;
      }

      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = 0;
        updateScrollState();
      });
    };

    scheduleScrollState();
    window.addEventListener("scroll", scheduleScrollState, { passive: true });

    return () => {
      window.removeEventListener("scroll", scheduleScrollState);
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 flex justify-center px-5 pt-5 transition-[padding] duration-300 ease-out sm:px-8",
        isScrolled && "pt-3"
      )}
    >
      <nav
        className={cn(
          "grid h-16 w-full max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-2 transition-[max-width,background-color,border-color,box-shadow,padding] duration-300 ease-out will-change-transform sm:gap-3 md:grid-cols-[1fr_auto_1fr]",
          isScrolled
            ? "max-w-5xl rounded-full border border-foreground/10 bg-background/45 px-2.5 shadow-2xl shadow-black/20 backdrop-blur-2xl sm:px-3"
            : "border border-transparent bg-transparent px-0"
        )}
        aria-label="Main navigation"
      >
        <Link
          className="flex min-w-0 items-center gap-2 justify-self-start leading-none sm:gap-2.5"
          href="#home"
        >
          <span className="relative flex size-9 shrink-0 overflow-hidden rounded-full bg-foreground sm:size-11">
            <Image
              src="/media/brand/infinity.svg"
              alt=""
              fill
              className="object-cover"
              sizes="44px"
              priority
            />
          </span>
          <span className="truncate text-sm font-semibold leading-none text-foreground sm:text-base">
            Infinity Tattoo
          </span>
        </Link>

        <div
          className={cn(
            "hidden items-center gap-1 rounded-full transition-[background-color,padding] duration-300 ease-out md:flex",
            isScrolled ? "bg-transparent p-0" : "bg-muted/40 p-1"
          )}
        >
          {navItems.map((item) => (
            <a
              className="rounded-full px-4 py-2 text-sm text-muted-foreground transition hover:bg-background hover:text-foreground"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="justify-self-end">
          <Button
            className="h-11 gap-2 rounded-full pl-4 !pr-4 text-sm sm:gap-2.5 sm:pl-7 sm:!pr-7"
            nativeButton={false}
            render={<a href="#setmore-booking" />}
            size="lg"
          >
            Book session
            <CalendarDaysIcon data-icon="inline-end" />
          </Button>
        </div>
      </nav>
    </header>
  );
}
