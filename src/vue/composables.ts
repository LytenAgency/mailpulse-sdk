import { ref, onMounted, provide, inject, InjectionKey, Ref } from "vue";
import { MailpulseClient } from "../client";
import {
  MailpulseConfig,
  TrackingStats,
  CampaignsResponse,
  CampaignDetails,
  CampaignStatsResponse,
  GetCampaignStatsOptions,
  RegisterEmailRequest,
  RegisterEmailResponse,
  MailpulseApiError,
} from "../types";

const MAILPULSE_KEY: InjectionKey<MailpulseClient> = Symbol("mailpulse");

export function provideMailpulse(config: MailpulseConfig): MailpulseClient {
  const client = new MailpulseClient(config);
  provide(MAILPULSE_KEY, client);
  return client;
}

export function useMailpulseClient(): MailpulseClient {
  const client = inject(MAILPULSE_KEY);
  if (!client) {
    throw new Error(
      "Mailpulse client not found. Did you call provideMailpulse() in a parent component?"
    );
  }
  return client;
}

interface AsyncState<T> {
  data: Ref<T | null>;
  isLoading: Ref<boolean>;
  error: Ref<MailpulseApiError | Error | null>;
  refetch: () => Promise<void>;
}

export function useStats(): AsyncState<TrackingStats> {
  const client = useMailpulseClient();
  const data = ref<TrackingStats | null>(null);
  const isLoading = ref(true);
  const error = ref<MailpulseApiError | Error | null>(null);

  const fetch = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      data.value = await client.getStats();
    } catch (e) {
      error.value = e as Error;
      data.value = null;
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(fetch);

  return { data, isLoading, error, refetch: fetch };
}

export function useCampaigns(): AsyncState<CampaignsResponse> {
  const client = useMailpulseClient();
  const data = ref<CampaignsResponse | null>(null);
  const isLoading = ref(true);
  const error = ref<MailpulseApiError | Error | null>(null);

  const fetch = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      data.value = await client.getCampaigns();
    } catch (e) {
      error.value = e as Error;
      data.value = null;
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(fetch);

  return { data, isLoading, error, refetch: fetch };
}

export function useCampaign(campaignId: string): AsyncState<CampaignDetails> {
  const client = useMailpulseClient();
  const data = ref<CampaignDetails | null>(null);
  const isLoading = ref(true);
  const error = ref<MailpulseApiError | Error | null>(null);

  const fetch = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      data.value = await client.getCampaign(campaignId);
    } catch (e) {
      error.value = e as Error;
      data.value = null;
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(fetch);

  return { data, isLoading, error, refetch: fetch };
}

export function useCampaignStats(
  campaignId: string,
  options?: GetCampaignStatsOptions
): AsyncState<CampaignStatsResponse> {
  const client = useMailpulseClient();
  const data = ref<CampaignStatsResponse | null>(null);
  const isLoading = ref(true);
  const error = ref<MailpulseApiError | Error | null>(null);

  const fetch = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      data.value = await client.getCampaignStats(campaignId, options);
    } catch (e) {
      error.value = e as Error;
      data.value = null;
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(fetch);

  return { data, isLoading, error, refetch: fetch };
}

interface UseRegisterEmailReturn {
  registerEmail: (data: RegisterEmailRequest) => Promise<RegisterEmailResponse | null>;
  isLoading: Ref<boolean>;
  error: Ref<MailpulseApiError | Error | null>;
  data: Ref<RegisterEmailResponse | null>;
}

export function useRegisterEmail(): UseRegisterEmailReturn {
  const client = useMailpulseClient();
  const data = ref<RegisterEmailResponse | null>(null);
  const isLoading = ref(false);
  const error = ref<MailpulseApiError | Error | null>(null);

  const registerEmail = async (
    request: RegisterEmailRequest
  ): Promise<RegisterEmailResponse | null> => {
    isLoading.value = true;
    error.value = null;
    data.value = null;
    try {
      const response = await client.registerEmail(request);
      data.value = response;
      return response;
    } catch (e) {
      error.value = e as Error;
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  return { registerEmail, isLoading, error, data };
}
