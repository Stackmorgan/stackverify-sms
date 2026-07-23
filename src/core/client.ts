import { HttpClient, RequestOptions } from "./http";
import { SMSResource } from "../resources/sms";

export interface StackVerifyConfig extends RequestOptions {
  apiKey: string;
  baseUrl?: string;
}

export class StackVerify {
  public sms: SMSResource;

  constructor(config: StackVerifyConfig) {
    if (!config.apiKey) {
      throw new Error("StackVerify API key is required");
    }

    const isLiveKey = config.apiKey.startsWith("sv_live_");
    const baseUrl =
      config.baseUrl ?? (isLiveKey
        ? "https://gateway.stackverify.site"
        : "https://stackverify.site/api/v1");

    const http = new HttpClient(
      config.apiKey,
      baseUrl,
      {
        timeout: config.timeout,
        retries: config.retries,
        liveMode: isLiveKey
      }
    );

    this.sms = new SMSResource(http);
  }
}
