"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";

const format = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: site.location.timeZone,
});

/** Live Dubai time (GST, UTC+4). Renders a neutral placeholder on the server. */
export function DubaiClock({ className }: { className?: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(format.format(new Date()));
    tick();
    const id = window.setInterval(tick, 15_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className={className} suppressHydrationWarning>
      <time aria-label="Current time in Dubai">{time ?? "--:--"}</time> GST
    </span>
  );
}
