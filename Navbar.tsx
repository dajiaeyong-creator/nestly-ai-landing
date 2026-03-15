/*
 * NESTLY AI Navbar – Modern Fintech Design
 * Clean, light theme with soft shadows and green accents
 */

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { toast } from "sonner";
import WaitlistModal from "./WaitlistModal";

const LOGO_URL =
  "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663410745579/jopFEQelZDBjyRcu.png?Expires=1804386810&Signature=r3t-I9Va8dTRyTxEV4gDSPYgOAiwOrTlXip-M73DrG7OUqB3a-CZUtMZSZyEq84CEp5b~7gwNpO3-QHgu~SnfqNyS4Jb6XQWi4WeMhjQQH0dNXxjq97svB8~qg6wECVvjq51RAQNtkqc~aZjGvJNvQxqtCujmyD~TXfZGWP7sQAWLCh09J3drMAbreajZIq8~8HoBLYMp4XgywO8sb0I0~MVli6VLkcg5EXWsJXM6l0W5AYQYoZuoP4L1-z12WYh6TGmfIlKjU0PzcpxnKqUN2APsU1~O2Z1w8dqwq4SZvP8Io7fdTtVsnbmsfbD4KeVBj5uuY9QukwU8KpXuJ4Lqg__&Key-Pair-Id=K2HSFNDJXOU9YS";

const navLinks = [
  { label: "Product", href: "#features" },
  { label: "Solutions", href: "#product-preview" },
  { label: "Pricing", href: "#pricing" },
];

interface NavbarProps {
  onWaitlistClick: () => void;
}

export default function Navbar({ onWaitlistClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleComingSoon = (e: React.MouseEvent, label: string) => {
    e.preventDefault();
    toast(`${label} — coming soon`, {
      description: "This section is currently under development.",
    });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-soft"
          : "bg-white/50 backdrop-blur-sm"
      }`}
    >
      <div className="container">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <img
              src={LOGO_URL}
              alt="Nestly AI"
              className="h-8 w-auto transition-opacity group-hover:opacity-80"
            />
          </a>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-all duration-150"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={(e) => handleComingSoon(e, "Login")}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Login
            </button>
            <button
              onClick={onWaitlistClick}
              className="btn-primary px-5 py-2 text-sm"
            >
              Join Waitlist
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-slate-200 mt-0">
            <div className="flex flex-col gap-1 pt-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex gap-2 mt-2 pt-2 border-t border-slate-200">
                <button
                  onClick={(e) => { handleComingSoon(e, "Login"); setMobileOpen(false); }}
                  className="flex-1 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 btn-secondary"
                >
                  Login
                </button>
            <button
              onClick={() => { onWaitlistClick(); setMobileOpen(false); }}
              className="flex-1 py-2.5 text-sm btn-primary"
            >
              Join Waitlist
            </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
