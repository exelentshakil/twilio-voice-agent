'use client';

import React, { useState, useEffect } from 'react';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';

interface BackboneStat {
  value: string;
  label: string;
  color: string;
  curveType: 'monotone' | 'stepAfter' | 'linear';
  sparkline: { t: string; v: number }[];
}

const STATS: BackboneStat[] = [
  {
    value: '480ms',
    label: 'P95 roundtrip voice turnaround via Twilio Media Streams',
    color: '#533AFD',
    curveType: 'monotone',
    sparkline: [
      { t: '1', v: 720 },
      { t: '2', v: 610 },
      { t: '3', v: 540 },
      { t: '4', v: 495 },
      { t: '5', v: 480 },
    ],
  },
  {
    value: '99.7%',
    label: 'caller barge-in detection accuracy with instant buffer flush',
    color: '#057A55',
    curveType: 'stepAfter',
    sparkline: [
      { t: '1', v: 98.2 },
      { t: '2', v: 98.9 },
      { t: '3', v: 99.3 },
      { t: '4', v: 99.5 },
      { t: '5', v: 99.7 },
    ],
  },
  {
    value: '100%',
    label: 'call transcripts & summaries synced to PostgreSQL & CRM',
    color: '#7A68FF',
    curveType: 'linear',
    sparkline: [
      { t: '1', v: 100 },
      { t: '2', v: 100 },
      { t: '3', v: 100 },
      { t: '4', v: 100 },
      { t: '5', v: 100 },
    ],
  },
  {
    value: '12.4ms',
    label: 'P99 async webhook execution latency via Inngest event queues',
    color: '#0d9488',
    curveType: 'monotone',
    sparkline: [
      { t: '1', v: 22 },
      { t: '2', v: 18 },
      { t: '3', v: 15 },
      { t: '4', v: 13.5 },
      { t: '5', v: 12.4 },
    ],
  },
];

export function BackboneStats() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="py-12 sm:py-16 border-t border-[var(--color-border)] scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Centered H2 Title with Stripe Opacity Hierarchy */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.025em] text-[var(--color-text-primary)]">
            The backbone of real-time voice operations
          </h2>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)] opacity-80 leading-relaxed">
            Engineered for zero phone lag, instant interruption recovery, and reliable CRM dispatch.
          </p>
        </div>

        {/* 4-Column Stat Strip with Varied Micro Sparklines */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 pt-6 border-t border-[var(--color-border)]">
          {STATS.map((stat, idx) => (
            <div key={idx} className="flex flex-col justify-between space-y-2">
              <div>
                <div className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-[var(--color-text-primary)]">
                  {stat.value}
                </div>
                <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] opacity-85 mt-1.5 leading-snug">
                  {stat.label}
                </p>
              </div>

              {/* Distinct Micro Sparkline */}
              <div className="h-8 w-full pt-2">
                {mounted && (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={stat.sparkline} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id={`bbGrad_${idx}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={stat.color} stopOpacity={0.25} />
                          <stop offset="100%" stopColor={stat.color} stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="rounded-[4px] bg-[var(--color-surface)] border border-[var(--color-border)] px-1.5 py-0.5 text-[9px] font-mono shadow-2xs text-[var(--color-text-primary)]">
                                {payload[0].value}
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Area
                        type={stat.curveType}
                        dataKey="v"
                        stroke={stat.color}
                        strokeWidth={1.5}
                        fill={`url(#bbGrad_${idx})`}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
