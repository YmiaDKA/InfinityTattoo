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

import { LineworkBooking } from "@/components/linework-booking";
import { LocalizedText } from "@/components/localized-text";
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
    titleEn: "Custom designs",
    titleNo: "Skreddersydde design",
    textEn:
      "Every tattoo is shaped around your idea, placement, body, and long-term wear.",
    textNo:
      "Hver tatovering formes rundt ideen din, plassering, kroppen og hvordan den skal holde seg over tid.",
  },
  {
    titleEn: "High-quality realism",
    titleNo: "Realisme på høyt nivå",
    textEn:
      "Strong focus on depth, contrast, portrait detail, and clean black-and-grey execution.",
    textNo:
      "Sterkt fokus på dybde, kontrast, portrettdetaljer og ren black-and-grey utførelse.",
  },
  {
    titleEn: "Safe studio",
    titleNo: "Trygt studio",
    textEn:
      "Professional hygiene, clear aftercare, and a calm process from consultation to finish.",
    textNo:
      "Profesjonell hygiene, tydelig etterbehandling og en rolig prosess fra konsultasjon til ferdig tatovering.",
  },
  {
    titleEn: "Clear communication",
    titleNo: "Tydelig kommunikasjon",
    textEn:
      "You get a direct conversation about concept, sizing, references, and expectations.",
    textNo:
      "Du får en direkte samtale om konsept, størrelse, referanser og forventninger.",
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
    questionEn: "How do I book a consultation?",
    questionNo: "Hvordan booker jeg konsultasjon?",
    answerEn:
      "Use the booking calendar above and choose a consultation length that fits your idea. You can share references and placement details during the consultation.",
    answerNo:
      "Bruk bookingkalenderen over og velg en konsultasjon som passer ideen din. Du kan dele referanser og plassering under konsultasjonen.",
  },
  {
    questionEn: "What should I bring?",
    questionNo: "Hva bør jeg ha klart?",
    answerEn:
      "Bring clear reference images, placement ideas, approximate size, and any meaning or details that matter for the design.",
    answerNo:
      "Ha klare referansebilder, plassering, omtrent størrelse og detaljer som er viktige for designet.",
  },
  {
    questionEn: "Do you do custom designs?",
    questionNo: "Lager dere custom design?",
    answerEn:
      "Yes. Most work is custom, built around your idea, body placement, and the long-term look of the tattoo.",
    answerNo:
      "Ja. Det meste lages custom rundt ideen din, plassering på kroppen og hvordan tatoveringen skal se ut over tid.",
  },
  {
    questionEn: "How does pricing work?",
    questionNo: "Hvordan fungerer pris?",
    answerEn:
      "Price depends on size, detail, placement, and time. You get a clearer estimate during the consultation.",
    answerNo:
      "Pris avhenger av størrelse, detaljnivå, plassering og tidsbruk. Du får et tydeligere estimat under konsultasjonen.",
  },
  {
    questionEn: "Can I get tattooed if I have health concerns?",
    questionNo: "Kan jeg tatovere meg hvis jeg har helsehensyn?",
    answerEn:
      "Tell the artist about allergies, medication, skin conditions, or health concerns before the appointment so the process can be handled safely.",
    answerNo:
      "Si fra om allergier, medisiner, hudtilstander eller helsehensyn før timen, slik at prosessen kan gjøres trygt.",
  },
  {
    questionEn: "Where is the studio?",
    questionNo: "Hvor ligger studioet?",
    answerEn:
      "Infinity Tattoo is at Skårersletta 48c in Lørenskog. The map above opens the exact location.",
    answerNo:
      "Infinity Tattoo ligger på Skårersletta 48c i Lørenskog. Kartet over åpner nøyaktig lokasjon.",
  },
];

const aftercareItems = [
  {
    titleEn: "Day 1-3",
    titleNo: "Dag 1-3",
    textEn:
      "Keep the tattoo clean, follow the wrapping instructions you were given, and wash gently with clean hands.",
    textNo:
      "Hold tatoveringen ren, følg instruksene du fikk om folie/plast, og vask forsiktig med rene hender.",
  },
  {
    titleEn: "Day 4-7",
    titleNo: "Dag 4-7",
    textEn:
      "Apply a thin layer of aftercare cream when needed. Do not over-moisturize, scratch, or pick at flakes.",
    textNo:
      "Påfør et tynt lag aftercare-krem ved behov. Ikke bruk for mye krem, og ikke klø eller plukk på flass.",
  },
  {
    titleEn: "Week 2",
    titleNo: "Uke 2",
    textEn:
      "Light peeling and itching is normal. Let the skin heal naturally and keep clothing clean and loose over the area.",
    textNo:
      "Lett flassing og kløe er normalt. La huden gro naturlig og bruk rene, løse klær over området.",
  },
  {
    titleEn: "Week 3-4",
    titleNo: "Uke 3-4",
    textEn:
      "The surface may look healed, but the skin is still settling. Avoid hard friction and keep caring for the area.",
    textNo:
      "Overflaten kan se grodd ut, men huden stabiliserer seg fortsatt. Unngå hard friksjon og fortsett å ta vare på området.",
  },
  {
    titleEn: "Always avoid",
    titleNo: "Unngå alltid",
    textEn:
      "Avoid swimming, sauna, direct sun, tanning beds, heavy soaking, and dirty gym surfaces while healing.",
    textNo:
      "Unngå bading, badstue, direkte sol, solarium, lang bløtlegging og urene treningsflater mens tatoveringen gror.",
  },
  {
    titleEn: "Long-term care",
    titleNo: "Langsiktig pleie",
    textEn:
      "Use sunscreen on healed tattoos and keep the skin moisturized to preserve contrast and detail.",
    textNo:
      "Bruk solkrem på grodde tatoveringer og hold huden fuktet for å bevare kontrast og detaljer.",
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
              <LocalizedText
                en="Custom realistic tattoos in Lørenskog, built around precision, detail, and a design that actually belongs on your skin."
                no="Custom realistiske tatoveringer i Lørenskog, bygget rundt presisjon, detaljer og et design som faktisk passer huden din."
              />
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              className="rounded-full"
              nativeButton={false}
              render={<a href="#booking" />}
              size="lg"
            >
              <LocalizedText en="Book a session" no="Book time" />
              <CalendarDaysIcon data-icon="inline-end" />
            </Button>
            <Button
              nativeButton={false}
              render={<a href="#work" />}
              size="lg"
              variant="outline"
            >
              <LocalizedText en="View work" no="Se arbeid" />
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
              <LocalizedText en="Recent projects" no="Nylige prosjekter" />
            </h2>
            <p className="text-base leading-7 text-muted-foreground">
              <LocalizedText
                en="A curated selection of custom and realistic tattoo work, focused on detail, precision, and strong black-and-grey contrast."
                no="Et kuratert utvalg av custom og realistiske tatoveringer med fokus på detaljer, presisjon og sterk black-and-grey kontrast."
              />
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
                <LocalizedText en="The artist" no="Artisten" />
              </Badge>
              <h2 className="font-display text-4xl font-bold sm:text-5xl">
                Filippos Hoxhaj
              </h2>
              <p className="text-lg leading-8 text-muted-foreground">
                <LocalizedText
                  en="Driven by passion and precision, the artist and owner behind Infinity Tattoo Studio creates custom tattoos that tell your story. Every design is personal, every line intentional."
                  no="Drevet av lidenskap og presisjon lager artisten og eieren bak Infinity Tattoo Studio custom tatoveringer som forteller historien din. Hvert design er personlig, og hver linje er bevisst."
                />
              </p>
            </div>
            <Separator />
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  en: "Greece and Norway experience",
                  no: "Erfaring fra Hellas og Norge",
                },
                {
                  en: "Realism-first execution",
                  no: "Realisme først i utførelsen",
                },
              ].map((item) => (
                  <div className="flex items-center gap-3" key={item.en}>
                    <span className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <CheckIcon className="size-4" />
                    </span>
                    <span className="text-sm text-muted-foreground">
                      <LocalizedText en={item.en} no={item.no} />
                    </span>
                  </div>
                ))}
            </div>
          </div>

          <div
            id="studio"
            className="grid gap-4 lg:col-span-2 md:grid-cols-2 lg:grid-cols-4"
          >
            {standards.map((item) => (
              <Card className="bg-card/70" key={item.titleEn}>
                <CardHeader>
                  <ShieldCheckIcon className="size-5 text-[color:var(--studio-red)]" />
                  <CardTitle>
                    <LocalizedText en={item.titleEn} no={item.titleNo} />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-6 text-muted-foreground">
                    <LocalizedText en={item.textEn} no={item.textNo} />
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
          <LocalizedText en="Consultation" no="Konsultasjon" />
        </h2>

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
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
          <a
            className="flex items-center justify-center gap-3 rounded-full border bg-card/60 p-4 text-sm text-muted-foreground transition hover:bg-card hover:text-foreground"
            href="https://booking.linework.com/infinity/tattoo"
            rel="noreferrer"
            target="_blank"
          >
            <LocalizedText en="Open in new page" no="Åpne i ny side" />
            <MoveUpRightIcon className="size-4 text-[color:var(--studio-red)]" />
          </a>
        </div>

        <div
          id="booking"
          className="relative scroll-mt-28 overflow-hidden rounded-3xl bg-card/80 p-2 [overflow-anchor:none]"
        >
          <BorderBeam
            borderWidth={1}
            colorFrom="var(--studio-red)"
            colorTo="var(--foreground)"
            duration={9}
            size={240}
          />
          <LineworkBooking />
        </div>

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
          <div className="px-4 pt-4">
            <h3 className="font-display text-3xl font-bold">
              <LocalizedText en="FAQ" no="Ofte stilte spørsmål" />
            </h3>
          </div>
          <Accordion
            className="px-4 py-2"
            defaultValue={[faqItems[0].questionEn]}
          >
            {faqItems.map((item) => (
              <AccordionItem key={item.questionEn} value={item.questionEn}>
                <AccordionTrigger className="py-4 text-base">
                  <LocalizedText en={item.questionEn} no={item.questionNo} />
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  <LocalizedText en={item.answerEn} no={item.answerNo} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="rounded-3xl border bg-card/60 p-6">
          <div className="mb-6 flex flex-col gap-2">
            <h3 className="font-display text-3xl font-bold">
              <LocalizedText en="Aftercare" no="Etterbehandling" />
            </h3>
            <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
              <LocalizedText
                en="First-pass guide from the aftercare sheet. Follow the personal instructions from your artist if they differ."
                no="Første versjon basert på aftercare-arket. Følg de personlige instruksene fra artisten hvis de avviker."
              />
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {aftercareItems.map((item) => (
              <Card className="bg-background/55" key={item.titleEn}>
                <CardHeader>
                  <CardTitle>
                    <LocalizedText en={item.titleEn} no={item.titleNo} />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-6 text-muted-foreground">
                    <LocalizedText en={item.textEn} no={item.textNo} />
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
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
