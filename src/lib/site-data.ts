import reviews from "@/data/reviews.json";

export type Testimonial = {
  name: string;
  rating: number;
  quoteEn: string;
  quoteNo: string;
  date: string;
};

export const galleryImages = [
  {
    src: "/media/gallery/infinity/infinity-29.webp",
    tag: "#01",
    alt: "Black and grey geisha portrait tattoo close-up",
  },
  {
    src: "/media/gallery/infinity/infinity-12.jpg",
    tag: "#02",
    alt: "Black and grey tattoo from Infinity Tattoo",
  },
  {
    src: "/media/gallery/infinity/infinity-14.jpg",
    tag: "#03",
    alt: "Custom tattoo composition",
  },
  {
    src: "/media/gallery/infinity/infinity-09.jpg",
    tag: "#04",
    alt: "Hercules black and grey tattoo",
  },
  {
    src: "/media/gallery/infinity/infinity-17.webp",
    tag: "#05",
    alt: "Large black and grey clown realism tattoo",
  },
  {
    src: "/media/gallery/infinity/infinity-18.webp",
    tag: "#06",
    alt: "Black and grey tiger sleeve tattoo",
  },
  {
    src: "/media/gallery/infinity/infinity-19.webp",
    tag: "#07",
    alt: "Large tiger forearm tattoo",
  },
  {
    src: "/media/gallery/infinity/infinity-20.webp",
    tag: "#08",
    alt: "Black and grey warrior realism sleeve tattoo",
  },
  {
    src: "/media/gallery/infinity/infinity-21.webp",
    tag: "#09",
    alt: "Full black and grey dragon and tiger sleeve tattoo",
  },
  {
    src: "/media/gallery/infinity/infinity-22.webp",
    tag: "#10",
    alt: "Fine line text tattoo with crack detail",
  },
  {
    src: "/media/gallery/infinity/infinity-23.webp",
    tag: "#11",
    alt: "Black and grey dice cards and rose tattoo",
  },
  {
    src: "/media/gallery/infinity/infinity-24.webp",
    tag: "#12",
    alt: "Black and grey tattoo detail from Infinity Tattoo",
  },
  {
    src: "/media/gallery/infinity/infinity-25.webp",
    tag: "#13",
    alt: "Custom black and grey tattoo from Infinity Tattoo",
  },
  {
    src: "/media/gallery/infinity/infinity-26.webp",
    tag: "#14",
    alt: "Large scale black and grey tattoo composition",
  },
  {
    src: "/media/gallery/infinity/infinity-27.webp",
    tag: "#15",
    alt: "Black and grey realism tattoo close-up",
  },
  {
    src: "/media/gallery/infinity/infinity-28.webp",
    tag: "#16",
    alt: "Custom tattoo design artwork by Infinity Tattoo",
  },
];

export const featuredGalleryImages = [
  galleryImages[0],
  galleryImages[1],
  galleryImages[4],
  galleryImages[2],
  galleryImages[3],
  galleryImages[5],
];

export const testimonials: Testimonial[] = reviews;
