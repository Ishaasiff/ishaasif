/**
 * Static, viewport-fixed backdrop.
 *
 * The dark sections are transparent, so the page content scrolls over this
 * layer. Nothing in here moves on scroll: the content is the only thing that
 * slides, which is the effect a fixed background gives.
 */
export function FixedBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-hero"
    >
      {/* Soft top light and a low burgundy wash */}
      <div
        className="absolute inset-0 light:hidden"
        style={{
          backgroundImage:
            "radial-gradient(90% 60% at 50% -10%, rgba(236,232,225,0.06), transparent 62%), radial-gradient(70% 50% at 50% 112%, rgba(128,0,32,0.14), transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 hidden light:block"
        style={{
          backgroundImage:
            "radial-gradient(90% 60% at 50% -10%, rgba(255,255,255,0.6), transparent 62%), radial-gradient(70% 50% at 50% 112%, rgba(27,24,20,0.05), transparent 70%)",
        }}
      />

      {/* Soft neutral pools */}
      <div
        className="absolute inset-0 light:hidden"
        style={{
          backgroundImage:
            "radial-gradient(46% 38% at 18% 28%, rgba(128,0,32,0.38), transparent 70%), radial-gradient(42% 34% at 84% 74%, rgba(128,0,32,0.3), transparent 72%), radial-gradient(34% 28% at 68% 16%, rgba(128,0,32,0.16), transparent 72%), radial-gradient(38% 30% at 12% 88%, rgba(236,232,225,0.05), transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 hidden light:block"
        style={{
          backgroundImage:
            "radial-gradient(46% 38% at 18% 28%, rgba(27,24,20,0.03), transparent 70%), radial-gradient(42% 34% at 84% 74%, rgba(27,24,20,0.02), transparent 72%), radial-gradient(34% 28% at 68% 16%, rgba(27,24,20,0.015), transparent 72%)",
        }}
      />

      {/* Faint grid, faded out toward the edges */}
      <div
        className="absolute inset-0 light:hidden"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(236,232,225,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(236,232,225,0.06) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          backgroundPosition: "center center",
          maskImage:
            "radial-gradient(115% 95% at 50% 50%, black 18%, transparent 76%)",
          WebkitMaskImage:
            "radial-gradient(115% 95% at 50% 50%, black 18%, transparent 76%)",
        }}
      />
      <div
        className="absolute inset-0 hidden light:block"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(26,26,26,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(26,26,26,0.04) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          backgroundPosition: "center center",
          maskImage:
            "radial-gradient(115% 95% at 50% 50%, black 18%, transparent 76%)",
          WebkitMaskImage:
            "radial-gradient(115% 95% at 50% 50%, black 18%, transparent 76%)",
        }}
      />

      {/* Vignette: keeps the edges dark so content stays readable */}
      <div
        className="absolute inset-0 light:hidden"
        style={{
          backgroundImage:
            "radial-gradient(120% 100% at 50% 50%, transparent 42%, rgba(0,0,0,0.55) 100%)",
        }}
      />
      <div
        className="absolute inset-0 hidden light:block"
        style={{
          backgroundImage:
            "radial-gradient(120% 100% at 50% 50%, transparent 42%, rgba(236,232,225,0.3) 100%)",
        }}
      />
    </div>
  );
}
