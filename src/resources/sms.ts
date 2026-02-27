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
    return this.http.request<SendSMSResponse>(
      "POST",
      "/sms/send",
      params
    );
  }
}
