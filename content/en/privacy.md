---
title: Privacy policy
updated: 2026-08-15
version: 1.0
---
# Privacy policy

**Version 1.0 — August 15, 2026**

## No telemetry

Prometheus Code does not send usage data, errors or crash reports to 2-Heads Software Solutions servers. Product telemetry is **disabled by default** on every installation and cannot be re-enabled without explicit user action.

## Data that stays on your device

The following data is stored **locally** on your device and is never transmitted to 2-Heads Software Solutions:

- Chat history and conversation memory
- AI agent session history
- User preferences and settings
- API keys (stored in the operating system's secure keyring/secret storage)

**Local models** (e.g., llama.cpp) run entirely on your machine. The content of your conversations is not sent to any server.

## Remote models

If you choose to use remote models (OpenAI, Anthropic, Google Gemini), your prompts and responses are transmitted to the selected provider's servers and are subject to their privacy policy:

| Provider | Privacy policy |
|----------|---------------|
| OpenAI | https://openai.com/privacy |
| Anthropic | https://www.anthropic.com/legal/privacy |
| Google Gemini | https://policies.google.com/privacy |

Prometheus Code displays a **consent dialog** the first time you configure a remote model, informing you that data will leave your device. 2-Heads Software Solutions does not retain or process those messages.

## API keys

API keys are stored in the system secure storage (keyring/secret storage). Prometheus Code does not transmit your keys outside your device, except to authenticate the call to the selected provider.

## License activation

License activation uses GitHub authentication and a **Hardware ID** derived from the device.

### Hardware ID

The Hardware ID is a **non-reversible cryptographic hash** generated from non-personal hardware identifiers (CPU model, motherboard serial number). It is used solely for:

- License activation
- Fraud prevention (one license = one device)

**Not collected or stored**: biometric data, personally identifiable information (PII), behavioral data, or information about your files or projects.

### Data transmitted during activation

The only data transmitted to 2-Heads Software Solutions servers during activation is:

- Hardware ID (non-reversible hash — no PII)
- GitHub OAuth token (user ID and public email, used solely for license verification)

## Subprocessors

| Provider | Service | Data accessed |
|----------|---------|---------------|
| OpenAI | Remote models (GPT) | Prompts and responses |
| Anthropic | Remote models (Claude) | Prompts and responses |
| Google | Remote models (Gemini) | Prompts and responses |
| GitHub | OAuth for license | GitHub user ID, public email |
| Cloudflare | Site and docs hosting | IP, access logs |

## Website

The documentation site only stores a language preference. It does not use analytics, third-party cookies or tracking mechanisms.

## User rights

You can exercise your privacy rights (access, rectification, erasure, portability, objection) by contacting **2-heads.comsoftware@gmail.com**. In particular, you can request:

- Deletion of your license activation record from our servers (right to be forgotten)
- Information about what personal data we have stored about you
- Correction of inaccurate data

## Minors

Prometheus Code is not intended for children under 13. We do not knowingly collect information from children.

## Changes to this policy

2-Heads Software Solutions may modify this policy at any time. Users will be notified of material changes through the Software or the official website. The effective date and version are updated at the bottom of this document.

## Contact

For privacy inquiries: **2-heads.comsoftware@gmail.com**

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-08-15 | Formal version with Hardware ID, subprocessors, user rights, and minors |
