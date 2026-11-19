import { PROJECTS, I18N, CATEGORIES } from "./data.js";
import { firebaseConfig, isConfigured, fb } from "./firebase-config.js";

const store = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch { /* приватний режим */ } },
};

let lang = store.get("lang") || ((navigator.language || "uk").startsWith("uk") ? "uk" : "en");
let filter = "all";
let projects = PROJECTS;

const t = (key) => I18N[lang][key] ?? key;
const el = (tag, cls, text) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text != null) n.textContent = text;
  return n;
};

function applyI18n() {
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((n) => { n.textContent = t(n.dataset.i18n); });
  // Лише наші власні рядки зі словника, не дані користувачів.
  document.querySelectorAll("[data-i18n-html]").forEach((n) => { n.innerHTML = t(n.dataset.i18nHtml); });
  document.getElementById("lang").textContent = lang === "uk" ? "EN" : "UA";
}

function renderStats() {
  const years = projects.map((p) => Number(p.year)).filter(Boolean);
  const tech = new Set(projects.flatMap((p) => p.stack || []));
  document.getElementById("stat-projects").textContent = projects.length;
  document.getElementById("stat-years").textContent = years.length ? Math.min(...years) : "–";
  document.getElementById("stat-tech").textContent = tech.size;
}

function renderFilters() {
  const box = document.getElementById("filters");
  box.replaceChildren();
  ["all", ...CATEGORIES].forEach((c) => {
    const count = c === "all" ? projects.length : projects.filter((p) => p.category === c).length;
    if (c !== "all" && !count) return;
    const b = el("button", "chip" + (filter === c ? " is-active" : ""));
    b.type = "button";
    b.setAttribute("aria-pressed", String(filter === c));
    b.append(t("f." + c), el("span", "chip__n", count));
    b.addEventListener("click", () => { filter = c; renderFilters(); renderProjects(); });
    box.append(b);
  });
}

function projectCard(p) {
  const card = el("article", "card");
  const head = el("div", "card__head");
  head.append(el("span", "card__cat", t("f." + p.category)), el("span", "card__year", p.year));
  const title = el("h3", "card__title", (lang === "en" && p.title_en) || p.title);
  const desc = el("p", "card__desc", lang === "uk" ? p.desc_uk : p.desc_en || p.desc_uk);
  const tags = el("ul", "tags");
  (p.stack || []).forEach((s) => tags.append(el("li", null, s)));
  const foot = el("div", "card__foot");
  if (!p.private && /^https:\/\//.test(p.repo || "")) {
    const a = el("a", "card__link", t("p.code") + " →");
    a.href = p.repo;
    a.target = "_blank";
    a.rel = "noopener";
    foot.append(a);
  } else {
    foot.append(el("span", "card__lock", "🔒 " + t("p.private")));
  }
  card.append(head, title, desc, tags, foot);
  return card;
}

function renderProjects() {
  const grid = document.getElementById("grid");
  const list = projects
    .filter((p) => filter === "all" || p.category === filter)
    .sort((a, b) => b.year - a.year);
  grid.replaceChildren(...(list.length ? list.map(projectCard) : [el("p", "muted", t("p.empty"))]));
}

function renderStack() {
  const counts = new Map();
  projects.forEach((p) => (p.stack || []).forEach((s) => counts.set(s, (counts.get(s) || 0) + 1)));
  const box = document.getElementById("stack-list");
  box.replaceChildren(
    ...[...counts.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([name, n]) => {
        const li = el("li", n > 2 ? "is-strong" : null, name);
        if (n > 1) li.append(el("span", "chip__n", "×" + n));
        return li;
      })
  );
}

function renderAll() {
  applyI18n();
  renderStats();
  renderFilters();
  renderProjects();
  renderStack();
}

// Якщо Firebase налаштовано і в базі є проєкти — показуємо їх замість стартового списку.
async function loadFromFirestore() {
  if (!isConfigured()) return;
  try {
    const [{ initializeApp }, { getFirestore, collection, getDocs }] = await Promise.all([fb("app"), fb("firestore")]);
    const db = getFirestore(initializeApp(firebaseConfig));
    const snap = await getDocs(collection(db, "projects"));
    if (snap.empty) return;
    projects = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    renderAll();
  } catch (e) {
    console.warn("Firestore недоступний, показую стартовий список:", e);
  }
}

document.getElementById("lang").addEventListener("click", () => {
  lang = lang === "uk" ? "en" : "uk";
  store.set("lang", lang);
  renderAll();
});
document.getElementById("year").textContent = new Date().getFullYear();

renderAll();
loadFromFirestore();
