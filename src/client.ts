import {
  DEFAULT_API_URL,
  MailpulseConfig,
  RegisterEmailRequest,
  RegisterEmailResponse,
  TrackingStats,
  CampaignsResponse,
  CampaignDetails,
  CampaignStatsResponse,
  GetCampaignStatsOptions,
  MailpulseApiError,
} from "./types";

export class MailpulseClient {
  private apiKey: string;
  private apiUrl: string;

  constructor(config: MailpulseConfig) {
    if (!config.apiKey) {
      throw new Error("Mailpulse: apiKey is required");
    }
    this.apiKey = config.apiKey;
    this.apiUrl = (config.apiUrl || DEFAULT_API_URL).replace(/\/$/, "");
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.apiUrl}${endpoint}`;

    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "x-api-key": this.apiKey,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new MailpulseApiError(
        errorData.error || `Request failed with status ${response.status}`,
        response.status
      );
    }

    return response.json();
  }

  async registerEmail(data: RegisterEmailRequest): Promise<RegisterEmailResponse> {
    return this.request<RegisterEmailResponse>("/api/emails", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getStats(): Promise<TrackingStats> {
    return this.request<TrackingStats>("/api/stats");
  }

  async getCampaigns(): Promise<CampaignsResponse> {
    return this.request<CampaignsResponse>("/api/campaigns");
  }

  async getCampaign(campaignId: string): Promise<CampaignDetails> {
    return this.request<CampaignDetails>(`/api/campaigns/${campaignId}`);
  }

  async getCampaignStats(
    campaignId: string,
    options?: GetCampaignStatsOptions
  ): Promise<CampaignStatsResponse> {
    const params = new URLSearchParams();
    if (options?.period) {
      params.set("period", options.period);
    }
    const query = params.toString();
    const endpoint = `/api/campaigns/${campaignId}/stats${query ? `?${query}` : ""}`;
    return this.request<CampaignStatsResponse>(endpoint);
  }
}

export function createMailpulseClient(config: MailpulseConfig): MailpulseClient {
  return new MailpulseClient(config);
}
