// app.js
const state = {
  faqs: [],
  activeCategory: "All",
  query: ""
};

const els = {
  title: document.getElementById("site-title"),
  subtitle: document.getElementById("site-subtitle"),
  tabs: document.getElementById("tabs"),
  list: document.getElementById("faq-list"),
  search: document.getElementById("search"),
  resultCount: document.getElementById("result-count"),
  emptyState: document.getElementById("empty-state"),
  emptyQuery: document.getElementById("empty-query"),
  contact: document.getElementById("contact-line"),
  updated: document.getElementById("updated-line"),
};

init();

async function init() {
  let data;
  try {
    const res = await fetch("faq.json", { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    data = await res.json();
  } catch (err) {
    if (els.list) {
      els.list.innerHTML = `<p class="loading">Couldn't load faq.json (${err.message}).</p>`;
    }
    return;
  }

  renderMeta(data.meta || {});
  state.faqs = data.faqs || [];
  
  assignDisplayIds(state.faqs, data.categories || []);
  renderTabs(["All", ...(data.categories || [])]);
  renderList();

  if (els.search) {
    els.search.addEventListener("input", (e) => {
      state.query = e.target.value.trim().toLowerCase();
      renderList();
    });
  }
}

function assignDisplayIds(faqs, categories) {
  const prefixes = buildCategoryPrefixes(categories);
  const counters = {};
  faqs.forEach((item) => {
    const prefix = prefixes[item.category] || "GEN";
    counters[prefix] = (counters[prefix] || 0) + 1;
    item.displayId = `${prefix}-${String(counters[prefix]).padStart(3, "0")}`;
  });
}

function buildCategoryPrefixes(categories) {
  const used = new Set();
  const map = {};
  categories.forEach((cat) => {
    const words = cat.split(/[\s&]+/).filter(Boolean);
    const base = words.length === 1
      ? words[0].slice(0, 3).toUpperCase()
      : words.slice(0, 3).map((w) => w[0]).join("").toUpperCase();

    let prefix = base;
    let n = 1;
    while (used.has(prefix)) {
      n += 1;
      prefix = `${base}${n}`;
    }
    used.add(prefix);
    map[cat] = prefix;
  });
  return map;
}

function renderMeta(meta) {
  if (meta.title && els.title) els.title.textContent = meta.title;
  if (meta.subtitle && els.subtitle) els.subtitle.textContent = meta.subtitle;
  if (els.contact) els.contact.innerHTML = meta.contact || "";
  if (els.updated) els.updated.textContent = meta.lastUpdated ? `Last updated ${meta.lastUpdated}` : "";
}

function renderTabs(categories) {
  if (!els.tabs) return;
  els.tabs.innerHTML = "";
  categories.forEach((cat) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "tab";
    btn.textContent = cat;
    btn.setAttribute("aria-pressed", cat === state.activeCategory ? "true" : "false");
    btn.addEventListener("click", () => {
      state.activeCategory = cat;
      [...els.tabs.children].forEach((c) =>
        c.setAttribute("aria-pressed", c === btn ? "true" : "false")
      );
      renderList();
    });
    els.tabs.appendChild(btn);
  });
}

function renderList() {
  const q = state.query;
  const filtered = state.faqs.filter((item) => {
    const matchesCategory = state.activeCategory === "All" || item.category === state.activeCategory;
    if (!matchesCategory) return false;
    if (!q) return true;
    const haystack = `${item.question} ${item.answer} ${item.category}`.toLowerCase();
    return haystack.includes(q);
  });

  if (els.resultCount) els.resultCount.textContent = `${filtered.length} of ${state.faqs.length} answers`;
  if (!els.list) return;
  els.list.innerHTML = "";

  if (filtered.length === 0) {
    if (els.emptyQuery) els.emptyQuery.textContent = state.query || state.activeCategory;
    if (els.emptyState) els.emptyState.hidden = false;
    return;
  }
  if (els.emptyState) els.emptyState.hidden = true;

  filtered.forEach((item) => {
    els.list.appendChild(buildCard(item));
  });
}

function buildCard(item) {
  const details = document.createElement("details");
  details.className = "faq-card";
  details.name = "faq-accordion";

  const summary = document.createElement("summary");
  summary.innerHTML = `
    <span class="faq-index">${escapeHtml(item.displayId || "")}</span>
    <span class="faq-question-block">
      <span class="faq-category">${escapeHtml(item.category || "")}</span>
      <span class="faq-question">${escapeHtml(item.question)}</span>
    </span>
  `;

  const answer = document.createElement("div");
  answer.className = "faq-answer";
  const paragraphs = String(item.answer || "")
    .split(/\n\s*\n/)
    .map((p) => `<p>${p.trim()}</p>`)
    .join("");
  answer.innerHTML = paragraphs;

  details.appendChild(summary);
  details.appendChild(answer);
  return details;
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}