import { records } from "./records.js";
const esc = (s) =>
  String(s ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const groups = [
  { id: "machine-learning", name: "Machine Learning", key: "ml" },
  { id: "microsoft", name: "Microsoft & LinkedIn", key: "microsoft" },
  { id: "hackerrank", name: "HackerRank", key: "hackerrank" },
  { id: "participation", name: "Participation", key: "participation" },
  { id: "forage", name: "Forage simulations", key: "forage" },
  { id: "yuva", name: "YuvaIntern", key: "yuva" },
  { id: "oracle", name: "Oracle Agentic AI", key: "oracle" },
];
const bullets = (items) =>
  items?.length
    ? `<ul class="learning-points">${items
        .slice(0, 6)
        .map((x) => `<li>${esc(x)}</li>`)
        .join("")}</ul>`
    : "";
const doc = (c) =>
  `<figure class="document"><a class="document-preview" href="${esc(c.pdf || c.image)}" target="_blank" rel="noopener noreferrer" aria-label="Open ${esc(c.title)} ${c.pdf ? "PDF" : "document"}"><img src="${esc(c.image)}" alt="${esc(c.title)} certificate" width="792" height="612" decoding="async"><span class="image-error">Preview unavailable. Open the original document ↗</span></a><figcaption class="document-actions"><a href="${esc(c.pdf || c.image)}" target="_blank" rel="noopener noreferrer">${c.pdf ? "Open PDF" : "Open document"} ↗</a>${c.url ? `<a class="verify" href="${esc(c.url)}" target="_blank" rel="noopener noreferrer">Verify ${c.url.includes("coursera") ? "on Coursera" : "credential"} ↗</a>` : ""}</figcaption></figure>`;
const card = (c, i) =>
  `<article class="certificate-card" id="document-${i}">${doc(c)}<span class="eyebrow">${esc(c.date)}</span><h3>${esc(c.title)}</h3><p class="issuer">${esc(c.issuer || "DeepLearning.AI · Stanford Online")}</p>${bullets(c.bullets)}${c.project ? `<a class="text-link" href="${esc(c.project)}" target="_blank" rel="noopener noreferrer">Explore the project ↗</a>` : ""}</article>`;
const featured = (r, title) =>
  `<div class="record-hero"><div>${doc(r)}</div><div><span class="eyebrow">${esc(r.kind)} · ${esc(r.date)}</span><h3>${esc(title)}</h3><p class="issuer">${esc(r.issuer)}</p>${bullets(r.bullets)}</div></div>`;
const mlBody = () =>
  featured(records.ml, "What I learned") +
  `<p class="section-label">The three-course series</p><div class="course-grid">${records.ml.courses.map(card).join("")}</div>`;
document.querySelector("#ml-feature").innerHTML = mlBody();
for (const nav of document.querySelectorAll(".index nav,.mobile-index"))
  nav.innerHTML = groups
    .map((g) => `<a href="#${g.id}">${esc(g.name)}</a>`)
    .join("");
const preview = (r, key) =>
  `<button type="button" class="preview-button" data-open="${key}" aria-label="Open ${esc(r.title)} collection"><img src="${esc(r.image)}" alt="${esc(r.title)} certificate preview" decoding="async"><span>View collection ↗</span></button>`;
const entries = [
  {
    id: "microsoft",
    key: "microsoft",
    label: "02 / Learning path",
    title: "Career Essentials in Generative AI",
    issuer: "Microsoft & LinkedIn",
    summary:
      "Generative-AI concepts, AI literacy, ethical use and everyday applications.",
    visual: preview(records.microsoft, "microsoft"),
    action: "Explore learning path",
  },
  {
    id: "hackerrank",
    key: "hackerrank",
    label: "03 / Skills assessments",
    title: "Programming foundations",
    issuer: "HackerRank",
    summary:
      "Basic-level assessments in programming, databases and web styling.",
    contents: records.hackerrank.map((c) => c.title),
    action: "View assessment records",
  },
  {
    id: "participation",
    key: "participation",
    label: "04 / Hackathons",
    title: "Hackathon participation",
    issuer: "Gradient · Adobe · Geeks2Code",
    summary:
      "Participation records, including the Gradient data analytics challenge and VoltRelay notebook.",
    visual: preview(records.participation[0], "participation"),
    action: "Open participation records",
  },
  {
    id: "forage",
    key: "forage",
    label: "05 / Job simulations",
    title: "Forage simulations",
    issuer: "Mastercard · Datacom · BCG X · Tata · Deloitte",
    summary:
      "Practice exercises in data analytics, generative AI, cybersecurity and AI-assisted work.",
    visual: preview(records.forage[3], "forage"),
    action: "Explore simulation work",
  },
  {
    id: "yuva",
    key: "yuva",
    label: "06 / Virtual programs",
    title: "YuvaIntern programs",
    issuer: "YuvaIntern",
    summary:
      "R Data Analyst, Data Science Explorer and Data Science with Python. Program documents and concise coursework summaries.",
    visual: preview(records.yuva[0].docs[1], "yuva"),
    action: "Open program records",
  },
  {
    id: "oracle",
    key: "oracle",
    label: "07 / Foundations credential",
    title: records.oracle.title,
    issuer: "Oracle",
    summary: "Issued " + records.oracle.date + ".",
    visual: preview(records.oracle, "oracle"),
    action: "Open Oracle certificate",
  },
];
document.querySelector("#collections").innerHTML = entries
  .map(
    (e) =>
      `<section class="collection-row ${e.visual ? "" : "no-preview"}" id="${e.id}" aria-labelledby="${e.id}-title"><div><span class="eyebrow">${e.label}</span><h2 id="${e.id}-title">${esc(e.title)}</h2><p class="issuer">${esc(e.issuer)}</p><p>${esc(e.summary)}</p>${e.contents ? `<ul class="contents-list">${e.contents.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>` : ""}<button type="button" class="text-link" data-open="${e.key}">${e.action} ↗</button></div>${e.visual || ""}</section>`,
  )
  .join("");
const dialog = document.querySelector("#record-dialog"),
  content = document.querySelector("#record-content");
let returnFocus = null;
function program(p, i) {
  const completion = p.docs.at(-1),
    offer = p.docs.length > 1 ? p.docs[0] : null;
  return `<section class="program"><span class="eyebrow">${String(i + 1).padStart(2, "0")} / ${esc(p.period)}</span><h3>${esc(p.title)}</h3><p class="meta">${esc(p.duration)}</p><div class="program-layout ${offer ? "" : "completion-only"}">${offer ? `<div class="document"><p class="document-label">Offer letter</p>${doc(offer)}</div>` : ""}<div class="program-activities"><p class="activity-title">${p.bullets.length > 1 ? "Coursework & activities" : "Program record"}</p>${bullets(p.bullets)}${p.note ? `<p class="note">${esc(p.note)}</p>` : ""}</div><div class="document"><p class="document-label">Completion certificate</p>${doc(completion)}</div></div></section>`;
}
function openRecord(key) {
  if (!dialog.open) returnFocus = document.activeElement;
  const g = groups.find((x) => x.key === key);
  let body = "";
  if (key === "ml") body = mlBody();
  else if (key === "microsoft")
    body =
      featured(records.microsoft, "What I learned") +
      `<p class="section-label">Course certificates</p><div class="record-grid">${records.microsoft.courses.map(card).join("")}</div>`;
  else if (key === "yuva") body = records.yuva.map(program).join("");
  else if (key === "oracle")
    body = featured(records.oracle, "Agentic AI foundations");
  else
    body = `<div class="record-grid">${records[key].map(card).join("")}</div>`;
  const title =
    key === "ml"
      ? records.ml.title
      : key === "microsoft"
        ? records.microsoft.title
        : g.name;
  content.innerHTML = `<header class="collection-intro"><h2 id="record-title">${esc(title)}</h2><p>Pranav Teja Aluvala · Learning record</p></header>${body}<footer class="collection-end"><button type="button" data-close>← All collections</button>${groups.indexOf(g) < groups.length - 1 ? `<button type="button" data-open="${groups[groups.indexOf(g) + 1].key}">Next collection →</button>` : ""}</footer>`;
  document.querySelector("#record-tabs").innerHTML = groups
    .map(
      (x) =>
        `<button type="button" data-open="${x.key}" aria-current="${x.key === key}">${esc(x.name)}</button>`,
    )
    .join("");
  if (!dialog.open) dialog.showModal();
  dialog.scrollTo({ top: 0, behavior: "instant" });
  const tabs = document.querySelector("#record-tabs"),
    tab = tabs.querySelector("[aria-current=true]");
  tabs.scrollTo({
    left: tab.offsetLeft - tabs.offsetLeft - 15,
    behavior: "instant",
  });
  enhance(content);
}
document.addEventListener("click", (e) => {
  const open = e.target.closest("[data-open]");
  if (open) openRecord(open.dataset.open);
  if (e.target.closest("[data-close]")) dialog.close();
});
dialog.addEventListener("close", () =>
  returnFocus?.focus({ preventScroll: true }),
);
document.addEventListener(
  "error",
  (e) => {
    if (e.target.tagName === "IMG")
      e.target.closest(".document-preview")?.classList.add("failed");
  },
  true,
);
function enhance(root) {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries)
        if (e.isIntersecting) {
          e.target.classList.add("reveal");
          observer.unobserve(e.target);
        }
    },
    { root: dialog.open ? dialog : null, threshold: 0.05 },
  );
  root
    .querySelectorAll(".certificate-card,.collection-row,.program")
    .forEach((el) => observer.observe(el));
}
enhance(document.querySelector("main"));
