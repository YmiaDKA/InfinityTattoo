import Image from "next/image";
import Link from "next/link";
import {
  CalendarDaysIcon,
  UserRoundIcon,
  PaletteIcon,
  SparklesIcon,
  LayersIcon,
  CircleDotIcon,
  GemIcon,
  MailIcon,
  MoveUpRightIcon,
  PenLineIcon,
  PhoneIcon,
  StarIcon,
} from "lucide-react";

import { InstagramPill } from "@/components/instagram-pill";
import { StudioAddress } from "@/components/studio-address";
import { ArtistSpotlight } from "@/components/artist-spotlight";
import { LineworkBooking } from "@/components/linework-booking";
import { HeroBackgroundVideo } from "@/components/hero-background-video";
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
import { BorderBeam } from "@/components/ui/border-beam";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Marquee } from "@/components/ui/marquee";
import { galleryImages, testimonials, type Testimonial } from "@/lib/site-data";

const reviewColumns: Testimonial[][] = [];
let pendingShortColumn: Testimonial[] | undefined;

for (const review of testimonials.slice(0, 6)) {
  const short = Math.max(review.quoteEn.length, review.quoteNo.length) <= 80;
  if (short && pendingShortColumn) {
    pendingShortColumn.push(review);
    pendingShortColumn = undefined;
  } else {
    const column = [review];
    reviewColumns.push(column);
    if (short) pendingShortColumn = column;
  }
}

const showcaseRows = [
  reviewColumns.map((reviews) => ({ type: "review" as const, reviews })),
  galleryImages
    .filter((image) => image.tag !== "#15")
    .map((image) => ({ type: "image" as const, image })),
];

// Approximate road distances from the town centres, rounded for the area overview.
const serviceAreas = [
  {
    area: "Lørenskog",
    textEn: "On Skårer in Lørenskog, close to Triaden.",
    textNo: "På Skårer i Lørenskog, nær Triaden.",
  },
  {
    area: "Strømmen",
    textEn: "About 5 km from central Strømmen.",
    textNo: "Ca. 5 km fra Strømmen sentrum.",
  },
  {
    area: "Lillestrøm",
    textEn: "About 8 km from central Lillestrøm.",
    textNo: "Ca. 8 km fra Lillestrøm sentrum.",
  },
  {
    area: "Oslo",
    textEn: "About 17 km from central Oslo.",
    textNo: "Ca. 17 km fra Oslo sentrum.",
  },
];

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": ["TattooParlor", "HealthAndBeautyBusiness"],
  "@id": "https://infinitytattoo.no/#business",
  name: "Infinity Tattoo Studio",
  alternateName: "Infinity Tattoo",
  description:
    "Custom tattoo studio in Lørenskog for realism, black and grey, blackout, portraits, sleeves, fine line, freehand Maori, piercing, Tooth Gems, and free consultations for clients from Lørenskog, Strømmen, Lillestrøm and Oslo.",
  image: [
    "https://infinitytattoo.no/media/hero-poster.jpeg",
    "https://infinitytattoo.no/media/artist/filippos.jpg",
    "https://infinitytattoo.no/media/studio-panorama.jpg",
  ],
  logo: "https://infinitytattoo.no/media/brand/logo-wordmark.png",
  url: "https://infinitytattoo.no/",
  telephone: "+4740344775",
  email: "infinitytattoo99@gmail.com",
  priceRange: "NOK",
  currenciesAccepted: "NOK",
  hasMap: "https://maps.app.goo.gl/z7rXGVEJVXESGa8E7",
  openingHours: ["Tu-Fr 11:00-18:00", "Sa-Su 11:00-16:00"],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "11:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday", "Sunday"],
      opens: "11:00",
      closes: "16:00",
    },
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Skårersletta 48c",
    addressLocality: "Lørenskog",
    addressRegion: "Akershus",
    postalCode: "1473",
    addressCountry: "NO",
  },
  founder: {
    "@type": "Person",
    name: "Filip",
    jobTitle: "Tattoo artist and owner",
    image: "https://infinitytattoo.no/media/artist/filippos.jpg",
    knowsAbout: [
      "realistic tattoos",
      "black and grey tattoos",
      "portrait tattoos",
      "blackout tattoos",
      "freehand Maori tattoos",
      "custom tattoo design",
    ],
  },
  areaServed: [
    {
      "@type": "City",
      name: "Lørenskog",
    },
    {
      "@type": "City",
      name: "Strømmen",
    },
    {
      "@type": "City",
      name: "Lillestrøm",
    },
    {
      "@type": "City",
      name: "Oslo",
    },
  ],
  knowsAbout: [
    "custom tattoo design",
    "realistic tattoos",
    "black and grey tattoos",
    "blackout tattoos",
    "heavy blackwork tattoos",
    "portrait tattoos",
    "sleeve tattoos",
    "fine line tattoos",
    "lettering tattoos",
    "script tattoos",
    "freehand Maori tattoos",
    "Polynesian-inspired tattoos",
    "cover-up tattoo planning",
    "piercing",
    "tattoo consultation",
    "Tooth Gems",
  ],
  sameAs: [
    "https://www.instagram.com/infinitytattoo.lorenskog/",
    "https://www.tiktok.com/@infinitytattoostudio",
  ],
  potentialAction: {
    "@type": "ReserveAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://booking.linework.com/infinity",
      actionPlatform: [
        "https://schema.org/DesktopWebPlatform",
        "https://schema.org/MobileWebPlatform",
      ],
    },
    name: "Book a free tattoo consultation",
  },
  makesOffer: {
    "@type": "OfferCatalog",
    name: "Tattoo and studio services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Free custom tattoo consultation",
          serviceType: "Tattoo consultation",
        },
        price: "0",
        priceCurrency: "NOK",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Realistic tattoos",
          serviceType: "Realism tattoo",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Black and grey tattoos",
          serviceType: "Black and grey tattoo",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Blackout tattoos",
          serviceType: "Blackout tattoo",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Freehand Maori tattoos",
          serviceType: "Freehand Maori tattoo",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Portrait tattoos",
          serviceType: "Portrait tattoo",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Sleeve tattoos",
          serviceType: "Sleeve tattoo",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Cover-up tattoo planning",
          serviceType: "Cover-up tattoo",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Lettering tattoos",
          serviceType: "Lettering tattoo",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Piercing",
          serviceType: "Piercing",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Tooth Gems",
          serviceType: "Tooth Gems",
        },
      },
    ],
  },
};

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
    questionEn: "How do I book and prepare for my first tattoo?",
    questionNo: "Hvordan booker og forbereder jeg min første tatovering?",
    answerEn:
      "Use the booking calendar above and choose a consultation length that fits your idea. Tattoo consultations are free, and you can share references, placement details, size and budget during the consultation.\n\nBring clear reference images, placement ideas, approximate size, and any meaning or details that matter for the design.\n\nStart by booking a consultation. You don't need to have everything figured out, just bring a rough idea, a feeling, or some reference images and we'll build the concept together. First time clients are always welcome at Infinity Tattoo and we'll walk you through every step of the process so you know exactly what to expect.",
    answerNo:
      "Bruk bookingkalenderen over og velg en konsultasjon som passer ideen din. Tatoveringskonsultasjoner er gratis, og du kan dele referanser, plassering, størrelse og budsjett under konsultasjonen.\n\nHa klare referansebilder, plassering, omtrent størrelse og detaljer som er viktige for designet.\n\nStart med å booke en konsultasjon. Du trenger ikke å ha alt klart; ta med en grov idé, en følelse eller noen referansebilder, så utvikler vi konseptet sammen. Førstegangskunder er alltid velkomne hos Infinity Tattoo, og vi guider deg gjennom hele prosessen.",
  },
  {
    questionEn: "Do you do custom designs?",
    questionNo: "Lager dere custom design?",
    answerEn:
      "Yes. Most work is custom, built around your idea, body placement, and the long term look of the tattoo.",
    answerNo:
      "Ja. Det meste lages custom rundt ideen din, plassering på kroppen og hvordan tatoveringen skal se ut over tid.",
  },
  {
    questionEn: "Tattoo prices",
    questionNo: "Tatoveringspriser",
    answerEn:
      "Very small and simple tattoos start at NOK 1,500. Many small custom tattoos cost NOK 3,000 to 4,000; detailed work, difficult placements and larger designs can cost more. The final price depends on design, size, placement, detail and expected working time, and is confirmed before the appointment. Preparation, design adjustment, stencil placement and normal breaks are part of a full day session. Every project is different. Book a free consultation to go through your idea, placement, expected time and price before you decide.",
    answerNo:
      "Svært små og enkle tatoveringer starter fra 1 500 kr. Mange mindre custom design koster vanligvis 3 000 til 4 000 kr; mer detaljert arbeid, krevende plasseringer og større design kan koste mer. Den endelige prisen avhenger av design, størrelse, plassering, detaljnivå og forventet arbeidstid, og bekreftes før timen. Forberedelser, tilpasning av design, plassering av stencil og normale pauser er en del av en heldagstime. Alle prosjekter er forskjellige. Book en gratis konsultasjon for å gjennomgå idé, plassering, forventet tidsbruk og pris før du bestemmer deg.",
  },
  {
    questionEn: "How long does a tattoo session take?",
    questionNo: "Hvor lang tid tar en tatoveringstime?",
    answerEn:
      "Session length depends on the size and complexity of the piece. A small tattoo can take 1 to 2 hours, while larger realistic work or full sleeves are split across multiple sessions of 5 to 6 hours each. We'll give you a clear time estimate during your consultation.",
    answerNo:
      "Tidsbruken avhenger av størrelsen og hvor detaljert motivet er. En liten tatovering kan ta 1 til 2 timer, mens større realistiske prosjekter eller hele ermer deles opp i flere økter på 5 til 6 timer. Du får et tydelig tidsestimat under konsultasjonen.",
  },
  {
    questionEn: "Do you do touch ups?",
    questionNo: "Utfører dere etterjusteringer?",
    answerEn:
      "Yes. If your tattoo needs a touch up after healing, contact us within 1 month of your session. Touch ups on work done at Infinity Tattoo are free of charge, as long as aftercare instructions were followed correctly.",
    answerNo:
      "Ja. Hvis tatoveringen trenger en etterjustering etter at den har grodd, ta kontakt innen én måned etter timen. Etterjusteringer på arbeid gjort hos Infinity Tattoo er gratis så lenge etterbehandlingen er fulgt riktig.",
  },
  {
    questionEn: "How do deposits, rescheduling and cancellations work?",
    questionNo: "Hvordan fungerer depositum, flytting og avbestilling?",
    answerEn:
      "Yes. A deposit is required to secure your booking and cover the time spent on your custom design. The deposit amount is typically NOK 500 to 1000 depending on the size of the project. Your deposit is deducted from the final price of your tattoo and it is non refundable.\n\nLife happens, we understand. If you need to reschedule, contact us at least 48 hours before your appointment and your deposit will be transferred to your new date. Cancellations with less than 48 hours notice will forfeit the deposit.\n\nIf you cancel your appointment entirely, the deposit is non refundable. This covers the design time and the slot that was held for you. If you have any concerns before your appointment, always reach out to us. We'd rather find a solution than lose you as a client.",
    answerNo:
      "Ja. Det kreves depositum for å sikre bookingen og dekke tiden som brukes på spesialdesignet. Depositumet er vanligvis 500 til 1000 kr, avhengig av prosjektets størrelse. Det trekkes fra sluttprisen og refunderes ikke.\n\nVi forstår at ting kan skje. Hvis du må flytte timen, ta kontakt minst 48 timer før avtalen, så flyttes depositumet til den nye datoen. Ved avbestilling senere enn 48 timer før timen går depositumet tapt.\n\nHvis du avbestiller timen helt, refunderes ikke depositumet. Det dekker tiden som er brukt på designet og tiden som ble holdt av til deg. Ta gjerne kontakt hvis du er usikker før timen, så prøver vi heller å finne en løsning.",
  },
  {
    questionEn: "Does getting a tattoo hurt, and which placements hurt least?",
    questionNo: "Gjør det vondt å ta tatovering, og hvor er det minst vondt?",
    answerEn:
      "Honestly yes, but it's very manageable for most people. Pain varies depending on placement. Areas like the outer arm, thigh, and back are generally easier. Areas like the ribs, inner arm, hands, and neck are more sensitive. Most clients are surprised by how bearable it actually is once they're in the chair. We work at a pace that's comfortable for you.\n\nThe outer upper arm, outer thigh, shoulder, calf, and upper back are generally the least painful areas. These are also great placements for large realistic pieces. If you're getting your first tattoo and want to ease into it, these are the spots we'd recommend starting with.",
    answerNo:
      "Ærlig talt, ja, men for de fleste er det godt håndterbart. Smerten varierer etter plassering. Utsiden av armen, låret og ryggen er vanligvis enklere, mens ribbein, innsiden av armen, hender og nakke er mer følsomt. Vi jobber i et tempo som er komfortabelt for deg.\n\nUtsiden av overarmen, utsiden av låret, skulderen, leggen og øvre del av ryggen er vanligvis blant de minst smertefulle områdene. Dette er også gode plasseringer for større realistiske motiver. For en førstegangstatovering kan dette være fine steder å starte.",
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
      "You can park for 2 hours free near the studio at Fresh Fitness, Skårersletta 60, or Triaden Senter Uteparkering, Skårersletta 70. Triaden is usually only a 2 to 3 minute walk from the studio.",
    answerNo:
      "Du kan parkere gratis i 2 timer nær studioet ved Fresh Fitness, Skårersletta 60, eller Triaden Senter Uteparkering, Skårersletta 70. Triaden er vanligvis bare 2 til 3 minutter å gå fra studioet.",
    parkingLinks: {
      freshFitness: "https://maps.app.goo.gl/MixgmVqLpSrBzwrU9",
      triaden: "https://maps.app.goo.gl/YW4AmZ3ZmcSbbQom8",
    },
  },
  {
    questionEn: "When is the studio open?",
    questionNo: "Når er studioet åpent?",
    answerEn:
      "Infinity Tattoo is open Tuesday to Friday from 11:00 to 18:00, and Saturday to Sunday from 11:00 to 16:00. Mondays are closed. Booking ahead through Linework is recommended.",
    answerNo:
      "Infinity Tattoo er åpent tirsdag til fredag fra 11:00 til 18:00, og lørdag til søndag fra 11:00 til 16:00. Mandager er stengt. Det anbefales å booke på forhånd gjennom Linework.",
  },
];

const aftercareItems = [
  {
    questionEn: "Days 1 to 3: the fresh wound phase",
    questionNo: "Dag 1 til 3: ferskt sår",
    answerEn:
      "Your tattoo is an open wound. Redness, swelling, and tenderness are normal. Wash your hands before touching it, remove the wrap after 2 to 4 hours, wash gently with fragrance free soap, pat dry with clean paper towel, apply a very thin layer of aftercare balm, and wear loose soft clothing. Do not re wrap, touch it with unwashed hands, soak it, use too much cream, expose it to direct sun, or let tight clothing rub against it.",
    answerNo:
      "Tatoveringen er et åpent sår. Rødhet, hevelse og ømhet er normalt. Vask hendene før du tar på den, fjern plasten etter 2 til 4 timer, vask forsiktig med parfymefri såpe, klapp tørr med rent papir, bruk et veldig tynt lag aftercare balm, og bruk myke løse klær. Ikke pakk den inn på nytt, ta på den med uvaskede hender, bløtlegg den, bruk for mye krem, utsett den for direkte sol, eller la stramme klær gnisse.",
  },
  {
    questionEn: "Days 4 to 7: itching and peeling",
    questionNo: "Dag 4 til 7: kløe og flassing",
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
    questionEn: "Weeks 3 to 4: surface healed",
    questionNo: "Uke 3 til 4: overflaten er grodd",
    answerEn:
      "The outer skin is healed and the tattoo should look sharp again. The deeper layers can still take 3 to 6 months to settle fully. Keep moisturizing, apply SPF 50 outdoors, resume normal activities, and evaluate later if a touch up is needed. Do not skip sunscreen, book a touch up before it is fully healed, or stop moisturizing.",
    answerNo:
      "Ytre hudlag er grodd og tatoveringen bør se skarp ut igjen. Dypere hudlag kan fortsatt bruke 3 til 6 måneder på å stabilisere seg helt. Fortsett å fukte, bruk SPF 50 ute, gå tilbake til normale aktiviteter, og vurder senere om touch up trengs. Ikke dropp solkrem, book touch up før den er helt grodd, eller slutt å fukte.",
  },
  {
    questionEn: "Recommended products",
    questionNo: "Anbefalte produkter",
    answerEn:
      "Use a tattoo aftercare balm in thin layers 2 to 3 times daily. Use mild fragrance free soap from any pharmacy and avoid alcohol, heavy perfumes, or exfoliating agents. Once healed, SPF 50 is essential every time the tattoo is exposed to sunlight.",
    answerNo:
      "Bruk tattoo aftercare balm i tynne lag 2 til 3 ganger daglig. Bruk mild parfymefri såpe fra apotek, og unngå alkohol, sterke parfymer eller eksfolierende ingredienser. Når tatoveringen er grodd, er SPF 50 viktig hver gang den eksponeres for sollys.",
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
    questionEn: "Long term care",
    questionNo: "Langsiktig pleie",
    answerEn:
      "Moisturize daily to keep skin hydrated and the tattoo vibrant. Use SPF 50 every time the tattoo is exposed to sunlight. Stay hydrated so the skin holds ink better. Touch ups may be needed after years depending on sun exposure and skin type.",
    answerNo:
      "Fukt huden daglig for å holde tatoveringen levende. Bruk SPF 50 hver gang tatoveringen eksponeres for sollys. Hold deg hydrert, slik at huden holder bedre på blekket. Touch ups kan bli aktuelt etter flere år, avhengig av soleksponering og hudtype.",
  },
  {
    questionEn: "Signs of infection",
    questionNo: "Tegn på infeksjon",
    answerEn:
      "Some redness and swelling in the first 2 to 3 days is normal. Contact a doctor if redness, swelling, or heat increases after day 3, if yellow or green discharge appears, if you get fever or chills, red streaks, severe worsening pain, or raised hard lumps under the skin. If anything feels unusual, message the studio early.",
    answerNo:
      "Noe rødhet og hevelse de første 2 til 3 dagene er normalt. Kontakt lege hvis rødhet, hevelse eller varme øker etter dag 3, hvis gul eller grønn væske kommer fra tatoveringen, hvis du får feber eller frysninger, røde striper, sterk økende smerte, eller harde hevelser under huden. Hvis noe føles uvanlig, kontakt studioet tidlig.",
  },
];

export default function Home() {
  return (
    <main id="home" className="min-h-screen overflow-hidden bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessJsonLd),
        }}
      />
      <SiteHeader />

      <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden sm:min-h-[88svh]">
        <HeroBackgroundVideo />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/30 via-background/50 to-background sm:from-background/35 sm:via-background/45" />

        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 pb-8 pt-[7.5rem] sm:gap-8 sm:px-8 sm:pb-14 sm:pt-32 lg:pb-20">
          <div className="flex max-w-4xl flex-col gap-5 sm:gap-6">
            <h1 className="motion-rise motion-delay-1 max-w-[9ch] font-display text-[4.15rem] font-bold leading-[0.9] text-foreground sm:max-w-none sm:text-7xl lg:text-8xl">
              INFINITY TATTOO
            </h1>
            <p className="motion-rise motion-delay-2 max-w-2xl text-[1.38rem] leading-[1.55] text-foreground/78 sm:hidden">
              <LocalizedText
                en="Custom realistic tattoos in Lørenskog."
                no="Custom realistiske tatoveringer i Lørenskog."
              />
            </p>
            <p className="motion-rise motion-delay-2 hidden max-w-2xl text-lg leading-8 text-muted-foreground sm:block sm:text-xl">
              <LocalizedText
                en="Custom realistic tattoos in Lørenskog, close to Strømmen, Lillestrøm and Oslo, for clients who want precision, detail, and a design that actually belongs on their skin."
                no="Custom realistiske tatoveringer i Lørenskog, nær Strømmen, Lillestrøm og Oslo, for deg som vil ha presisjon, detaljer og et design som faktisk passer huden din."
              />
            </p>
            <div className="motion-rise motion-delay-3 flex flex-wrap items-center justify-start gap-4 text-xs font-semibold text-foreground/85 sm:hidden">
              <span className="inline-flex items-center gap-1.5">
                <PenLineIcon
                  aria-hidden="true"
                  className="size-4 shrink-0 text-[color:var(--studio-gold)]"
                />
                <LocalizedText en="Tattoos" no="Tatovering" />
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CircleDotIcon
                  aria-hidden="true"
                  className="size-4 shrink-0 text-[color:var(--studio-gold)]"
                />
                Piercing
              </span>
              <span className="inline-flex items-center gap-1.5">
                <GemIcon
                  aria-hidden="true"
                  className="size-4 shrink-0 text-[color:var(--studio-gold)]"
                />
                Tooth Gems
              </span>
            </div>
          </div>
          <div className="motion-rise motion-delay-3 flex flex-col gap-3 sm:flex-row">
            <Button
              className="motion-lift-subtle rounded-full max-sm:min-h-14 max-sm:text-lg"
              nativeButton={false}
              render={
                <a
                  href="https://booking.linework.com/infinity"
                  target="_blank"
                  rel="noreferrer"
                />
              }
              size="lg"
            >
              <LocalizedText en="Book appointment" no="Book time" />
              <CalendarDaysIcon data-icon="inline-end" />
            </Button>
            <Button
              className="motion-lift-subtle rounded-full max-sm:min-h-14 max-sm:text-lg"
              nativeButton={false}
              render={<a href="#work" />}
              size="lg"
              variant="outline"
            >
              <LocalizedText en="See recent work" no="Se arbeid" />
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
        <div className="mx-auto mb-7 flex max-w-6xl flex-col gap-3 px-5 text-center sm:px-8">
          <div className="flex items-center justify-center gap-4 font-display text-lg font-bold text-foreground sm:gap-6 sm:text-3xl lg:text-4xl">
            <p>
              <LocalizedText
                en="Over 1000+ projects"
                no="Over 1000+ prosjekter"
              />
            </p>
            <span
              aria-hidden="true"
              className="h-10 w-px shrink-0 bg-border sm:h-12"
            />
            <p>
              <LocalizedText
                en="135+ Google reviews"
                no="135+ Google anmeldelser"
              />
            </p>
          </div>
          <p className="mx-auto max-w-2xl text-sm leading-6 text-muted-foreground">
            <LocalizedText
              en="Trusted by clients from Lørenskog, Strømmen, Lillestrøm and Oslo for custom tattoo work, clear consultation, and precise execution."
              no="Valgt av kunder fra Lørenskog, Strømmen, Lillestrøm og Oslo for custom tatoveringer, tydelig konsultasjon og presist arbeid."
            />
          </p>
        </div>
        <div id="work" className="scroll-mt-28 flex flex-col gap-2">
          {showcaseRows.map((items, rowIndex) => (
            <Marquee
              key={rowIndex}
              reverse={rowIndex === 1}
              pauseOnHover
              repeat={2}
              aria-label={
                rowIndex === 0
                  ? "Client reviews moving left"
                  : "Tattoo projects moving right"
              }
              className="motion-reduce:overflow-x-auto [&_.animate-marquee]:focus-within:[animation-play-state:paused] [&_.animate-marquee]:motion-reduce:animate-none"
            >
              {items.map((item) =>
                item.type === "review" ? (
                  <div
                    key={item.reviews[0].name}
                    className="flex h-72 w-80 shrink-0 flex-col gap-3 sm:h-75 sm:w-96"
                  >
                    {item.reviews.map((review) => (
                      <Card
                        key={`${review.name}-${review.date}`}
                        className={
                          item.reviews.length === 2
                            ? "min-h-0 flex-1 bg-background/70 py-2"
                            : "h-full bg-background/70"
                        }
                      >
                        <CardContent
                          className={
                            item.reviews.length === 2
                              ? "flex h-full min-h-0 flex-col gap-1 px-4"
                              : "flex h-full flex-col gap-4 px-5"
                          }
                        >
                          <div
                            aria-label={`${review.rating}/5`}
                            className="flex gap-1 text-[color:var(--studio-gold)]"
                          >
                            {Array.from({ length: review.rating }).map(
                              (_, starIndex) => (
                                <StarIcon
                                  aria-hidden="true"
                                  className="size-4 fill-current"
                                  key={starIndex}
                                />
                              ),
                            )}
                          </div>
                          <p
                            className={
                              item.reviews.length === 2
                                ? "text-base leading-6 text-foreground"
                                : "line-clamp-5 text-base leading-6 text-foreground"
                            }
                          >
                            &quot;
                            <LocalizedText
                              en={review.quoteEn}
                              no={review.quoteNo}
                            />
                            &quot;
                          </p>
                          <p className="mt-auto text-sm font-semibold text-muted-foreground">
                            {review.name}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Link
                    key={item.image.src}
                    href="/work"
                    className="relative h-60 w-48 shrink-0 overflow-hidden rounded-lg border bg-card focus-visible:outline-2 focus-visible:outline-ring sm:h-75 sm:w-60"
                  >
                    <Image
                      src={item.image.src}
                      alt={item.image.alt}
                      fill
                      className="object-cover"
                      sizes="(min-width: 640px) 240px, 192px"
                    />
                  </Link>
                ),
              )}
            </Marquee>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-3 px-5">
          <Button
            className="motion-lift-subtle rounded-full"
            nativeButton={false}
            render={<Link href="/reviews" />}
            size="lg"
            variant="outline"
          >
            <LocalizedText en="Read all reviews" no="Les alle anmeldelser" />
            <MoveUpRightIcon data-icon="inline-end" />
          </Button>
          <Button
            className="motion-lift-subtle rounded-full"
            nativeButton={false}
            render={<Link href="/work" />}
            size="lg"
          >
            <LocalizedText en="See all projects" no="Se alle prosjekter" />
            <MoveUpRightIcon data-icon="inline-end" />
          </Button>
        </div>
      </section>

      <section id="artist" className="motion-reveal scroll-mt-28 bg-background">
        <div className="mx-auto flex max-w-6xl flex-col gap-9 px-5 py-20 sm:px-8 lg:py-24">
          <h2 className="text-center font-display text-4xl font-bold sm:text-5xl">
            <LocalizedText en="Our artists" no="Artistene våre" />
          </h2>
          <div id="services" className="grid scroll-mt-28 gap-6">
            <ArtistSpotlight
              name="Filip"
              professionEn="Tattoo artist"
              professionNo="Tatovør"
              href="/work"
              image="/media/artist/filip-cutout.png"
              width={1230}
              height={1687}
            >
              <ul
                id="styles"
                className="space-y-3 text-base leading-7 text-muted-foreground"
              >
                {[
                  {
                    icon: UserRoundIcon,
                    en: "Artist and owner. 4+ years of experience from Greece and Norway.",
                    no: "Tatovør og eier. Over 4 års erfaring fra Hellas og Norge.",
                  },
                  {
                    icon: PaletteIcon,
                    en: "Custom designs shaped around your idea and your body.",
                    no: "Custom design tilpasset ideen din og kroppen din.",
                  },
                  {
                    icon: PenLineIcon,
                    en: "Realism, portraits, fine line and lettering.",
                    no: "Realisme, portretter, fine line og lettering.",
                  },
                  {
                    icon: LayersIcon,
                    en: "Black & grey, blackout and cover ups.",
                    no: "Black & grey, blackout og cover up.",
                  },
                  {
                    icon: SparklesIcon,
                    en: "Sleeves and freehand Maori.",
                    no: "Sleeves og freehand Maori.",
                  },
                ].map(({ icon: Icon, en, no }) => (
                  <li key={en} className="flex items-start gap-2">
                    <Icon
                      aria-hidden="true"
                      className="mt-1 size-4 shrink-0 text-[color:var(--studio-gold)]"
                    />
                    <span>
                      <LocalizedText en={en} no={no} />
                    </span>
                  </li>
                ))}
              </ul>
            </ArtistSpotlight>
            <ArtistSpotlight
              name="Nora"
              professionEn="Piercing & Tooth Gems"
              professionNo="Piercing & Tooth Gems"
              href="/tooth-gems"
              image="/media/artist/nora-cutout.png"
              width={1576}
              height={1539}
              mirrored
            >
              <ul className="space-y-3 text-base leading-7 text-muted-foreground">
                {[
                  {
                    icon: CircleDotIcon,
                    en: "Piercing with thoughtful placement and personal guidance.",
                    no: "Piercing med gjennomtenkt plassering og personlig veiledning.",
                  },
                  {
                    icon: GemIcon,
                    en: "Tooth Gems with crystals and designs that suit your smile.",
                    no: "Tooth Gems med krystaller og design som passer smilet ditt.",
                  },
                  {
                    icon: SparklesIcon,
                    en: "Help choosing jewellery, crystals and placement.",
                    no: "Hjelp til å velge smykker, krystaller og plassering.",
                  },
                  {
                    icon: UserRoundIcon,
                    en: "Calm guidance from your first visit through aftercare.",
                    no: "Rolig veiledning fra første besøk til etterbehandling.",
                  },
                ].map(({ icon: Icon, en, no }) => (
                  <li key={en} className="flex items-start gap-2">
                    <Icon
                      aria-hidden="true"
                      className="mt-1 size-4 shrink-0 text-[#d85a42]"
                    />
                    <span>
                      <LocalizedText en={en} no={no} />
                    </span>
                  </li>
                ))}
              </ul>
            </ArtistSpotlight>
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="motion-reveal mx-auto flex max-w-6xl scroll-mt-28 flex-col gap-8 border-t border-border/70 px-5 pb-10 pt-12 sm:px-8 lg:pb-14 lg:pt-16"
      >
        <div
          id="oslo"
          className="motion-reveal grid scroll-mt-28 gap-8 border-b border-border/70 pb-12 lg:grid-cols-2"
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <h2 className="font-display text-4xl font-bold sm:text-5xl">
                <LocalizedText en="The Studio" no="Studioet" />
              </h2>
              <StudioAddress />
              <p className="max-w-xl text-sm leading-6 text-muted-foreground">
                <LocalizedText
                  en="A hygienic, private and calm studio, with space for longer sessions, without the hassle of city centre parking."
                  no="Et hygienisk, privat og rolig studio med god plass til lengre økter, uten stresset med sentrumsparkering."
                />
              </p>
            </div>
            <ul className="flex list-disc flex-col gap-5 pl-5 marker:text-muted-foreground">
              {serviceAreas.map((item) => (
                <li key={item.area} className="pl-1">
                  <span className="font-semibold text-foreground">
                    {item.area}
                  </span>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    <LocalizedText en={item.textEn} no={item.textNo} />
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="grid grid-rows-2 gap-4 lg:absolute lg:inset-0">
              <iframe
                title="Infinity Tattoo location on Google Maps"
                aria-label="Infinity Tattoo location on Google Maps"
                className="block h-56 min-h-0 w-full rounded-3xl border-0 sm:h-64 lg:h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                scrolling="no"
                src="https://maps.google.com/maps?width=600&height=400&hl=en&q=sk%C3%A5rersletta%2048c&t=k&z=17&ie=UTF8&iwloc=B&output=embed"
              />
              <PanoramaViewer className="h-56 min-h-0 sm:h-64 lg:h-full" />
            </div>
          </div>
        </div>

        <div id="booking" className="scroll-mt-28 text-center">
          <h2 className="font-display text-4xl font-bold sm:text-5xl">
            <LocalizedText en="Booking" no="Booking" />
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
            <LocalizedText
              en="Book a free tattoo consultation to talk through your idea, placement, size, time estimate and budget before committing to a full tattoo session."
              no="Book en gratis tatoveringskonsultasjon for å gå gjennom idé, plassering, størrelse, tidsestimat og budsjett før du bestemmer deg for en full tatoveringstime."
            />
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          <a
            className="motion-lift-subtle flex items-center justify-center gap-3 rounded-full border bg-card/60 p-4 text-sm text-muted-foreground transition hover:bg-card hover:text-foreground"
            href="mailto:infinitytattoo99@gmail.com"
          >
            <MailIcon className="size-5 text-[color:var(--studio-gold)]" />
            infinitytattoo99@gmail.com
          </a>
          <a
            className="motion-lift-subtle flex items-center justify-center gap-3 rounded-full border bg-card/60 p-4 text-sm text-muted-foreground transition hover:bg-card hover:text-foreground"
            href="tel:+4740344775"
          >
            <PhoneIcon className="size-5 text-[color:var(--studio-gold)]" />
            +47 40 34 47 75
          </a>
          <InstagramPill />
          <a
            className="motion-lift-subtle flex items-center justify-center gap-3 rounded-full border bg-card/60 p-4 text-sm text-muted-foreground transition hover:bg-card hover:text-foreground"
            href="https://booking.linework.com/infinity"
            rel="noreferrer"
            target="_blank"
          >
            <LocalizedText en="Open in a new tab" no="Åpne i ny fane" />
            <MoveUpRightIcon className="size-4 text-[color:var(--studio-gold)]" />
          </a>
        </div>

        <div className="motion-lift-subtle relative scroll-mt-28 overflow-hidden rounded-3xl bg-card/80 p-2 [overflow-anchor:none]">
          <BorderBeam
            borderWidth={1}
            colorFrom="var(--studio-gold)"
            colorTo="var(--foreground)"
            duration={9}
            size={240}
          />
          <LineworkBooking />
        </div>

        <div
          id="faq"
          className="motion-reveal scroll-mt-28 rounded-3xl border bg-card/60 p-2"
        >
          <div className="px-4 pt-4">
            <h2 className="font-display text-3xl font-bold">
              <LocalizedText en="FAQ" no="Ofte stilte spørsmål" />
            </h2>
          </div>
          <Accordion
            className="px-4 py-2"
            defaultValue={[faqItems[0].questionEn]}
          >
            {faqItems.map((item) => (
              <AccordionItem
                id={
                  item.questionEn === "Tattoo prices"
                    ? "tattoo-prices"
                    : undefined
                }
                className="scroll-mt-28"
                key={item.questionEn}
                value={item.questionEn}
              >
                <AccordionTrigger className="py-4 text-base">
                  <LocalizedText en={item.questionEn} no={item.questionNo} />
                </AccordionTrigger>
                <AccordionContent className="whitespace-pre-line text-muted-foreground">
                  {item.parkingLinks ? (
                    <div className="flex flex-col gap-4">
                      <p>
                        <LocalizedText
                          en="You can park for 2 hours free near the studio at these locations:"
                          no="Du kan parkere gratis i 2 timer nær studioet på disse stedene:"
                        />
                      </p>
                      <ul className="flex flex-col gap-2">
                        <li>
                          Fresh Fitness,{" "}
                          <a
                            className="text-foreground underline underline-offset-4 transition hover:text-[color:var(--studio-gold)]"
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
                            className="text-foreground underline underline-offset-4 transition hover:text-[color:var(--studio-gold)]"
                            href={item.parkingLinks.triaden}
                            rel="noreferrer"
                            target="_blank"
                          >
                            Skårersletta 70
                          </a>{" "}
                          <LocalizedText
                            en="(2 to 3 min walk)"
                            no="(2 til 3 min gange)"
                          />
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
                        className="text-foreground underline underline-offset-4 transition hover:text-[color:var(--studio-gold)]"
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
            <div id="aftercare" className="scroll-mt-28 pb-3 pt-8">
              <h2 className="font-display text-3xl font-bold">
                <LocalizedText en="Aftercare" no="Etterbehandling" />
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
                <LocalizedText
                  en="Follow the steps below through the healing period. If the artist gives you personal instructions, follow those first."
                  no="Følg stegene under gjennom healing perioden. Hvis artisten gir deg personlige instrukser, følger du dem først."
                />
              </p>
            </div>
            {aftercareItems.map((item) => (
              <AccordionItem key={item.questionEn} value={item.questionEn}>
                <AccordionTrigger className="py-4 text-base">
                  <LocalizedText en={item.questionEn} no={item.questionNo} />
                </AccordionTrigger>
                <AccordionContent className="whitespace-pre-line text-muted-foreground">
                  <LocalizedText en={item.answerEn} no={item.answerNo} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div id="gift-cards" className="pb-2 pt-8 lg:pb-3 lg:pt-10">
          <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
            <div className="gift-card-collage relative mx-auto aspect-[1.5] w-[60%]">
              <div className="gift-card-piece gift-card-piece-purple">
                <Image
                  src="/media/gift-cards/gift-purple.png"
                  alt="Purple Infinity Tattoo gift card"
                  fill
                  className="object-contain"
                  sizes="(min-width: 1024px) 520px, 52vw"
                />
              </div>
              <div className="gift-card-piece gift-card-piece-gold">
                <Image
                  src="/media/gift-cards/gift-gold.png"
                  alt="Gold Infinity Tattoo gift card"
                  fill
                  className="object-contain"
                  sizes="(min-width: 1024px) 560px, 55vw"
                />
              </div>
              <div className="gift-card-piece gift-card-piece-blue">
                <Image
                  src="/media/gift-cards/gift-blue.png"
                  alt="Blue Infinity Tattoo gift card"
                  fill
                  className="object-contain"
                  sizes="(min-width: 1024px) 560px, 55vw"
                />
              </div>
              <div className="gift-card-piece gift-card-piece-black">
                <Image
                  src="/media/gift-cards/gift-grey.png"
                  alt="Black Infinity Tattoo gift card"
                  fill
                  className="object-contain"
                  sizes="(min-width: 1024px) 500px, 50vw"
                />
              </div>
            </div>
            <div className="mt-8 flex flex-col items-center gap-3">
              <h3 className="font-display text-4xl font-bold sm:text-5xl">
                <LocalizedText en="Gift cards" no="Gavekort" />
              </h3>
              <p className="whitespace-nowrap text-sm leading-6 text-muted-foreground">
                <LocalizedText
                  en="For the tattoo they've been waiting for."
                  no="Til tatoveringen de har ventet på."
                />
              </p>
              <Button
                className="rounded-full"
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
            </div>
          </div>
        </div>
      </section>

      <footer className="px-5 pb-10 sm:px-8">
        <div className="mx-auto w-full max-w-[68rem]">
          <div className="flex flex-col items-center gap-6 rounded-3xl border bg-card/60 p-6 text-sm text-muted-foreground sm:p-8 lg:grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-center">
            <div className="flex min-w-0 flex-col items-center gap-6 lg:flex-row lg:items-center lg:gap-3 lg:justify-self-start">
              <span className="relative flex size-12 shrink-0 overflow-hidden rounded-full bg-foreground">
                <Image
                  src="/media/brand/infinity.svg"
                  alt="Infinity Tattoo logo"
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </span>
              <div className="flex min-w-0 flex-col gap-2 text-left">
                <span className="text-foreground">
                  © Infinity Tattoo Studio
                </span>
                <a
                  className="text-sm text-muted-foreground underline-offset-4 hover:underline"
                  href="https://www.google.com/maps/search/?api=1&query=Sk%C3%A5rersletta%2048c%2C%20L%C3%B8renskog"
                  rel="noreferrer"
                  target="_blank"
                >
                  Skårersletta 48c, 1473 Lørenskog
                </a>
              </div>
            </div>
            <section
              id="opening-hours"
              className="flex flex-col gap-2 justify-self-center text-sm text-muted-foreground"
            >
              <h2 className="font-semibold text-foreground md:text-center">
                <LocalizedText en="Opening hours" no="Åpningstider" />
              </h2>
              <dl className="grid grid-cols-[auto_auto] gap-x-5 gap-y-1">
                <dt>
                  <LocalizedText en="Monday" no="Mandag" />
                </dt>
                <dd>
                  <LocalizedText en="Closed" no="Stengt" />
                </dd>
                <dt>
                  <LocalizedText
                    en="Tuesday to Friday"
                    no="Tirsdag til fredag"
                  />
                </dt>
                <dd>
                  <LocalizedText en="11:00 to 18:00" no="11:00 til 18:00" />
                </dd>
                <dt>
                  <LocalizedText
                    en="Saturday to Sunday"
                    no="Lørdag til søndag"
                  />
                </dt>
                <dd>
                  <LocalizedText en="11:00 to 16:00" no="11:00 til 16:00" />
                </dd>
              </dl>
            </section>
            <div className="flex flex-wrap items-center justify-center gap-4 lg:justify-self-end lg:flex-col lg:items-end">
              <a
                aria-label="Instagram"
                className="lg:order-2 motion-lift-subtle inline-flex h-10 items-center gap-2 rounded-full border bg-background/50 px-4 transition hover:bg-background hover:text-foreground"
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
          <div className="mx-auto flex max-w-[66rem] items-center justify-between px-4 pt-3 text-xs text-muted-foreground/70">
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
