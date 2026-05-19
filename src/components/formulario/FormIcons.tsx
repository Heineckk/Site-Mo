type IconProps = {
  className?: string;
};

export function CoupleIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        d="M12 21c-4-2.5-7-6.2-7-10.5a4 4 0 0 1 7-2.2 4 4 0 0 1 7 2.2C19 14.8 16 18.5 12 21z"
      />
    </svg>
  );
}

export function LetterIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 7l8 5 8-5M4 7v10h16V7"
      />
    </svg>
  );
}

export function FormModelIcon({
  variant,
}: {
  variant: "namoro" | "cartinha";
}) {
  const isNamoro = variant === "namoro";

  return (
    <div
      className={`flex h-12 w-12 items-center justify-center rounded-xl border ${
        isNamoro
          ? "border-rose/25 bg-rose/10 text-rose-light"
          : "border-gold/25 bg-gold/10 text-gold-light"
      }`}
    >
      {isNamoro ? <CoupleIcon /> : <LetterIcon />}
    </div>
  );
}
