---
title: License
updated: 2026-08-15
version: 1.0
---
# License

**Version 1.0 — August 15, 2026**

## Dual licensing model

Prometheus Code uses a dual licensing model:

- **Source code**: licensed under the [MIT License](https://github.com/andrexp31/prometheus-code-desktop/blob/main/LICENSE.txt) on GitHub.
- **Commercial binary**: distributed under the 2-Heads Software Solutions End User License Agreement (EULA).

## Product license

Prometheus Code is a **one-time payment** product. Purchasing a license grants you the right to use Prometheus Code on **one device**, perpetually. There are no subscriptions, no locked features, and no account is required once the product is activated.

## What the license includes

- Install and use Prometheus Code on one device.
- Access updates included with the purchase.
- Reinstall on the same device; the previous activation is replaced automatically.

## Restrictions

- Distributing the compiled binary is not allowed.
- Sharing the same license across multiple devices is not allowed.
- Reselling, renting or sublicensing the product is not allowed.
- Reverse engineering of proprietary components is not allowed.
- Using the "Prometheus Code" name, logos, or brand identity in forks of the MIT code is not allowed.

## Forking

The MIT-licensed source code can be freely forked, modified, and redistributed. However, forks:

- Must NOT use the "Prometheus Code" name, logos, trademarks, or any brand identity element.
- Must NOT include or redistribute proprietary components (brand assets, license validation module).
- Must NOT access Prometheus Code's license activation servers.
- Are NOT entitled to technical support or automatic updates.

## Proprietary components

The following files are NOT licensed under MIT and are governed exclusively by the commercial EULA:

1. **Brand identity**: `product.json`, `resources/**` (logos, icons, splash screens)
2. **License validation module** (when implemented): `src/vs/platform/prometheusLicense/**`
3. **Commercial build pipeline** (when implemented): `build/prometheus/**`

All other files — including all source code, agent catalog utilities, template management, and AI integration — remain MIT-licensed.

## Agent catalog

The 423 specialized agents available in Prometheus Code are sourced from the public GitHub repository [davila7/claude-code-templates](https://github.com/davila7/claude-code-templates) and are **NOT owned by** 2-Heads Software Solutions. The curation, integration, and user experience within Prometheus Code is a commercial feature, but the agent definitions themselves remain under their original license.

## MIT

The full MIT license text for the source code is available in the [project repository](https://github.com/andrexp31/prometheus-code-desktop/blob/main/LICENSE.txt).

## Full EULA

The full End User License Agreement is available at:

- [EULA.md (English)](https://github.com/andrexp31/prometheus-code-desktop/blob/main/EULA.md)
- [EULA.es.md (Spanish)](https://github.com/andrexp31/prometheus-code-desktop/blob/main/EULA.es.md)
- [COMMERCIAL_LICENSE.md](https://github.com/andrexp31/prometheus-code-desktop/blob/main/COMMERCIAL_LICENSE.md)

## Contact

For licensing inquiries: **2-heads.comsoftware@gmail.com**

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-08-15 | Initial version with formal EULA, dual model, and precise proprietary components list |
