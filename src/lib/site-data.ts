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
    src: "/media/gallery/infinity/infinity-12.jpg",
    tag: "#01",
    alt: "Black and grey tattoo from Infinity Tattoo",
  },
  {
    src: "/media/gallery/infinity/infinity-14.jpg",
    tag: "#02",
    alt: "Custom tattoo composition",
  },
  {
    src: "/media/gallery/infinity/infinity-09.jpg",
    tag: "#03",
    alt: "Hercules black and grey tattoo",
  },
  {
    src: "/media/gallery/infinity/infinity-01.jpg",
    tag: "#04",
    alt: "Back tattoo before cover-up session",
  },
  {
    src: "/media/gallery/infinity/infinity-02.jpg",
    tag: "#05",
    alt: "Black and grey sleeve tattoo in progress",
  },
  {
    src: "/media/gallery/infinity/infinity-03.jpg",
    tag: "#06",
    alt: "Detailed black and grey fantasy tattoo",
  },
  {
    src: "/media/gallery/infinity/infinity-04.jpg",
    tag: "#07",
    alt: "Black and grey forearm tattoo detail",
  },
  {
    src: "/media/gallery/infinity/infinity-05.jpg",
    tag: "#08",
    alt: "Black and grey realistic tattoo on hand",
  },
  {
    src: "/media/gallery/infinity/infinity-06.jpg",
    tag: "#09",
    alt: "Floral black and grey leg tattoo",
  },
  {
    src: "/media/gallery/infinity/infinity-07.jpg",
    tag: "#10",
    alt: "Black and grey tattoo session detail",
  },
  {
    src: "/media/gallery/infinity/infinity-08.jpg",
    tag: "#11",
    alt: "Detailed tattoo composition on skin",
  },
  {
    src: "/media/gallery/infinity/infinity-10.jpg",
    tag: "#12",
    alt: "Detailed realism tattoo portrait",
  },
  {
    src: "/media/gallery/infinity/infinity-11.jpg",
    tag: "#13",
    alt: "Black and grey tattoo detail",
  },
  {
    src: "/media/gallery/infinity/infinity-13.jpg",
    tag: "#14",
    alt: "Black and grey leg tattoo",
  },
  {
    src: "/media/gallery/infinity/infinity-15.jpg",
    tag: "#15",
    alt: "Large realism tattoo",
  },
  {
    src: "/media/gallery/infinity/infinity-16.jpg",
    tag: "#16",
    alt: "Black and grey tattoo close-up",
  },
];

export const featuredGalleryImages = galleryImages.slice(0, 6);

export const testimonials: Testimonial[] = reviews;
