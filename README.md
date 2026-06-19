# Mailpulse SDK

Official JavaScript/TypeScript SDK for [Mailpulse](https://mailpulse-io.lyten.agency) - Email tracking and analytics.

[![npm version](https://img.shields.io/npm/v/mailpulse.svg)](https://www.npmjs.com/package/mailpulse)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Installation

```bash
npm install mailpulse
# or
pnpm add mailpulse
# or
yarn add mailpulse
```

## Quick Start

### Basic Usage

```typescript
import { MailpulseClient } from 'mailpulse';

const client = new MailpulseClient({
  apiKey: 'your-api-key',
  apiUrl: 'https://mailpulse-io.lyten.agency', // optional, defaults to this
});

// Register an email for tracking
const result = await client.registerEmail({
  htmlContent: '<html><body>Hello <a href="https://example.com">Click here</a></body></html>',
  recipient: 'user@example.com',
  subject: 'Welcome!',
  campaignId: 'welcome-campaign', // optional
  metadata: { userId: '123' }, // optional
});

// result.html is ready to send as-is: tracking links + open pixel already injected.
// Send it with your own provider (Resend, SES, Nodemailer, ...).
console.log(result.html);            // ready-to-send tracked HTML
console.log(result.emailTrackingId); // unique tracking ID
```

## Framework Integrations

### React

```tsx
import { MailpulseProvider, useRegisterEmail } from 'mailpulse/react';

// Wrap your app
function App() {
  return (
    <MailpulseProvider apiKey="your-api-key">
      <EmailComposer />
    </MailpulseProvider>
  );
}

// Use in components
function EmailComposer() {
  const { registerEmail, isLoading } = useRegisterEmail();

  const handleSend = async () => {
    const result = await registerEmail({
      htmlContent: emailHtml,
      recipient: 'user@example.com',
      subject: 'Hello!',
    });
    // Send result.html via your email service (tracking already injected)
  };

  return <button onClick={handleSend}>Send with Tracking</button>;
}
```

### Vue

```vue
<script setup>
import { provideMailpulse, useRegisterEmail } from 'mailpulse/vue';

provideMailpulse({ apiKey: 'your-api-key' });

const { registerEmail, isLoading, error } = useRegisterEmail();

const sendEmail = async () => {
  const result = await registerEmail({
    htmlContent: emailHtml,
    recipient: 'user@example.com',
    subject: 'Hello!',
  });
  // Send result.html via your email service (tracking already injected)
};
</script>
```

## API Reference

### `MailpulseClient`

#### Constructor Options

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `apiKey` | `string` | Yes | Your Mailpulse API key |
| `apiUrl` | `string` | No | API base URL (default: `https://mailpulse-io.lyten.agency`) |

#### Methods

##### `registerEmail(options)`

Registers an email for tracking and returns the ready-to-send HTML, with tracking links rewritten and the open pixel already injected.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `htmlContent` | `string` | Yes | The HTML content of your email |
| `recipient` | `string` | Yes | Recipient email address |
| `subject` | `string` | Yes | Email subject |
| `campaignId` | `string` | No | Campaign ID to group emails |
| `metadata` | `object` | No | Additional metadata |

**Returns:**

```typescript
{
  emailTrackingId: string;  // Unique tracking ID for the email
  html: string;             // Ready-to-send HTML (tracking links + open pixel injected)
  links: Array<{            // The links that were rewritten
    originalUrl: string;
    trackingId: string;
    trackingUrl: string;
  }>;
  pixelUrl: string;         // Open-tracking pixel URL (already embedded in `html`)
  badgeHtml?: string;       // "Email analytics by Mailpulse" badge (free plans only)
}
```

## Getting Your API Key

1. Go to [mailpulse-io.lyten.agency](https://mailpulse-io.lyten.agency)
2. Create an account or sign in
3. Navigate to **Settings** → **API Keys**
4. Create a new API key

## Documentation

For full documentation, visit [mailpulse-io.lyten.agency/docs/sdk](https://mailpulse-io.lyten.agency/docs/sdk)

## License

MIT © [Lyten Agency](https://lyten.agency)
