"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Search, Sun, LayoutDashboard } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { MegaMenuPanel } from "@/components/layout/MegaMenu";
import { SearchOverlay } from "@/components/layout/SearchOverlay";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const navItems = [
  { key: "properties", label: "Properties", href: "/properties" },
  { key: "communities", label: "Communities", href: "/communities" },
  { key: "locations", label: "Locations", href: "/properties" },
  { key: "builders", label: "Builders", href: "/properties" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect -- client-mount flag to avoid theme hydration mismatch
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        onMouseLeave={() => setOpenMenu(null)}
        className={cn(
          "sticky top-0 z-50 hidden transition-all duration-300 md:block",
          scrolled || openMenu ? "glass shadow-[var(--shadow-sm)]" : "bg-transparent"
        )}
      >
        <div className="mx-auto flex h-20 max-w-[90rem] items-center justify-between px-10">
          <Logo priority />
          <nav className="flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onMouseEnter={() => setOpenMenu(item.key)}
                className={cn(
                  "rounded-btn px-4 py-2.5 text-sm font-medium text-ink-muted transition-colors hover:bg-surface-soft hover:text-ink",
                  openMenu === item.key && "bg-surface-soft text-ink"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="flex h-11 w-11 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-surface-soft hover:text-ink"
            >
              <Search className="h-5 w-5" />
            </button>
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle dark mode"
                className="flex h-11 w-11 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-surface-soft hover:text-ink"
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            )}
            <Link href="/dashboard" className="flex h-11 w-11 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-surface-soft hover:text-ink" aria-label="Dashboard">
              <LayoutDashboard className="h-5 w-5" />
            </Link>
            <Button as={Link} href="/properties" size="md" className="ml-1">
              Book Consultation
            </Button>
          </div>
        </div>
        <MegaMenuPanel menu={openMenu} />
      </header>

      {/* Minimal mobile top bar — bottom nav carries primary navigation */}
      <header
        className={cn(
          "sticky top-0 z-50 flex h-16 items-center justify-between px-5 transition-all duration-300 md:hidden pt-safe",
          scrolled ? "glass shadow-[var(--shadow-sm)]" : "bg-transparent"
        )}
      >
        <Logo />
        <div className="flex items-center gap-1">
          <button
            onClick={() => setSearchOpen(true)}
            aria-label="Search"
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-surface-soft"
          >
            <Search className="h-5 w-5" />
          </button>
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle dark mode"
              className="flex h-10 w-10 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-surface-soft"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          )}
        </div>
      </header>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
