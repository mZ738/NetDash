import { LitElement, html, css, nothing } from 'lit';

class NetDashCard extends LitElement {

  static get properties() {
    return {
      _config: { state: true },
      _search: { state: true },
      _filter: { state: true }
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        background: #080c14;
        border-radius: 12px;
        overflow: hidden;
        font-family: 'Space Grotesk', system-ui, -apple-system, sans-serif;
        color: #f1f5f9;
        --nd-card: #111827;
        --nd-card-hover: #172033;
        --nd-border: #1e293b;
        --nd-border-hover: #334155;
        --nd-fg: #f1f5f9;
        --nd-muted: #94a3b8;
        --nd-dim: #4b5e78;
        --nd-green: #10b981;
        --nd-amber: #f59e0b;
        --nd-rose: #e11d48;
      }

      /* ── Dot grid background ── */
      .nd-wrap {
        position: relative;
        padding: 20px;
      }
      .nd-wrap::before {
        content: '';
        position: absolute;
        inset: 0;
        background-image: radial-gradient(circle, rgba(30,41,59,0.35) 1px, transparent 1px);
        background-size: 28px 28px;
        pointer-events: none;
      }

      /* ── Header ── */
      .nd-hdr {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 14px;
        gap: 12px;
        flex-wrap: wrap;
        position: relative;
      }
      .nd-hdr-left {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .nd-logo {
        width: 32px; height: 32px;
        border-radius: 8px;
        background: linear-gradient(135deg, var(--nd-green), #059669);
        display: flex; align-items: center; justify-content: center;
        color: #fff;
        --mdi-icon-size: 14px;
      }
      .nd-title { font-size: 15px; font-weight: 700; letter-spacing: -0.01em; }
      .nd-sub { font-size: 11px; color: var(--nd-dim); }

      /* ── Search ── */
      .nd-search-box { position: relative; flex: 0 1 300px; }
      .nd-search-box ha-icon {
        position: absolute; left: 10px; top: 50%; transform: translateY(-50%);
        color: var(--nd-dim); --mdi-icon-size: 14px; pointer-events: none;
      }
      .nd-search-input {
        width: 100%;
        background: var(--nd-card);
        border: 1px solid var(--nd-border);
        border-radius: 8px;
        padding: 7px 12px 7px 32px;
        color: var(--nd-fg);
        font-family: inherit; font-size: 13px; outline: none;
        transition: border-color .2s, box-shadow .2s;
      }
      .nd-search-input::placeholder { color: var(--nd-dim); }
      .nd-search-input:focus {
        border-color: var(--nd-green);
        box-shadow: 0 0 0 3px rgba(16,185,129,0.12);
      }

      /* ── Filter tabs ── */
      .nd-filters {
        display: flex; gap: 6px; margin-bottom: 14px;
        overflow-x: auto; position: relative; padding-bottom: 2px;
      }
      .nd-filters::-webkit-scrollbar { display: none; }
      .nd-filters { -ms-overflow-style: none; scrollbar-width: none; }
      .nd-ftab {
        padding: 5px 12px; border-radius: 6px; font-size: 12px;
        font-weight: 500; cursor: pointer; border: 1px solid transparent;
        background: transparent; color: var(--nd-muted);
        white-space: nowrap; user-select: none; transition: all .2s;
        display: flex; align-items: center; gap: 5px; font-family: inherit;
      }
      .nd-ftab:hover { color: var(--nd-fg); background: var(--nd-card); }
      .nd-ftab.on { background: var(--nd-card); border-color: var(--nd-border); color: var(--nd-fg); }
      .nd-fdot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
      .nd-fcnt {
        font-size: 10px; padding: 1px 5px; border-radius: 4px;
        background: var(--nd-border);
        font-family: 'JetBrains Mono','Roboto Mono',monospace;
      }
      .nd-ftab.on .nd-fcnt { background: var(--nd-border-hover); }

      /* ── Stats bar ── */
      .nd-stats {
        display: flex; gap: 8px; margin-bottom: 20px;
        flex-wrap: wrap; position: relative;
      }
      .nd-st {
        background: var(--nd-card); border: 1px solid var(--nd-border);
        border-radius: 7px; padding: 8px 14px;
        display: flex; align-items: center; gap: 8px; font-size: 12px;
      }
      .nd-st ha-icon { --mdi-icon-size: 14px; }
      .nd-st-v {
        font-family: 'JetBrains Mono','Roboto Mono',monospace;
        font-weight: 700; font-size: 16px;
      }
      .nd-st-l { color: var(--nd-dim); font-size: 10px; }

      /* ── VLAN section ── */
      .nd-vlan { margin-bottom: 24px; position: relative; }
      .nd-vlan-hdr {
        display: flex; align-items: center; gap: 8px;
        margin-bottom: 12px; padding-bottom: 8px;
        border-bottom: 1px solid var(--nd-border);
      }
      .nd-vpulse {
        width: 7px; height: 7px; border-radius: 50%;
        animation: ndPulse 2.5s ease-in-out infinite;
      }
      @keyframes ndPulse { 0%,100%{opacity:1} 50%{opacity:.35} }
      .nd-vlabel {
        font-weight: 600; font-size: 14px;
        display: flex; align-items: center; gap: 7px;
      }
      .nd-vlabel ha-icon { --mdi-icon-size: 13px; }
      .nd-vdesc {
        font-size: 10px; color: var(--nd-dim);
        font-family: 'JetBrains Mono','Roboto Mono',monospace;
      }
      .nd-vcnt {
        font-size: 11px; color: var(--nd-dim); margin-left: auto;
        font-family: 'JetBrains Mono','Roboto Mono',monospace;
      }

      /* ── Device grid ── */
      .nd-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
        gap: 8px;
      }

      /* ── Device card ── */
      .nd-dev {
        background: var(--nd-card);
        border: 1px solid var(--nd-border);
        border-radius: 10px;
        padding: 12px 14px;
        cursor: pointer;
        transition: all .2s ease;
        position: relative; overflow: hidden;
        display: flex; align-items: flex-start; gap: 12px;
        animation: ndIn .3s ease both;
      }
      .nd-dev::before {
        content: '';
        position: absolute; top: 0; left: 0;
        width: 3px; height: 100%;
        background: var(--nd-accent, #64748b);
        transition: width .2s;
      }
      .nd-dev:hover {
        background: var(--nd-card-hover);
        border-color: var(--nd-border-hover);
        transform: translateY(-1px);
      }
      .nd-dev:hover::before { width: 4px; }
      .nd-dev:focus-visible { outline: 2px solid var(--nd-green); outline-offset: 2px; }
      @keyframes ndIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }

      .nd-dicon {
        width: 40px; height: 40px; border-radius: 8px;
        display: flex; align-items: center; justify-content: center;
        flex-shrink: 0; transition: transform .2s;
        --mdi-icon-size: 18px;
      }
      .nd-dev:hover .nd-dicon { transform: scale(1.05); }

      .nd-dinfo { flex: 1; min-width: 0; }
      .nd-dname-row {
        display: flex; align-items: center; gap: 5px; margin-bottom: 3px;
      }
      .nd-dname {
        font-weight: 600; font-size: 13px;
        white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      }
      .nd-darrow {
        opacity: 0; transition: opacity .2s, transform .2s;
        transform: translateX(-3px); color: var(--nd-dim);
        --mdi-icon-size: 11px; flex-shrink: 0;
      }
      .nd-dev:hover .nd-darrow { opacity: 1; transform: translateX(0); }

      .nd-badges { display: flex; align-items: center; gap: 5px; flex-wrap: wrap; margin-bottom: 3px; }
      .nd-badge {
        font-size: 9px; padding: 1px 6px; border-radius: 4px;
        font-weight: 600; letter-spacing: .3px; text-transform: uppercase;
      }
      .nd-badge-http  { background: rgba(245,158,11,.12); color: #f59e0b; }
      .nd-badge-https { background: rgba(16,185,129,.12); color: #10b981; }

      .nd-ip-row { display: flex; align-items: center; gap: 5px; margin-bottom: 2px; }
      .nd-ip {
        font-family: 'JetBrains Mono','Roboto Mono',monospace;
        font-size: 11px; color: var(--nd-muted); cursor: pointer;
      }
      .nd-cpbtn {
        opacity: 0; cursor: pointer; color: var(--nd-dim);
        transition: opacity .15s; --mdi-icon-size: 11px;
      }
      .nd-dev:hover .nd-cpbtn { opacity: 1; }
      .nd-cpbtn:hover { color: var(--nd-muted); }

      .nd-ddesc {
        font-size: 10px; color: var(--nd-dim);
        white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      }

      /* ── Toast ── */
      .nd-toast {
        position: fixed; bottom: 16px; right: 16px;
        background: #0f1623; border: 1px solid var(--nd-border);
        border-radius: 8px; padding: 8px 16px; font-size: 12px;
        color: var(--nd-fg); display: flex; align-items: center; gap: 7px;
        z-index: 9999; box-shadow: 0 8px 30px rgba(0,0,0,.4);
        animation: ndTIn .3s ease, ndTOut .3s ease 2s forwards;
      }
      .nd-toast ha-icon { --mdi-icon-size: 13px; color: var(--nd-green); }
      @keyframes ndTIn  { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
      @keyframes ndTOut { from{opacity:1} to{opacity:0;transform:translateY(10px)} }

      /* ── Empty state ── */
      .nd-empty {
        text-align: center; padding: 40px 20px;
        color: var(--nd-dim); grid-column: 1 / -1;
      }
      .nd-empty ha-icon { --mdi-icon-size: 28px; margin-bottom: 10px; display: block; }

      /* ── Responsive ── */
      @media (max-width: 640px) {
        .nd-grid { grid-template-columns: 1fr; }
        .nd-search-box { flex: 1 1 100%; }
        .nd-stats { gap: 6px; }
        .nd-st { padding: 6px 10px; }
        .nd-st-v { font-size: 14px; }
        .nd-wrap { padding: 14px; }
      }
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
          animation-duration: .01ms !important;
          transition-duration: .01ms !important;
        }
      }
    `;
  }

  constructor() {
    super();
    this._config = null;
    this._search = '';
    this._filter = 'all';
    this._toastTimer = null;
  }

  setConfig(config) {
    if (!config.devices || !Array.isArray(config.devices)) {
      throw new Error('NetDash: "devices" array is required');
    }
    this._config = config;
    this._search = '';
    this._filter = 'all';
  }

  set hass(_hass) { /* No entities needed */ }

  getCardSize() {
    const n = (this._config && this._config.devices) ? this._config.devices.length : 0;
    return Math.max(4, Math.ceil(n / 3) + 3);
  }

  /* ── Helpers ── */

  _hex2rgba(hex, a) {
    if (!hex || hex.length < 7) return 'rgba(100,116,139,' + a + ')';
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
  }

  _vlanColor(id) {
    const vlans = this._config.vlans || [];
    const v = vlans.find(x => x.id === id);
    return v ? v.color : '#64748b';
  }

  _filtered() {
    const devs = this._config.devices || [];
    const q = this._search.toLowerCase().trim();
    return devs.filter(d => {
      if (this._filter !== 'all' && d.vlan !== this._filter) return false;
      if (!q) return true;
      return (d.name || '').toLowerCase().includes(q)
        || (d.ip || '').includes(q)
        || (d.type || '').toLowerCase().includes(q)
        || (d.description || '').toLowerCase().includes(q)
        || (d.vlan || '').toLowerCase().includes(q);
    });
  }

  _grouped(devs) {
    const vlans = this._config.vlans || [];
    const map = {};
    vlans.forEach(v => { map[v.id] = { ...v, devices: [] }; });
    devs.forEach(d => {
      if (!map[d.vlan]) map[d.vlan] = { id: d.vlan, label: d.vlan, color: '#64748b', devices: [] };
      map[d.vlan].devices.push(d);
    });
    return Object.values(map).filter(g => g.devices.length > 0);
  }

  /* ── Events ── */

  _onSearch(e) { this._search = e.target.value; }
  _onFilter(id) { this._filter = id; }

  _open(url) { window.open(url, '_blank', 'noopener,noreferrer'); }

  _copyIP(ip, e) {
    e.stopPropagation();
    e.preventDefault();
    const ok = () => this._toast('Copied ' + ip);
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(ip).then(ok);
    } else {
      const t = document.createElement('textarea');
      t.value = ip;
      t.style.cssText = 'position:fixed;opacity:0;left:-9999px';
      document.body.appendChild(t);
      t.select();
      try { document.execCommand('copy'); ok(); } catch (_) {}
      document.body.removeChild(t);
    }
  }

  _toast(msg) {
    const old = this.shadowRoot.querySelector('.nd-toast');
    if (old) old.remove();
    clearTimeout(this._toastTimer);
    const el = document.createElement('div');
    el.className = 'nd-toast';
    el.innerHTML = '<ha-icon icon="mdi:check-circle"></ha-icon><span>' + msg + '</span>';
    this.shadowRoot.appendChild(el);
    this._toastTimer = setTimeout(() => { if (el.parentNode) el.remove(); }, 2500);
  }

  /* ── Sub-renderers ── */

  _rHeader() {
    const title = this._config.title || 'NetDash';
    const showSearch = this._config.show_search !== false;
    return html`
      <div class="nd-hdr">
        <div class="nd-hdr-left">
          <div class="nd-logo"><ha-icon icon="mdi:lan"></ha-icon></div>
          <div>
            <div class="nd-title">${title}</div>
            <div class="nd-sub">Network Device Dashboard</div>
          </div>
        </div>
        ${showSearch ? html`
          <div class="nd-search-box">
            <ha-icon icon="mdi:magnify"></ha-icon>
            <input type="text" class="nd-search-input"
                   placeholder="Search devices, IPs, types..."
                   @input=${this._onSearch}>
          </div>
        ` : nothing}
      </div>`;
  }

  _rFilters() {
    if (this._config.show_filters === false) return nothing;
    const vlans = this._config.vlans || [];
    const devs = this._config.devices || [];
    return html`
      <div class="nd-filters">
        <button class="nd-ftab ${this._filter === 'all' ? 'on' : ''}"
                @click=${() => this._onFilter('all')}>
          All<span class="nd-fcnt">${devs.length}</span>
        </button>
        ${vlans.map(v => html`
          <button class="nd-ftab ${this._filter === v.id ? 'on' : ''}"
                  @click=${() => this._onFilter(v.id)}>
            <span class="nd-fdot" style="background:${v.color}"></span>
            ${v.label}<span class="nd-fcnt">${devs.filter(d => d.vlan === v.id).length}</span>
          </button>
        `)}
      </div>`;
  }

  _rStats() {
    if (this._config.show_stats === false) return nothing;
    const devs = this._config.devices || [];
    const vlans = this._config.vlans || [];
    const types = new Set(devs.map(d => d.type).filter(Boolean));
    let https = 0, http = 0;
    devs.forEach(d => { (d.url || '').startsWith('https') ? https++ : http++; });
    return html`
      <div class="nd-stats">
        <div class="nd-st">
          <ha-icon icon="mdi:cube-outline" style="color:var(--nd-dim)"></ha-icon>
          <div><div class="nd-st-v">${devs.length}</div><div class="nd-st-l">Devices</div></div>
        </div>
        <div class="nd-st">
          <ha-icon icon="mdi:tag-multiple-outline" style="color:var(--nd-dim)"></ha-icon>
          <div><div class="nd-st-v">${types.size}</div><div class="nd-st-l">Types</div></div>
        </div>
        <div class="nd-st">
          <ha-icon icon="mdi:lock" style="color:var(--nd-green)"></ha-icon>
          <div><div class="nd-st-v" style="color:var(--nd-green)">${https}</div><div class="nd-st-l">HTTPS</div></div>
        </div>
        <div class="nd-st">
          <ha-icon icon="mdi:lock-open-variant-outline" style="color:var(--nd-amber)"></ha-icon>
          <div><div class="nd-st-v" style="color:var(--nd-amber)">${http}</div><div class="nd-st-l">HTTP</div></div>
        </div>
        <div class="nd-st">
          <ha-icon icon="mdi:layers-outline" style="color:var(--nd-rose)"></ha-icon>
          <div><div class="nd-st-v">${vlans.length}</div><div class="nd-st-l">VLANs</div></div>
        </div>
      </div>`;
  }

  _rDevice(d, i) {
    const icon = d.icon || 'mdi:cube';
    const color = d.color || this._vlanColor(d.vlan);
    const vc = this._vlanColor(d.vlan);
    const proto = (d.url || '').startsWith('https') ? 'HTTPS' : 'HTTP';
    const pcls = proto === 'HTTPS' ? 'nd-badge-https' : 'nd-badge-http';
    return html`
      <div class="nd-dev"
           style="--nd-accent:${vc}; animation-delay:${i * 20}ms"
           @click=${() => this._open(d.url)}
           tabindex="0"
           role="link"
           aria-label="Open ${d.name}">
        <div class="nd-dicon" style="background:${this._hex2rgba(color, .12)};color:${color}">
          <ha-icon icon="${icon}"></ha-icon>
        </div>
        <div class="nd-dinfo">
          <div class="nd-dname-row">
            <span class="nd-dname">${d.name}</span>
            <ha-icon icon="mdi:open-in-new" class="nd-darrow"></ha-icon>
          </div>
          <div class="nd-badges">
            <span class="nd-badge" style="background:${this._hex2rgba(vc, .1)};color:${vc}">${d.type || 'Device'}</span>
            <span class="nd-badge ${pcls}">${proto}</span>
          </div>
          ${d.ip ? html`
            <div class="nd-ip-row">
              <span class="nd-ip" @click=${(e) => this._copyIP(d.ip, e)} title="Click to copy">${d.ip}</span>
              <ha-icon icon="mdi:content-copy" class="nd-cpbtn" @click=${(e) => this._copyIP(d.ip, e)}></ha-icon>
            </div>` : nothing}
          ${d.description ? html`<div class="nd-ddesc">${d.description}</div>` : nothing}
        </div>
      </div>`;
  }

  _rVlan(g) {
    return html`
      <div class="nd-vlan">
        <div class="nd-vlan-hdr">
          <div class="nd-vpulse" style="background:${g.color}"></div>
          <div class="nd-vlabel">
            <ha-icon icon="${g.icon || 'mdi:lan'}" style="color:${g.color}"></ha-icon>
            ${g.label}
            <span class="nd-vdesc">${g.description || ''}</span>
          </div>
          <span class="nd-vcnt">${g.devices.length} device${g.devices.length !== 1 ? 's' : ''}</span>
        </div>
        <div class="nd-grid">
          ${g.devices.map((d, i) => this._rDevice(d, i))}
        </div>
      </div>`;
  }

  _rEmpty() {
    return html`
      <div class="nd-grid">
        <div class="nd-empty">
          <ha-icon icon="mdi:magnify"></ha-icon>
          <div style="font-size:14px;font-weight:500;margin-bottom:3px;color:var(--nd-muted)">No devices found</div>
          <div style="font-size:12px">Try adjusting your search or filter</div>
        </div>
      </div>`;
  }

  /* ── Main render ── */

  render() {
    if (!this._config) return nothing;
    const groups = this._grouped(this._filtered());
    return html`
      <div class="nd-wrap">
        ${this._rHeader()}
        ${this._rFilters()}
        ${this._rStats()}
        ${groups.length > 0 ? groups.map(g => this._rVlan(g)) : this._rEmpty()}
      </div>`;
  }
}

customElements.define('netdash-card', NetDashCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'netdash',
  name: 'NetDash',
  description: 'Network device link dashboard with VLAN grouping',
  preview: false,
});