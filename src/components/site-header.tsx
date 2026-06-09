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
  { labelEn: "Tooth gems", labelNo: "Tooth gems", href: "/tooth-gems" },
  { labelEn: "Contact", labelNo: "Kontakt", href: "/#contact" },
  { labelEn: "FAQ", labelNo: "FAQ", href: "/#faq" },
];

const expandedContentInset = 6;
const expandedLogoOffset = 3;
const mobileExpandedContentInset = 14;

export function SiteHeader() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [pillBounds, setPillBounds] = useState<{
    expandedHeight: number;
    expandedLeft: number;
    expandedTop: number;
    expandedWidth: number;
    height: number;
    left: number;
    top: number;
    width: number;
  } | null>(null);
  const mobilePickerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const navItemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let lastValue = false;

    const updateViewport = () => {
      setIsDesktop(window.matchMedia("(min-width: 768px)").matches);
    };

    const measurePill = () => {
      const nav = navRef.current;
      const mobilePicker = mobilePickerRef.current;
      const items = navItemsRef.current;

      if (!nav || !items || !mobilePicker) {
        return;
      }

      const nextIsDesktop = window.matchMedia("(min-width: 768px)").matches;
      const navRect = nav.getBoundingClientRect();
      const itemRect = items.getBoundingClientRect();
      const mobileRect = mobilePicker.getBoundingClientRect();
      const canExpand = nextIsDesktop ? itemRect.width > 0 : mobileRect.width > 0;
      const expandedWidth = nextIsDesktop
        ? Math.min(navRect.width, 896)
        : navRect.width;
      const expandedLeft = nextIsDesktop
        ? (navRect.width - expandedWidth) / 2
        : 0;
      const expandedHeight = nextIsDesktop ? 56 : navRect.height;
      const expandedTop = nextIsDesktop ? (navRect.height - expandedHeight) / 2 : 0;
      const collapsedRect = nextIsDesktop ? itemRect : mobileRect;

      setPillBounds({
        expandedHeight,
        expandedLeft,
        expandedTop,
        expandedWidth,
        height: canExpand ? collapsedRect.height : expandedHeight,
        left: canExpand ? collapsedRect.left - navRect.left : expandedLeft,
        top: canExpand ? collapsedRect.top - navRect.top : expandedTop,
        width: canExpand ? collapsedRect.width : expandedWidth,
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
    updateViewport();
    updateScrollState();
    window.addEventListener("resize", measurePill);
    window.addEventListener("resize", updateViewport);
    window.addEventListener("scroll", updateScrollState, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", measurePill);
      window.removeEventListener("resize", updateViewport);
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
            ? "max-md:shadow-2xl max-md:shadow-black/20"
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
                : isDesktop
                  ? "color-mix(in oklch, var(--muted) 40%, transparent)"
                  : "transparent",
              borderColor: isScrolled || isDesktop
                ? "color-mix(in oklch, var(--foreground) 10%, transparent)"
                : "transparent",
              height: isScrolled ? pillBounds.expandedHeight : pillBounds.height,
              left: isScrolled ? pillBounds.expandedLeft : pillBounds.left,
              top: isScrolled ? pillBounds.expandedTop : pillBounds.top,
              width: isScrolled ? pillBounds.expandedWidth : pillBounds.width,
            }}
            className="pointer-events-none absolute z-0 block rounded-full border shadow-2xl shadow-black/20 backdrop-blur-2xl"
            initial={false}
            transition={{
              backgroundColor: { duration: 0.14 },
              borderColor: { duration: 0.1 },
              height: { type: "spring", duration: 0.42, bounce: 0.08 },
              left: { type: "spring", duration: 0.42, bounce: 0.08 },
              top: { type: "spring", duration: 0.42, bounce: 0.08 },
              width: { type: "spring", duration: 0.42, bounce: 0.08 },
            }}
          />
        ) : null}
        <motion.div
          animate={{
            x: isScrolled
              ? isDesktop
                ? (pillBounds?.expandedLeft ?? 0) +
                  expandedContentInset +
                  expandedLogoOffset
                : mobileExpandedContentInset
              : 0,
          }}
          className="relative z-10 min-w-0 justify-self-start"
          initial={false}
          transition={{ type: "spring", duration: 0.42, bounce: 0.08 }}
        >
          <Link
            className="flex min-w-0 items-center gap-2 leading-none sm:gap-2.5"
            href="/#home"
          >
            <span
              className={cn(
                "relative flex size-9 shrink-0 overflow-hidden rounded-full bg-foreground transition-transform sm:size-11",
                isScrolled && "md:-translate-x-1"
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
        </motion.div>

        <div
          ref={mobilePickerRef}
          className="relative z-10 -translate-x-3.5 justify-self-center md:hidden"
        >
          <LanguageToggle />
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

        <motion.div
          animate={{
            x: isScrolled
              ? isDesktop
                ? -((pillBounds?.expandedLeft ?? 0) + expandedContentInset)
                : -mobileExpandedContentInset
              : 0,
          }}
          className="relative z-10 flex items-center gap-2 justify-self-end"
          initial={false}
          transition={{ type: "spring", duration: 0.42, bounce: 0.08 }}
        >
          <Button
            className="h-9 gap-1.5 rounded-full pl-2.5 !pr-2.5 text-xs sm:h-10 sm:gap-2 sm:pl-5 sm:!pr-5 sm:text-sm md:h-11 md:gap-2.5 md:pl-7 md:!pr-7"
            nativeButton={false}
            render={<Link href="/#booking" />}
            size="lg"
          >
            <span className="md:hidden">Book</span>
            <span className="hidden md:inline">
              <LocalizedText en="Book session" no="Book time" />
            </span>
            <CalendarDaysIcon data-icon="inline-end" />
          </Button>
        </motion.div>
      </nav>
    </header>
  );
}
