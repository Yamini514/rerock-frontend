import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Intrinsic ratios of the source assets in public/ — used so next/image can
// reserve layout space correctly while display size is controlled via className.
const SOURCES = {
  compact: { color: "/logo-compact.png", white: "/logo-compact-white.png", ratio: 1263 / 415 },
  full: { color: "/logo.png", white: "/logo-white.png", ratio: 1280 / 563 },
};

// The brand mark stays identical in light and dark mode — it does not follow the site theme.
// `dark` is only for placing the logo on a deliberately dark surface regardless of theme
// (e.g. a photo overlay or a fixed-dark auth panel), not for reacting to dark mode.
export function Logo({ className, dark = false, variant = "compact", href = "/", priority = false }) {
  const { color, white, ratio } = SOURCES[variant];
  const src = dark ? white : color;
  const height = 100;
  const width = Math.round(height * ratio);

  return (
    <Link href={href} className="inline-flex shrink-0 items-center" aria-label="REROCK Realty — Home">
      <Image
        src={src}
        alt="REROCK Realty — Where Dreams Meet Strategy"
        width={width}
        height={height}
        priority={priority}
        className={cn(variant === "full" ? "h-12 w-auto" : "h-8 w-auto", className)}
      />
    </Link>
  );
}
