type SocialIconProps = {
  className?: string;
};

export function InstagramIcon({ className }: SocialIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 27 26"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M26.992 13.12c0-1.952.007-3.904-.005-5.856a7.49 7.49 0 0 0-.12-1.334A6.976 6.976 0 0 0 24.368 1.739 7.315 7.315 0 0 0 19.638.011C15.607-.009 11.575.005 7.544.004A7.347 7.347 0 0 0 3.879.911 6.936 6.936 0 0 0 .029 7.138C-.025 11.033.012 14.93.017 18.827a6.507 6.507 0 0 0 .891 3.348 7.278 7.278 0 0 0 6.511 3.796c4.057.056 8.115.015 12.172.013a7.638 7.638 0 0 0 4.902-1.841 6.921 6.921 0 0 0 2.492-5.276c.029-1.915.006-3.831.007-5.747ZM13.417 20.21a7.362 7.362 0 0 1-7.406-7.218 7.351 7.351 0 0 1 7.499-7.212 7.352 7.352 0 0 1 7.486 7.215 7.37 7.37 0 0 1-7.579 7.215ZM22.496 5.779a1.48 1.48 0 0 1-1.5-1.448 1.501 1.501 0 0 1 3-.001 1.481 1.481 0 0 1-1.5 1.449Z"
        fill="currentColor"
        fillRule="evenodd"
      />
      <path
        d="M13.497 8.357a4.733 4.733 0 0 0-4.818 4.645 4.74 4.74 0 0 0 4.824 4.641 4.74 4.74 0 0 0 4.818-4.647 4.734 4.734 0 0 0-4.824-4.639Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
}

export function TikTokIcon({ className }: SocialIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 448 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M448 209.91a210.06 210.06 0 0 1-122.77-39.25v178.72A162.55 162.55 0 1 1 185 188.31v89.89a74.62 74.62 0 1 0 52.23 71.18V0h88a121.18 121.18 0 0 0 1.86 22.17 122.18 122.18 0 0 0 53.91 80.22 121.43 121.43 0 0 0 67 20.14Z"
        fill="currentColor"
      />
    </svg>
  );
}
