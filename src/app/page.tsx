import Image from "next/image";
import Link from "next/link";
import {
  CalendarDaysIcon,
  CheckIcon,
  MailIcon,
  MapPinIcon,
  MoveUpRightIcon,
  PhoneIcon,
  ShieldCheckIcon,
  StarIcon,
} from "lucide-react";

import { SetmoreBooking } from "@/components/setmore-booking";
import { SetmoreCookieDismiss } from "@/components/setmore-cookie-dismiss";
import { SiteHeader } from "@/components/site-header";
import { InstagramIcon, TikTokIcon } from "@/components/social-icons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { BorderBeam } from "@/components/ui/border-beam";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Marquee } from "@/components/ui/marquee";
import { Separator } from "@/components/ui/separator";

const galleryImages = [
  {
    src: "/media/gallery/work-01.jpg",
    alt: "Black and grey realistic tattoo on chest",
  },
  {
    src: "/media/gallery/work-02.jpg",
    alt: "Detailed realistic tattoo work",
  },
  {
    src: "/media/gallery/work-03.jpg",
    alt: "Realistic tattoo portrait detail",
  },
  {
    src: "/media/gallery/work-04.jpg",
    alt: "Black and grey tattoo sleeve detail",
  },
  {
    src: "/media/gallery/work-05.jpg",
    alt: "Detailed custom tattoo composition",
  },
  {
    src: "/media/gallery/work-06.jpg",
    alt: "Realism tattoo shading and texture",
  },
];

const standards = [
  {
    title: "Custom designs",
    text: "Every tattoo is shaped around your idea, placement, body, and long-term wear.",
  },
  {
    title: "High-quality realism",
    text: "Strong focus on depth, contrast, portrait detail, and clean black-and-grey execution.",
  },
  {
    title: "Safe studio",
    text: "Professional hygiene, clear aftercare, and a calm process from consultation to finish.",
  },
  {
    title: "Clear communication",
    text: "You get a direct conversation about concept, sizing, references, and expectations.",
  },
];

const testimonials = [
  {
    quote:
      "Very happy with the result and the full experience. Comfortable session, visible passion, and strong attention to detail.",
    name: "Kristi Rouko",
  },
  {
    quote:
      "Clean studio, welcoming energy, chill vibe, and a tattoo that turned out better than expected.",
    name: "Areti Anastasi",
  },
  {
    quote:
      "Clean and welcoming studio with a great vibe. The artist listens, gives advice, and makes the process comfortable.",
    name: "Petros Tzegias",
  },
  {
    quote:
      "Excellent communication from the start, with time spent understanding the idea and helping shape the right design.",
    name: "Hlias Hysos",
  },
];

const faqItems = [
  {
    question: "How do I book a consultation?",
    answer:
      "Use the booking calendar above and choose a consultation length that fits your idea. You can share references and placement details during the consultation.",
  },
  {
    question: "What should I bring?",
    answer:
      "Bring clear reference images, placement ideas, approximate size, and any meaning or details that matter for the design.",
  },
  {
    question: "Do you do custom designs?",
    answer:
      "Yes. Most work is custom, built around your idea, body placement, and the long-term look of the tattoo.",
  },
  {
    question: "Where is the studio?",
    answer:
      "Infinity Tattoo is at Skårersletta 48c in Lørenskog. The map above opens the exact location.",
  },
];

export default function Home() {
  return (
    <main id="home" className="min-h-screen overflow-hidden bg-background">
      <SiteHeader />

      <section className="relative isolate flex min-h-[88svh] items-end overflow-hidden">
        <video
          aria-label="Infinity Tattoo Studio reel"
          autoPlay
          className="absolute inset-0 -z-20 size-full object-cover opacity-70"
          loop
          muted
          playsInline
          poster="/media/hero-poster.jpeg"
          preload="metadata"
        >
          <source src="/media/video/studio-reel.mp4#t=4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/35 via-background/45 to-background" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_75%_20%,var(--studio-red-soft),transparent_35%)]" />

        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 pb-14 pt-32 sm:px-8 lg:pb-20">
          <div className="flex max-w-4xl flex-col gap-6">
            <h1 className="font-display text-5xl font-bold leading-none text-foreground sm:text-7xl lg:text-8xl">
              INFINITY TATTOO
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
              Custom realistic tattoos in Lørenskog, built around precision,
              detail, and a design that actually belongs on your skin.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              className="rounded-full"
              nativeButton={false}
              render={<a href="#setmore-booking" />}
              size="lg"
            >
              Book a session
              <CalendarDaysIcon data-icon="inline-end" />
            </Button>
            <Button
              nativeButton={false}
              render={<a href="#work" />}
              size="lg"
              variant="outline"
            >
              View work
              <MoveUpRightIcon data-icon="inline-end" />
            </Button>
          </div>
        </div>
      </section>

      <section
        className="border-y bg-card/25 py-8 text-muted-foreground"
        aria-label="Client reviews"
      >
        <Marquee pauseOnHover repeat={3} className="[--duration:48s]">
          {testimonials.map((testimonial) => (
            <Card
              className="mx-2 w-[21rem] bg-background/70 sm:w-[28rem]"
              key={testimonial.name}
            >
              <CardContent className="flex min-h-44 flex-col gap-5 pt-5">
                <div className="flex gap-1 text-[color:var(--studio-red)]">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <StarIcon
                      className="size-4 fill-current"
                      key={`${testimonial.name}-${index}`}
                    />
                  ))}
                </div>
                <p className="text-base leading-7 text-foreground">
                  &quot;{testimonial.quote}&quot;
                </p>
                <p className="mt-auto text-sm font-semibold text-muted-foreground">
                  {testimonial.name}
                </p>
              </CardContent>
            </Card>
          ))}
        </Marquee>
      </section>

      <section
        id="work"
        className="mx-auto flex max-w-6xl flex-col gap-10 px-5 py-20 sm:px-8 lg:py-28"
      >
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div className="flex flex-col gap-4">
            <h2 className="font-display text-4xl font-bold sm:text-5xl">
              Recent projects
            </h2>
            <p className="text-base leading-7 text-muted-foreground">
              A curated selection of custom and realistic tattoo work, focused
              on detail, precision, and strong black-and-grey contrast.
            </p>
          </div>
          <div className="relative min-h-64 overflow-hidden rounded-lg border bg-card">
            <Image
              src="/media/gallery-strip.png"
              alt="Three black and grey realism tattoo examples"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 56vw, 90vw"
            />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {galleryImages.map((image, index) => (
            <div
              className={`group relative aspect-[4/5] overflow-hidden rounded-lg border bg-card ${
                index > 2 ? "hidden sm:block" : ""
              }`}
              key={image.src}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
              />
            </div>
          ))}
        </div>
      </section>

      <section id="artist" className="border-y bg-card/35">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:py-28">
          <div className="relative min-h-[34rem] overflow-hidden rounded-lg border bg-card">
            <Image
              src="/media/artist/filippos.jpg"
              alt="Filippos Hoxhaj, artist and owner of Infinity Tattoo Studio"
              fill
              className="object-cover object-[50%_18%]"
              sizes="(min-width: 1024px) 38vw, 92vw"
            />
          </div>
          <div className="flex flex-col justify-center gap-6">
            <div className="flex flex-col gap-4">
              <Badge variant="secondary" className="w-fit">
                The artist
              </Badge>
              <h2 className="font-display text-4xl font-bold sm:text-5xl">
                Filippos Hoxhaj
              </h2>
              <p className="text-lg leading-8 text-muted-foreground">
                Driven by passion and precision, the artist and owner behind
                Infinity Tattoo Studio creates custom tattoos that tell your
                story. Every design is personal, every line intentional.
              </p>
            </div>
            <Separator />
            <div className="grid gap-4 sm:grid-cols-2">
              {["Greece and Norway experience", "Realism-first execution"].map(
                (item) => (
                  <div className="flex items-center gap-3" key={item}>
                    <span className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <CheckIcon className="size-4" />
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {item}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>

          <div
            id="studio"
            className="grid gap-4 lg:col-span-2 md:grid-cols-2 lg:grid-cols-4"
          >
            {standards.map((item) => (
              <Card className="bg-card/70" key={item.title}>
                <CardHeader>
                  <ShieldCheckIcon className="size-5 text-[color:var(--studio-red)]" />
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-6 text-muted-foreground">
                    {item.text}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="mx-auto flex max-w-6xl flex-col gap-8 px-5 pb-20 pt-12 sm:px-8 lg:pb-28 lg:pt-16"
      >
        <h2 className="text-center font-display text-4xl font-bold sm:text-5xl">
          Consultation
        </h2>

        <div className="grid gap-3 md:grid-cols-3">
          <a
            className="flex items-center justify-center gap-3 rounded-full border bg-card/60 p-4 text-sm text-muted-foreground transition hover:bg-card hover:text-foreground"
            href="mailto:infinitytattoo99@gmail.com"
          >
            <MailIcon className="size-5 text-[color:var(--studio-red)]" />
            infinitytattoo99@gmail.com
          </a>
          <a
            className="flex items-center justify-center gap-3 rounded-full border bg-card/60 p-4 text-sm text-muted-foreground transition hover:bg-card hover:text-foreground"
            href="tel:+4740344775"
          >
            <PhoneIcon className="size-5 text-[color:var(--studio-red)]" />
            +47 40 34 47 75
          </a>
          <a
            className="flex items-center justify-center gap-3 rounded-full border bg-card/60 p-4 text-sm text-muted-foreground transition hover:bg-card hover:text-foreground"
            href="https://www.google.com/maps/search/?api=1&query=Sk%C3%A5rersletta%2048c%2C%20L%C3%B8renskog"
            rel="noreferrer"
            target="_blank"
          >
            <MapPinIcon className="size-5 text-[color:var(--studio-red)]" />
            Skårersletta 48c
          </a>
        </div>

        <div id="setmore-booking" className="scroll-mt-28" />

        <SetmoreCookieDismiss>
          <div className="relative overflow-hidden rounded-3xl bg-card/80 p-2 [overflow-anchor:none]">
            <BorderBeam
              borderWidth={1}
              colorFrom="var(--studio-red)"
              colorTo="var(--foreground)"
              duration={9}
              size={240}
            />
            <SetmoreBooking />
          </div>
        </SetmoreCookieDismiss>

        <div className="overflow-hidden rounded-3xl border bg-card/80 p-2">
          <iframe
            aria-label="Infinity Tattoo location on Google Maps"
            className="h-[25rem] w-full rounded-2xl border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            scrolling="no"
            src="https://maps.google.com/maps?width=600&height=400&hl=en&q=sk%C3%A5rersletta%2048c&t=k&z=17&ie=UTF8&iwloc=B&output=embed"
          />
        </div>

        <div className="rounded-3xl border bg-card/60 p-2">
          <Accordion className="px-4 py-2" defaultValue={[faqItems[0].question]}>
            {faqItems.map((item) => (
              <AccordionItem key={item.question} value={item.question}>
                <AccordionTrigger className="py-4 text-base">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <footer className="px-5 pb-10 sm:px-8">
        <div className="mx-auto w-full max-w-[68rem]">
          <div className="flex flex-col gap-8 rounded-3xl border bg-card/60 p-6 text-sm text-muted-foreground sm:p-8 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3 text-foreground">
              <span className="relative flex size-10 overflow-hidden rounded-full bg-foreground">
                <Image
                  src="/media/brand/infinity.svg"
                  alt=""
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              </span>
              <span>© Infinity Tattoo Studio</span>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <a
                aria-label="Instagram"
                className="inline-flex h-10 items-center gap-2 rounded-full border bg-background/50 px-4 transition hover:bg-background hover:text-foreground"
                href="https://www.instagram.com/infinitytattoo.lorenskog/"
                rel="noreferrer"
                target="_blank"
              >
                <InstagramIcon className="size-5" />
                <span>Instagram</span>
              </a>
              <a
                aria-label="Tiktok"
                className="inline-flex h-10 items-center gap-2 rounded-full border bg-background/50 px-4 transition hover:bg-background hover:text-foreground"
                href="https://www.tiktok.com/@infinitytattoostudio"
                rel="noreferrer"
                target="_blank"
              >
                <TikTokIcon className="size-4" />
                <span>Tiktok</span>
              </a>
            </div>
          </div>
          <div className="flex items-center justify-between px-2 pt-3 text-xs text-muted-foreground/70">
            <Link
              className="relative z-10 inline-flex h-8 items-center transition hover:text-foreground"
              href="/admin"
            >
              Admin
            </Link>
            <a
              className="relative z-10 inline-flex h-8 items-center transition hover:text-foreground"
              href="https://www.albab.dk/"
              rel="noreferrer"
              target="_blank"
            >
              made by albab.dk
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
