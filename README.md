# StackVerify SMS SDK

[![npm version](https://img.shields.io/npm/v/stackverify-sms.svg)](https://www.npmjs.com/package/stackverify-sms)
[![npm downloads](https://img.shields.io/npm/dm/stackverify-sms.svg)](https://www.npmjs.com/package/stackverify-sms)
[![Node.js Version](https://img.shields.io/node/v/stackverify-sms.svg)](https://nodejs.org/)
[![License](https://img.shields.io/npm/l/stackverify-sms.svg)](LICENSE)

Official Node.js SDK for the StackVerify SMS API.

Simple. Fast. Reliable.

---

## Why StackVerify

- Fast SMS delivery
- Clean REST API
- Production-ready Node SDK
- Automatic retries and timeouts
- Fully typed for TypeScript
- 20 free SMS every month
- More sharing = more free SMS credits

Start sending SMS in minutes.

Get your API key at:

https://stackverify.site

---

## Free Developer Credits

Every developer integrating the StackVerify SDK receives:

- 20 free SMS every month
- Increased free SMS allocation when you share StackVerify

No credit card required to start.

---

## Installation

```bash
npm install stackverify-sms
```

Requirements:

- Node.js 18 or higher

---

## Quick Start

### CommonJS

```js
// test.cjs
const { StackVerify } = require("stackverify-sms");

const client = new StackVerify({
  apiKey: "sk_live_your_api_key_here",
  timeout: 20000 // 20 seconds
});

(async () => {
  try {
    const res = await client.sms.send({
      recipients: ["+254712345678"],
      body: "Hello from StackVerify!",
      sender_id: "SMS" // optional, default is "SMS"
    });

    console.log("SMS sent:", res);
  } catch (err) {
    console.error("Request failed. Possibly network timeout or server issue:", err);
  }
})();
```

---

### ESM

```js
// test.mjs
import { StackVerify } from "stackverify-sms";

const client = new StackVerify({
  apiKey: process.env.STACKVERIFY_KEY,
  timeout: 20000 // 20 seconds
});

try {
  const res = await client.sms.send({
    recipients: ["+254712345678"],
    body: "Hello from StackVerify!",
    sender_id: "SMS" // optional, default is "SMS"
  });

  console.log("SMS sent:", res);
} catch (err) {
  console.error("Request failed. Possibly network timeout or server issue:", err);
}
```

---

## TypeScript Example

Fully typed SDK with IntelliSense support.

```ts
import { StackVerify, StackVerifyError } from "stackverify-sms";

const client = new StackVerify({
  apiKey: process.env.STACKVERIFY_KEY!,
  timeout: 5000,
  retries: 3
});

async function sendSMS(): Promise<void> {
  try {
    const response = await client.sms.send({
      recipients: ["+254712345678"],
      body: "TypeScript SMS example",
      sender_id: "MYAPP"
    });

    console.log("Success:", response);
  } catch (error) {
    if (error instanceof StackVerifyError) {
      console.error("Status:", error.status);
      console.error("Message:", error.message);
    }
  }
}

sendSMS();
```

---

## Sending SMS

```ts
client.sms.send({
  recipients: string[],
  body: string,
  sender_id?: string
});
```

### Parameters

| Field       | Type      | Required | Description |
|------------|----------|----------|------------|
| recipients | string[] | Yes      | Phone numbers in international format |
| body       | string   | Yes      | SMS content |
| sender_id  | string   | No       | Custom sender ID |

---

## Default Sender ID

If `sender_id` is not provided, the default sender ID is:

```
SMS
```

---

## Configuration Options

```ts
const client = new StackVerify({
  apiKey: "sk_live_your_api_key",
  timeout: 10000, // default 10000ms
  retries: 2      // default 2 retries
});
```

---

## Error Handling

The SDK throws `StackVerifyError` for API failures.

```ts
try {
  await client.sms.send({
    recipients: ["+254712345678"],
    body: "Test"
  });
} catch (error) {
  console.error(error);
}
```

---

## Security Best Practices

- Store your API key in environment variables
- Do not expose your API key in frontend applications
- Rotate your API keys periodically

---

## Growth Program

We reward developers who build with StackVerify.

- Start with 20 free SMS monthly
- Share StackVerify with your community
- Get increased monthly free SMS allocation

Contact support through your dashboard to increase your limits.

---

## Production Ready

This SDK includes:

- Automatic retry with exponential backoff
- Request timeout handling
- Structured error classes
- CommonJS and ESM compatibility
- TypeScript declarations

Built for real-world production usage.

---

## Support

Website: https://stackverify.site  
Email: support@stackverify.site  

---

## License

MIT
