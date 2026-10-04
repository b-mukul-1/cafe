import type { Metadata } from "next";
import Link from "next/link";
import { LayoutDashboard, Settings, Coffee, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Cafe Management Dashboard | Extension Point",
  description: "Reserved administrative dashboard portal for future backend integration.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardPage() {
  return (
    <div className="w-full bg-cafe-bg min-h-screen pt-32 pb-24 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto p-8 sm:p-12 rounded-3xl bg-cafe-surface border border-cafe-border">
        <div className="flex items-center gap-3 mb-6 text-cafe-caramel">
          <LayoutDashboard className="w-8 h-8" />
          <span className="font-mono text-xs uppercase tracking-widest text-cafe-caramel">
            Admin Module Extension Point
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-cafe-cream mb-4">
          Management Dashboard
        </h1>

        <p className="text-cafe-parchment text-base font-light leading-relaxed mb-8">
          This route group <code>src/app/(dashboard)/</code> is prepared for future cafe management, live inventory tracking, menu price updates, and table reservation logs.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="p-6 rounded-2xl bg-cafe-surface-elevated border border-cafe-border">
            <Coffee className="w-6 h-6 text-cafe-caramel mb-3" />
            <h2 className="text-lg font-serif font-bold text-cafe-cream mb-1">
              Menu &amp; Roastery Sync
            </h2>
            <p className="text-xs text-cafe-muted font-light leading-relaxed">
              Plug in your headless CMS or database to mutate <code>content/menu.ts</code> items dynamically.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-cafe-surface-elevated border border-cafe-border">
            <Settings className="w-6 h-6 text-cafe-caramel mb-3" />
            <h2 className="text-lg font-serif font-bold text-cafe-cream mb-1">
              Backend Integration Ready
            </h2>
            <p className="text-xs text-cafe-muted font-light leading-relaxed">
              Connect to <code>src/lib/api/client.ts</code> with your authentication provider (NextAuth, Supabase, etc.).
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-cafe-border/50">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-cafe-parchment hover:text-cafe-caramel transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Public Cafe Site</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
