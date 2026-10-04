import type { Metadata } from "next";
import Link from "next/link";
import { Coffee, Home, Utensils } from "lucide-react";

export const metadata: Metadata = {
  title: "404 - Page Not Found | A2 Cafe",
  description: "The page you are looking for does not exist.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="w-full bg-cafe-bg min-h-screen pt-32 pb-24 flex items-center justify-center px-4">
      <div className="max-w-md mx-auto text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-cafe-caramel/10 border border-cafe-caramel/25 text-cafe-caramel flex items-center justify-center mx-auto">
          <Coffee className="w-10 h-10" />
        </div>

        <span className="font-mono text-xs uppercase tracking-widest text-cafe-caramel block">
          Error 404
        </span>

        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-cafe-cream">
          Cup Empty
        </h1>

        <p className="text-cafe-parchment text-sm sm:text-base font-light leading-relaxed">
          The page you requested could not be located. It might have been moved or the brew has finished pouring.
        </p>

        <div className="pt-4 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="px-6 py-3 rounded-lg bg-cafe-caramel hover:bg-cafe-caramel-hover text-cafe-bg font-semibold text-sm transition-all flex items-center gap-2 min-h-[44px]"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
          <Link
            href="/menu/"
            className="px-6 py-3 rounded-lg bg-cafe-surface hover:bg-cafe-surface-elevated border border-cafe-border hover:border-cafe-caramel text-cafe-cream font-semibold text-sm transition-all flex items-center gap-2 min-h-[44px]"
          >
            <Utensils className="w-4 h-4 text-cafe-caramel" />
            <span>Explore Menu</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
