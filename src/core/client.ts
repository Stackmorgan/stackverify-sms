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

    const baseUrl =
      config.baseUrl ?? "https://stackverify.site/api/v1";

    const http = new HttpClient(
      config.apiKey,
      baseUrl,
      {
        timeout: config.timeout,
        retries: config.retries
      }
    );

    this.sms = new SMSResource(http);
  }
}
