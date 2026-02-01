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
  baseUrl: 'https://mailpulse-io.lyten.agency', // optional, defaults to this
});

// Track an email
const result = await client.trackEmail({
  htmlContent: '<html><body>Hello <a href="https://example.com">Click here</a></body></html>',
  recipient: 'user@example.com',
  subject: 'Welcome!',
  campaignId: 'welcome-campaign', // optional
  metadata: { userId: '123' }, // optional
});

console.log(result.modifiedHtml); // HTML with tracking pixel and tracked links
console.log(result.trackingId);   // Unique tracking ID
```

## Framework Integrations

### React

```tsx
import { MailpulseProvider, useMailpulse } from 'mailpulse/react';

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
  const { trackEmail, isLoading } = useMailpulse();

  const handleSend = async () => {
    const result = await trackEmail({
      htmlContent: emailHtml,
      recipient: 'user@example.com',
      subject: 'Hello!',
    });
    // Send result.modifiedHtml via your email service
  };

  return <button onClick={handleSend}>Send with Tracking</button>;
}
```

### Vue

```vue
<script setup>
import { useMailpulse } from 'mailpulse/vue';

const { trackEmail, isLoading, error } = useMailpulse({
  apiKey: 'your-api-key',
});

const sendEmail = async () => {
  const result = await trackEmail({
    htmlContent: emailHtml,
    recipient: 'user@example.com',
    subject: 'Hello!',
  });
  // Send result.modifiedHtml via your email service
};
</script>
```

## API Reference

### `MailpulseClient`

#### Constructor Options

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `apiKey` | `string` | Yes | Your Mailpulse API key |
| `baseUrl` | `string` | No | API base URL (default: `https://mailpulse-io.lyten.agency`) |

#### Methods

##### `trackEmail(options)`

Adds tracking to an email and returns the modified HTML.

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
  modifiedHtml: string;  // HTML with tracking
  trackingId: string;    // Unique tracking ID
  recipient: string;     // Recipient email
  subject: string;       // Email subject
  linksTracked: number;  // Number of links tracked
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
