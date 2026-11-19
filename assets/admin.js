import { PROJECTS } from "./data.js";
import { firebaseConfig, isConfigured, fb } from "./firebase-config.js";

const $ = (id) => document.getElementById(id);
const views = ["setup", "login", "denied", "app"];
const show = (name) => views.forEach((v) => { $("view-" + v).hidden = v !== name; });
const status = (id, text, err = false) => {
  const n = $(id);
  n.textContent = text;
  n.classList.toggle("is-err", err);
};

if (!isConfigured()) {
  show("setup");
} else {
  start().catch((e) => {
    show("login");
    status("login-err", "Не вдалося запустити Firebase: " + e.message, true);
  });
}

async function start() {
  const [{ initializeApp }, auth, fs, { marked }, { default: DOMPurify }] = await Promise.all([
    fb("app"),
    fb("auth"),
    fb("firestore"),
    import("https://cdn.jsdelivr.net/npm/marked@12.0.2/lib/marked.esm.js"),
    import("https://cdn.jsdelivr.net/npm/dompurify@3.1.6/dist/purify.es.mjs"),
  ]);
  const app = initializeApp(firebaseConfig);
  const authn = auth.getAuth(app);
  const db = fs.getFirestore(app);
  const docsCol = fs.collection(db, "docs");
  const projCol = fs.collection(db, "projects");

  let docs = [];
  let currentDoc = null; // id або null для нового
  let projects = [];
  let currentProject = null;

  // ---------- Вхід ----------
  $("signin").addEventListener("click", async () => {
    status("login-err", "");
    try {
      await auth.signInWithPopup(authn, new auth.GoogleAuthProvider());
    } catch (e) {
      if (e.code !== "auth/popup-closed-by-user") status("login-err", "Помилка входу: " + (e.code || e.message), true);
    }
  });
  $("signout").addEventListener("click", () => auth.signOut(authn));
  $("retry").addEventListener("click", () => enter(authn.currentUser));

  auth.onAuthStateChanged(authn, (user) => {
    $("who").hidden = !user;
    $("who-name").textContent = user ? user.displayName || user.email || "" : "";
    if (user) enter(user);
    else show("login");
  });

  // Чи власник — вирішують правила Firestore: читання `docs` дозволене лише йому.
  async function enter(user) {
    try {
      await loadDocs();
      show("app");
      selectDoc(docs[0]?.id ?? null);
      await loadProjects();
    } catch (e) {
      if (e.code === "permission-denied") {
        $("uid").textContent = user.uid;
        show("denied");
      } else {
        show("login");
        status("login-err", "Помилка бази даних: " + (e.code || e.message), true);
      }
    }
  }

  // ---------- Вкладки ----------
  document.querySelectorAll("[data-tab]").forEach((b) =>
    b.addEventListener("click", () => {
      document.querySelectorAll("[data-tab]").forEach((x) => x.classList.toggle("is-active", x === b));
      $("tab-docs").hidden = b.dataset.tab !== "docs";
      $("tab-projects").hidden = b.dataset.tab !== "projects";
    })
  );

  const listItem = (title, sub, active, onClick) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "list__item" + (active ? " is-active" : "");
    b.textContent = title || "Без назви";
    if (sub) {
      const s = document.createElement("small");
      s.textContent = sub;
      b.append(s);
    }
    b.addEventListener("click", onClick);
    return b;
  };

  // ---------- Документація ----------
  async function loadDocs() {
    const snap = await fs.getDocs(fs.query(docsCol, fs.orderBy("updatedAt", "desc")));
    docs = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  }

  function renderDocList() {
    $("doc-list").replaceChildren(
      ...docs.map((d) =>
        listItem(d.title, d.updatedAt?.toDate?.().toLocaleDateString("uk-UA") ?? "", d.id === currentDoc, () => selectDoc(d.id))
      )
    );
  }

  function selectDoc(id) {
    currentDoc = id;
    const d = docs.find((x) => x.id === id);
    $("doc-title").value = d?.title ?? "";
    $("doc-body").value = d?.body ?? "";
    $("doc-del").hidden = !d;
    status("doc-status", d ? "" : "Новий документ");
    setMode(d ? "view" : "edit");
    renderDocList();
  }

  function setMode(mode) {
    const view = mode === "view";
    $("doc-mode-view").classList.toggle("is-active", view);
    $("doc-mode-edit").classList.toggle("is-active", !view);
    $("doc-body").hidden = view;
    $("doc-preview").hidden = !view;
    if (view) $("doc-preview").innerHTML = DOMPurify.sanitize(marked.parse($("doc-body").value || "*Порожньо*"));
  }
  $("doc-mode-view").addEventListener("click", () => setMode("view"));
  $("doc-mode-edit").addEventListener("click", () => setMode("edit"));
  $("doc-new").addEventListener("click", () => { selectDoc(null); $("doc-title").focus(); });

  $("doc-save").addEventListener("click", async () => {
    const title = $("doc-title").value.trim();
    if (!title) { status("doc-status", "Вкажіть назву", true); return; }
    status("doc-status", "Зберігаю…");
    try {
      const data = { title, body: $("doc-body").value, updatedAt: fs.serverTimestamp() };
      if (currentDoc) await fs.setDoc(fs.doc(docsCol, currentDoc), data);
      else currentDoc = (await fs.addDoc(docsCol, data)).id;
      await loadDocs();
      $("doc-del").hidden = false;
      renderDocList();
      status("doc-status", "Збережено ✓");
    } catch (e) {
      status("doc-status", "Не збережено: " + (e.code || e.message), true);
    }
  });

  $("doc-del").addEventListener("click", async () => {
    if (!currentDoc || !confirm("Видалити цей документ назавжди?")) return;
    try {
      await fs.deleteDoc(fs.doc(docsCol, currentDoc));
      await loadDocs();
      selectDoc(docs[0]?.id ?? null);
    } catch (e) {
      status("doc-status", "Не видалено: " + (e.code || e.message), true);
    }
  });

  // ---------- Проєкти ----------
  const form = $("pr-form");

  async function loadProjects() {
    const snap = await fs.getDocs(projCol);
    projects = snap.docs.map((d) => ({ id: d.id, ...d.data() })).sort((a, b) => b.year - a.year);
    $("pr-import").hidden = projects.length > 0;
    selectProject(currentProject && projects.some((p) => p.id === currentProject) ? currentProject : projects[0]?.id ?? null);
  }

  function selectProject(id) {
    currentProject = id;
    const p = projects.find((x) => x.id === id) ?? {};
    form.title.value = p.title ?? "";
    form.title_en.value = p.title_en ?? "";
    form.year.value = p.year ?? new Date().getFullYear();
    form.category.value = p.category ?? "web";
    form.desc_uk.value = p.desc_uk ?? "";
    form.desc_en.value = p.desc_en ?? "";
    form.stack.value = (p.stack ?? []).join(", ");
    form.repo.value = p.repo ?? "";
    form.private.checked = Boolean(p.private);
    $("pr-del").hidden = !id;
    status("pr-status", id ? "" : "Новий проєкт");
    $("pr-list").replaceChildren(
      ...projects.map((x) => listItem(x.title, `${x.year} · ${x.private ? "закритий" : "відкритий"}`, x.id === id, () => selectProject(x.id)))
    );
  }

  const toRecord = (p) => ({
    title: p.title,
    title_en: p.title_en || "",
    year: Number(p.year),
    category: p.category,
    desc_uk: p.desc_uk,
    desc_en: p.desc_en || "",
    stack: p.stack,
    repo: p.repo || "",
    private: Boolean(p.private),
  });

  $("pr-new").addEventListener("click", () => { selectProject(null); form.title.focus(); });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status("pr-status", "Зберігаю…");
    const data = toRecord({
      title: form.title.value.trim(),
      title_en: form.title_en.value.trim(),
      year: form.year.value,
      category: form.category.value,
      desc_uk: form.desc_uk.value.trim(),
      desc_en: form.desc_en.value.trim(),
      stack: form.stack.value.split(",").map((s) => s.trim()).filter(Boolean),
      repo: form.repo.value.trim(),
      private: form.private.checked,
    });
    try {
      if (currentProject) await fs.setDoc(fs.doc(projCol, currentProject), data);
      else currentProject = (await fs.addDoc(projCol, data)).id;
      await loadProjects();
      status("pr-status", "Збережено ✓ — зміни вже на сайті");
    } catch (err) {
      status("pr-status", "Не збережено: " + (err.code || err.message), true);
    }
  });

  $("pr-del").addEventListener("click", async () => {
    if (!currentProject || !confirm("Видалити проєкт із сайту?")) return;
    try {
      await fs.deleteDoc(fs.doc(projCol, currentProject));
      currentProject = null;
      await loadProjects();
    } catch (err) {
      status("pr-status", "Не видалено: " + (err.code || err.message), true);
    }
  });

  $("pr-import").addEventListener("click", async () => {
    status("pr-status", "Імпортую…");
    try {
      const batch = fs.writeBatch(db);
      PROJECTS.forEach((p) => batch.set(fs.doc(projCol, p.id), toRecord(p)));
      await batch.commit();
      await loadProjects();
      status("pr-status", `Імпортовано ${PROJECTS.length} проєктів ✓`);
    } catch (err) {
      status("pr-status", "Імпорт не вдався: " + (err.code || err.message), true);
    }
  });
}
