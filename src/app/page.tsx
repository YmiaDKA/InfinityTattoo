import Image from "next/image";
import Link from "next/link";
import {
  CalendarDaysIcon,
  CheckIcon,
  GiftIcon,
  MailIcon,
  MapPinIcon,
  MoveUpRightIcon,
  PhoneIcon,
  StarIcon,
} from "lucide-react";

import { LineworkBooking } from "@/components/linework-booking";
import { LocalizedText } from "@/components/localized-text";
import { PanoramaViewer } from "@/components/panorama-viewer";
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
import { Card, CardContent } from "@/components/ui/card";
import { Marquee } from "@/components/ui/marquee";
import { featuredGalleryImages, testimonials } from "@/lib/site-data";

const artistSpecialties = [
  {
    titleEn: "Large-scale realism",
    titleNo: "Realisme i stor skala",
    textEn: "Sleeves, portraits, and statement pieces built with depth and contrast.",
    textNo:
      "Sleeves, portretter og større prosjekter bygget med dybde og kontrast.",
  },
  {
    titleEn: "Custom only",
    titleNo: "Kun custom",
    textEn: "Every design is shaped around your idea, placement, and long-term wear.",
    textNo:
      "Hvert design formes rundt ideen din, plassering og langvarig uttrykk.",
  },
  {
    titleEn: "Black & grey focus",
    titleNo: "Black & grey fokus",
    textEn: "Clean contrast, smooth shading, and structure made to hold over time.",
    textNo:
      "Ren kontrast, myk shading og struktur som er laget for å holde over tid.",
  },
];

const artistHighlights = [
  {
    en: "Greece and Norway experience",
    no: "Erfaring fra Hellas og Norge",
  },
  {
    en: "Safe studio with professional hygiene from consultation to aftercare",
    no: "Trygt studio med profesjonell hygiene fra konsultasjon til etterbehandling",
  },
  {
    en: "Clear communication about concept, sizing, references, timing, and expectations",
    no: "Tydelig kommunikasjon om konsept, størrelse, referanser, tid og forventninger",
  },
];

type FaqItem = {
  questionEn: string;
  questionNo: string;
  answerEn: string;
  answerNo: string;
  locationLink?: string;
  parkingLinks?: {
    freshFitness: string;
    triaden: string;
  };
};

const faqItems: FaqItem[] = [
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
    questionEn: "How long does a tattoo session take?",
    questionNo: "How long does a tattoo session take?",
    answerEn:
      "Session length depends on the size and complexity of the piece. A small tattoo can take 1-2 hours, while larger realistic work or full sleeves are split across multiple sessions of 5-6 hours each. We'll give you a clear time estimate during your consultation.",
    answerNo:
      "Session length depends on the size and complexity of the piece. A small tattoo can take 1-2 hours, while larger realistic work or full sleeves are split across multiple sessions of 5-6 hours each. We'll give you a clear time estimate during your consultation.",
  },
  {
    questionEn: "Do you do touch-ups?",
    questionNo: "Do you do touch-ups?",
    answerEn:
      "Yes. If your tattoo needs a touch-up after healing, contact us within 1 month of your session. Touch-ups on work done at Infinity Tattoo are free of charge, as long as aftercare instructions were followed correctly.",
    answerNo:
      "Yes. If your tattoo needs a touch-up after healing, contact us within 1 month of your session. Touch-ups on work done at Infinity Tattoo are free of charge, as long as aftercare instructions were followed correctly.",
  },
  {
    questionEn: "Do you require a deposit?",
    questionNo: "Do you require a deposit?",
    answerEn:
      "Yes. A deposit is required to secure your booking and cover the time spent on your custom design. The deposit amount is typically NOK 500-1000 depending on the size of the project. Your deposit is deducted from the final price of your tattoo and it is non-refundable.",
    answerNo:
      "Yes. A deposit is required to secure your booking and cover the time spent on your custom design. The deposit amount is typically NOK 500-1000 depending on the size of the project. Your deposit is deducted from the final price of your tattoo and it is non-refundable.",
  },
  {
    questionEn: "What happens if I need to reschedule?",
    questionNo: "What happens if I need to reschedule?",
    answerEn:
      "Life happens, we understand. If you need to reschedule, contact us at least 48 hours before your appointment and your deposit will be transferred to your new date. Cancellations with less than 48 hours notice will forfeit the deposit.",
    answerNo:
      "Life happens, we understand. If you need to reschedule, contact us at least 48 hours before your appointment and your deposit will be transferred to your new date. Cancellations with less than 48 hours notice will forfeit the deposit.",
  },
  {
    questionEn: "What if I want to cancel completely?",
    questionNo: "What if I want to cancel completely?",
    answerEn:
      "If you cancel your appointment entirely, the deposit is non-refundable. This covers the design time and the slot that was held for you. If you have any concerns before your appointment, always reach out to us. We'd rather find a solution than lose you as a client.",
    answerNo:
      "If you cancel your appointment entirely, the deposit is non-refundable. This covers the design time and the slot that was held for you. If you have any concerns before your appointment, always reach out to us. We'd rather find a solution than lose you as a client.",
  },
  {
    questionEn: "I've never had a tattoo before, where do I start?",
    questionNo: "I've never had a tattoo before, where do I start?",
    answerEn:
      "Start by booking a consultation. You don't need to have everything figured out, just bring a rough idea, a feeling, or some reference images and we'll build the concept together. First-time clients are always welcome at Infinity Tattoo and we'll walk you through every step of the process so you know exactly what to expect.",
    answerNo:
      "Start by booking a consultation. You don't need to have everything figured out, just bring a rough idea, a feeling, or some reference images and we'll build the concept together. First-time clients are always welcome at Infinity Tattoo and we'll walk you through every step of the process so you know exactly what to expect.",
  },
  {
    questionEn: "Does getting a tattoo hurt?",
    questionNo: "Does getting a tattoo hurt?",
    answerEn:
      "Honestly yes, but it's very manageable for most people. Pain varies depending on placement. Areas like the outer arm, thigh, and back are generally easier. Areas like the ribs, inner arm, hands, and neck are more sensitive. Most clients are surprised by how bearable it actually is once they're in the chair. We work at a pace that's comfortable for you.",
    answerNo:
      "Honestly yes, but it's very manageable for most people. Pain varies depending on placement. Areas like the outer arm, thigh, and back are generally easier. Areas like the ribs, inner arm, hands, and neck are more sensitive. Most clients are surprised by how bearable it actually is once they're in the chair. We work at a pace that's comfortable for you.",
  },
  {
    questionEn: "What are the least painful places to get tattooed?",
    questionNo: "What are the least painful places to get tattooed?",
    answerEn:
      "The outer upper arm, outer thigh, shoulder, calf, and upper back are generally the least painful areas. These are also great placements for large realistic pieces. If you're getting your first tattoo and want to ease into it, these are the spots we'd recommend starting with.",
    answerNo:
      "The outer upper arm, outer thigh, shoulder, calf, and upper back are generally the least painful areas. These are also great placements for large realistic pieces. If you're getting your first tattoo and want to ease into it, these are the spots we'd recommend starting with.",
  },
  {
    questionEn: "Aftercare - Long term",
    questionNo: "Aftercare - Long term",
    answerEn:
      "Once fully healed, usually after 3-4 weeks, always apply SPF sunscreen over your tattoo when exposed to sunlight. Sun is the number one enemy of tattoo longevity, especially for black & grey realism. Keep your skin moisturized regularly and your tattoo will stay sharp and contrasted for years.",
    answerNo:
      "Once fully healed, usually after 3-4 weeks, always apply SPF sunscreen over your tattoo when exposed to sunlight. Sun is the number one enemy of tattoo longevity, especially for black & grey realism. Keep your skin moisturized regularly and your tattoo will stay sharp and contrasted for years.",
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
    locationLink: "https://maps.app.goo.gl/z7rXGVEJVXESGa8E7",
  },
  {
    questionEn: "Where can I park?",
    questionNo: "Hvor kan jeg parkere?",
    answerEn:
      "You can park for 2 hours free near the studio at Fresh Fitness, Skårersletta 60, or Triaden Senter Uteparkering, Skårersletta 70.",
    answerNo:
      "Du kan parkere gratis i 2 timer nær studioet ved Fresh Fitness, Skårersletta 60, eller Triaden Senter Uteparkering, Skårersletta 70.",
    parkingLinks: {
      freshFitness: "https://maps.app.goo.gl/MixgmVqLpSrBzwrU9",
      triaden: "https://maps.app.goo.gl/YW4AmZ3ZmcSbbQom8",
    },
  },
];

const aftercareItems = [
  {
    questionEn: "Days 1-3: the fresh wound phase",
    questionNo: "Dag 1-3: ferskt sår",
    answerEn:
      "Your tattoo is an open wound. Redness, swelling, and tenderness are normal. Wash your hands before touching it, remove the wrap after 2-4 hours, wash gently with fragrance-free soap, pat dry with clean paper towel, apply a very thin layer of aftercare balm, and wear loose soft clothing. Do not re-wrap, touch it with unwashed hands, soak it, use too much cream, expose it to direct sun, or let tight clothing rub against it.",
    answerNo:
      "Tatoveringen er et åpent sår. Rødhet, hevelse og ømhet er normalt. Vask hendene før du tar på den, fjern plasten etter 2-4 timer, vask forsiktig med parfymefri såpe, klapp tørr med rent papir, bruk et veldig tynt lag aftercare balm, og bruk myke løse klær. Ikke pakk den inn på nytt, ta på den med uvaskede hender, bløtlegg den, bruk for mye krem, utsett den for direkte sol, eller la stramme klær gnisse.",
  },
  {
    questionEn: "Days 4-7: itching and peeling",
    questionNo: "Dag 4-7: kløe og flassing",
    answerEn:
      "The skin will begin to peel and flake like a sunburn. The itching can be intense, but this is healing. Continue washing twice daily, let flakes fall off naturally, tap gently if it itches, and stay hydrated. Do not pick, peel, scratch, use scented lotion, swim, use a sauna, or shave over the tattoo.",
    answerNo:
      "Huden begynner å flasse som etter solbrenthet. Kløen kan være sterk, men dette er healing. Fortsett å vaske to ganger daglig, la flass falle av naturlig, klapp forsiktig hvis det klør, og drikk nok vann. Ikke plukk, riv, klø, bruk parfymerte kremer, bad, bruk badstue, eller barber over tatoveringen.",
  },
  {
    questionEn: "Week 2: cloudy skin",
    questionNo: "Uke 2: matt hud",
    answerEn:
      "The peeling has mostly stopped, but the tattoo may look dull or faded. This is a thin layer of dead skin over the new tattoo and it clears as the skin sheds. Continue moisturizing daily, keep it clean, be patient, and start applying SPF if exposed to light. Do not judge the healed result yet, scrub it, train hard over the area, or go into the sun without protection.",
    answerNo:
      "Flassingen har stort sett stoppet, men tatoveringen kan se matt eller blek ut. Det er et tynt lag død hud over den nye tatoveringen, og det forsvinner når huden slipper. Fortsett å fukte daglig, hold området rent, vær tålmodig, og bruk SPF hvis den eksponeres for lys. Ikke vurder sluttresultatet ennå, skrubb området, tren hardt over tatoveringen, eller gå i solen uten beskyttelse.",
  },
  {
    questionEn: "Weeks 3-4: surface healed",
    questionNo: "Uke 3-4: overflaten er grodd",
    answerEn:
      "The outer skin is healed and the tattoo should look sharp again. The deeper layers can still take 3-6 months to settle fully. Keep moisturizing, apply SPF 50 outdoors, resume normal activities, and evaluate later if a touch-up is needed. Do not skip sunscreen, book a touch-up before it is fully healed, or stop moisturizing.",
    answerNo:
      "Ytre hudlag er grodd og tatoveringen bør se skarp ut igjen. Dypere hudlag kan fortsatt bruke 3-6 måneder på å stabilisere seg helt. Fortsett å fukte, bruk SPF 50 ute, gå tilbake til normale aktiviteter, og vurder senere om touch-up trengs. Ikke dropp solkrem, book touch-up før den er helt grodd, eller slutt å fukte.",
  },
  {
    questionEn: "Recommended products",
    questionNo: "Anbefalte produkter",
    answerEn:
      "Use a tattoo aftercare balm in thin layers 2-3 times daily. Use mild fragrance-free soap from any pharmacy and avoid alcohol, heavy perfumes, or exfoliating agents. Once healed, SPF 50 is essential every time the tattoo is exposed to sunlight.",
    answerNo:
      "Bruk tattoo aftercare balm i tynne lag 2-3 ganger daglig. Bruk mild parfymefri såpe fra apotek, og unngå alkohol, sterke parfymer eller eksfolierende ingredienser. Når tatoveringen er grodd, er SPF 50 viktig hver gang den eksponeres for sollys.",
  },
  {
    questionEn: "Always avoid",
    questionNo: "Unngå alltid",
    answerEn:
      "Avoid swimming and soaking for at least 3 weeks, direct sunlight, sauna and steam, alcohol 24 hours before and during early healing, tight clothing, picking, and scratching. Soaking draws out ink, UV fades tattoos, heat irritates healing skin, and picking can cause scarring.",
    answerNo:
      "Unngå bading og bløtlegging i minst 3 uker, direkte sollys, badstue og damp, alkohol 24 timer før og tidlig i healing, stramme klær, plukking og kløing. Bløtlegging trekker ut blekk, UV bleker tatoveringer, varme irriterer huden, og plukking kan gi arr.",
  },
  {
    questionEn: "Long-term care",
    questionNo: "Langsiktig pleie",
    answerEn:
      "Moisturize daily to keep skin hydrated and the tattoo vibrant. Use SPF 50 every time the tattoo is exposed to sunlight. Stay hydrated so the skin holds ink better. Touch-ups may be needed after years depending on sun exposure and skin type.",
    answerNo:
      "Fukt huden daglig for å holde tatoveringen levende. Bruk SPF 50 hver gang tatoveringen eksponeres for sollys. Hold deg hydrert, slik at huden holder bedre på blekket. Touch-ups kan bli aktuelt etter flere år, avhengig av soleksponering og hudtype.",
  },
  {
    questionEn: "Signs of infection",
    questionNo: "Tegn på infeksjon",
    answerEn:
      "Some redness and swelling in the first 2-3 days is normal. Contact a doctor if redness, swelling, or heat increases after day 3, if yellow or green discharge appears, if you get fever or chills, red streaks, severe worsening pain, or raised hard lumps under the skin. If anything feels unusual, message the studio early.",
    answerNo:
      "Noe rødhet og hevelse de første 2-3 dagene er normalt. Kontakt lege hvis rødhet, hevelse eller varme øker etter dag 3, hvis gul eller grønn væske kommer fra tatoveringen, hvis du får feber eller frysninger, røde striper, sterk økende smerte, eller harde hevelser under huden. Hvis noe føles uvanlig, kontakt studioet tidlig.",
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
          className="motion-hero-media absolute inset-0 -z-20 size-full object-cover opacity-70"
          loop
          muted
          playsInline
          poster="/media/hero-poster.jpeg"
          preload="metadata"
        >
          <source src="/media/video/studio-reel.mp4#t=4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/35 via-background/45 to-background" />

        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 pb-14 pt-32 sm:px-8 lg:pb-20">
          <div className="flex max-w-4xl flex-col gap-6">
            <h1 className="motion-rise motion-delay-1 font-display text-5xl font-bold leading-none text-foreground sm:text-7xl lg:text-8xl">
              INFINITY TATTOO
            </h1>
            <p className="motion-rise motion-delay-2 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
              <LocalizedText
                en="Custom realistic tattoos in Lørenskog, built around precision, detail, and a design that actually belongs on your skin."
                no="Custom realistiske tatoveringer i Lørenskog, bygget rundt presisjon, detaljer og et design som faktisk passer huden din."
              />
            </p>
          </div>
          <div className="motion-rise motion-delay-3 flex flex-col gap-3 sm:flex-row">
            <Button
              className="motion-lift-subtle rounded-full"
              nativeButton={false}
              render={<a href="#booking" />}
              size="lg"
            >
              <LocalizedText en="Book session" no="Book time" />
              <CalendarDaysIcon data-icon="inline-end" />
            </Button>
            <Button
              className="motion-lift-subtle"
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
        id="reviews"
        className="motion-reveal border-y bg-card/25 py-8 text-muted-foreground"
        aria-label="Client reviews"
      >
        <Marquee pauseOnHover repeat={3} className="[--duration:48s]">
          {testimonials.map((testimonial) => (
            <Card
              className="motion-lift-subtle mx-1.5 w-[20rem] bg-background/70 sm:w-[27rem]"
              key={testimonial.name}
            >
              <CardContent className="flex min-h-40 flex-col gap-4 px-5 py-4">
                <div className="flex gap-1 text-[color:var(--studio-red)]">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <StarIcon
                      className="size-4 fill-current"
                      key={`${testimonial.name}-${index}`}
                    />
                  ))}
                </div>
                <p className="text-base leading-6 text-foreground">
                  &quot;{testimonial.quote}&quot;
                </p>
                <p className="mt-auto text-sm font-semibold text-muted-foreground">
                  {testimonial.name}
                </p>
              </CardContent>
            </Card>
          ))}
        </Marquee>
        <div className="mt-6 flex justify-center px-5">
          <Button
            className="motion-lift-subtle rounded-full"
            nativeButton={false}
            render={<Link href="/reviews" />}
            size="lg"
            variant="outline"
          >
            Read all
            <MoveUpRightIcon data-icon="inline-end" />
          </Button>
        </div>
      </section>

      <section
        id="work"
        className="motion-reveal mx-auto flex max-w-6xl flex-col gap-10 px-5 py-20 sm:px-8 lg:py-28"
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
          <div className="flex flex-wrap items-center gap-3 lg:justify-end">
            <Button
              className="motion-lift-subtle rounded-full"
              nativeButton={false}
              render={
                <a
                  href="https://www.instagram.com/infinitytattoo.lorenskog/"
                  rel="noreferrer"
                  target="_blank"
                />
              }
              size="lg"
              variant="outline"
            >
              <InstagramIcon data-icon="inline-start" />
              Instagram
            </Button>
            <Button
              className="motion-lift-subtle rounded-full"
              nativeButton={false}
              render={<Link href="/work" />}
              size="lg"
            >
              View all
              <MoveUpRightIcon data-icon="inline-end" />
            </Button>
          </div>
        </div>

        <div className="motion-stagger grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {featuredGalleryImages.map((image, index) => (
            <div
              className={`motion-lift motion-reveal group relative aspect-[4/5] overflow-hidden rounded-lg border bg-card ${
                index > 2 ? "hidden sm:block" : ""
              }`}
              key={image.src}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="motion-media object-cover"
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
              />
            </div>
          ))}
        </div>
      </section>

      <section id="artist" className="motion-reveal border-t bg-card/35">
        <div className="mx-auto grid max-w-6xl items-stretch gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:py-28">
          <div className="motion-lift group relative min-h-[34rem] overflow-hidden rounded-lg border bg-card">
            <Image
              src="/media/artist/filippos.jpg"
              alt="Filip, artist and owner of Infinity Tattoo Studio"
              fill
              className="motion-media object-cover object-[50%_18%]"
              sizes="(min-width: 1024px) 38vw, 92vw"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/80 to-transparent px-5 pb-5 pt-20">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--studio-red)]">
                Custom realism / black & grey
              </p>
              <p className="mt-2 font-display text-2xl font-bold text-foreground">
                Designed by Filip
              </p>
            </div>
          </div>
          <div className="flex h-full flex-col gap-6">
            <div className="flex flex-col gap-4">
              <Badge variant="secondary" className="w-fit">
                <LocalizedText en="Artist & owner" no="Artist og eier" />
              </Badge>
              <h2 className="font-display text-4xl font-bold sm:text-5xl">
                Filip
              </h2>
              <p className="text-lg leading-8 text-muted-foreground">
                <LocalizedText
                  en="Filip is the artist and owner behind Infinity Tattoo Studio in Lørenskog. With experience from both Greece and Norway, he specializes in large-scale realism, black & grey portraits, and custom designs built entirely around your idea, your body, and how the piece will age on your skin. No templates. No shortcuts. Just precise, intentional work from the first consultation to the final result."
                  no="Filip er artisten og eieren bak Infinity Tattoo Studio i Lørenskog. Med erfaring fra både Hellas og Norge spesialiserer han seg på realisme i stor skala, black & grey portretter og custom design bygget rundt ideen din, kroppen din og hvordan tatoveringen skal eldes på huden. Ingen maler. Ingen snarveier. Bare presist, bevisst arbeid fra første konsultasjon til ferdig resultat."
                />
              </p>
            </div>
            <div className="mt-auto grid gap-3 sm:grid-cols-3">
              {artistSpecialties.map((item) => (
                <div
                  className="motion-lift-subtle rounded-lg border border-border/70 bg-background/35 p-4"
                  key={item.titleEn}
                >
                  <p className="font-display text-lg font-bold text-foreground">
                    <LocalizedText en={item.titleEn} no={item.titleNo} />
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    <LocalizedText en={item.textEn} no={item.textNo} />
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div
            id="studio"
            className="grid gap-5 border-t border-border/70 pt-8 lg:col-span-2 lg:grid-cols-3"
          >
            {artistHighlights.map((item) => (
              <div
                className="motion-lift-subtle flex items-start gap-3"
                key={item.en}
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <CheckIcon className="size-4" />
                </span>
                <p className="text-sm leading-6 text-muted-foreground">
                  <LocalizedText en={item.en} no={item.no} />
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="motion-reveal mx-auto flex max-w-6xl flex-col gap-8 px-5 pb-20 pt-12 sm:px-8 lg:pb-28 lg:pt-16"
      >
        <h2 className="text-center font-display text-4xl font-bold sm:text-5xl">
          <LocalizedText en="Booking" no="Booking" />
        </h2>

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          <a
            className="motion-lift-subtle flex items-center justify-center gap-3 rounded-full border bg-card/60 p-4 text-sm text-muted-foreground transition hover:bg-card hover:text-foreground"
            href="mailto:infinitytattoo99@gmail.com"
          >
            <MailIcon className="size-5 text-[color:var(--studio-red)]" />
            infinitytattoo99@gmail.com
          </a>
          <a
            className="motion-lift-subtle flex items-center justify-center gap-3 rounded-full border bg-card/60 p-4 text-sm text-muted-foreground transition hover:bg-card hover:text-foreground"
            href="tel:+4740344775"
          >
            <PhoneIcon className="size-5 text-[color:var(--studio-red)]" />
            +47 40 34 47 75
          </a>
          <a
            className="motion-lift-subtle flex items-center justify-center gap-3 rounded-full border bg-card/60 p-4 text-sm text-muted-foreground transition hover:bg-card hover:text-foreground"
            href="https://www.google.com/maps/search/?api=1&query=Sk%C3%A5rersletta%2048c%2C%20L%C3%B8renskog"
            rel="noreferrer"
            target="_blank"
          >
            <MapPinIcon className="size-5 text-[color:var(--studio-red)]" />
            Skårersletta 48c
          </a>
          <a
            className="motion-lift-subtle flex items-center justify-center gap-3 rounded-full border bg-card/60 p-4 text-sm text-muted-foreground transition hover:bg-card hover:text-foreground"
            href="https://booking.linework.com/infinity"
            rel="noreferrer"
            target="_blank"
          >
            <LocalizedText
              en="Open booking in new page"
              no="Åpne booking i ny side"
            />
            <MoveUpRightIcon className="size-4 text-[color:var(--studio-red)]" />
          </a>
        </div>

        <div
          id="booking"
          className="motion-lift-subtle relative scroll-mt-28 overflow-hidden rounded-3xl bg-card/80 p-2 [overflow-anchor:none]"
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

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="motion-lift-subtle overflow-hidden rounded-3xl">
            <iframe
              aria-label="Infinity Tattoo location on Google Maps"
              className="block h-[25rem] w-full rounded-3xl border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              scrolling="no"
              src="https://maps.google.com/maps?width=600&height=400&hl=en&q=sk%C3%A5rersletta%2048c&t=k&z=17&ie=UTF8&iwloc=B&output=embed"
            />
          </div>
          <PanoramaViewer />
        </div>

        <div id="faq" className="motion-reveal scroll-mt-28 rounded-3xl border bg-card/60 p-2">
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
                  {item.parkingLinks ? (
                    <div className="space-y-4">
                      <p>
                        <LocalizedText
                          en="You can park for 2 hours free near the studio at these locations:"
                          no="Du kan parkere gratis i 2 timer nær studioet på disse stedene:"
                        />
                      </p>
                      <ul className="space-y-2">
                        <li>
                          Fresh Fitness,{" "}
                          <a
                            className="text-foreground underline underline-offset-4 transition hover:text-[color:var(--studio-red)]"
                            href={item.parkingLinks.freshFitness}
                            rel="noreferrer"
                            target="_blank"
                          >
                            Skårersletta 60
                          </a>{" "}
                          <LocalizedText en="(2 min walk)" no="(2 min gange)" />
                        </li>
                        <li>
                          Triaden Senter Uteparkering,{" "}
                          <a
                            className="text-foreground underline underline-offset-4 transition hover:text-[color:var(--studio-red)]"
                            href={item.parkingLinks.triaden}
                            rel="noreferrer"
                            target="_blank"
                          >
                            Skårersletta 70
                          </a>{" "}
                          <LocalizedText en="(4 min walk)" no="(4 min gange)" />
                        </li>
                      </ul>
                      <p>
                        <LocalizedText
                          en="You can move your car between sessions for free or pay 23 kr per 30 minutes."
                          no="Du kan flytte bilen mellom øktene for å parkere gratis, eller betale 23 kr per 30 minutter."
                        />
                      </p>
                    </div>
                  ) : item.locationLink ? (
                    <p>
                      <LocalizedText
                        en="Infinity Tattoo is at "
                        no="Infinity Tattoo ligger på "
                      />
                      <a
                        className="text-foreground underline underline-offset-4 transition hover:text-[color:var(--studio-red)]"
                        href={item.locationLink}
                        rel="noreferrer"
                        target="_blank"
                      >
                        Skårersletta 48c
                      </a>
                      <LocalizedText
                        en=" in Lørenskog. The map above opens the exact location."
                        no=" i Lørenskog. Kartet over åpner nøyaktig lokasjon."
                      />
                    </p>
                  ) : (
                    <LocalizedText en={item.answerEn} no={item.answerNo} />
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div
          id="aftercare"
          className="motion-reveal scroll-mt-28 rounded-3xl border bg-card/60 p-2"
        >
          <div className="px-4 pt-4">
            <h3 className="font-display text-3xl font-bold">
              <LocalizedText en="Aftercare" no="Etterbehandling" />
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-foreground">
              <LocalizedText
                en="Follow the steps below through the healing period. If the artist gives you personal instructions, follow those first."
                no="Følg stegene under gjennom healing-perioden. Hvis artisten gir deg personlige instrukser, følger du dem først."
              />
            </p>
          </div>
          <Accordion
            className="px-4 py-2"
            defaultValue={[aftercareItems[0].questionEn]}
          >
            {aftercareItems.map((item) => (
              <AccordionItem key={item.questionEn} value={item.questionEn}>
                <AccordionTrigger className="py-4 text-base uppercase tracking-[0.16em] text-foreground">
                  <LocalizedText en={item.questionEn} no={item.questionNo} />
                </AccordionTrigger>
                <AccordionContent className="text-foreground">
                  <LocalizedText en={item.answerEn} no={item.answerNo} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div
          id="gift-cards"
          className="grid overflow-hidden border-t border-border/70 py-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-10 lg:py-10"
        >
          <div className="flex flex-col gap-5">
            <div className="flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <GiftIcon className="size-5" />
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="font-display text-4xl font-bold sm:text-5xl">
                <LocalizedText en="Gift cards" no="Gavekort" />
              </h3>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground">
                <LocalizedText
                  en="Give someone a custom tattoo experience at Infinity Tattoo. Gift cards can be bought online and used toward tattoo work at the studio."
                  no="Gi noen en custom tatoveringsopplevelse hos Infinity Tattoo. Gavekort kan kjøpes online og brukes mot tatoveringsarbeid i studioet."
                />
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                className="motion-lift-subtle rounded-full"
                nativeButton={false}
                render={
                  <a
                    href="https://giftcard.linework.com/infinity-tattoo-studio-"
                    rel="noreferrer"
                    target="_blank"
                  />
                }
                size="lg"
              >
                <LocalizedText en="Buy gift card" no="Kjøp gavekort" />
                <MoveUpRightIcon data-icon="inline-end" />
              </Button>
              <Button
                className="motion-lift-subtle rounded-full"
                nativeButton={false}
                render={<a href="#faq" />}
                size="lg"
                variant="outline"
              >
                <LocalizedText en="Read FAQ" no="Les FAQ" />
                <MoveUpRightIcon data-icon="inline-end" />
              </Button>
            </div>
          </div>

          <div className="motion-lift mt-8 overflow-hidden rounded-lg border bg-background/45 p-5 shadow-2xl shadow-black/25 lg:mt-0">
            <div className="relative min-h-72 overflow-hidden rounded-md border bg-card p-6 sm:min-h-80">
              <Image
                src="/media/gallery/infinity/infinity-12.jpg"
                alt=""
                fill
                className="object-cover opacity-35 grayscale"
                sizes="(min-width: 1024px) 42vw, 92vw"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-background via-background/76 to-background/20" />
              <div className="relative flex min-h-60 flex-col justify-between sm:min-h-72">
                <div className="flex items-center justify-between gap-4">
                  <span className="relative flex size-12 overflow-hidden rounded-full bg-foreground">
                    <Image
                      src="/media/brand/infinity.svg"
                      alt=""
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </span>
                  <span className="text-right text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--studio-red)]">
                    Infinity Tattoo
                  </span>
                </div>
                <div>
                  <p className="font-display text-4xl font-bold leading-none text-foreground sm:text-5xl">
                    <LocalizedText en="Gift Card" no="Gavekort" />
                  </p>
                  <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
                    <LocalizedText
                      en="For custom realism, black & grey work, and serious tattoo projects."
                      no="For custom realisme, black & grey arbeid og seriøse tatoveringsprosjekter."
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="px-5 pb-10 sm:px-8">
        <div className="mx-auto w-full max-w-[68rem]">
          <div className="motion-lift-subtle flex flex-col gap-8 rounded-3xl border bg-card/60 p-6 text-sm text-muted-foreground sm:p-8 md:flex-row md:items-center md:justify-between">
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
                className="motion-lift-subtle inline-flex h-10 items-center gap-2 rounded-full border bg-background/50 px-4 transition hover:bg-background hover:text-foreground"
                href="https://www.instagram.com/infinitytattoo.lorenskog/"
                rel="noreferrer"
                target="_blank"
              >
                <InstagramIcon className="size-5" />
                <span>Instagram</span>
              </a>
              <a
                aria-label="Tiktok"
                className="motion-lift-subtle inline-flex h-10 items-center gap-2 rounded-full border bg-background/50 px-4 transition hover:bg-background hover:text-foreground"
                href="https://www.tiktok.com/@infinitytattoostudio"
                rel="noreferrer"
                target="_blank"
              >
                <TikTokIcon className="size-4" />
                <span>Tiktok</span>
              </a>
            </div>
          </div>
          <div className="flex items-center justify-between px-2 pt-3 text-xs text-muted-foreground/70 max-sm:pl-10">
            <a
              className="relative z-10 inline-flex h-8 items-center transition hover:text-foreground"
              href="https://www.proff.no/selskap/infinity-tattoo-chotzai/l%C3%B8renskog/personlig-tjenesteyting/IFHPBP206Y9"
              rel="noreferrer"
              target="_blank"
            >
              Org nr 936 727 670
            </a>
            <a
              className="relative z-10 inline-flex h-8 items-center transition hover:text-foreground"
              href="https://www.albab.dk/"
              rel="noreferrer"
              target="_blank"
            >
              website by albab.dk
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
