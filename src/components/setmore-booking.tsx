import Image from "next/image";

export function SetmoreBooking() {
  return (
    <div
      className="relative scroll-mt-28 overflow-hidden rounded-3xl border bg-background shadow-2xl shadow-black/30 [overflow-anchor:none]"
    >
      <div className="h-[44rem] overflow-hidden bg-background sm:h-[48rem]">
        <div className="h-[111.12%] w-[111.12%] origin-top-left scale-90">
          <iframe
            aria-label="Book an appointment with Infinity Tattoo"
            className="size-full border-0 bg-background"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            scrolling="no"
            src="https://ibrahimdkalbab.setmore.com"
            tabIndex={-1}
            title="Setmore booking"
          />
        </div>
      </div>
      <input
        aria-hidden="true"
        className="peer sr-only"
        id="setmore-cookie-hint-toggle"
        tabIndex={-1}
        type="checkbox"
      />
      <label
        aria-label="Hide cookie hint"
        className="absolute right-1 top-[58%] z-50 hidden w-52 -translate-y-1/2 cursor-pointer text-left opacity-95 drop-shadow-2xl transition hover:opacity-100 peer-checked:hidden lg:block"
        htmlFor="setmore-cookie-hint-toggle"
      >
        <Image
          alt="Accept cookies to use calendar"
          className="pointer-events-none h-auto w-full"
          height={536}
          loading="eager"
          src="/media/cookies.svg"
          unoptimized
          width={496}
        />
      </label>
    </div>
  );
}
