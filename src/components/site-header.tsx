"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDaysIcon } from "lucide-react";
import { motion } from "motion/react";
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
    let lastValue = false;

    const updateScrollState = () => {
      const nextValue = window.scrollY > 36;

      if (nextValue !== lastValue) {
        lastValue = nextValue;
        setIsScrolled(nextValue);
      }
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      window.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-5 pt-5 sm:px-8"
    >
      <nav
        className={cn(
          "relative grid h-16 w-full max-w-[68rem] grid-cols-[minmax(0,1fr)_auto] items-center gap-2 overflow-hidden rounded-full transition-[max-width,padding] duration-300 ease-[cubic-bezier(0.77,0,0.175,1)] sm:gap-3 md:grid-cols-[1fr_auto_1fr]",
          isScrolled
            ? "max-w-[56rem] px-2.5 max-md:border max-md:border-foreground/10 max-md:bg-background/45 max-md:shadow-2xl max-md:shadow-black/20 max-md:backdrop-blur-2xl"
            : "px-0"
        )}
        aria-label="Main navigation"
      >
        <motion.span
          aria-hidden="true"
          animate={{
            left: isScrolled ? 0 : "50%",
            width: isScrolled ? "100%" : "15.5rem",
            x: isScrolled ? "0%" : "-50%",
          }}
          className={cn(
            "pointer-events-none absolute top-1/2 z-0 hidden h-14 -translate-y-1/2 rounded-full border border-foreground/10 md:block",
            isScrolled
              ? "bg-background/45 shadow-2xl shadow-black/20 backdrop-blur-2xl"
              : "bg-muted/40"
          )}
          initial={false}
          transition={{ type: "spring", duration: 0.42, bounce: 0.08 }}
        />
        <Link
          className="relative z-10 flex min-w-0 items-center gap-2 justify-self-start leading-none sm:gap-2.5"
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
            "relative z-10 hidden translate-y-0.5 items-center gap-1 rounded-full transition-[padding] duration-300 ease-out md:flex",
            isScrolled ? "p-0" : "p-1"
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

        <div className="relative z-10 justify-self-end">
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
