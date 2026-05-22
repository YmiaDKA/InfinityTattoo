"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDaysIcon } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { LanguageToggle } from "@/components/language-toggle";
import { LocalizedText } from "@/components/localized-text";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { labelEn: "Work", labelNo: "Arbeid", href: "/#work" },
  { labelEn: "Artist", labelNo: "Artist", href: "/#artist" },
  { labelEn: "Contact", labelNo: "Kontakt", href: "/#contact" },
  { labelEn: "FAQ", labelNo: "FAQ", href: "/#faq" },
];

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [pillBounds, setPillBounds] = useState<{
    left: number;
    width: number;
  } | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const navItemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let lastValue = false;

    const measurePill = () => {
      const nav = navRef.current;
      const items = navItemsRef.current;

      if (!nav || !items) {
        return;
      }

      const navRect = nav.getBoundingClientRect();
      const itemRect = items.getBoundingClientRect();

      setPillBounds({
        left: itemRect.left - navRect.left,
        width: itemRect.width,
      });
    };

    const updateScrollState = () => {
      const nextValue = window.scrollY > 36;

      if (nextValue !== lastValue) {
        lastValue = nextValue;
        setIsScrolled(nextValue);
      }
    };

    measurePill();
    updateScrollState();
    window.addEventListener("resize", measurePill);
    window.addEventListener("scroll", updateScrollState, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", measurePill);
    };
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-5 pt-5 sm:px-8"
    >
      <div className="absolute right-5 top-6 hidden md:block sm:right-8">
        <LanguageToggle large />
      </div>
      <nav
        ref={navRef}
        className={cn(
          "relative grid h-16 w-full max-w-[68rem] grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-2 rounded-full sm:gap-3 md:grid-cols-[1fr_auto_1fr]",
          isScrolled
            ? "max-w-[56rem] px-2.5 max-md:border max-md:border-foreground/10 max-md:bg-background/45 max-md:shadow-2xl max-md:shadow-black/20 max-md:backdrop-blur-2xl"
            : "px-0"
        )}
        aria-label="Main navigation"
      >
        {pillBounds ? (
          <motion.span
            aria-hidden="true"
            animate={{
              backgroundColor: isScrolled
                ? "color-mix(in oklch, var(--background) 45%, transparent)"
                : "color-mix(in oklch, var(--muted) 40%, transparent)",
              left: isScrolled ? 0 : pillBounds.left,
              width: isScrolled ? "100%" : pillBounds.width,
            }}
            className="pointer-events-none absolute top-1/2 z-0 hidden h-14 -translate-y-1/2 rounded-full border border-foreground/10 shadow-2xl shadow-black/20 backdrop-blur-2xl md:block"
            initial={false}
            transition={{
              backgroundColor: { duration: 0.14 },
              left: { type: "spring", duration: 0.42, bounce: 0.08 },
              width: { type: "spring", duration: 0.42, bounce: 0.08 },
            }}
          />
        ) : null}
        <Link
          className="relative z-10 flex min-w-0 items-center gap-2 justify-self-start leading-none sm:gap-2.5"
          href="/#home"
        >
          <span
            className={cn(
              "relative flex size-9 shrink-0 overflow-hidden rounded-full bg-foreground transition-transform sm:size-11",
              isScrolled && "max-md:translate-x-1 md:-translate-x-1"
            )}
          >
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

        <div className="relative z-10 justify-self-center md:hidden">
          <LanguageToggle merged={isScrolled} />
        </div>

        <div
          ref={navItemsRef}
          className="relative z-10 hidden h-12 items-center gap-1 rounded-full border border-transparent bg-transparent px-1 transition-colors duration-75 md:flex"
        >
          {navItems.map((item) => (
            <a
              className="inline-flex h-10 items-center rounded-full px-5 text-sm text-muted-foreground transition hover:bg-muted/50 hover:text-foreground"
              href={item.href}
              key={item.href}
            >
              <LocalizedText en={item.labelEn} no={item.labelNo} />
            </a>
          ))}
        </div>

        <div className="relative z-10 flex items-center gap-2 justify-self-end">
          <Button
            className="h-9 gap-1.5 rounded-full pl-3 !pr-3 text-xs sm:h-10 sm:gap-2 sm:pl-5 sm:!pr-5 sm:text-sm md:h-11 md:translate-x-1 md:gap-2.5 md:pl-7 md:!pr-7"
            nativeButton={false}
            render={<Link href="/#booking" />}
            size="lg"
          >
            <LocalizedText en="Book session" no="Book time" />
            <CalendarDaysIcon data-icon="inline-end" />
          </Button>
        </div>
      </nav>
    </header>
  );
}
