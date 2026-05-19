const INSTAGRAM_URL =
  "https://www.instagram.com/dotti_303?igsh=MXNtdHB5a3Bud2x2NA==";

function InstagramLogo({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

export default function InstagramButton({
  className = "",
}: {
  className?: string;
}) {
  return (
    <a
      href={INSTAGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`group mx-auto flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm text-white/80 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white ${className}`}
      aria-label="Instagram da turma 303 do Dotti — abre em nova aba"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white shadow-lg shadow-[#ee2a7b]/20 transition group-hover:scale-105">
        <InstagramLogo className="h-[18px] w-[18px]" />
      </span>
      <span className="flex flex-col items-start leading-tight">
        <span className="text-[10px] font-medium tracking-widest uppercase text-white/40">
          Turma 303 · Dotti
        </span>
        <span className="font-medium">@dotti_303</span>
      </span>
    </a>
  );
}
