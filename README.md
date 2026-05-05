# NetDash Card

Network device link dashboard for Home Assistant. Groups your management GUIs by VLAN with brand-colored icons, search, filtering, and one-click access.

![NetDash](https://img.shields.io/badge/HA-2024.1+-blue) ![HACS](https://img.shields.io/badge/HACS-Custom-orange)

## Features

- Group devices by VLAN with configurable labels, colors, and icons
- Per-device icon, color, link, IP, type badge, and description
- HTTP/HTTPS protocol indicator on each card
- Click IP to copy to clipboard
- Real-time search across names, IPs, types, descriptions
- VLAN filter tabs with device counts
- Stats bar (total devices, types, HTTP/HTTPS split, VLAN count)
- Fully responsive — single column on mobile
- Respects `prefers-reduced-motion`
- Dark ops-center aesthetic with dot grid and accent stripes

## Installation

### 1. Add this repository to HACS

HACS → Integrations → Three-dot menu → Custom repositories →  
Add: `https://github.com/mZ738/NetDash` → Category: **Frontend**

### 2. Download

HACS → Frontend → NetDash → Download

### 3. Add Lovelace resource

**Settings → Dashboards → Three-dot menu → Resources → Add resource**

- URL: `/hacsfiles/netdash/netdash.js`
- Type: `JavaScript Module`

**Restart Home Assistant** (or reload browser with Ctrl+Shift+R).

### 4. Add to dashboard

Edit any dashboard → Add card → Manual (YAML):

```yaml
type: custom:netdash
