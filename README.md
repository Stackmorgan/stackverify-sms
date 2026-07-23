<img src="https://i.ibb.co/Fqgxjt1N/Gemini-Generated-Image-m7irhdm7irhdm7ir.png" alt="StackVerify Logo" width="100%" style="max-width: 900px;">

# StackVerify SMS — Node.js SMS API SDK

> Send SMS, OTP, and text messages from Node.js with one line of code.

[![npm version](https://img.shields.io/npm/v/stackverify-sms.svg)](https://www.npmjs.com/package/stackverify-sms)
[![npm downloads](https://img.shields.io/npm/dm/stackverify-sms.svg)](https://www.npmjs.com/package/stackverify-sms)
[![npm total](https://img.shields.io/npm/dt/stackverify-sms.svg)](https://www.npmjs.com/package/stackverify-sms)
[![Node.js Version](https://img.shields.io/node/v/stackverify-sms.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/npm/l/stackverify-sms.svg)](LICENSE)

**StackVerify SMS** is the official Node.js SDK for sending text messages, OTP codes, and notifications through the [StackVerify](https://stackverify.site) REST API. Works with CommonJS and ESM. Fully typed for TypeScript.

---

## Table of Contents

- [Features](#features)
- [Quick Start](#quick-start)
- [Installation](#installation)
- [API Keys](#api-keys)
- [Send SMS](#send-sms)
- [Configuration](#configuration)
- [TypeScript](#typescript)
- [Error Handling](#error-handling)
- [Use Cases](#use-cases)
- [Free Credits](#free-credits)
- [Security](#security)
- [FAQ](#faq)
- [Support](#support)
- [License](#license)

---

## Features

- **Send SMS** — deliver text messages to any phone number worldwide
- **OTP & Verification** — send one-time passwords for 2FA and identity verification
- **Automatic Retries** — exponential backoff on failures, no manual retry logic needed
- **TypeScript Ready** — full type definitions and IntelliSense support
- **ESM + CommonJS** — works in modern and legacy Node.js projects
- **Auto API Key Detection** — cloud and mobile gateway modes handled automatically
- **Lightweight** — zero runtime dependencies, tiny bundle
- **Production Ready** — timeouts, structured errors, and retry configuration
- **Free Tier** — 20 free SMS per month with no credit card required

---

## Installation

### From npm (recommended)

```bash
npm install stackverify-sms
```

```bash
yarn add stackverify-sms
```

```bash
pnpm add stackverify-sms
```

### From local .tgz file

```bash
npm install @stackverify-sms-1.0.0.tgz
```

**Requirements:** Node.js 18 or higher.

---

## Quick Start

### CommonJS (require)

```js
const { StackVerify } = require("stackverify-sms");

const client = new StackVerify({
  apiKey: "sk_live_your_api_key_here"
});

(async () => {
  try {
    const res = await client.sms.send({
      recipients: ["+254712345678"],
      body: "Hello from StackVerify!",
      sender_id: "SMS"
    });

    console.log("SMS sent:", res);
  } catch (err) {
    console.error("Failed to send SMS:", err);
  }
})();
```

### ESM (import)

```js
import { StackVerify } from "stackverify-sms";

const client = new StackVerify({
  apiKey: process.env.STACKVERIFY_KEY
});

try {
  const res = await client.sms.send({
    recipients: ["+254712345678"],
    body: "Hello from StackVerify!"
  });

  console.log("SMS sent:", res);
} catch (err) {
  console.error("Failed to send SMS:", err);
}
```

---

## API Keys

The SDK supports two modes based on your API key prefix:

| Key Prefix | Mode | Base URL | Header | Best For |
|-----------|------|----------|--------|----------|
| `sk_live_` | StackVerify Cloud | `https://stackverify.site/api/v1` | `Authorization: Bearer` | Official production SMS API |
| `sv_live_` | Mobile App Gateway | `https://gateway.stackverify.site` | `X-API-Key` | Low-budget mobile app SMS |

No manual configuration — the SDK detects the key type automatically.

### StackVerify Cloud (`sk_live_*`) — Official SMS API

For the official StackVerify cloud SMS service, visit [stackverify.site](https://stackverify.site). Use `sk_live_*` keys for production web and server apps:

```ts
const client = new StackVerify({
  apiKey: "sk_live_your_cloud_api_key"
});
```

### Mobile App Gateway (`sv_live_*`) — Low Budget SMS

If your budget is low, use the StackVerify mobile app gateway at [gateway.stackverify.site](https://gateway.stackverify.site). Use `sv_live_*` keys for mobile app SMS:

```ts
const client = new StackVerify({
  apiKey: "sv_live_01a3********************24b4"
});
```

---

## Send SMS

### Basic SMS

```ts
const res = await client.sms.send({
  recipients: ["+1234567890"],
  body: "Your verification code is 123456"
});

console.log(res.message); // success message
```

### With Custom Sender ID

```ts
const res = await client.sms.send({
  recipients: ["+1234567890", "+0987654321"],
  body: "Bulk notification message",
  sender_id: "MYAPP"
});
```

### API Reference

```ts
client.sms.send(params: SendSMSParams): Promise<SendSMSResponse>
```

| Parameter  | Type     | Required | Description |
|-----------|----------|----------|-------------|
| recipients | `string[]` | Yes | Phone numbers in international format (E.164) |
| body | `string` | Yes | SMS content to send |
| sender_id | `string` | No | Custom sender ID (default: `"SMS"`) |

### Response

```ts
{
  message: string;
  data?: unknown;
}
```

---

## Configuration

```ts
const client = new StackVerify({
  apiKey: "sk_live_your_api_key",
  timeout: 10000,  // request timeout in ms (default: 10000)
  retries: 2       // retry attempts on failure (default: 2)
});
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `apiKey` | `string` | required | Your StackVerify API key |
| `timeout` | `number` | `10000` | Request timeout in milliseconds |
| `retries` | `number` | `2` | Number of retry attempts with exponential backoff |

---

## TypeScript

Full TypeScript support with type definitions included.

```ts
import { StackVerify, StackVerifyError } from "stackverify-sms";
import type { SendSMSParams, SendSMSResponse } from "stackverify-sms";

const client = new StackVerify({
  apiKey: process.env.STACKVERIFY_KEY!,
  timeout: 5000,
  retries: 3
});

async function sendOTP(phone: string, code: string): Promise<void> {
  try {
    const response: SendSMSResponse = await client.sms.send({
      recipients: [phone],
      body: `Your OTP code is: ${code}`,
      sender_id: "AUTH"
    });

    console.log("OTP sent:", response);
  } catch (error) {
    if (error instanceof StackVerifyError) {
      console.error(`SMS failed [${error.status}]: ${error.message}`);
    }
  }
}

sendOTP("+254712345678", "482901");
```

### Available Types

```ts
import type {
  StackVerifyConfig,   // Client constructor options
  SendSMSParams,       // SMS send parameters
  SendSMSResponse,     // SMS send response
  StackVerifyError     // Error class
} from "stackverify-sms";
```

---

## Error Handling

The SDK throws structured `StackVerifyError` instances for API failures.

```ts
import { StackVerify, StackVerifyError } from "stackverify-sms";

const client = new StackVerify({ apiKey: "sk_live_your_key" });

try {
  await client.sms.send({
    recipients: ["+1234567890"],
    body: "Test"
  });
} catch (error) {
  if (error instanceof StackVerifyError) {
    console.error("Status:", error.status);       // HTTP status code
    console.error("Message:", error.message);      // Error message
    console.error("Code:", error.code);            // Error code
    console.error("Request ID:", error.requestId); // Unique request ID
  }
}
```

### Retry Behavior

Failed requests are retried automatically with exponential backoff:

- Attempt 1: immediate
- Attempt 2: 200ms delay
- Attempt 3: 400ms delay
- And so on...

Configure retries with the `retries` option:

```ts
const client = new StackVerify({
  apiKey: "sk_live_your_key",
  retries: 3 // retry up to 3 times
});
```

---

## Use Cases

### OTP & Two-Factor Authentication

```ts
await client.sms.send({
  recipients: ["+254712345678"],
  body: `Your verification code is ${otp}. It expires in 5 minutes.`
});
```

### Transactional Notifications

```ts
await client.sms.send({
  recipients: ["+254712345678"],
  body: `Order #12345 confirmed. Total: $99.99. Track at example.com/track`
});
```

### Marketing & Promotions

```ts
await client.sms.send({
  recipients: ["+254712345678", "+0987654321"],
  body: "Flash sale! 50% off everything today only. Shop now: example.com/sale",
  sender_id: "SALE"
});
```

### Appointment Reminders

```ts
await client.sms.send({
  recipients: ["+254712345678"],
  body: "Reminder: You have an appointment tomorrow at 10:00 AM. Reply CONFIRM to confirm."
});
```

### Multi-Recipient Bulk SMS

```ts
await client.sms.send({
  recipients: [
    "+254712345678",
    "+0987654321",
    "+1122334455"
  ],
  body: "System maintenance scheduled for Saturday 2:00 AM - 4:00 AM UTC."
});
```

---

## Free Credits

Every developer gets:

- **20 free SMS** every month
- **Bonus SMS** when you share StackVerify with your community
- No credit card required to start

| Need | Visit |
|------|-------|
| Official cloud SMS API | [stackverify.site](https://stackverify.site) |
| Low-budget mobile app SMS | [gateway.stackverify.site](https://gateway.stackverify.site) |

---

## Security Best Practices

1. **Store API keys in environment variables** — never hardcode keys in source code
2. **Use `.env` files locally** — add `.env` to `.gitignore`
3. **Never expose keys in frontend code** — keep API calls server-side only
4. **Rotate keys periodically** — regenerate keys from your dashboard regularly
5. **Use separate keys per environment** — different keys for development and production

```bash
# .env
STACKVERIFY_KEY=sk_live_your_api_key_here
STACKVERIFY_MOBILE_KEY=sv_live_your_mobile_key_here
```

```js
const client = new StackVerify({
  apiKey: process.env.STACKVERIFY_KEY
});
```

---

## FAQ

### How do I get an API key?

- **Official cloud SMS**: Sign up at [stackverify.site](https://stackverify.site) and copy your `sk_live_*` key from the dashboard.
- **Low-budget mobile SMS**: Visit [gateway.stackverify.site](https://gateway.stackverify.site) and get your `sv_live_*` key.

### Which key should I use?

| Your situation | Key prefix | Where to get it |
|---------------|------------|-----------------|
| Production web/server app | `sk_live_` | [stackverify.site](https://stackverify.site) |
| Low budget / mobile app | `sv_live_` | [gateway.stackverify.site](https://gateway.stackverify.site) |

### What phone number format should I use?

Use international format (E.164): `+` followed by country code and number. Example: `+254712345678` for Kenya, `+14155552671` for US.

### Can I send to multiple numbers at once?

Yes. Pass an array of phone numbers to the `recipients` field:

```ts
await client.sms.send({
  recipients: ["+254712345678", "+0987654321"],
  body: "Broadcast message"
});
```

### What is a sender ID?

A sender ID is the name or number that appears as the sender of the SMS. The default is `"SMS"`. You can set a custom sender ID with the `sender_id` parameter.

### Does this work with Next.js, Express, or other frameworks?

Yes. The SDK works in any Node.js environment — Express, Fastify, Next.js API routes, NestJS, Koa, and more.

### Is there a free tier?

Yes. You get 20 free SMS per month with no credit card required.

---

## Production Ready

| Feature | Status |
|---------|--------|
| Automatic retries | Exponential backoff on failures |
| Request timeouts | Configurable per-request |
| Error handling | Structured error classes with status codes |
| TypeScript | Full type definitions included |
| Module support | CommonJS and ESM |
| API key detection | Auto cloud vs mobile gateway |
| Zero dependencies | Lightweight, no runtime bloat |

---

## Related Packages

### StackVerify Ecosystem

| Package | Platform | Install |
|---------|----------|---------|
| [stackverify-sms](https://www.npmjs.com/package/stackverify-sms) | Node.js | `npm install stackverify-sms` |
| stackverify-sms (tgz) | Node.js (local) | `npm install @stackverify-sms-1.0.0.tgz` |
| stackverify/forms | PHP | `composer require stackverify/forms` |

### Alternatives

- [twilio](https://www.npmjs.com/package/twilio) — Twilio SMS SDK
- [nexmo](https://www.npmjs.com/package/nexmo) — Vonage SMS SDK
- [africastalking](https://www.npmjs.com/package/africastalking) — Africa's Talking SMS SDK

---

## Contributing

Contributions are welcome. Please open an issue or pull request on [GitHub](https://github.com/stackmorgan/stackverify-sms).

---

## Changelog

### 1.0.0

- Initial release
- SMS send API
- TypeScript support with exported types
- CommonJS and ESM modules
- Automatic retries with exponential backoff
- Configurable request timeouts
- Cloud (`sk_live_*`) and mobile gateway (`sv_live_*`) auto-detection
- Structured error handling with `StackVerifyError`
- Zero runtime dependencies

---

## Support

- Website: [https://stackverify.site](https://stackverify.site)
- Email: [support@stackverify.site](mailto:support@stackverify.site)
- GitHub: [https://github.com/stackmorgan/stackverify-sms](https://github.com/stackmorgan/stackverify-sms)
- npm: [https://www.npmjs.com/package/stackverify-sms](https://www.npmjs.com/package/stackverify-sms)

---

## License

MIT
