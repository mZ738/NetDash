import { LitElement, html, css, nothing } from 'lit';

/* ═══════════════════════════════════════════════════════════
   NetDash Card
   ═══════════════════════════════════════════════════════════ */
class NetDashCard extends LitElement {

  static get properties() {
    return { _config: { state: true }, _search: { state: true }, _filter: { state: true } };
  }

  static get styles() {
    return css`
      :host { display:block; background:#080c14; border-radius:12px; overflow:hidden;
        font-family:'Space Grotesk',system-ui,-apple-system,sans-serif; color:#f1f5f9;
        --nd-card:#111827; --nd-card-hover:#172033; --nd-border:#1e293b;
        --nd-border-hover:#334155; --nd-fg:#f1f5f9; --nd-muted:#94a3b8;
        --nd-dim:#4b5e78; --nd-green:#10b981; --nd-amber:#f59e0b; --nd-rose:#e11d48; }
      .nd-wrap { position:relative; padding:20px; }
      .nd-wrap::before { content:''; position:absolute; inset:0;
        background-image:radial-gradient(circle,rgba(30,41,59,.35) 1px,transparent 1px);
        background-size:28px 28px; pointer-events:none; }
      .nd-hdr { display:flex; align-items:center; justify-content:space-between;
        margin-bottom:14px; gap:12px; flex-wrap:wrap; position:relative; }
      .nd-hdr-left { display:flex; align-items:center; gap:10px; }
      .nd-logo { width:32px; height:32px; border-radius:8px;
        background:linear-gradient(135deg,var(--nd-green),#059669);
        display:flex; align-items:center; justify-content:center; color:#fff; --mdi-icon-size:14px; }
      .nd-title { font-size:15px; font-weight:700; letter-spacing:-.01em; }
      .nd-sub { font-size:11px; color:var(--nd-dim); }
      .nd-search-box { position:relative; flex:0 1 300px; }
      .nd-search-box ha-icon { position:absolute; left:10px; top:50%; transform:translateY(-50%);
        color:var(--nd-dim); --mdi-icon-size:14px; pointer-events:none; }
      .nd-search-input { width:100%; background:var(--nd-card); border:1px solid var(--nd-border);
        border-radius:8px; padding:7px 12px 7px 32px; color:var(--nd-fg);
        font-family:inherit; font-size:13px; outline:none; transition:border-color .2s,box-shadow .2s; }
      .nd-search-input::placeholder { color:var(--nd-dim); }
      .nd-search-input:focus { border-color:var(--nd-green); box-shadow:0 0 0 3px rgba(16,185,129,.12); }
      .nd-filters { display:flex; gap:6px; margin-bottom:14px; overflow-x:auto;
        position:relative; padding-bottom:2px; }
      .nd-filters::-webkit-scrollbar { display:none; }
      .nd-filters { -ms-overflow-style:none; scrollbar-width:none; }
      .nd-ftab { padding:5px 12px; border-radius:6px; font-size:12px; font-weight:500;
        cursor:pointer; border:1px solid transparent; background:transparent;
        color:var(--nd-muted); white-space:nowrap; user-select:none; transition:all .2s;
        display:flex; align-items:center; gap:5px; font-family:inherit; }
      .nd-ftab:hover { color:var(--nd-fg); background:var(--nd-card); }
      .nd-ftab.on { background:var(--nd-card); border-color:var(--nd-border); color:var(--nd-fg); }
      .nd-fdot { width:7px; height:7px; border-radius:50%; flex-shrink:0; }
      .nd-fcnt { font-size:10px; padding:1px 5px; border-radius:4px; background:var(--nd-border);
        font-family:'JetBrains Mono','Roboto Mono',monospace; }
      .nd-ftab.on .nd-fcnt { background:var(--nd-border-hover); }
      .nd-stats { display:flex; gap:8px; margin-bottom:20px; flex-wrap:wrap; position:relative; }
      .nd-st { background:var(--nd-card); border:1px solid var(--nd-border); border-radius:7px;
        padding:8px 14px; display:flex; align-items:center; gap:8px; font-size:12px; }
      .nd-st ha-icon { --mdi-icon-size:14px; }
      .nd-st-v { font-family:'JetBrains Mono','Roboto Mono',monospace; font-weight:700; font-size:16px; }
      .nd-st-l { color:var(--nd-dim); font-size:10px; }
      .nd-vlan { margin-bottom:24px; position:relative; }
      .nd-vlan-hdr { display:flex; align-items:center; gap:8px; margin-bottom:12px;
        padding-bottom:8px; border-bottom:1px solid var(--nd-border); }
      .nd-vpulse { width:7px; height:7px; border-radius:50%; animation:ndPulse 2.5s ease-in-out infinite; }
      @keyframes ndPulse { 0%,100%{opacity:1} 50%{opacity:.35} }
      .nd-vlabel { font-weight:600; font-size:14px; display:flex; align-items:center; gap:7px; }
      .nd-vlabel ha-icon { --mdi-icon-size:13px; }
      .nd-vdesc { font-size:10px; color:var(--nd-dim); font-family:'JetBrains Mono','Roboto Mono',monospace; }
      .nd-vcnt { font-size:11px; color:var(--nd-dim); margin-left:auto;
        font-family:'JetBrains Mono','Roboto Mono',monospace; }
      .nd-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:8px; }
      .nd-dev { background:var(--nd-card); border:1px solid var(--nd-border); border-radius:10px;
        padding:12px 14px; cursor:pointer; transition:all .2s ease; position:relative;
        overflow:hidden; display:flex; align-items:flex-start; gap:12px; animation:ndIn .3s ease both; }
      .nd-dev::before { content:''; position:absolute; top:0; left:0; width:3px; height:100%;
        background:var(--nd-accent,#64748b); transition:width .2s; }
      .nd-dev:hover { background:var(--nd-card-hover); border-color:var(--nd-border-hover); transform:translateY(-1px); }
      .nd-dev:hover::before { width:4px; }
      .nd-dev:focus-visible { outline:2px solid var(--nd-green); outline-offset:2px; }
      @keyframes ndIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
      .nd-dicon { width:40px; height:40px; border-radius:8px; display:flex; align-items:center;
        justify-content:center; flex-shrink:0; transition:transform .2s; --mdi-icon-size:18px; }
      .nd-dev:hover .nd-dicon { transform:scale(1.05); }
      .nd-dinfo { flex:1; min-width:0; }
      .nd-dname-row { display:flex; align-items:center; gap:5px; margin-bottom:3px; }
      .nd-dname { font-weight:600; font-size:13px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
      .nd-darrow { opacity:0; transition:opacity .2s,transform .2s; transform:translateX(-3px);
        color:var(--nd-dim); --mdi-icon-size:11px; flex-shrink:0; }
      .nd-dev:hover .nd-darrow { opacity:1; transform:translateX(0); }
      .nd-badges { display:flex; align-items:center; gap:5px; flex-wrap:wrap; margin-bottom:3px; }
      .nd-badge { font-size:9px; padding:1px 6px; border-radius:4px; font-weight:600;
        letter-spacing:.3px; text-transform:uppercase; }
      .nd-badge-http { background:rgba(245,158,11,.12); color:#f59e0b; }
      .nd-badge-https { background:rgba(16,185,129,.12); color:#10b981; }
      .nd-ip-row { display:flex; align-items:center; gap:5px; margin-bottom:2px; }
      .nd-ip { font-family:'JetBrains Mono','Roboto Mono',monospace; font-size:11px;
        color:var(--nd-muted); cursor:pointer; }
      .nd-cpbtn { opacity:0; cursor:pointer; color:var(--nd-dim); transition:opacity .15s; --mdi-icon-size:11px; }
      .nd-dev:hover .nd-cpbtn { opacity:1; }
      .nd-cpbtn:hover { color:var(--nd-muted); }
      .nd-ddesc { font-size:10px; color:var(--nd-dim); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
      .nd-toast { position:fixed; bottom:16px; right:16px; background:#0f1623;
        border:1px solid var(--nd-border); border-radius:8px; padding:8px 16px; font-size:12px;
        color:var(--nd-fg); display:flex; align-items:center; gap:7px; z-index:9999;
        box-shadow:0 8px 30px rgba(0,0,0,.4);
        animation:ndTIn .3s ease,ndTOut .3s ease 2s forwards; }
      .nd-toast ha-icon { --mdi-icon-size:13px; color:var(--nd-green); }
      @keyframes ndTIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
      @keyframes ndTOut { from{opacity:1} to{opacity:0;transform:translateY(10px)} }
      .nd-empty { text-align:center; padding:40px 20px; color:var(--nd-dim); grid-column:1/-1; }
      .nd-empty ha-icon { --mdi-icon-size:28px; margin-bottom:10px; display:block; }
      @media(max-width:640px) {
        .nd-grid { grid-template-columns:1fr; }
        .nd-search-box { flex:1 1 100%; }
        .nd-stats { gap:6px; }
        .nd-st { padding:6px 10px; }
        .nd-st-v { font-size:14px; }
        .nd-wrap { padding:14px; }
      }
      @media(prefers-reduced-motion:reduce) {
        *,*::before,*::after { animation-duration:.01ms!important; transition-duration:.01ms!important; }
      }
    `;
  }

  constructor() { super(); this._config=null; this._search=''; this._filter='all'; this._tt=null; }

  setConfig(c) {
    if (!c.devices||!Array.isArray(c.devices)) throw new Error('NetDash: "devices" array is required');
    this._config=c; this._search=''; this._filter='all';
  }

  set hass() {}
  getCardSize() { const n=this._config?.devices?.length||0; return Math.max(4,Math.ceil(n/3)+3); }

  _h2r(h,a) {
    if(!h||h.length<7) return 'rgba(100,116,139,'+a+')';
    return 'rgba('+parseInt(h.slice(1,3),16)+','+parseInt(h.slice(3,5),16)+','+parseInt(h.slice(5,7),16)+','+a+')';
  }
  _vc(id) { const v=(this._config.vlans||[]).find(x=>x.id===id); return v?v.color:'#64748b'; }
  _filtered() {
    const ds=this._config.devices||[], q=this._search.toLowerCase().trim();
    return ds.filter(d=>{
      if(this._filter!=='all'&&d.vlan!==this._filter) return false;
      if(!q) return true;
      return (d.name||'').toLowerCase().includes(q)||(d.ip||'').includes(q)||
        (d.type||'').toLowerCase().includes(q)||(d.description||'').toLowerCase().includes(q)||
        (d.vlan||'').toLowerCase().includes(q);
    });
  }
  _grouped(ds) {
    const vs=this._config.vlans||[], m={};
    vs.forEach(v=>{ m[v.id]={...v,devices:[]}; });
    ds.forEach(d=>{
      if(!m[d.vlan]) m[d.vlan]={id:d.vlan,label:d.vlan,color:'#64748b',devices:[]};
      m[d.vlan].devices.push(d);
    });
    return Object.values(m).filter(g=>g.devices.length>0);
  }
  _onS(e) { this._search=e.target.value; }
  _onF(id) { this._filter=id; }
  _open(url) { window.open(url,'_blank','noopener,noreferrer'); }
  _cp(ip,e) {
    e.stopPropagation(); e.preventDefault();
    const ok=()=>this._toast('Copied '+ip);
    if(navigator.clipboard&&window.isSecureContext) navigator.clipboard.writeText(ip).then(ok);
    else { const t=document.createElement('textarea'); t.value=ip; t.style.cssText='position:fixed;opacity:0;left:-9999px';
      document.body.appendChild(t); t.select(); try{document.execCommand('copy');ok();}catch(_){}
      document.body.removeChild(t); }
  }
  _toast(msg) {
    const o=this.shadowRoot.querySelector('.nd-toast'); if(o) o.remove();
    clearTimeout(this._tt);
    const el=document.createElement('div'); el.className='nd-toast';
    el.innerHTML='<ha-icon icon="mdi:check-circle"></ha-icon><span>'+msg+'</span>';
    this.shadowRoot.appendChild(el);
    this._tt=setTimeout(()=>{if(el.parentNode)el.remove();},2500);
  }

  _rHdr() {
    const t=this._config.title||'NetDash', ss=this._config.show_search!==false;
    return html`<div class="nd-hdr"><div class="nd-hdr-left">
      <div class="nd-logo"><ha-icon icon="mdi:lan"></ha-icon></div>
      <div><div class="nd-title">${t}</div><div class="nd-sub">Network Device Dashboard</div></div>
    </div>${ss?html`<div class="nd-search-box"><ha-icon icon="mdi:magnify"></ha-icon>
      <input type="text" class="nd-search-input" placeholder="Search devices, IPs, types..." @input=${this._onS}></div>`:nothing}</div>`;
  }
  _rFil() {
    if(this._config.show_filters===false) return nothing;
    const vs=this._config.vlans||[], ds=this._config.devices||[];
    return html`<div class="nd-filters">
      <button class="nd-ftab ${this._filter==='all'?'on':''}" @click=${()=>this._onF('all')}>
        All<span class="nd-fcnt">${ds.length}</span></button>
      ${vs.map(v=>html`<button class="nd-ftab ${this._filter===v.id?'on':''}" @click=${()=>this._onF(v.id)}>
        <span class="nd-fdot" style="background:${v.color}"></span>${v.label}
        <span class="nd-fcnt">${ds.filter(d=>d.vlan===v.id).length}</span></button>`)}</div>`;
  }
  _rStat() {
    if(this._config.show_stats===false) return nothing;
    const ds=this._config.devices||[], vs=this._config.vlans||[],
      ts=new Set(ds.map(d=>d.type).filter(Boolean));
    let h=0,ht=0; ds.forEach(d=>{(d.url||'').startsWith('https')?h++:ht++;});
    return html`<div class="nd-stats">
      <div class="nd-st"><ha-icon icon="mdi:cube-outline" style="color:var(--nd-dim)"></ha-icon>
        <div><div class="nd-st-v">${ds.length}</div><div class="nd-st-l">Devices</div></div></div>
      <div class="nd-st"><ha-icon icon="mdi:tag-multiple-outline" style="color:var(--nd-dim)"></ha-icon>
        <div><div class="nd-st-v">${ts.size}</div><div class="nd-st-l">Types</div></div></div>
      <div class="nd-st"><ha-icon icon="mdi:lock" style="color:var(--nd-green)"></ha-icon>
        <div><div class="nd-st-v" style="color:var(--nd-green)">${h}</div><div class="nd-st-l">HTTPS</div></div></div>
      <div class="nd-st"><ha-icon icon="mdi:lock-open-variant-outline" style="color:var(--nd-amber)"></ha-icon>
        <div><div class="nd-st-v" style="color:var(--nd-amber)">${ht}</div><div class="nd-st-l">HTTP</div></div></div>
      <div class="nd-st"><ha-icon icon="mdi:layers-outline" style="color:var(--nd-rose)"></ha-icon>
        <div><div class="nd-st-v">${vs.length}</div><div class="nd-st-l">VLANs</div></div></div></div>`;
  }
  _rDev(d,i) {
    const ic=d.icon||'mdi:cube', co=d.color||this._vc(d.vlan), vc=this._vc(d.vlan),
      pr=(d.url||'').startsWith('https')?'HTTPS':'HTTP',
      pc=pr==='HTTPS'?'nd-badge-https':'nd-badge-http';
    return html`<div class="nd-dev" style="--nd-accent:${vc};animation-delay:${i*20}ms"
      @click=${()=>this._open(d.url)} tabindex="0" role="link" aria-label="Open ${d.name}">
      <div class="nd-dicon" style="background:${this._h2r(co,.12)};color:${co}"><ha-icon icon="${ic}"></ha-icon></div>
      <div class="nd-dinfo">
        <div class="nd-dname-row"><span class="nd-dname">${d.name}</span>
          <ha-icon icon="mdi:open-in-new" class="nd-darrow"></ha-icon></div>
        <div class="nd-badges">
          <span class="nd-badge" style="background:${this._h2r(vc,.1)};color:${vc}">${d.type||'Device'}</span>
          <span class="nd-badge ${pc}">${pr}</span></div>
        ${d.ip?html`<div class="nd-ip-row"><span class="nd-ip" @click=${e=>this._cp(d.ip,e)} title="Click to copy">${d.ip}</span>
          <ha-icon icon="mdi:content-copy" class="nd-cpbtn" @click=${e=>this._cp(d.ip,e)}></ha-icon></div>`:nothing}
        ${d.description?html`<div class="nd-ddesc">${d.description}</div>`:nothing}</div></div>`;
  }
  _rVlan(g) {
    return html`<div class="nd-vlan"><div class="nd-vlan-hdr">
      <div class="nd-vpulse" style="background:${g.color}"></div>
      <div class="nd-vlabel"><ha-icon icon="${g.icon||'mdi:lan'}" style="color:${g.color}"></ha-icon>
        ${g.label}<span class="nd-vdesc">${g.description||''}</span></div>
      <span class="nd-vcnt">${g.devices.length} device${g.devices.length!==1?'s':''}</span>
    </div><div class="nd-grid">${g.devices.map((d,i)=>this._rDev(d,i))}</div></div>`;
  }
  _rEmpty() {
    return html`<div class="nd-grid"><div class="nd-empty"><ha-icon icon="mdi:magnify"></ha-icon>
      <div style="font-size:14px;font-weight:500;margin-bottom:3px;color:var(--nd-muted)">No devices found</div>
      <div style="font-size:12px">Try adjusting your search or filter</div></div></div>`;
  }
  render() {
    if(!this._config) return nothing;
    const g=this._grouped(this._filtered());
    return html`<div class="nd-wrap">${this._rHdr()}${this._rFil()}${this._rStat()}
      ${g.length>0?g.map(x=>this._rVlan(x)):this._rEmpty()}</div>`;
  }
}

customElements.define('netdash-card', NetDashCard);


/* ═══════════════════════════════════════════════════════════
   NetDash Visual Editor
   ═══════════════════════════════════════════════════════════ */
class NetDashEditor extends LitElement {

  static get properties() {
    return {
      _config: {},
      hass: {},
      _openV: { type: Array },
      _openD: { type: Array },
      _dFilter: { type: String },
      _dSearch: { type: String }
    };
  }

  static get styles() {
    return css`
      :host { display: block; }
      .ne-wrap { padding: 4px 0; }

      /* Section blocks */
      .ne-sec { margin-bottom: 20px; }
      .ne-sec-hdr { display:flex; align-items:center; justify-content:space-between; margin-bottom:10px; }
      .ne-sec-title { font-size:13px; font-weight:600; display:flex; align-items:center; gap:6px;
        color: var(--primary-text-color); }
      .ne-sec-title ha-icon { --mdi-icon-size:16px; color: var(--primary-color); }
      .ne-sec-cnt { font-size:11px; color:var(--secondary-text-color);
        font-family:'Roboto Mono',monospace; }

      /* Toggles */
      .ne-toggles { display:flex; flex-direction:column; gap:2px; }

      /* Expansion panel header slot */
      .ne-ep-hdr { display:flex; align-items:center; gap:8px; width:100%; padding-right:4px; }
      .ne-ep-hdr ha-icon { --mdi-icon-size:18px; flex-shrink:0; }
      .ne-ep-hdr .ne-ep-name { font-weight:500; font-size:13px; color:var(--primary-text-color); }
      .ne-ep-hdr .ne-ep-sub { font-size:11px; color:var(--secondary-text-color); }
      .ne-ep-hdr .ne-ep-dot { width:10px; height:10px; border-radius:50%; flex-shrink:0; }
      .ne-ep-spacer { flex:1; }

      /* Action buttons */
      .ne-acts { display:flex; gap:2px; align-items:center; flex-shrink:0; }
      .ne-act { --mdc-icon-size:18px; color:var(--secondary-text-color); cursor:pointer;
        border-radius:4px; padding:2px; transition:color .15s,background .15s; }
      .ne-act:hover { color:var(--primary-text-color); background:rgba(255,255,255,.06); }
      .ne-act.ne-del:hover { color:var(--error-color); background:rgba(244,67,54,.08); }

      /* Form fields inside panels */
      .ne-fields { display:flex; flex-direction:column; gap:10px; padding:2px 0 6px; }
      .ne-row { display:flex; gap:12px; align-items:flex-start; }
      .ne-row > * { flex:1; min-width:0; }
      .ne-row .ne-color-wrap { flex: 0 0 auto; }
      .ne-icon-row { display:flex; align-items:center; gap:10px; }
      .ne-icon-preview { width:40px; height:40px; border-radius:8px; display:flex;
        align-items:center; justify-content:center; flex-shrink:0;
        background:rgba(255,255,255,.05); --mdi-icon-size:20px; color:var(--secondary-text-color); }

      /* Color picker */
      .ne-color-wrap { display:flex; align-items:center; gap:8px; }
      .ne-color {
        -webkit-appearance:none; appearance:none;
        width:44px; height:44px; min-width:44px;
        border:2px solid rgba(255,255,255,.1); border-radius:8px;
        cursor:pointer; padding:3px; background:transparent;
      }
      .ne-color::-webkit-color-swatch-wrapper { padding:0; }
      .ne-color::-webkit-color-swatch { border:none; border-radius:4px; }
      .ne-color::-moz-color-swatch { border:none; border-radius:4px; }

      /* Native select */
      .ne-sel {
        background:var(--card-background-color); color:var(--primary-text-color);
        border:1px solid rgba(255,255,255,.1); border-radius:8px;
        padding:8px 12px; font-family:inherit; font-size:13px;
        cursor:pointer; outline:none; width:100%;
      }
      .ne-sel:focus { border-color:var(--primary-color); }

      /* Filter bar */
      .ne-fbar { display:flex; align-items:center; gap:10px; margin-bottom:10px; flex-wrap:wrap; }

      /* Add button row */
      .ne-add-row { display:flex; justify-content:flex-end; margin-top:8px; }

      /* Empty */
      .ne-empty { text-align:center; padding:16px; color:var(--secondary-text-color); font-size:12px; }
    `;
  }

  constructor() {
    super();
    this._config = { vlans: [], devices: [] };
    this._openV = [];
    this._openD = [];
    this._dFilter = 'all';
    this._dSearch = '';
  }

  setConfig(config) {
    this._config = JSON.parse(JSON.stringify(config));
    if (!this._config.vlans) this._config.vlans = [];
    if (!this._config.devices) this._config.devices = [];
  }

  /* Immutable config update + dispatch */
  _update(fn) {
    const c = JSON.parse(JSON.stringify(this._config));
    if (!c.vlans) c.vlans = [];
    if (!c.devices) c.devices = [];
    fn(c);
    this._config = c;
    this.requestUpdate();
    this.dispatchEvent(new CustomEvent('config-changed', {
      detail: { config: c }, bubbles: true, composed: true
    }));
  }

  /* Toggle helpers */
  _togV(i, exp) {
    this._openV = exp
      ? [...this._openV, i]
      : this._openV.filter(x => x !== i);
  }
  _togD(i, exp) {
    this._openD = exp
      ? [...this._openD, i]
      : this._openD.filter(x => x !== i);
  }

  /* VLAN CRUD */
  _addVlan() {
    this._update(c => {
      c.vlans.push({ id: 'vlan-' + (Date.now() % 10000), label: 'New VLAN', color: '#64748b', icon: 'mdi:lan', description: '' });
    });
    this._openV = [...this._openV, this._config.vlans.length - 1];
  }
  _delVlan(i) { this._update(c => { c.vlans.splice(i, 1); }); this._openV = this._openV.filter(x => x !== i); }
  _movVlan(i, dir) {
    const j = i + dir;
    if (j < 0 || j >= this._config.vlans.length) return;
    this._update(c => { [c.vlans[i], c.vlans[j]] = [c.vlans[j], c.vlans[i]]; });
    this._openV = this._openV.map(x => x === i ? j : x === j ? i : x);
  }

  /* Device CRUD */
  _addDevice() {
    const firstVlan = (this._config.vlans || [])[0]?.id || '';
    this._update(c => {
      c.devices.push({ name: 'New Device', url: 'http://', ip: '', type: '', icon: 'mdi:cube', color: '', description: '', vlan: firstVlan });
    });
    this._openD = [...this._openD, this._config.devices.length - 1];
  }
  _delDevice(i) { this._update(c => { c.devices.splice(i, 1); }); this._openD = this._openD.filter(x => x !== i); }
  _movDevice(i, dir) {
    const j = i + dir;
    if (j < 0 || j >= this._config.devices.length) return;
    this._update(c => { [c.devices[i], c.devices[j]] = [c.devices[j], c.devices[i]]; });
    this._openD = this._openD.map(x => x === i ? j : x === j ? i : x);
  }

  /* Field setters */
  _setT(v) { this._update(c => { c.title = v; }); }
  _setSS(v) { this._update(c => { c.show_search = v; }); }
  _setSF(v) { this._update(c => { c.show_filters = v; }); }
  _setSt(v) { this._update(c => { c.show_stats = v; }); }
  _setVF(i, f, v) { this._update(c => { c.vlans[i][f] = v; }); }
  _setDF(i, f, v) { this._update(c => { c.devices[i][f] = v; }); }

  /* Filtered devices for editor list */
  _filteredDevs() {
    const ds = this._config.devices || [];
    const q = this._dSearch.toLowerCase().trim();
    return ds.filter((d, idx) => {
      if (this._dFilter !== 'all' && d.vlan !== this._dFilter) return false;
      if (!q) return true;
      return (d.name || '').toLowerCase().includes(q) || (d.ip || '').includes(q) || (d.type || '').toLowerCase().includes(q);
    }).map(d => {
      /* We need the original index for editing */
      const oi = ds.indexOf(d);
      return { ...d, _idx: oi };
    });
  }

  /* Helper: resolve icon color for preview */
  _devColor(d) { return d.color || this._vc(d.vlan); }
  _vc(id) { const v = (this._config.vlans || []).find(x => x.id === id); return v ? v.color : '#64748b'; }

  /* ── Render: General ── */
  _rGeneral() {
    const c = this._config;
    return html`
      <div class="ne-sec">
        <div class="ne-sec-hdr">
          <div class="ne-sec-title"><ha-icon icon="mdi:cog"></ha-icon> General Settings</div>
        </div>
        <div class="ne-fields">
          <ha-textfield .value=${c.title || ''} @input=${e => this._setT(e.target.value)} label="Card title"></ha-textfield>
          <div class="ne-toggles">
            <ha-form-row>
              <ha-switch .checked=${c.show_search !== false} @change=${e => this._setSS(e.target.checked)}>
              </ha-switch>
              <span slot="label">Show search bar</span>
            </ha-form-row>
            <ha-form-row>
              <ha-switch .checked=${c.show_filters !== false} @change=${e => this._setSF(e.target.checked)}>
              </ha-switch>
              <span slot="label">Show VLAN filter tabs</span>
            </ha-form-row>
            <ha-form-row>
              <ha-switch .checked=${c.show_stats !== false} @change=${e => this._setSt(e.target.checked)}>
              </ha-switch>
              <span slot="label">Show statistics bar</span>
            </ha-form-row>
          </div>
        </div>
      </div>`;
  }

  /* ── Render: VLANs ── */
  _rVlans() {
    const vlans = this._config.vlans || [];
    return html`
      <div class="ne-sec">
        <div class="ne-sec-hdr">
          <div class="ne-sec-title"><ha-icon icon="mdi:lan"></ha-icon> VLANs <span class="ne-sec-cnt">${vlans.length}</span></div>
        </div>
        ${vlans.length === 0 ? html`<div class="ne-empty">No VLANs configured. Add one below.</div>` : nothing}
        ${vlans.map((v, i) => this._rVlanItem(v, i))}
        <div class="ne-add-row">
          <mwc-button @click=${this._addVlan}>
            <ha-icon icon="mdi:plus" slot="icon"></ha-icon> Add VLAN
          </mwc-button>
        </div>
      </div>`;
  }

  _rVlanItem(v, i) {
    const open = this._openV.includes(i);
    const canUp = i > 0, canDn = i < this._config.vlans.length - 1;
    return html`
      <ha-expansion-panel ?expanded=${open} @expanded-changed=${e => this._togV(i, e.detail.expanded)}>
        <div slot="header" class="ne-ep-hdr">
          <span class="ne-ep-dot" style="background:${v.color}"></span>
          <ha-icon icon="${v.icon || 'mdi:lan'}" style="color:${v.color}"></ha-icon>
          <span class="ne-ep-name">${v.label || 'Unnamed'}</span>
          ${v.description ? html`<span class="ne-ep-sub">${v.description}</span>` : nothing}
          <span class="ne-ep-spacer"></span>
          <div class="ne-acts" @click=${e => e.stopPropagation()}>
            <ha-icon icon="mdi:arrow-up" class="ne-act" style=${!canUp ? 'opacity:.2;pointer-events:none' : ''} @click=${() => this._movVlan(i, -1)}></ha-icon>
            <ha-icon icon="mdi:arrow-down" class="ne-act" style=${!canDn ? 'opacity:.2;pointer-events:none' : ''} @click=${() => this._movVlan(i, 1)}></ha-icon>
            <ha-icon icon="mdi:delete-outline" class="ne-act ne-del" @click=${() => this._delVlan(i)}></ha-icon>
          </div>
        </div>
        <div class="ne-fields">
          <ha-textfield .value=${v.id || ''} @input=${e => this._setVF(i, 'id', e.target.value)} label="VLAN ID" helper="Unique identifier referenced by devices"></ha-textfield>
          <ha-textfield .value=${v.label || ''} @input=${e => this._setVF(i, 'label', e.target.value)} label="Display label"></ha-textfield>
          <div class="ne-row">
            <div class="ne-color-wrap">
              <input type="color" class="ne-color" .value=${v.color || '#64748b'} @input=${e => this._setVF(i, 'color', e.target.value)}>
            </div>
            <ha-textfield .value=${v.color || '#64748b'} @input=${e => this._setVF(i, 'color', e.target.value)} label="Color (hex)"></ha-textfield>
          </div>
          <div class="ne-icon-row">
            <div class="ne-icon-preview" style="color:${v.color || '#64748b'}">
              <ha-icon icon="${v.icon || 'mdi:lan'}"></ha-icon>
            </div>
            <ha-icon-picker .hass=${this.hass} .value=${v.icon || ''} @value-changed=${e => {
              const val = typeof e.detail === 'string' ? e.detail : (e.detail?.value || '');
              this._setVF(i, 'icon', val);
            }} label="Icon" style="flex:1"></ha-icon-picker>
          </div>
          <ha-textfield .value=${v.description || ''} @input=${e => this._setVF(i, 'description', e.target.value)} label="Description"></ha-textfield>
        </div>
      </ha-expansion-panel>`;
  }

  /* ── Render: Devices ── */
  _rDevices() {
    const devs = this._filteredDevs();
    const vlans = this._config.vlans || [];
    return html`
      <div class="ne-sec">
        <div class="ne-sec-hdr">
          <div class="ne-sec-title"><ha-icon icon="mdi:devices"></ha-icon> Devices <span class="ne-sec-cnt">${this._config.devices.length}</span></div>
        </div>
        <div class="ne-fbar">
          <select class="ne-sel" style="max-width:180px" .value=${this._dFilter} @change=${e => { this._dFilter = e.target.value; }}>
            <option value="all">All VLANs</option>
            ${vlans.map(v => html`<option value=${v.id}>${v.label}</option>`)}
          </select>
          <ha-textfield .value=${this._dSearch} @input=${e => { this._dSearch = e.target.value; }}
            label="Filter devices" style="flex:1"></ha-textfield>
        </div>
        ${devs.length === 0 ? html`<div class="ne-empty">No devices match your filter.</div>` : nothing}
        ${devs.map(d => this._rDevItem(d, d._idx))}
        <div class="ne-add-row">
          <mwc-button @click=${this._addDevice}>
            <ha-icon icon="mdi:plus" slot="icon"></ha-icon> Add Device
          </mwc-button>
        </div>
      </div>`;
  }

  _rDevItem(d, i) {
    const open = this._openD.includes(i);
    const canUp = i > 0, canDn = i < this._config.devices.length - 1;
    const co = this._devColor(d);
    const vlanLabel = ((this._config.vlans || []).find(v => v.id === d.vlan) || {}).label || d.vlan || '—';
    return html`
      <ha-expansion-panel ?expanded=${open} @expanded-changed=${e => this._togD(i, e.detail.expanded)}>
        <div slot="header" class="ne-ep-hdr">
          <ha-icon icon="${d.icon || 'mdi:cube'}" style="color:${co}"></ha-icon>
          <span class="ne-ep-name">${d.name || 'Unnamed'}</span>
          ${d.ip ? html`<span class="ne-ep-sub">${d.ip}</span>` : nothing}
          ${d.type ? html`<span class="ne-ep-sub" style="margin-left:4px">${d.type}</span>` : nothing}
          <span class="ne-ep-sub" style="margin-left:auto;color:${this._vc(d.vlan)}">${vlanLabel}</span>
          <div class="ne-acts" @click=${e => e.stopPropagation()}>
            <ha-icon icon="mdi:arrow-up" class="ne-act" style=${!canUp ? 'opacity:.2;pointer-events:none' : ''} @click=${() => this._movDevice(i, -1)}></ha-icon>
            <ha-icon icon="mdi:arrow-down" class="ne-act" style=${!canDn ? 'opacity:.2;pointer-events:none' : ''} @click=${() => this._movDevice(i, 1)}></ha-icon>
            <ha-icon icon="mdi:delete-outline" class="ne-act ne-del" @click=${() => this._delDevice(i)}></ha-icon>
          </div>
        </div>
        <div class="ne-fields">
          <ha-textfield .value=${d.name || ''} @input=${e => this._setDF(i, 'name', e.target.value)} label="Device name"></ha-textfield>
          <ha-textfield .value=${d.url || ''} @input=${e => this._setDF(i, 'url', e.target.value)} label="URL" type="url"></ha-textfield>
          <div class="ne-row">
            <ha-textfield .value=${d.ip || ''} @input=${e => this._setDF(i, 'ip', e.target.value)} label="IP address"></ha-textfield>
            <ha-textfield .value=${d.type || ''} @input=${e => this._setDF(i, 'type', e.target.value)} label="Type badge"></ha-textfield>
          </div>
          <div class="ne-row">
            <div class="ne-color-wrap">
              <input type="color" class="ne-color" .value=${d.color || co} @input=${e => this._setDF(i, 'color', e.target.value)}>
            </div>
            <ha-textfield .value=${d.color || ''} @input=${e => this._setDF(i, 'color', e.target.value)}
              label="Icon color (empty = VLAN color)" placeholder="Leave empty for VLAN default"></ha-textfield>
          </div>
          <div class="ne-icon-row">
            <div class="ne-icon-preview" style="color:${co}">
              <ha-icon icon="${d.icon || 'mdi:cube'}"></ha-icon>
            </div>
            <ha-icon-picker .hass=${this.hass} .value=${d.icon || ''} @value-changed=${e => {
              const val = typeof e.detail === 'string' ? e.detail : (e.detail?.value || '');
              this._setDF(i, 'icon', val);
            }} label="Icon" style="flex:1"></ha-icon-picker>
          </div>
          <ha-textfield .value=${d.description || ''} @input=${e => this._setDF(i, 'description', e.target.value)} label="Description"></ha-textfield>
          <select class="ne-sel" .value=${d.vlan || ''} @change=${e => this._setDF(i, 'vlan', e.target.value)}>
            <option value="">— Select VLAN —</option>
            ${(this._config.vlans || []).map(v => html`<option value=${v.id} ?selected=${d.vlan === v.id}>${v.label} (${v.id})</option>`)}
          </select>
        </div>
      </ha-expansion-panel>`;
  }

  /* ── Main render ── */
  render() {
    return html`
      <div class="ne-wrap">
        ${this._rGeneral()}
        ${this._rVlans()}
        ${this._rDevices()}
      </div>`;
  }
}

customElements.define('netdash-editor', NetDashEditor);


/* ═══════════════════════════════════════════════════════════
   HA Registry
   ═══════════════════════════════════════════════════════════ */
window.customCards = window.customCards || [];
window.customCards.push({
  type: 'netdash',
  name: 'NetDash',
  description: 'Network device link dashboard with VLAN grouping',
  preview: false,
});
