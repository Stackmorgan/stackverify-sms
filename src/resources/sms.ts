import { HttpClient } from "../core/http";

export interface SendSMSParams {
  recipients: string[];
  body: string;
  sender_id?: string;
}

export interface SendSMSResponse {
  message: string;
  data?: unknown;
}

export class SMSResource {
  constructor(private http: HttpClient) {}

  send(params: SendSMSParams) {
    if (this.http.isLiveMode) {
      return this.http.request<SendSMSResponse>(
        "POST",
        "/api/sms/send",
        {
          number: params.recipients[0],
          message: params.body
        }
      );
    }

    return this.http.request<SendSMSResponse>(
      "POST",
      "/sms/send",
      params
    );
  }
}
