import { useState, useEffect, useCallback } from "react";
import { useMailpulseClient } from "./provider";
import {
  TrackingStats,
  CampaignsResponse,
  CampaignDetails,
  CampaignStatsResponse,
  GetCampaignStatsOptions,
  RegisterEmailRequest,
  RegisterEmailResponse,
  MailpulseApiError,
} from "../types";

interface AsyncState<T> {
  data: T | null;
  isLoading: boolean;
  error: MailpulseApiError | Error | null;
}

interface UseStatsResult extends AsyncState<TrackingStats> {
  refetch: () => Promise<void>;
}

export function useStats(): UseStatsResult {
  const client = useMailpulseClient();
  const [state, setState] = useState<AsyncState<TrackingStats>>({
    data: null,
    isLoading: true,
    error: null,
  });

  const fetch = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const data = await client.getStats();
      setState({ data, isLoading: false, error: null });
    } catch (error) {
      setState({
        data: null,
        isLoading: false,
        error: error as Error,
      });
    }
  }, [client]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { ...state, refetch: fetch };
}

interface UseCampaignsResult extends AsyncState<CampaignsResponse> {
  refetch: () => Promise<void>;
}

export function useCampaigns(): UseCampaignsResult {
  const client = useMailpulseClient();
  const [state, setState] = useState<AsyncState<CampaignsResponse>>({
    data: null,
    isLoading: true,
    error: null,
  });

  const fetch = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const data = await client.getCampaigns();
      setState({ data, isLoading: false, error: null });
    } catch (error) {
      setState({
        data: null,
        isLoading: false,
        error: error as Error,
      });
    }
  }, [client]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { ...state, refetch: fetch };
}

interface UseCampaignResult extends AsyncState<CampaignDetails> {
  refetch: () => Promise<void>;
}

export function useCampaign(campaignId: string): UseCampaignResult {
  const client = useMailpulseClient();
  const [state, setState] = useState<AsyncState<CampaignDetails>>({
    data: null,
    isLoading: true,
    error: null,
  });

  const fetch = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const data = await client.getCampaign(campaignId);
      setState({ data, isLoading: false, error: null });
    } catch (error) {
      setState({
        data: null,
        isLoading: false,
        error: error as Error,
      });
    }
  }, [client, campaignId]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { ...state, refetch: fetch };
}

interface UseCampaignStatsResult extends AsyncState<CampaignStatsResponse> {
  refetch: () => Promise<void>;
}

export function useCampaignStats(
  campaignId: string,
  options?: GetCampaignStatsOptions
): UseCampaignStatsResult {
  const client = useMailpulseClient();
  const [state, setState] = useState<AsyncState<CampaignStatsResponse>>({
    data: null,
    isLoading: true,
    error: null,
  });

  const fetch = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const data = await client.getCampaignStats(campaignId, options);
      setState({ data, isLoading: false, error: null });
    } catch (error) {
      setState({
        data: null,
        isLoading: false,
        error: error as Error,
      });
    }
  }, [client, campaignId, options?.period]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { ...state, refetch: fetch };
}

interface UseRegisterEmailResult {
  registerEmail: (
    data: RegisterEmailRequest
  ) => Promise<RegisterEmailResponse | null>;
  isLoading: boolean;
  error: MailpulseApiError | Error | null;
  data: RegisterEmailResponse | null;
}

export function useRegisterEmail(): UseRegisterEmailResult {
  const client = useMailpulseClient();
  const [state, setState] = useState<{
    isLoading: boolean;
    error: MailpulseApiError | Error | null;
    data: RegisterEmailResponse | null;
  }>({
    isLoading: false,
    error: null,
    data: null,
  });

  const registerEmail = useCallback(
    async (data: RegisterEmailRequest): Promise<RegisterEmailResponse | null> => {
      setState({ isLoading: true, error: null, data: null });
      try {
        const response = await client.registerEmail(data);
        setState({ isLoading: false, error: null, data: response });
        return response;
      } catch (error) {
        setState({ isLoading: false, error: error as Error, data: null });
        return null;
      }
    },
    [client]
  );

  return { registerEmail, ...state };
}
