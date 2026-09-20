'use client';

import React, { useState, useEffect } from 'react';
import {
  Activity,
  ShieldCheck,
  Cpu,
  ArrowUpRight,
  Zap,
  CheckCircle2,
  Radio,
  Lock,
  Sparkles,
  PhoneCall,
  Mic,
  CalendarCheck,
  Database,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { siteConfig } from '@/config/site';

// 4 Distinct Micro Sparkline Datasets for Voice Stream Observability
const voiceLatencyTrend = [
  { t: '10:00', v: 720 },
  { t: '11:00', v: 640 },
  { t: '12:00', v: 580 },
  { t: '13:00', v: 520 },
  { t: '14:00', v: 495 },
  { t: '15:00', v: 488 },
  { t: '16:00', v: 480 },
];

const bargeInPrecisionData = [
  { domain: 'VAD Det', v: 98.8 },
  { domain: 'Echo Canc', v: 99.2 },
  { domain: 'Buffer Clr', v: 99.5 },
  { domain: 'Interrupt', v: 99.8 },
  { domain: 'Prompt Sync', v: 99.4 },
  { domain: 'Audio Flow', v: 99.9 },
  { domain: 'Barge-In', v: 99.7 },
];

const bookingTrajectoryData = [
  { day: 'Mon', v: 14 },
  { day: 'Tue', v: 28 },
  { day: 'Wed', v: 45 },
  { day: 'Thu', v: 62 },
  { day: 'Fri', v: 79 },
  { day: 'Sat', v: 88 },
  { day: 'Sun', v: 99.2 },
];

const transcriptAuditData = [
  { node: 'Twilio Stream', v: 100 },
  { node: 'WebSocket', v: 100 },
  { node: 'OpenAI Audio', v: 100 },
  { node: 'Function Bus', v: 100 },
  { node: 'Postgres DB', v: 100 },
  { node: 'S3 Archive', v: 100 },
  { node: 'CRM Sync', v: 100 },
];

const telemetryStream = [
  { time: '09:00', calls: 42, latency: 492 },
  { time: '10:00', calls: 68, latency: 484 },
  { time: '11:00', calls: 94, latency: 478 },
  { time: '12:00', calls: 88, latency: 482 },
  { time: '13:00', calls: 112, latency: 475 },
  { time: '14:00', calls: 126, latency: 468 },
  { time: '15:00', calls: 108, latency: 472 },
  { time: '16:00', calls: 118, latency: 465 },
  { time: '17:00', calls: 84, latency: 470 },
];

export function MetricsGrid() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const icons = [PhoneCall, Mic, CalendarCheck, Database];
  const badgeStyles = [
    'bg-[#533AFD]/8 text-[#533AFD] dark:bg-[#7A68FF]/15 dark:text-[#7A68FF] border-[#533AFD]/20 dark:border-[#7A68FF]/30',
    'bg-emerald-50/80 dark:bg-emerald-950/30 text-[#057A55] dark:text-emerald-300 border-emerald-200/80 dark:border-emerald-800/40',
    'bg-amber-50/80 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 border-amber-200/80 dark:border-amber-800/40',
    'bg-teal-50/80 dark:bg-teal-950/30 text-teal-700 dark:text-teal-300 border-teal-200/80 dark:border-teal-800/40',
  ];

  // Dynamic grid: 4 columns for 4 metrics on desktop, 3 columns for 3 metrics
  const gridColsClass =
    siteConfig.metrics.length === 4
      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
      : siteConfig.metrics.length === 2
      ? 'grid-cols-1 sm:grid-cols-2'
      : 'grid-cols-1 md:grid-cols-3';

  // Render varied, custom micro-visualizations per card index
  const renderCardChart = (idx: number) => {
    if (!mounted) return null;

    if (idx === 0) {
      // Card 0: Voice Turnaround Latency (Stripe Blurple gradient area)
      return (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={voiceLatencyTrend} margin={{ top: 2, right: 2, left: 2, bottom: 0 }}>
            <defs>
              <linearGradient id="voiceLatencyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#533AFD" stopOpacity={0.28} />
                <stop offset="100%" stopColor="#533AFD" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-[4px] bg-[var(--color-surface)] border border-[var(--color-border)] px-2 py-0.5 text-[10px] font-mono shadow-xs text-[var(--color-text-primary)]">
                      <span className="font-bold text-[#533AFD] dark:text-[#7A68FF]">{payload[0].value}ms</span> roundtrip
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="v"
              stroke="#533AFD"
              strokeWidth={1.75}
              fill="url(#voiceLatencyGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      );
    }

    if (idx === 1) {
      // Card 1: Barge-in interruption handling (Thin progressive emerald bars)
      return (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={bargeInPrecisionData} margin={{ top: 2, right: 2, left: 2, bottom: 0 }} barCategoryGap={4}>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="rounded-[4px] bg-[var(--color-surface)] border border-[var(--color-border)] px-2 py-0.5 text-[10px] font-mono shadow-xs text-[var(--color-text-primary)]">
                      {data.domain}: <span className="font-bold text-[#057A55] dark:text-emerald-400">{data.v}%</span>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="v" radius={[2, 2, 0, 0]} barSize={9}>
              {bargeInPrecisionData.map((_, barIdx) => (
                <Cell
                  key={`cell-${barIdx}`}
                  fill="#057A55"
                  fillOpacity={0.45 + (barIdx / bargeInPrecisionData.length) * 0.55}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      );
    }

    if (idx === 2) {
      // Card 2: CRM & Calendar Booking Trajectory (Amber stepped curve)
      return (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={bookingTrajectoryData} margin={{ top: 2, right: 2, left: 2, bottom: 0 }}>
            <defs>
              <linearGradient id="bookingGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#D97706" stopOpacity={0.28} />
                <stop offset="100%" stopColor="#D97706" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="rounded-[4px] bg-[var(--color-surface)] border border-[var(--color-border)] px-2 py-0.5 text-[10px] font-mono shadow-xs text-[var(--color-text-primary)]">
                      {data.day}: <span className="font-bold text-amber-600 dark:text-amber-400">{data.v}%</span> sync rate
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="v"
              stroke="#D97706"
              strokeWidth={1.75}
              fill="url(#bookingGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      );
    }

    // Card 3: 100% Call Audit & Transcript Persistence line
    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={transcriptAuditData} margin={{ top: 2, right: 2, left: 2, bottom: 0 }}>
          <defs>
            <linearGradient id="transcriptGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0d9488" stopOpacity={0.28} />
              <stop offset="100%" stopColor="#0d9488" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="rounded-[4px] bg-[var(--color-surface)] border border-[var(--color-border)] px-2 py-0.5 text-[10px] font-mono shadow-xs text-[var(--color-text-primary)]">
                    {data.node}: <span className="font-bold text-teal-600 dark:text-teal-400">{data.v}%</span> Persisted
                  </div>
                );
              }
              return null;
            }}
          />
          <Area
            type="stepAfter"
            dataKey="v"
            stroke="#0d9488"
            strokeWidth={1.75}
            fill="url(#transcriptGrad)"
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="w-full space-y-4">
      {/* High-Density KPI Cards with Balanced Stripe Hierarchy & Zero Desktop Whitespace */}
      <div className={`grid ${gridColsClass} gap-3 sm:gap-4`}>
        {siteConfig.metrics.map((metric, idx) => {
          const Icon = icons[idx % icons.length];
          const badgeStyle = badgeStyles[idx % badgeStyles.length];

          return (
            <div
              key={metric.id}
              className="rounded-[6px] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between overflow-hidden"
            >
              {/* Card Header: Category Eyebrow with Stripe Reduced Opacity */}
              <div className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
                <div className="space-y-0.5">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] opacity-75 font-mono">
                    {metric.title}
                  </span>
                </div>
                <span
                  className={`inline-flex items-center rounded-[4px] px-2 py-0.5 text-[10px] font-mono font-semibold border ${badgeStyle} shrink-0`}
                >
                  <Icon className="h-3 w-3 mr-1 shrink-0" />
                  {metric.badge}
                </span>
              </div>

              {/* Card Body: Primary Bold Metric & Varied Micro-Visualization */}
              <div className="p-4 pt-1 space-y-3">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-[var(--color-text-primary)]">
                    {metric.value}
                  </span>
                  <span className="inline-flex items-center text-xs font-semibold text-[#533AFD] dark:text-[#7A68FF] font-mono">
                    <ArrowUpRight className="h-3 w-3 mr-0.5 shrink-0" />
                    {metric.change}
                  </span>
                </div>

                {/* Embedded Varied Micro Chart */}
                <div className="h-12 w-full pt-1">
                  {renderCardChart(idx)}
                </div>

                {/* Subtext Footer: Balanced Lower Opacity */}
                <div className="text-[11px] text-[var(--color-text-secondary)] opacity-75 font-mono border-t border-[var(--color-border)]/60 pt-2 flex items-center justify-between">
                  <span className="truncate pr-2">{metric.subtext}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#00D924] shrink-0" title="Active node" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Streamlined Voice Stream Ingestion & Latency Telemetry Chart */}
      <div className="rounded-[6px] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xs p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold tracking-tight text-[var(--color-text-primary)]">
                Twilio Media Stream & Telemetry Engine
              </span>
              <span className="rounded-[4px] bg-[#533AFD]/8 text-[#533AFD] border border-[#533AFD]/20 dark:bg-[#7A68FF]/15 dark:text-[#7A68FF] dark:border-[#7A68FF]/30 px-2 py-0.5 text-[10px] font-mono font-semibold">
                Live Stream
              </span>
            </div>
            <p className="text-xs text-[var(--color-text-secondary)] opacity-80 mt-0.5">
              Sub-500ms voice turnaround with automated barge-in buffer flush and zero audio packet drop
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono text-[var(--color-text-secondary)] opacity-85">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#533AFD]"></span>
              Active Inbound Calls
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#057A55]"></span>
              Roundtrip Voice P95 (468ms)
            </span>
          </div>
        </div>

        <div className="h-44 sm:h-52 w-full">
          {mounted && (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={telemetryStream} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#533AFD" stopOpacity={0.22} />
                    <stop offset="95%" stopColor="#533AFD" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="time"
                  stroke="#94a3b8"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-[4px] border border-[var(--color-border)] bg-[var(--color-surface)] p-2.5 shadow-md text-xs font-mono space-y-1">
                          <p className="font-bold text-[var(--color-text-primary)]">{payload[0].payload.time}</p>
                          <p className="text-[#533AFD] dark:text-[#7A68FF] flex items-center justify-between gap-3">
                            <span>Concurrent Calls:</span>
                            <span className="font-bold">{payload[0].value} calls</span>
                          </p>
                          <p className="text-[#057A55] dark:text-emerald-400 flex items-center justify-between gap-3">
                            <span>Voice P95:</span>
                            <span className="font-bold">{payload[0].payload.latency}ms</span>
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="calls"
                  stroke="#533AFD"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorCalls)"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}
