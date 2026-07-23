interface RequestOptions {
    timeout?: number;
    retries?: number;
    liveMode?: boolean;
}
declare class HttpClient {
    private apiKey;
    private baseUrl;
    private timeout;
    private retries;
    private liveMode;
    constructor(apiKey: string, baseUrl: string, options?: RequestOptions);
    get isLiveMode(): boolean;
    request<T>(method: string, path: string, body?: unknown): Promise<T>;
}

interface SendSMSParams {
    recipients: string[];
    body: string;
    sender_id?: string;
}
interface SendSMSResponse {
    message: string;
    data?: unknown;
}
declare class SMSResource {
    private http;
    constructor(http: HttpClient);
    send(params: SendSMSParams): Promise<SendSMSResponse>;
}

interface StackVerifyConfig extends RequestOptions {
    apiKey: string;
    baseUrl?: string;
}
declare class StackVerify {
    sms: SMSResource;
    constructor(config: StackVerifyConfig);
}

declare class StackVerifyError extends Error {
    status?: number;
    code?: string;
    requestId?: string;
    constructor(message: string, status?: number, code?: string, requestId?: string);
}

export { SendSMSParams, SendSMSResponse, StackVerify, StackVerifyConfig, StackVerifyError };
