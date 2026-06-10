// components/canvas/TextureOverlay.jsx

export const TextureOverlay = ({ intensity, color }) => {
  if (intensity <= 0) return null;

  return (
    <>
      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, ${color}15 0px, ${color}15 2px, transparent 2px, transparent 8px)`,
          opacity: intensity / 100,
        }}
      />

      {/* Noise SVG (only if intensity > 30) */}
      {intensity > 30 && (
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            opacity: intensity / 200,
          }}
        />
      )}
    </>
  );
};
