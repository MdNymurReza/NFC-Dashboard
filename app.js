(() => {
  "use strict";
  const P = window.PROFILE || {};
  const $ = (s) => document.querySelector(s);
  // motion: "full" (default) always animates; "auto" calms down when the device asks for reduced motion
  const reduced = P.motion === "auto" && matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) document.documentElement.classList.add("reduce-motion");
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ---------------- helpers ---------------- */
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const safeUrl = (u) => {
    const s = String(u || "").trim();
    if (!s) return "";
    return /^\s*(javascript|data|vbscript):/i.test(s) ? "#" : s;
  };
  const has = (v) => Array.isArray(v) ? v.length > 0 : !!(v && String(v).trim());
  const initials = (name) => String(name || "?")
    .replace(/\b(dr|prof|mr|mrs|ms|engr|md|mohammad|muhammad)\.?\s+/gi, "")
    .split(/\s+/).filter(Boolean).filter((w, k, a) => k === 0 || k === a.length - 1)
    .map((w) => w[0].toUpperCase()).join("");
  const toast = (msg) => {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => t.classList.remove("show"), 2200);
  };
  const copy = async (text, msg = "Copied") => {
    try { await navigator.clipboard.writeText(text); }
    catch {
      const a = document.createElement("textarea");
      a.value = text; document.body.appendChild(a); a.select();
      try { document.execCommand("copy"); } catch {}
      a.remove();
    }
    toast(msg);
  };

  /* ---------------- icons ---------------- */
  const S = (inner, extra = "") => `<svg viewBox="0 0 24 24" fill-rule="evenodd" ${extra}>${inner}</svg>`;
  const stroke = (d) => S(`<path d="${d}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>`);
  const letters = (t, size = 11) => S(`<rect x="1.5" y="1.5" width="21" height="21" rx="5" fill="none" stroke="currentColor" stroke-width="1.6"/><text x="12" y="12.5" text-anchor="middle" dominant-baseline="middle" font-family="Inter,Arial,sans-serif" font-weight="700" font-size="${size}" fill="currentColor">${t}</text>`);

  const ICONS = {
    facebook: ["#1877f2", S('<path d="M24 12a12 12 0 1 0-13.9 11.9v-8.4H7.1V12h3V9.4c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 .9-2 1.9V12h3.4l-.5 3.5h-2.9v8.4A12 12 0 0 0 24 12z"/>')],
    instagram: ["#e1306c", S('<path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zm0 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm5.5-4a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2z"/>')],
    github: ["#f0ece2", S('<path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8 0 3.2.9.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1 .9 2.2v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 .3"/>')],
    codeforces: ["#1f8acb", S('<rect x="1" y="8" width="5.5" height="13" rx="1.4" fill="#f5c518"/><rect x="9.25" y="3" width="5.5" height="18" rx="1.4" fill="#1f8acb"/><rect x="17.5" y="11" width="5.5" height="10" rx="1.4" fill="#e3342f"/>')],
    linkedin: ["#3b8fe0", S('<path d="M22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 .9.8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.2 0 22.2 0zM7.1 20.5H3.6V9h3.5v11.5zM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2zm15.1 13.1h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6c.5-.9 1.6-1.8 3.4-1.8 3.6 0 4.3 2.4 4.3 5.5v6.2z"/>')],
    scholar: ["#5b9bff", S('<path d="M12 3 1 9l11 6 9-4.9V17h2V9L12 3z"/><path d="M5.2 12.4V16c0 2 3 4 6.8 4s6.8-2 6.8-4v-3.6L12 16.1z"/>')],
    researchgate: ["#00ccbb", letters("RG", 9.5)],
    orcid: ["#a6ce39", S('<circle cx="12" cy="12" r="11"/><text x="12" y="12.8" text-anchor="middle" dominant-baseline="middle" font-family="Inter,Arial,sans-serif" font-weight="700" font-size="10" fill="#0a1020">iD</text>')],
    youtube: ["#ff3355", S('<path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z"/>')],
    x: ["#ece8de", S('<path d="M18.9 1.2h3.7l-8 9.2L24 22.8h-7.4l-5.8-7.6-6.6 7.6H.5L9 13 0 1.2h7.6l5.2 6.9 6.1-6.9zm-1.3 19.4h2L6.5 3.2H4.3z"/>')],
    website: [null, stroke("M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM2 12h20M12 2c2.8 3 4 6.4 4 10s-1.2 7-4 10c-2.8-3-4-6.4-4-10s1.2-7 4-10z")],
    email: [null, stroke("M3 5h18v14H3zM3 6l9 7 9-7")],
    phone: [null, stroke("M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2z")],
    whatsapp: ["#25d366", stroke("M3.5 20.5l1.3-4.4A9 9 0 1 1 8 19.3zM9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.6-2-1-1 .8a5 5 0 0 1-2.7-2.7l.8-1-1-2z")],
    telegram: ["#29a9eb", stroke("M22 3 2 10.8l7 2.6L19 6l-8 9v5.5l3.5-4.2L19 20z")],
    leetcode: ["#ffa116", letters("LC", 9.5)],
    kaggle: ["#20beff", letters("k", 14)],
    medium: ["#ece8de", letters("M", 12)],
    location: [null, stroke("M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z")],
    office: [null, stroke("M4 21V5l8-3 8 3v16M9 21v-5h6v5M8 8h2M14 8h2M8 12h2M14 12h2")],
    link: [null, stroke("M10 14a4.5 4.5 0 0 0 6.4 0l3.2-3.2a4.5 4.5 0 0 0-6.4-6.4L11.5 6M14 10a4.5 4.5 0 0 0-6.4 0l-3.2 3.2a4.5 4.5 0 0 0 6.4 6.4L12.5 18")]
  };
  const icon = (key) => ICONS[String(key || "").toLowerCase()] || ICONS.link;
  const ARROW = '<svg class="link-arrow" viewBox="0 0 24 24"><path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';

  /* ---------------- theme ---------------- */
  if (P.theme && P.theme.gold) {
    const g = P.theme.gold;
    const r = document.documentElement.style;
    r.setProperty("--gold", g);
    r.setProperty("--gold-soft", `color-mix(in srgb, ${g} 35%, transparent)`);
    r.setProperty("--gold-faint", `color-mix(in srgb, ${g} 12%, transparent)`);
  }

  /* ---------------- render ---------------- */
  const hide = (key) => { const s = document.querySelector(`.section[data-key="${key}"]`); if (s) s.hidden = true; };

  document.title = P.name ? `${P.name}${P.title ? " · " + P.title : ""}` : "Profile";
  $("#loader-initials").textContent = initials(P.name);

  // Avatar
  const avatar = $("#avatar");
  const showInitials = () => { avatar.textContent = initials(P.name); };
  if (has(P.photo)) {
    const img = new Image();
    img.alt = P.name || "Profile photo";
    if (P.photoPosition) img.style.objectPosition = P.photoPosition;
    img.onload = () => { avatar.innerHTML = ""; avatar.appendChild(img); };
    img.onerror = showInitials;
    img.src = P.photo;
    showInitials();
  } else showInitials();

  // Name, letter by letter (words kept together so they never break mid-word)
  let i = 0;
  $("#name").innerHTML = String(P.name || "").split(" ").map((w) =>
    `<span style="display:inline-block;white-space:nowrap">${[...w].map((c) =>
      `<span class="ch" style="--i:${i++}">${esc(c)}</span>`).join("")}</span>`).join(" ");
  $("#name").setAttribute("aria-label", P.name || "");

  $("#title").textContent = P.title || "";
  $("#affil").innerHTML = [P.department, P.institution].filter(has).map(esc).join("<br>");

  // About
  if (has(P.bio)) $("#bio").textContent = P.bio; else $("#bio").closest(".card").remove();
  if (has(P.stats)) {
    $("#stats").innerHTML = P.stats.map((s, k) => `
      <div class="card stat reveal" style="--d:${k * 0.1}s">
        <div class="stat-num" data-to="${Number(s.value) || 0}" data-suffix="${esc(s.suffix || "")}">0${esc(s.suffix || "")}</div>
        <div class="stat-label">${esc(s.label)}</div>
      </div>`).join("");
  }
  if (!has(P.bio) && !has(P.stats)) hide("bio");

  // Links
  const links = (P.links || []).filter((l) => has(l.url));
  if (links.length) {
    $("#links").innerHTML = links.map((l, k) => {
      const [brand, svg] = icon(l.platform);
      let url = safeUrl(l.url);
      if (!url && l.platform === "email" && l.handle) url = "mailto:" + l.handle;
      const ext = /^https?:/i.test(url);
      return `
      <a class="card link reveal" href="${esc(url || "#")}" ${ext ? 'target="_blank" rel="noopener"' : ""}
         style="--d:${(k % 6) * 0.07}s;${brand ? "--brand:" + brand : ""}">
        <span class="link-icon">${svg}</span>
        <span class="link-text">
          <span class="link-label">${esc(l.label || l.platform)}</span>
          ${has(l.handle) ? `<div class="link-handle">${esc(l.handle)}</div>` : ""}
        </span>
        ${ARROW}
      </a>`;
    }).join("");
  } else hide("links");

  // Documents
  if (has(P.documents)) {
    $("#docs").innerHTML = P.documents.map((d, k) => `
      <a class="card doc reveal" href="${esc(safeUrl(d.url) || "#")}" target="_blank" rel="noopener" style="--d:${k * 0.1}s">
        <span class="doc-icon">${esc((d.note || "PDF").slice(0, 4).toUpperCase())}</span>
        <span><div class="doc-title">${esc(d.label)}</div><div class="doc-sub">View &amp; download</div></span>
      </a>`).join("");
  } else hide("documents");

  // Expertise
  if (has(P.expertise)) {
    $("#expertise").innerHTML = P.expertise.map((e, k) =>
      `<span class="chip reveal" style="--d:${k * 0.05}s">${esc(e)}</span>`).join("");
  } else hide("expertise");

  // Papers
  if (has(P.papers)) {
    const shown = Number(P.papersShown) || P.papers.length;
    $("#papers").innerHTML = P.papers.map((p, k) => {
      const url = safeUrl(p.url);
      const tag = url && url !== "#" ? "a" : "div";
      const href = tag === "a" ? ` href="${esc(url)}" target="_blank" rel="noopener"` : "";
      return `<li class="reveal${k >= shown ? " extra" : ""}" style="--d:${(k % 6) * 0.08}s"${k >= shown ? " hidden" : ""}><${tag} class="card paper"${href}>
        <span class="paper-num"></span>
        <span><div class="paper-title">${esc(p.title)}</div>
        ${has(p.authors) ? `<div class="paper-authors">${esc(p.authors)}</div>` : ""}
        <div class="paper-meta">${[p.venue && `<b>${esc(p.venue)}</b>`, p.year && esc(p.year)].filter(Boolean).join(" · ")}</div></span>
      </${tag}></li>`;
    }).join("");
    const more = $("#papers-more");
    if (P.papers.length > shown) {
      more.hidden = false;
      more.textContent = `Show all ${P.papers.length} publications`;
      more.addEventListener("click", () => {
        document.querySelectorAll("#papers .extra").forEach((li) => {
          li.hidden = false;
          requestAnimationFrame(() => io.observe(li));
        });
        more.remove();
      });
    }
  } else hide("papers");

  // Education
  if (has(P.education)) {
    $("#education").innerHTML = P.education.map((e, k) => `
      <div class="card edu-item reveal" style="--d:${k * 0.08}s">
        <div class="edu-years">${esc(e.years)}</div>
        <div class="edu-degree">${esc(e.degree)}</div>
        <div class="edu-school">${esc(e.school)}</div>
        ${has(e.result) ? `<div class="edu-result">${esc(e.result)}</div>` : ""}
      </div>`).join("");
  } else hide("education");

  // Awards
  if (has(P.awards)) {
    const MEDAL = '<svg viewBox="0 0 24 24"><path d="M7 2h10l-3 6h-4zM12 9a6.5 6.5 0 1 1 0 13 6.5 6.5 0 0 1 0-13zm0 2.6 1.2 2.5 2.7.4-2 1.9.5 2.7-2.4-1.3-2.4 1.3.5-2.7-2-1.9 2.7-.4z" fill-rule="evenodd"/></svg>';
    $("#awards").innerHTML = P.awards.map((a, k) => {
      const url = safeUrl(a.url);
      const tag = url ? "a" : "div";
      const href = url ? ` href="${esc(url)}" target="_blank" rel="noopener"` : "";
      return `<${tag} class="card award reveal"${href} style="--d:${(k % 4) * 0.08}s">
        <span class="award-icon">${MEDAL}</span>
        <span><div class="award-title">${esc(a.title)}</div>
        ${has(a.detail) ? `<div class="award-detail">${esc(a.detail)}</div>` : ""}</span>
        ${url ? ARROW : ""}
      </${tag}>`;
    }).join("");
  } else hide("awards");

  // Timeline
  if (has(P.timeline)) {
    $("#timeline").innerHTML = P.timeline.map((t, k) => `
      <li class="tl-item reveal" style="--d:${k * 0.1}s">
        <div class="tl-year">${esc(t.year)}</div><div class="tl-text">${esc(t.text)}</div>
      </li>`).join("");
  } else hide("timeline");

  // Contact
  const rows = [
    ["email", "Email", P.email, P.email && "mailto:" + P.email, true],
    ["phone", "Phone", P.phone, P.phone && "tel:" + P.phone.replace(/[^\d+]/g, ""), true],
    ["office", "Office", P.office],
    ["location", "Location", P.location],
    ["website", "Website", P.website, safeUrl(P.website)]
  ].filter((r) => has(r[2]));
  if (rows.length) {
    $("#contact").innerHTML = rows.map(([ic, k, v, href, copyable]) => `
      <div class="contact-row">
        ${icon(ic)[1]}
        <span class="v"><span class="k">${k}</span>${href
          ? `<a href="${esc(href)}"${/^https?:/.test(href) ? ' target="_blank" rel="noopener"' : ""}>${esc(v)}</a>`
          : esc(v)}</span>
        ${copyable ? `<button class="copy-btn" type="button" data-copy="${esc(v)}">Copy</button>` : ""}
      </div>`).join("");
  } else hide("contact");

  if (has(P.dedication)) $("#dedication").textContent = P.dedication;

  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-copy]");
    if (b) copy(b.dataset.copy, "Copied to clipboard");
  });

  /* ---------------- actions ---------------- */
  $("#save-contact").addEventListener("click", () => {
    const v = (s) => String(s || "").replace(/([,;\\])/g, "\\$1").replace(/\n/g, "\\n");
    const parts = String(P.name || "").split(" ");
    const lines = [
      "BEGIN:VCARD", "VERSION:3.0",
      `FN:${v(P.name)}`,
      `N:${v(parts.slice(-1).join(""))};${v(parts.slice(0, -1).join(" "))};;;`,
      P.title && `TITLE:${v(P.title)}`,
      (P.institution || P.department) && `ORG:${v(P.institution)};${v(P.department)}`,
      P.email && `EMAIL;TYPE=INTERNET:${v(P.email)}`,
      P.phone && `TEL;TYPE=CELL:${v(P.phone)}`,
      P.website && `URL:${v(P.website)}`,
      `URL;TYPE=Profile:${v(location.href.split("#")[0])}`,
      P.location && `ADR;TYPE=WORK:;;${v(P.office)};${v(P.location)};;;`,
      P.bio && `NOTE:${v(P.bio)}`,
      "END:VCARD"
    ].filter(Boolean).join("\r\n");
    const blob = new Blob([lines], { type: "text/vcard" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = (P.name || "contact").replace(/[^\w]+/g, "_") + ".vcf";
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 4000);
    toast("Contact card downloaded");
  });

  $("#share").addEventListener("click", async () => {
    const data = { title: P.name, text: `${P.name} — ${P.title || ""}`, url: location.href.split("#")[0] };
    if (navigator.share) { try { await navigator.share(data); } catch {} }
    else copy(data.url, "Link copied");
  });

  /* ---------------- typing effect ---------------- */
  const roles = has(P.roles) ? P.roles : [P.title || ""];
  const typed = $("#typed");
  if (reduced || roles.length === 1) typed.textContent = roles[0];
  else {
    let r = 0, c = 0, del = false;
    const tick = () => {
      const word = roles[r];
      c += del ? -1 : 1;
      typed.textContent = word.slice(0, c);
      let wait = del ? 35 : 75;
      if (!del && c === word.length) { del = true; wait = 1800; }
      else if (del && c === 0) { del = false; r = (r + 1) % roles.length; wait = 350; }
      setTimeout(tick, wait);
    };
    setTimeout(tick, 1800);
  }

  /* ---------------- reveal + counters ---------------- */
  const countUp = (el) => {
    const to = +el.dataset.to, suf = el.dataset.suffix || "";
    if (reduced) { el.textContent = to.toLocaleString() + suf; return; }
    const t0 = performance.now(), dur = 1600;
    const step = (t) => {
      const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 4);
      el.textContent = Math.round(to * e).toLocaleString() + suf;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  // Reveal-on-scroll. Uses plain position checks (works everywhere, incl. in-app NFC browsers)
  const pending = new Set();
  const revealEl = (t) => {
    pending.delete(t);
    t.classList.add("in");
    t.querySelectorAll?.("[data-to]").forEach(countUp);
    const delay = parseFloat(getComputedStyle(t).transitionDelay) || 0;
    setTimeout(() => t.classList.add("settled"), 1100 + delay * 1000);
  };
  const checkReveals = () => {
    if (!pending.size) return;
    const vh = innerHeight;
    pending.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.height === 0 && r.width === 0) return;            // hidden (e.g. collapsed papers)
      if (r.top < vh - Math.min(60, vh * 0.08) && r.bottom > 0) revealEl(el);
    });
  };
  let revealQueued = false;
  const queueCheck = () => { if (!revealQueued) { revealQueued = true; requestAnimationFrame(() => { revealQueued = false; checkReveals(); }); } };
  const io = { observe: (el) => { pending.add(el); queueCheck(); } };
  addEventListener("scroll", queueCheck, { passive: true });
  addEventListener("resize", queueCheck);

  const start = () => {
    document.body.classList.add("ready");
    document.querySelectorAll(".reveal, .section-title").forEach((el) => pending.add(el));
    checkReveals();
    // Safety net: keep checking in case scroll events are missed (smooth-scroll, in-app browsers)
    const iv = setInterval(() => { checkReveals(); if (!pending.size) clearInterval(iv); }, 400);
  };

  /* ---------------- tilt + glow ---------------- */
  if (finePointer && !reduced) {
    document.querySelectorAll(".link").forEach((card) => {
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        card.style.setProperty("--mx", x * 100 + "%");
        card.style.setProperty("--my", y * 100 + "%");
        card.style.transform = `perspective(700px) rotateX(${(0.5 - y) * 8}deg) rotateY(${(x - 0.5) * 10}deg) translateY(-3px)`;
      });
      card.addEventListener("pointerleave", () => { card.style.transform = ""; });
    });
  }

  /* ---------------- constellation background ---------------- */
  const cv = $("#bg"), ctx = cv.getContext("2d");
  let W, H, dots = [], raf, running = true;
  const gold = getComputedStyle(document.documentElement).getPropertyValue("--gold").trim() || "#d4af37";
  const rgb = (() => {
    const m = gold.match(/^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i);
    return m ? m.slice(1).map((h) => parseInt(h, 16)).join(",") : "212,175,55";
  })();
  const mouse = { x: -9999, y: -9999 };
  const resize = () => {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    W = innerWidth; H = innerHeight;
    cv.width = W * dpr; cv.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.round(Math.min(90, (W * H) / (W < 600 ? 14000 : 11000)));
    dots = Array.from({ length: n }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.6 + 0.4, tw: Math.random() * Math.PI * 2
    }));
  };
  const LINK = 120;
  const frame = () => {
    ctx.clearRect(0, 0, W, H);
    for (const d of dots) {
      d.x += d.vx; d.y += d.vy; d.tw += 0.02;
      if (d.x < 0 || d.x > W) d.vx *= -1;
      if (d.y < 0 || d.y > H) d.vy *= -1;
      const dx = d.x - mouse.x, dy = d.y - mouse.y, md = dx * dx + dy * dy;
      if (md < 14400) { d.x += dx * 0.01; d.y += dy * 0.01; }
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${rgb},${0.35 + Math.sin(d.tw) * 0.25})`;
      ctx.fill();
    }
    for (let a = 0; a < dots.length; a++) {
      for (let b = a + 1; b < dots.length; b++) {
        const dx = dots[a].x - dots[b].x, dy = dots[a].y - dots[b].y, dist = Math.hypot(dx, dy);
        if (dist < LINK) {
          ctx.strokeStyle = `rgba(${rgb},${(1 - dist / LINK) * 0.18})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath(); ctx.moveTo(dots[a].x, dots[a].y); ctx.lineTo(dots[b].x, dots[b].y); ctx.stroke();
        }
      }
    }
    if (running) raf = requestAnimationFrame(frame);
  };
  resize();
  addEventListener("resize", () => { clearTimeout(resize._t); resize._t = setTimeout(resize, 150); });
  addEventListener("pointermove", (e) => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
  if (reduced) { running = false; frame(); }
  else {
    frame();
    document.addEventListener("visibilitychange", () => {
      running = !document.hidden;
      if (running) { cancelAnimationFrame(raf); raf = requestAnimationFrame(frame); }
    });
  }

  /* ================= ANIMATION LAYER ================= */

  // Entrance direction per element type
  const dir = (sel, fn) => document.querySelectorAll(sel).forEach((el, k) => el.classList.add(fn(k)));
  dir("#stats .stat", () => "pop");
  dir("#links .link", (k) => (k % 2 ? "from-right" : "from-left"));
  dir("#expertise .chip", () => "pop");
  dir("#timeline .tl-item", () => "from-left");
  dir("#education .edu-item", () => "flip");
  dir("#awards .award", (k) => (k % 2 ? "from-right" : "from-left"));
  dir("#papers > li", () => "from-right");
  dir("#docs .doc", () => "zoom");
  dir("#contact", () => "flip");
  // Light sweep across cards as they appear
  document.querySelectorAll(".link, .award, .edu-item, .doc, .stat, .paper, #about .card, #contact").forEach((c) => {
    c.classList.add("sweep");
    c.insertAdjacentHTML("afterbegin", '<span class="glint"></span>');
  });

  $("#loader-name").textContent = P.name || "";

  // Name: after the letter-by-letter reveal, swap to a shimmering gold sweep
  const nameEl = $("#name");
  const nameLen = String(P.name || "").length;
  const shimmerName = () => { nameEl.textContent = P.name || ""; nameEl.classList.add("shimmer"); };

  // Scroll-driven effects: progress bar, hero parallax, timeline line, back-to-top
  const hero = $("#hero"), prog = $("#progress"), toTop = $("#to-top"), tl = $("#timeline");
  let ticking = false;
  const onScroll = () => {
    ticking = false;
    const y = scrollY, vh = innerHeight;
    const max = document.documentElement.scrollHeight - vh;
    prog.style.setProperty("--p", max > 0 ? (y / max).toFixed(4) : 0);
    if (!reduced && y < vh * 1.2) {
      hero.style.transform = `translate3d(0, ${y * 0.32}px, 0)`;
      hero.style.opacity = Math.max(0, 1 - y / (vh * 0.85)).toFixed(3);
    }
    if (tl) {
      const r = tl.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (vh * 0.8 - r.top) / r.height));
      tl.style.setProperty("--tl", reduced ? 1 : p.toFixed(3));
    }
    toTop.classList.toggle("show", y > vh * 0.9);
  };
  addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  addEventListener("resize", onScroll);
  toTop.addEventListener("click", () => scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" }));

  // Tap / click ripple on cards, buttons and chips
  if (!reduced) {
    document.addEventListener("pointerdown", (e) => {
      const host = e.target.closest(".card, .btn, .chip");
      if (!host) return;
      const r = host.getBoundingClientRect();
      const size = Math.max(r.width, r.height) * 2.2;
      const s = document.createElement("span");
      s.className = "ripple";
      s.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - r.left - size / 2}px;top:${e.clientY - r.top - size / 2}px`;
      host.appendChild(s);
      setTimeout(() => s.remove(), 800);
    });
  }

  // Gold burst (Save Contact / Share)
  const burst = (el) => {
    if (reduced || !el.animate) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    const colors = ["#d4af37", "#fff3c4", "#e9c46a", "#f3ead6"];
    for (let n = 0; n < 28; n++) {
      const s = document.createElement("span");
      s.className = "spark";
      const sz = 4 + Math.random() * 6;
      s.style.cssText = `left:${cx}px;top:${cy}px;width:${sz}px;height:${sz * (Math.random() > .5 ? 1 : 2.2)}px;background:${colors[n % 4]}`;
      document.body.appendChild(s);
      const a = Math.random() * Math.PI * 2, d = 60 + Math.random() * 110;
      s.animate([
        { transform: "translate(-50%,-50%) rotate(0) scale(1)", opacity: 1 },
        { transform: `translate(calc(-50% + ${Math.cos(a) * d}px), calc(-50% + ${Math.sin(a) * d + 40}px)) rotate(${Math.random() * 720}deg) scale(.3)`, opacity: 0 }
      ], { duration: 900 + Math.random() * 600, easing: "cubic-bezier(.15,.7,.3,1)" }).onfinish = () => s.remove();
    }
  };
  $("#save-contact").addEventListener("click", (e) => burst(e.currentTarget));
  $("#share").addEventListener("click", (e) => burst(e.currentTarget));

  // Desktop: cursor spotlight + magnetic buttons
  if (finePointer && !reduced) {
    const spot = $("#spot");
    addEventListener("pointermove", (e) => {
      spot.classList.add("on");
      spot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    }, { passive: true });
    document.addEventListener("pointerleave", () => spot.classList.remove("on"));
    document.querySelectorAll(".btn, #to-top").forEach((b) => {
      b.addEventListener("pointermove", (e) => {
        const r = b.getBoundingClientRect();
        b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px, ${(e.clientY - r.top - r.height / 2) * 0.35}px)`;
      });
      b.addEventListener("pointerleave", () => { b.style.transform = ""; });
    });
  }

  // Phones: gentle tilt of the portrait with device motion (if permitted without prompt)
  if (!finePointer && !reduced && "DeviceOrientationEvent" in window && typeof DeviceOrientationEvent.requestPermission !== "function") {
    const av = document.querySelector(".avatar");
    addEventListener("deviceorientation", (e) => {
      if (e.gamma == null) return;
      const x = Math.max(-1, Math.min(1, e.gamma / 30)), y = Math.max(-1, Math.min(1, (e.beta - 45) / 30));
      av.style.transform = `perspective(600px) rotateY(${x * 10}deg) rotateX(${-y * 8}deg)`;
    }, { passive: true });
  }

  /* ---------------- loader ---------------- */
  document.body.classList.add("loading");
  const finish = () => {
    $("#loader").classList.add("done");
    document.body.classList.remove("loading");
    start();
    onScroll();
    setTimeout(shimmerName, reduced ? 0 : nameLen * 45 + 1300);
  };
  setTimeout(finish, reduced ? 0 : 2400);
})();
