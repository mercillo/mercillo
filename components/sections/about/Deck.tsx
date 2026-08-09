type DeckProps = {
  channel: string;
  title: string;
  tags: string;
  variant: "day" | "night";
};

export default function Deck({ channel, title, tags, variant }: DeckProps) {
  const isDay = variant === "day";

  return (
    <div className="flex-1 text-center">
      <div
        className={`relative mx-auto flex h-24 w-24 items-center justify-center rounded-full border-2 bg-surface sm:h-28 sm:w-28 ${
          isDay ? "border-accent-dim" : "border-line"
        }`}
        aria-hidden="true"
      >
        <div className="absolute inset-2 flex items-center justify-center rounded-full motion-safe:animate-[spin_3.5s_linear_infinite]">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-background sm:h-14 sm:w-14">
            <span
              className={`h-2 w-2 rounded-full ${isDay ? "bg-accent" : "bg-foreground"}`}
            />
          </div>
          <span className="absolute left-1/2 top-1.5 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-accent-dim" />
        </div>
        <span className="absolute right-2 top-2 h-[3px] w-9 origin-right rotate-[35deg] rounded bg-accent-dim" />
      </div>

      <p className="mt-3 text-sm font-medium text-foreground">{title}</p>
      <p className="mt-1 text-xs text-muted">{tags}</p>
      <p
        className={`mt-2 text-xs tracking-wide ${isDay ? "text-accent" : "text-muted"}`}
      >
        {channel}
      </p>
    </div>
  );
}
