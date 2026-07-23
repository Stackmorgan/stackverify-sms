import { StackVerifyError } from "./errors";

export interface RequestOptions {
  timeout?: number;
  retries?: number;
  liveMode?: boolean;
}

export class HttpClient {
  private apiKey: string;
  private baseUrl: string;
  private timeout: number;
  private retries: number;
  private liveMode: boolean;

  constructor(apiKey: string, baseUrl: string, options?: RequestOptions) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
    this.timeout = options?.timeout ?? 10000;
    this.retries = options?.retries ?? 2;
    this.liveMode = options?.liveMode ?? false;
  }

  get isLiveMode(): boolean {
    return this.liveMode;
  }

  async request<T>(
    method: string,
    path: string,
    body?: unknown
  ): Promise<T> {
    let attempt = 0;

    while (true) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);

        const headers: Record<string, string> = {
          "Content-Type": "application/json"
        };

        if (this.liveMode) {
          headers["X-API-Key"] = this.apiKey;
        } else {
          headers["Authorization"] = `Bearer ${this.apiKey}`;
        }

        const response = await fetch(`${this.baseUrl}${path}`, {
          method,
          headers,
          body: body ? JSON.stringify(body) : undefined,
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        const requestId = response.headers.get("x-request-id") ?? undefined;
        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new StackVerifyError(
            data?.message || "Request failed",
            response.status,
            data?.code,
            requestId
          );
        }

        return data as T;
      } catch (error) {
        if (attempt >= this.retries) {
          throw error;
        }

        attempt++;
        const delay = 2 ** attempt * 100;
        await new Promise((res) => setTimeout(res, delay));
      }
    }
  }
}
