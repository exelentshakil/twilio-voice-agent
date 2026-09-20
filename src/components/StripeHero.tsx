'use client';

import React from 'react';
import { ChevronRight, ArrowRight, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';

export function StripeHero({ onExplore }: { onExplore?: () => void }) {
  return (
    <section className="relative overflow-hidden pt-6 pb-10 sm:pt-10 sm:pb-16">
      {/* Stripe Authentic Ambient Aura / Mesh Glow */}
      <div className="pointer-events-none absolute -top-24 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-[#533AFD]/12 via-[#FF7A59]/10 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 -left-20 -z-10 h-[380px] w-[380px] rounded-full bg-gradient-to-tr from-[#FFE0EF]/30 via-[#00D924]/10 to-transparent blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Live Telemetry Eyebrow */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1 text-xs font-mono text-[var(--color-text-secondary)] shadow-2xs mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-[#00D924] animate-pulse" />
          <span className="font-semibold text-[var(--color-text-primary)]">Enterprise Availability:</span>
          <span>99.999% Historical Uptime</span>
          <ChevronRight className="h-3 w-3 text-[var(--color-text-muted)]" />
        </div>

        {/* Master Stripe Two-Tone Typography Headline */}
        <div className="max-w-4xl space-y-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.025em] text-[var(--color-text-primary)] leading-[1.08]">
            {siteConfig.name} infrastructure to grow your operations.
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-[var(--color-text-secondary)] font-normal leading-[1.45] max-w-3xl">
            {siteConfig.description}
          </p>
        </div>

        {/* Stripe Authentic 4px Radius Button Suite */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button
            onClick={onExplore}
            className="h-10 px-5 text-sm font-semibold bg-[#533AFD] hover:bg-[#432DE0] text-white shadow-2xs rounded-[4px] transition-all"
          >
            Launch interactive cockpit
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>

          <Button
            variant="outline"
            onClick={onExplore}
            className="h-10 px-5 text-sm font-semibold border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-panel-subtle)] text-[var(--color-text-primary)] rounded-[4px] shadow-2xs"
          >
            Explore API & schemas
            <ChevronRight className="h-4 w-4 ml-1 text-[var(--color-text-muted)]" />
          </Button>
        </div>

        {/* Stripe Institutional Enterprise Client Logos Strip */}
        <div className="mt-14 pt-8 border-t border-[var(--color-border)]">
          <p className="text-[11px] font-mono uppercase tracking-wider text-[var(--color-text-muted)] mb-4">
            Trusted by modern enterprise engineering teams
          </p>
          <div className="flex flex-wrap items-center justify-between gap-6 opacity-75 grayscale hover:grayscale-0 transition-all">
            <span className="text-sm font-bold tracking-tighter text-[var(--color-text-primary)] font-sans">amazon</span>
            <span className="text-sm font-bold tracking-tight text-[var(--color-text-primary)] font-sans">NVIDIA</span>
            <span className="text-sm font-semibold tracking-wide text-[var(--color-text-primary)] font-sans">Ford</span>
            <span className="text-sm font-bold tracking-tight text-[var(--color-text-primary)] font-sans">coinbase</span>
            <span className="text-sm font-semibold tracking-tight text-[var(--color-text-primary)] font-sans">Google</span>
            <span className="text-sm font-bold tracking-tight text-[var(--color-text-primary)] font-sans">shopify</span>
            <span className="text-sm font-medium tracking-tight text-[var(--color-text-primary)] font-sans">mindbody</span>
          </div>
        </div>
      </div>
    </section>
  );
}
