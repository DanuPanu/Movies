"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
    {
    href: "/",
    label: "Home"
    },
  {
    href: "/movies",
    label: "Now playing",
  },
  {
    href: "/favourites",
    label: "Favourites",
  }
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="py-4 px-7 border-b border-black bg-slate-600">
      <nav className="flex items-center justify-between">
        {/* Tyhjä tila vasemmalla tasapainottamaan navin oikeaa puolta */}
        <div className="w-[280px]"></div>

        {/* Movies title keskellä */}
        <h1 className="text-white text-3xl text-center">Movies</h1>
        
        {/* Navigation links oikealle */}
        <ul className="flex gap-x-5 text-[14px] w-[280px] justify-end">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                className={`${
                  pathname === link.href ? "text-white" : "text-zinc-400"
                }`}
                href={link.href}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
