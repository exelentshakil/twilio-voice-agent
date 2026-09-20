/**
 * Vocalis AI - Enterprise Twilio Voice & OpenAI Realtime Cockpit
 * Central Schema & Data Provider for Twilio Inbound Voice Agent.
 */

export interface NavItem {
  id: string;
  label: string;
}

export interface MetricItem {
  id: string;
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'neutral' | 'down';
  subtext: string;
  badge: string;
}

export interface TableRow {
  id: string;
  entityName: string;
  category: string;
  status: 'active' | 'verified' | 'queued' | 'flagged';
  latency: string;
  provider: string;
  updatedAt: string;
  payload: Record<string, unknown>;
}

export interface SiteConfig {
  slug: string;
  name: string;
  badge: string;
  tagline: string;
  description: string;
  archetype: 'stripe' | 'linear' | 'notion' | 'lovable' | 'bloomberg' | 'apple';
  primaryNav: NavItem[];
  metrics: MetricItem[];
  workflow: {
    badge: string;
    title: string;
    description: string;
    inputLabel: string;
    inputPlaceholder: string;
    defaultInput: string;
    buttonLabel: string;
    sampleResponse: Record<string, unknown>;
  };
  table: {
    badge: string;
    title: string;
    description: string;
    columns: { key: string; label: string }[];
    rows: TableRow[];
  };
}

export const siteConfig: SiteConfig = {
  slug: 'twilio-voice-agent',
  name: 'Vocalis AI',
  badge: 'Twilio Voice + OpenAI Realtime Gateway v2.4',
  tagline: 'Sub-500ms Inbound Phone Agent & Function Calling Architecture',
  description: 'Production-hardened Twilio Voice agent featuring bi-directional WebSocket media streaming, sub-500ms voice turnarounds, zero-deadlock barge-in interruption handling, dynamic CRM function calling, and automated PostgreSQL transcript dispatch.',
  archetype: 'stripe',
  primaryNav: [
    { id: 'cockpit', label: 'Voice Observability' },
    { id: 'pipeline', label: 'Call Flow & Function Engine' },
    { id: 'records', label: 'Call Log Archive' },
  ],
  metrics: [
    {
      id: 'voice_latency',
      title: 'Voice Turnaround Latency',
      value: '480ms P95',
      change: 'Sub-500ms Stream',
      trend: 'up',
      subtext: 'VAD (110ms) + GPT-4o Realtime Audio',
      badge: 'Twilio Media Streams',
    },
    {
      id: 'barge_in',
      title: 'Barge-In Interruption Rate',
      value: '99.7% Handled',
      change: 'Zero Audio Echo',
      trend: 'up',
      subtext: 'Instant ClearBuffer On Caller Speech',
      badge: 'Echo Cancellation',
    },
    {
      id: 'function_dispatch',
      title: 'CRM & Calendar Booking',
      value: '99.2% Executed',
      change: 'Inngest Async Bus',
      trend: 'up',
      subtext: 'HubSpot, GHL & Google Calendar Webhooks',
      badge: 'Function Calling',
    },
    {
      id: 'transcript_storage',
      title: 'Call Audit & Transcripts',
      value: '100% Persisted',
      change: 'Zero Call Drops',
      trend: 'neutral',
      subtext: 'Structured JSON Summaries & Audio Archive',
      badge: 'PostgreSQL / S3',
    },
  ],
  workflow: {
    badge: 'Live Twilio Inbound Call Simulator',
    title: 'Inbound Call Voice Dispatcher & Function Calling Engine',
    description: 'Simulate an incoming Twilio Voice stream. Test real-time VAD voice interruption, OpenAI function calling for calendar availability, and automated CRM contact enrichment.',
    inputLabel: 'Simulated Caller Utterance or Inbound Inquiry',
    inputPlaceholder: 'Enter simulated caller dialogue (e.g. asking for pricing, booking an appointment, or qualifying as a lead)...',
    defaultInput: "Hi, I'm calling to schedule an appointment with your senior sales advisor for tomorrow afternoon around 2 PM. My name is David Miller, phone is +1 209-555-0182, and we have a team of 45 people interested in your enterprise package.",
    buttonLabel: 'Simulate Inbound Voice Stream',
    sampleResponse: {
      status: 'CALL_COMPLETED_AND_DISPATCHED',
      call_sid: 'CA7b91e8430a91f42289c09d8174',
      caller_number: '+1 (209) 555-0182',
      duration_seconds: 48,
      lead_profile: {
        caller_name: 'David Miller',
        company_size: '45 team members',
        interest: 'Enterprise Voice Automation Package',
        qualification_tier: 'Tier 1 (High Priority Enterprise)',
        followup_priority: 'IMMEDIATE',
      },
      function_call_executed: {
        function_name: 'book_calendar_slot',
        parameters: {
          requested_date: '2026-09-21',
          requested_time: '14:00 PST',
          duration_minutes: 30,
          attendee_email: 'david.miller@millergroup.com',
        },
        execution_status: 'CONFIRMED',
        calendar_id: 'cal_event_8820491',
        notification_sent: 'SMS & Email Confirmation Dispatched',
      },
      audio_pipeline_telemetry: {
        media_stream_protocol: 'Twilio Bi-directional WebSocket (audio/x-mulaw 8000Hz)',
        vad_speech_start_ms: 112,
        first_audio_chunk_latency_ms: 468,
        barge_in_events: 1,
        barge_in_response_ms: 42,
        jitter_buffer_underruns: 0,
      },
      crm_dispatch: {
        crm_provider: 'HubSpot / GoHighLevel',
        contact_id: 'HS-994102',
        deal_value_estimate: '$18,000 ARR',
        transcript_stored: true,
        sentiment_score: 0.94,
        call_summary: 'Prospect David Miller called to book enterprise consult for 45-seat team. AI confirmed appointment for tomorrow 2:00 PM PST and synced to CRM.',
      },
    },
  },
  table: {
    badge: 'Real-Time Inbound Voice Sessions',
    title: 'Inbound Call History & CRM Dispatch Archive',
    description: 'High-density inspection grid with deterministic state tracking, audio latency metrics, and 1-tap raw JSON payload drawer.',
    columns: [
      { key: 'id', label: 'Call SID' },
      { key: 'entityName', label: 'Caller / Account' },
      { key: 'category', label: 'Call Intent' },
      { key: 'status', label: 'Call Status' },
      { key: 'latency', label: 'Voice P95' },
      { key: 'action', label: 'Inspection' },
    ],
    rows: [
      {
        id: 'CA-8821',
        entityName: 'Dr. Elena Rostova (+1 209-555-3381)',
        category: 'Clinic Intake & Lead Qualification',
        status: 'verified',
        latency: '440ms',
        provider: 'Twilio Media Streams + GPT-4o',
        updatedAt: '2 mins ago',
        payload: {
          call_sid: 'CA-8821-991',
          caller_number: '+1 (209) 555-3381',
          location: 'Stockton, CA',
          duration: '1m 24s',
          qualification_score: 'Qualified • Tier 1',
          appointment_booked: '2026-09-22 10:30 AM PST',
          crm_synced: 'HubSpot Contact #88192',
          transcript_preview: 'Caller: "I need to set up an initial consultation for our clinic staff." Agent: "I would be glad to help schedule that with Dr. Vance..."',
          latency_metrics: {
            vad_ms: 108,
            llm_first_token_ms: 195,
            tts_streaming_ms: 137,
            total_roundtrip_ms: 440,
          },
        },
      },
      {
        id: 'CA-8820',
        entityName: 'Marcus Sterling (+1 415-555-8910)',
        category: 'Enterprise Demo Rescheduling',
        status: 'active',
        latency: '465ms',
        provider: 'Twilio Media Streams + Realtime API',
        updatedAt: '4 mins ago',
        payload: {
          call_sid: 'CA-8820-412',
          caller_number: '+1 (415) 555-8910',
          location: 'San Francisco, CA',
          duration: '2m 10s',
          qualification_score: 'Active Customer ($45k ARR)',
          appointment_booked: 'Rescheduled to 2026-09-23 15:00 PST',
          crm_synced: 'Salesforce Opportunity #OP-4491',
          barge_in_handled: 'Yes (Caller interrupted at 0:42 to change time)',
          latency_metrics: {
            vad_ms: 115,
            llm_first_token_ms: 210,
            tts_streaming_ms: 140,
            total_roundtrip_ms: 465,
          },
        },
      },
      {
        id: 'CA-8819',
        entityName: 'Sarah Jenkins (+1 510-555-6721)',
        category: 'After-Hours Emergency Support',
        status: 'verified',
        latency: '510ms',
        provider: 'Twilio TwiML + Function Calling',
        updatedAt: '7 mins ago',
        payload: {
          call_sid: 'CA-8819-781',
          caller_number: '+1 (510) 555-6721',
          location: 'Oakland, CA',
          duration: '1m 05s',
          qualification_score: 'Priority 1 Support Ticket',
          action_taken: 'Escalated to On-Call Systems Engineer',
          sms_alert_sent: 'Dispatched to +1 (209) 555-0100',
          transcript_preview: 'Caller: "Our server backup failed and we need an engineer." Agent: "I have triggered an immediate emergency escalation to our standby team."',
        },
      },
      {
        id: 'CA-8818',
        entityName: 'Kevin Vance (+1 916-555-2244)',
        category: 'Pricing & Service Tier Inquiry',
        status: 'queued',
        latency: '480ms',
        provider: 'Inngest Background Queue',
        updatedAt: '12 mins ago',
        payload: {
          call_sid: 'CA-8818-102',
          caller_number: '+1 (916) 555-2244',
          location: 'Sacramento, CA',
          duration: '3m 15s',
          qualification_score: 'Warm Lead ($5k-$10k Budget)',
          crm_synced: 'GoHighLevel Lead Pipeline',
          automated_followup: 'WhatsApp & Email Summary Dispatched',
          sentiment_score: '0.91 (Interested in Custom Twilio Integration)',
        },
      },
      {
        id: 'CA-8817',
        entityName: 'Unknown Caller (+1 800-555-0012)',
        category: 'Spam / Robocall Intercept',
        status: 'flagged',
        latency: '210ms',
        provider: 'Twilio SIP Gate Filter',
        updatedAt: '15 mins ago',
        payload: {
          call_sid: 'CA-8817-009',
          caller_number: '+1 (800) 555-0012',
          location: 'Toll-Free Anonymous',
          duration: '0m 06s',
          classification: 'Automated Telemarketer / Robocall',
          action_taken: 'Terminated with SIP 486 Busy Here',
          cost_saved: '$0.18 Twilio Audio Minutes Saved',
        },
      },
    ],
  },
};
