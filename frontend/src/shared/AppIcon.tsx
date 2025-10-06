import { twMerge } from "tailwind-merge";

export default function AppIcon({ className }: { className?: string }) {
  return (
    <svg
      width="512"
      height="512"
      viewBox="0 0 512 512"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={twMerge("select-none pointer-events-none", className)}
    >
      <path d="M112 349.381V161.619C112 151.336 120.329 143 130.604 143H278.493C288.767 143 297.097 151.336 297.097 161.619V349.381C297.097 359.664 288.767 368 278.493 368H130.604C120.329 368 112 359.664 112 349.381Z" />
      <path d="M400 161.619V349.381C400 359.664 391.671 368 381.396 368L345.729 368C335.454 368 327.125 359.664 327.125 349.381V161.619C327.125 151.336 335.454 143 345.729 143H381.396C391.671 143 400 151.336 400 161.619Z" />
    </svg>
  );
}
