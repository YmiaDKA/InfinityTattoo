export function LineworkBooking() {
  return (
    <div
      className="relative scroll-mt-28 overflow-hidden rounded-3xl border bg-background shadow-2xl shadow-black/30 [overflow-anchor:none]"
    >
      <iframe
        aria-label="Book an appointment with Infinity Tattoo"
        className="h-[46rem] w-full border-0 bg-background sm:h-[50rem] lg:h-[52rem]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        src="https://booking.linework.com/infinity"
        title="Linework booking"
      />
    </div>
  );
}
