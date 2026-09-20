'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import {
  Activity,
  Bot,
  Globe2,
  Command,
  Sun,
  Moon,
  Zap,
  ShieldCheck,
  Terminal,
} from 'lucide-react';
import { siteConfig } from '@/config/site';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenChaosModal: () => void;
  onOpenGovernanceDrawer: () => void;
  onOpenLogsDrawer: () => void;
  onOpenCommandMenu: () => void;
}

export function Header({
  activeSection,
  onNavigate,
  onOpenChaosModal,
  onOpenGovernanceDrawer,
  onOpenLogsDrawer,
  onOpenCommandMenu,
}: HeaderProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = resolvedTheme || theme;
  const isDark = mounted ? currentTheme === 'dark' : false;

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  const getNavIcon = (id: string, className: string = 'h-3.5 w-3.5') => {
    switch (id) {
      case 'cockpit':
        return <Activity className={`${className} text-[#533AFD] dark:text-[#7A68FF]`} />;
      case 'pipeline':
        return <Bot className={`${className} text-teal-600 dark:text-teal-400`} />;
      case 'records':
        return <Globe2 className={`${className} text-indigo-600 dark:text-indigo-400`} />;
      default:
        return <Activity className={`${className} text-[#533AFD] dark:text-[#7A68FF]`} />;
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--color-border)] bg-[var(--color-surface)]/95 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 gap-2 sm:gap-4">
        {/* Left: Brand Identity & Version Badge */}
        <div className="flex items-center gap-2.5 min-w-0 shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-[6px] bg-gradient-to-br from-[#533AFD] via-[#432DE0] to-[#0D1738] text-white shadow-xs font-bold shrink-0 border border-white/20">
            <Bot className="h-4 w-4" />
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-sm font-bold tracking-tight text-[var(--color-text-primary)]">
              {siteConfig.name}
            </span>
            <span className="hidden sm:inline-flex text-[10px] font-semibold px-2 py-0.5 rounded-[4px] bg-[#533AFD]/10 text-[#533AFD] dark:bg-[#7A68FF]/20 dark:text-[#7A68FF] border border-[#533AFD]/20 dark:border-[#7A68FF]/30 font-mono">
              {siteConfig.badge}
            </span>
          </div>
        </div>

        {/* Center: Desktop Clean Segmented Pill Navigation */}
        <nav className="hidden lg:flex items-center gap-1 rounded-[6px] border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-1 shadow-2xs">
          {siteConfig.primaryNav.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-[4px] transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-[var(--color-surface)] text-[var(--color-text-primary)] font-semibold shadow-2xs border border-[var(--color-border)]/60'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]/60'
                }`}
              >
                {getNavIcon(item.id, isActive ? 'h-3.5 w-3.5 text-[#533AFD] dark:text-[#7A68FF]' : 'h-3.5 w-3.5')}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right: Actions, Command Palette, Chaos Test & Theme Toggle */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Command Palette Trigger */}
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenCommandMenu}
            className="hidden md:flex h-8 items-center gap-1.5 px-2.5 text-xs font-mono text-[var(--color-text-secondary)] border-[var(--color-border)] bg-[var(--color-surface)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-panel-subtle)] shadow-2xs shrink-0 rounded-[4px]"
          >
            <Command className="h-3.5 w-3.5 text-[#533AFD] dark:text-[#7A68FF]" />
            <span>⌘K</span>
          </Button>

          {/* Governance Drawer Trigger */}
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenGovernanceDrawer}
            className="hidden xl:flex h-8 items-center gap-1.5 px-2.5 text-xs font-mono text-[var(--color-text-secondary)] border-[var(--color-border)] bg-[var(--color-surface)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-panel-subtle)] shadow-2xs shrink-0 rounded-[4px]"
          >
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className="whitespace-nowrap">Stealth Blueprint</span>
          </Button>

          {/* Logs Drawer Trigger */}
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenLogsDrawer}
            className="hidden sm:flex h-8 items-center gap-1 px-2.5 text-xs font-mono text-[var(--color-text-secondary)] border-[var(--color-border)] bg-[var(--color-surface)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-panel-subtle)] shadow-2xs shrink-0 rounded-[4px]"
          >
            <Terminal className="h-3.5 w-3.5 text-[#533AFD] dark:text-[#7A68FF]" />
            <span className="whitespace-nowrap">Logs</span>
          </Button>

          {/* Chaos Test Button (Stripe Primary Style) */}
          <Button
            size="sm"
            onClick={onOpenChaosModal}
            className="h-8 text-xs font-semibold bg-[#533AFD] hover:bg-[#432DE0] text-white shadow-2xs whitespace-nowrap shrink-0 px-3 rounded-[4px]"
          >
            <Zap className="h-3.5 w-3.5 mr-1 text-white shrink-0" />
            <span className="whitespace-nowrap">Chaos Test</span>
          </Button>

          {/* Theme Toggle Button */}
          {mounted && (
            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              className="h-8 w-8 p-0 border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-panel-subtle)] shadow-2xs shrink-0 rounded-[4px]"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="h-3.5 w-3.5 text-amber-500" />
              ) : (
                <Moon className="h-3.5 w-3.5 text-slate-700" />
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Horizontal Scrollable Pill Navigation with DISTINCT Icons & Stripe 4px Radii */}
      <div className="lg:hidden border-t border-[var(--color-border)] bg-[var(--color-panel-subtle)] py-1.5 px-3 overflow-x-auto no-scrollbar flex items-center gap-1.5 flex-nowrap">
        {siteConfig.primaryNav.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-[4px] transition-all whitespace-nowrap shrink-0 ${
                isActive
                  ? 'bg-[#533AFD] text-white font-semibold shadow-2xs'
                  : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:bg-[var(--color-surface)]/80'
              }`}
            >
              {getNavIcon(item.id, isActive ? 'h-3 w-3 text-white' : 'h-3 w-3')}
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}
