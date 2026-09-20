'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Header } from '@/components/Header';
import { StripeHero } from '@/components/StripeHero';
import { BackboneStats } from '@/components/BackboneStats';
import { StripeFeatureGrid } from '@/components/StripeFeatureGrid';
import { MetricsGrid } from '@/components/MetricsGrid';
import { HeroWorkflowEngine } from '@/components/HeroWorkflowEngine';
import { DataTableSection } from '@/components/DataTableSection';
import { ChaosSimulatorModal } from '@/components/ChaosSimulatorModal';
import { AiGovernanceDrawer } from '@/components/AiGovernanceDrawer';
import { ExecutionLogDrawer } from '@/components/ExecutionLogDrawer';
import { CommandMenu } from '@/components/CommandMenu';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  const [activeSection, setActiveSection] = useState('cockpit');
  const [chaosModalOpen, setChaosModalOpen] = useState(false);
  const [governanceDrawerOpen, setGovernanceDrawerOpen] = useState(false);
  const [logsDrawerOpen, setLogsDrawerOpen] = useState(false);
  const [commandMenuOpen, setCommandMenuOpen] = useState(false);

  // Anti-flicker programmatic navigation lock
  const isNavigatingRef = useRef(false);
  const navTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);

    isNavigatingRef.current = true;
    if (navTimeoutRef.current) {
      clearTimeout(navTimeoutRef.current);
    }

    if (sectionId === 'cockpit') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        const headerOffset = 64; // Sticky header height allowance
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = Math.max(0, elementPosition + window.scrollY - headerOffset);
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }

    const releaseLock = () => {
      isNavigatingRef.current = false;
      window.removeEventListener('scrollend', releaseLock);
    };

    if ('onscrollend' in window) {
      window.addEventListener('scrollend', releaseLock, { once: true });
    }

    navTimeoutRef.current = setTimeout(releaseLock, 1400);
  };

  useEffect(() => {
    const sectionIds = ['cockpit', 'pipeline', 'records'];
    const observer = new IntersectionObserver(
      (entries) => {
        if (isNavigatingRef.current) return;

        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          visibleEntries.sort(
            (a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top)
          );
          setActiveSection(visibleEntries[0].target.id);
        }
      },
      { rootMargin: '-15% 0px -60% 0px', threshold: 0.1 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
      if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-canvas)] text-[var(--color-text-primary)]">
      <Header
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenChaosModal={() => setChaosModalOpen(true)}
        onOpenGovernanceDrawer={() => setGovernanceDrawerOpen(true)}
        onOpenLogsDrawer={() => setLogsDrawerOpen(true)}
        onOpenCommandMenu={() => setCommandMenuOpen(true)}
      />

      {/* Stripe Authentic Hero Section */}
      <StripeHero onExplore={() => handleNavigate('pipeline')} />

      {/* Stripe 4-Column Backbone Stats Strip */}
      <BackboneStats />

      <main className="w-full max-w-full min-w-0 overflow-x-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-12">
          {/* Section 1: Cockpit Telemetry & KPI Grid */}
          <section id="cockpit" className="scroll-mt-20">
            <div className="mb-4">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#533AFD] dark:text-[#7A68FF]">
                Live Voice Stream Observability
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-[var(--color-text-primary)]">
                Real-Time Audio Latency & Inbound Call Health
              </h2>
            </div>
            <MetricsGrid />
          </section>

          {/* Section 2: Interactive AI Pipeline & Governance Engine */}
          <section id="pipeline" className="scroll-mt-20">
            <div className="mb-4">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#533AFD] dark:text-[#7A68FF]">
                Voice Conversation & Function Engine
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-[var(--color-text-primary)]">
                Twilio Media Streams & OpenAI Realtime Architecture
              </h2>
            </div>
            <HeroWorkflowEngine />
          </section>

          {/* Section 3: Stripe 3-Column Feature Cards */}
          <StripeFeatureGrid
            onOpenGovernance={() => setGovernanceDrawerOpen(true)}
            onOpenPipeline={() => handleNavigate('pipeline')}
            onOpenLogs={() => setLogsDrawerOpen(true)}
            onSelectCard={(action) => {
              if (action === 'governance') setGovernanceDrawerOpen(true);
              else if (action === 'logs') setLogsDrawerOpen(true);
              else if (action === 'pipeline') handleNavigate('pipeline');
              else handleNavigate(action.replace('#', ''));
            }}
          />

          {/* Section 4: Entity Data Grid & Slide-out Inspection Sheet */}
          <section id="records" className="scroll-mt-20">
            <DataTableSection />
          </section>
        </div>
      </main>

      <Footer />

      <ChaosSimulatorModal
        open={chaosModalOpen}
        onOpenChange={setChaosModalOpen}
      />

      <AiGovernanceDrawer
        open={governanceDrawerOpen}
        onOpenChange={setGovernanceDrawerOpen}
      />

      <ExecutionLogDrawer
        open={logsDrawerOpen}
        onOpenChange={setLogsDrawerOpen}
      />

      <CommandMenu
        open={commandMenuOpen}
        onOpenChange={setCommandMenuOpen}
        onOpenChaos={() => {
          setCommandMenuOpen(false);
          setChaosModalOpen(true);
        }}
        onOpenGovernance={() => {
          setCommandMenuOpen(false);
          setGovernanceDrawerOpen(true);
        }}
        onOpenLogs={() => {
          setCommandMenuOpen(false);
          setLogsDrawerOpen(true);
        }}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
