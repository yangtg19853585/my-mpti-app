export default function BackgroundFX() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#0b0f1f]">
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div className="absolute -left-20 top-[-10%] h-72 w-72 animate-blob rounded-full bg-indigo-600/30 blur-3xl" />
      <div className="absolute right-[-10%] top-1/4 h-80 w-80 animate-blob rounded-full bg-cyan-500/20 blur-3xl [animation-delay:2s]" />
      <div className="absolute bottom-[-15%] left-1/4 h-96 w-96 animate-blob rounded-full bg-teal-500/20 blur-3xl [animation-delay:4s]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0b0f1f]" />
    </div>
  );
}
