import { createContext, useContext, useMemo, ReactNode } from "react";
import { MailpulseClient } from "../client";
import { MailpulseConfig } from "../types";

interface MailpulseContextValue {
  client: MailpulseClient;
}

const MailpulseContext = createContext<MailpulseContextValue | null>(null);

export interface MailpulseProviderProps extends MailpulseConfig {
  children: ReactNode;
}

export function MailpulseProvider({
  children,
  apiKey,
  apiUrl,
}: MailpulseProviderProps) {
  const client = useMemo(
    () => new MailpulseClient({ apiKey, apiUrl }),
    [apiKey, apiUrl]
  );

  return (
    <MailpulseContext.Provider value={{ client }}>
      {children}
    </MailpulseContext.Provider>
  );
}

export function useMailpulseClient(): MailpulseClient {
  const context = useContext(MailpulseContext);
  if (!context) {
    throw new Error("useMailpulseClient must be used within a MailpulseProvider");
  }
  return context.client;
}
