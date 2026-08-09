"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { navLinks } from "@/content/nav";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background/80 backdrop-blur">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4"
      >
        <Link
          href="/"
          aria-label="mercillo — home"
          onClick={closeMenu}
          className="flex items-center gap-2"
        >
          <Image
            src="/mercillo-mark.png"
            alt=""
            width={40}
            height={40}
            priority
          />
          <span className="text-xl font-bold tracking-tight">mercillo</span>
        </Link>

        <ul className="hidden items-center gap-6 text-sm text-muted md:flex">
          {navLinks.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                className="text-base font-bold transition-colors hover:text-foreground"
              >
                {label.toUpperCase()}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          className="text-foreground md:hidden"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            {isOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {isOpen && (
        <ul
          id="mobile-menu"
          className="flex flex-col border-t border-line px-6 py-2 text-muted md:hidden"
        >
          {navLinks.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={closeMenu}
                className="block py-3 transition-colors hover:text-foreground"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
