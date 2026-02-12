export const DEFAULT_API_URL = "https://mailpulse-io.lyten.agency";

export interface MailpulseConfig {
  apiKey: string;
  apiUrl?: string;
}

export interface RegisterEmailRequest {
  recipient: string;
  subject: string;
  htmlContent: string;
  campaignId?: string;
  metadata?: Record<string, unknown>;
}

export interface SendEmailRequest {
  from: string;
  to: string | string[];
  subject: string;
  htmlContent: string;
  replyTo?: string;
  cc?: string | string[];
  bcc?: string | string[];
  campaignId?: string;
  metadata?: Record<string, unknown>;
}

export interface SendEmailResponse {
  id: string;
  emailTrackingId: string;
  from: string;
  to: string[];
  subject: string;
  links: TrackedLink[];
  pixelUrl: string;
  badgeHtml?: string;
}

export interface TrackedLink {
  originalUrl: string;
  trackingId: string;
  trackingUrl: string;
}

export interface RegisterEmailResponse {
  emailTrackingId: string;
  links: TrackedLink[];
  pixelUrl: string;
  badgeHtml?: string;
}

export interface TrackingStats {
  totalEmails: number;
  totalOpens: number;
  totalClicks: number;
  openRate: number;
  clickRate: number;
}

export interface Campaign {
  id: string;
  name: string;
  createdAt: string;
}

export interface CampaignsResponse {
  campaigns: Campaign[];
}

export interface LinkStats {
  url: string;
  clicks: number;
}

export interface EmailSummary {
  id: string;
  trackingId: string;
  recipient: string;
  subject: string;
  createdAt: string;
  opens: number;
  clicks: number;
}

export interface CampaignDetails {
  id: string;
  name: string;
  createdAt: string;
  stats: TrackingStats;
  links: LinkStats[];
  emails: EmailSummary[];
}

export interface CampaignStatsDetails {
  totalEmails: number;
  totalOpens: number;
  totalClicks: number;
  openRate: number;
  clickThroughRate: number;
  uniqueRecipients: number;
  noInteraction: number;
}

export interface DailyStats {
  date: string;
  opens: number;
  clicks: number;
  emails: number;
}

export interface CampaignStatsResponse {
  campaign: Campaign;
  period: {
    start: string;
    end: string;
  };
  stats: CampaignStatsDetails;
  openAndClicks: DailyStats[];
  topLinks: LinkStats[];
}

export type StatsPeriod = "7d" | "30d" | "90d" | `${string},${string}`;

export interface GetCampaignStatsOptions {
  period?: StatsPeriod;
}

export interface MailpulseError {
  error: string;
  status: number;
}

export class MailpulseApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "MailpulseApiError";
    this.status = status;
  }
}
