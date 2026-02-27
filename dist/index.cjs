"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  StackVerify: () => StackVerify,
  StackVerifyError: () => StackVerifyError
});
module.exports = __toCommonJS(src_exports);

// src/core/errors.ts
var StackVerifyError = class extends Error {
  constructor(message, status, code, requestId) {
    super(message);
    this.name = "StackVerifyError";
    this.status = status;
    this.code = code;
    this.requestId = requestId;
  }
};

// src/core/http.ts
var HttpClient = class {
  constructor(apiKey, baseUrl, options) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
    this.timeout = options?.timeout ?? 1e4;
    this.retries = options?.retries ?? 2;
  }
  async request(method, path, body) {
    let attempt = 0;
    while (true) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);
        const response = await fetch(`${this.baseUrl}${path}`, {
          method,
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json"
          },
          body: body ? JSON.stringify(body) : void 0,
          signal: controller.signal
        });
        clearTimeout(timeoutId);
        const requestId = response.headers.get("x-request-id") ?? void 0;
        const data = await response.json().catch(() => ({}));
        if (!response.ok) {
          throw new StackVerifyError(
            data?.message || "Request failed",
            response.status,
            data?.code,
            requestId
          );
        }
        return data;
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
};

// src/resources/sms.ts
var SMSResource = class {
  constructor(http) {
    this.http = http;
  }
  send(params) {
    return this.http.request(
      "POST",
      "/sms/send",
      params
    );
  }
};

// src/core/client.ts
var StackVerify = class {
  constructor(config) {
    if (!config.apiKey) {
      throw new Error("StackVerify API key is required");
    }
    const baseUrl = config.baseUrl ?? "https://stackverify.site/api/v1";
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
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  StackVerify,
  StackVerifyError
});
