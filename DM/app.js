const products = [
  { name: "Windeln", category: "Baby", image: "bilder/Babypflege-Windeln-1.png", task: "Express-Bestellung: Größe prüfen, Packung unbeschädigt nehmen und in die Baby-Kiste legen.", level: "starter", icon: "windel" },
  { name: "Baby-Feuchttücher", category: "Baby", image: "bilder/Babypflege-Babyfeuchttuecher-1.png", task: "Neben den Windeln auffüllen. Vorderkante bündig ziehen.", level: "starter", icon: "tücher" },
  { name: "Shampoo", category: "Haarpflege", image: "bilder/Haarpflege-Shampoo-1.png", task: "Flaschen nach vorne ziehen, Verschluss nach oben, Etikett nach vorne.", level: "starter", icon: "shampoo" },
  { name: "Zahnpasta", category: "Zahnpflege", image: "bilder/Zahnpflege-Zahnpasta-1.png", task: "Kartons ordentlich stapeln und die Sorte auf dem Preisschild prüfen.", level: "starter", icon: "zahn" },
  { name: "Zahnbürste", category: "Zahnpflege", image: "bilder/Zahnpflege-Zahnbuerste-1.png", task: "Haken auffüllen. Gleiche Farben und Sorten zusammen hängen.", level: "core", icon: "bürste" },
  { name: "Gesichtscreme", category: "Hautpflege", image: "bilder/Hautpflege-Gesichtscreme-1.png", task: "Tiegel mit sauberem Deckel nach vorne stellen und beschädigte Ware melden.", level: "starter", icon: "creme" },
  { name: "Bodylotion", category: "Hautpflege", image: "bilder/Hautpflege-Bodylocion-1.png", task: "Pumpflaschen gerade ausrichten. Kurze Flaschen vorne, hohe hinten.", level: "core", icon: "lotion" },
  { name: "Mascara", category: "Kosmetik", image: "bilder/Kosmetik-Maskara-1.png", task: "Aufsteller befüllen: Tester nicht verkaufen, neue Ware in die freien Fächer legen.", level: "starter", icon: "mascara" },
  { name: "Lippenpflege", category: "Kosmetik", image: "bilder/Kosmetik-Lippenpflege-1.png", task: "Kleine Ware sauber sortieren und fehlende Sorten aufschreiben.", level: "core", icon: "lippe" },
  { name: "Bio-Müsli", category: "Bio-Produkte", image: "bilder/Bioprodukte-Biomuesli-1.png", task: "MHD prüfen. Ältere Packungen nach vorne, neue Packungen nach hinten.", level: "starter", icon: "bio" },
  { name: "Bio-Tee", category: "Bio-Produkte", image: "bilder/Bioprodukte-Biotee-1.png", task: "Sorten zusammenstellen und das Preisschild mit dem Produkt vergleichen.", level: "core", icon: "tee" },
  { name: "Bio-Saft", category: "Bio-Produkte", image: "bilder/Bioprodukte-Biosaft-1.png", task: "MHD prüfen. Flaschen vorsichtig drehen und ältere Ware nach vorne stellen.", level: "core", icon: "bio" },
  { name: "Babygläschen Karotte", category: "Babynahrung", image: "bilder/Babynahrung-Karotte-1.png", task: "Glas auf Sprünge prüfen. MHD kontrollieren und ältere Gläschen nach vorne stellen.", level: "starter", icon: "glas" },
  { name: "Babygläschen Apfel", category: "Babynahrung", image: "bilder/Babynahrung-Obstglaeschen-1.png", task: "Deckel prüfen. Gläschen nach Sorte ordnen und das Mindesthaltbarkeitsdatum lesen.", level: "core", icon: "glas" },
  { name: "Babybrei Abendbrei", category: "Babynahrung", image: "bilder/Babynahrung-Abendbrei-1.png", task: "Packung trocken und sauber einräumen. MHD und Sorte mit dem Schild vergleichen.", level: "core", icon: "brei" },
  { name: "Schokoladenriegel", category: "Süßwaren", image: "bilder/Suesswaren-Schokoladenriegel-1.png", task: "MHD prüfen. Riegel mit kurzem Datum nach vorne legen und beschädigte Ware melden.", level: "starter", icon: "riegel" },
  { name: "Traubenzucker", category: "Süßwaren", image: "bilder/Suesswaren-Traubenzucker-1.png", task: "Kleine Packungen gerade ausrichten und fehlende Sorten notieren.", level: "core", icon: "riegel" },
  { name: "Rasiergel", category: "Männerpflege", image: "bilder/Maennerpflege-Rasiergel.png", task: "Dosen aufrecht stellen. Verschluss und Etikett nach vorne ausrichten.", level: "starter", icon: "rasur" },
  { name: "Aftershave", category: "Männerpflege", image: "bilder/Maennerpflege-After-Shave-1.png", task: "Flaschen vorsichtig einräumen und Glasverpackungen nicht an die Regalkante stellen.", level: "core", icon: "rasur" },
  { name: "Deo Männer", category: "Männerpflege", image: "bilder/Männerpflege-Deo-1.png", task: "Spraydosen nach Duft sortieren und leere Plätze im Regal melden.", level: "core", icon: "deo" },
  { name: "Parfüm Damen", category: "Parfüm", image: "bilder/Paefuem-Damenparfuem-1.png", task: "Verpackung sauber hinstellen. Tester und Verkaufsware getrennt lassen.", level: "core", icon: "parfum" },
  { name: "Parfüm Herren", category: "Parfüm", image: "bilder/Parfuem-Herrenparfuem-1.png", task: "Sicher in den Aufsteller stellen und das Preisschild mit dem Duft vergleichen.", level: "core", icon: "parfum" },
  { name: "Waschmittel", category: "Haushaltswaren", image: "bilder/Haushaltswaren-Waschmittel-1.png", task: "Schwere Flaschen sicher anfassen und nicht über Schulterhöhe stapeln.", level: "starter", icon: "wasch" },
  { name: "Spülmittel", category: "Haushaltswaren", image: "bilder/Haushaltswaren-Spuelmittel-1.png", task: "Flaschen gerade stellen und ausgelaufene Ware sofort melden.", level: "starter", icon: "spül" },
  { name: "Küchenrolle", category: "Haushaltswaren", image: "bilder/Haushaltswaren-Kuechenrolle-1.png", task: "Große Ware unten einräumen, damit das Regal sicher bleibt.", level: "core", icon: "rolle" },
  { name: "Fotopapier", category: "Foto-Service", image: "bilder/Fotoservice-Fotopapier-1.png", task: "Beim Fotoautomaten Papierfach nur mit Anleitung einer Fachkraft öffnen.", level: "all", icon: "foto" },
  { name: "Kopierpapier", category: "Kopier-Service", image: "bilder/Kopierservice-Kopierpapier-1.png", task: "Kunden beim Kopieren helfen: Vorlagen richtig auflegen und Starttaste erklären.", level: "all", icon: "kopie" }
];

const categories = ["Baby", "Babynahrung", "Haarpflege", "Zahnpflege", "Hautpflege", "Kosmetik", "Männerpflege", "Parfüm", "Bio-Produkte", "Süßwaren", "Haushaltswaren", "Foto-Service", "Kopier-Service"];

const dateTasks = [
  { product: "Bio-Müsli", dateOffset: -12, answer: "Aussortieren", note: "Das Mindesthaltbarkeitsdatum ist abgelaufen. Die Ware wird einer Fachkraft gezeigt." },
  { product: "Bio-Tee", dateOffset: 12, answer: "Nach vorne", note: "Das Datum ist bald erreicht. Die Packung kommt sichtbar nach vorne." },
  { product: "Shampoo", dateOffset: 260, answer: "Im Regal lassen", note: "Das Datum ist noch weit genug weg. Die Flasche wird nur ordentlich vorgezogen." },
  { product: "Gesichtscreme", dateOffset: 22, answer: "Nach vorne", note: "Bald ablaufende Ware steht vorne. Neue Ware kommt dahinter." },
  { product: "Baby-Feuchttücher", dateOffset: -3, answer: "Aussortieren", note: "Abgelaufene Ware wird nicht verkauft und wird gemeldet." },
  { product: "Babygläschen Karotte", dateOffset: 18, answer: "Nach vorne", note: "Das Datum ist bald erreicht. Das Gläschen kommt nach vorne und wird gut sichtbar gestellt." },
  { product: "Babygläschen Apfel", dateOffset: -1, answer: "Aussortieren", note: "Das Mindesthaltbarkeitsdatum ist abgelaufen. Das Gläschen wird nicht verkauft." },
  { product: "Babybrei Abendbrei", dateOffset: 180, answer: "Im Regal lassen", note: "Das Datum ist noch weit genug weg. Die Packung bleibt im Regal und wird ordentlich gestellt." },
  { product: "Schokoladenriegel", dateOffset: 9, answer: "Nach vorne", note: "Der Riegel läuft bald ab. Ware mit kurzem Datum kommt nach vorne." },
  { product: "Bio-Saft", dateOffset: -8, answer: "Aussortieren", note: "Das Datum ist abgelaufen. Die Flasche wird einer Fachkraft gezeigt." }
];

const expressOrders = [
  { customer: "Eine Familie braucht schnell Windeln, Feuchttücher und Babycreme.", items: ["Windeln", "Baby-Feuchttücher", "Gesichtscreme"], speak: "Express-Bestellung: Windeln, Feuchttücher und Babycreme." },
  { customer: "Eine Kundin bestellt Shampoo, Zahnpasta und eine Zahnbürste.", items: ["Shampoo", "Zahnpasta", "Zahnbürste"], speak: "Express-Bestellung: Shampoo, Zahnpasta und Zahnbürste." },
  { customer: "Ein Kunde braucht Bio-Müsli, Bio-Tee und Küchenrolle.", items: ["Bio-Müsli", "Bio-Tee", "Küchenrolle"], speak: "Express-Bestellung: Bio-Müsli, Bio-Tee und Küchenrolle." },
  { customer: "Für den Haushalt werden Waschmittel, Spülmittel und Küchenrolle gebraucht.", items: ["Waschmittel", "Spülmittel", "Küchenrolle"], speak: "Express-Bestellung: Waschmittel, Spülmittel und Küchenrolle." },
  { customer: "Ein Vater braucht Babygläschen Karotte, Babygläschen Apfel und Windeln.", items: ["Babygläschen Karotte", "Babygläschen Apfel", "Windeln"], speak: "Express-Bestellung: Babygläschen Karotte, Babygläschen Apfel und Windeln." },
  { customer: "Ein Kunde bestellt Rasiergel, Deo Männer und Aftershave.", items: ["Rasiergel", "Deo Männer", "Aftershave"], speak: "Express-Bestellung: Rasiergel, Männerdeo und Aftershave." },
  { customer: "Eine Kundin braucht Schokoladenriegel, Bio-Saft und Bio-Tee.", items: ["Schokoladenriegel", "Bio-Saft", "Bio-Tee"], speak: "Express-Bestellung: Schokoladenriegel, Bio-Saft und Bio-Tee." }
];

const displayTasks = [
  { title: "Haarpflege-Aufsteller", prompt: "Fülle den Aufsteller mit Haarpflege und Kosmetik. Was passt?", correct: ["Shampoo", "Mascara", "Lippenpflege"], distractors: ["Waschmittel", "Bio-Müsli", "Küchenrolle"] },
  { title: "Zahnpflege-Aufsteller", prompt: "Der Zahnpflege-Aufsteller soll ordentlich aussehen. Was passt?", correct: ["Zahnpasta", "Zahnbürste", "Lippenpflege"], distractors: ["Windeln", "Spülmittel", "Bio-Tee"] },
  { title: "Baby-Regal", prompt: "Im Baby-Regal fehlen wichtige Produkte. Was gehört dazu?", correct: ["Windeln", "Baby-Feuchttücher", "Gesichtscreme"], distractors: ["Mascara", "Waschmittel", "Fotopapier"] },
  { title: "Babynahrung-Regal", prompt: "Im Babynahrung-Regal soll nach Sorte eingeräumt werden. Was passt?", correct: ["Babygläschen Karotte", "Babygläschen Apfel", "Babybrei Abendbrei"], distractors: ["Rasiergel", "Parfüm Damen", "Spülmittel"] },
  { title: "Männerpflege-Aufsteller", prompt: "Der Männerpflege-Aufsteller wird aufgefüllt. Was passt?", correct: ["Rasiergel", "Aftershave", "Deo Männer"], distractors: ["Babygläschen Karotte", "Bio-Tee", "Mascara"] },
  { title: "Parfüm-Regal", prompt: "Im Parfüm-Regal sollen Düfte ordentlich stehen. Was passt?", correct: ["Parfüm Damen", "Parfüm Herren", "Aftershave"], distractors: ["Küchenrolle", "Schokoladenriegel", "Windeln"] }
];

const dialogs = [
  { customer: "Entschuldigung, ich möchte ein Dokument kopieren. Ich weiß nicht, wie das geht.", answer: "Gerne. Legen Sie die Seite mit der Schrift nach unten auf das Glas. Dann wählen wir Schwarz-Weiß oder Farbe und drücken Start.", wrong: ["Der Kopierer ist da hinten. Probieren Sie einfach irgendwas.", "Ich kann Ihnen nicht helfen, weil ich gerade Ware einräume."], note: "Freundlich bleiben, langsam erklären und Datenschutz beachten.", mode: "Kopieren" },
  { customer: "Ich möchte Fotos vom Handy bestellen. Können Sie mir helfen?", answer: "Ja, gerne. Wir gehen zusammen zum Fotoautomaten. Sie können Ihr Handy verbinden und dann die Bilder auswählen.", wrong: ["Dafür müssen Sie sofort ein neues Handy kaufen.", "Fotos gehen nur, wenn Sie alle Bilder ausdrucken."], note: "Beim Foto-Service Schritt für Schritt begleiten und immer um Erlaubnis fragen, bevor man das Handy berührt.", mode: "Foto-Service" },
  { customer: "Wo finde ich Zahnpasta für empfindliche Zähne?", answer: "Die Zahnpflege ist im Regal mit Zahnbürsten und Mundspülung. Ich zeige Ihnen die Stelle.", wrong: ["Das ist wahrscheinlich irgendwo bei den Windeln.", "Empfindliche Zähne haben wir grundsätzlich nicht."], note: "Zum Regal begleiten, wenn der Weg unklar ist.", mode: "Zahnpflege" },
  { customer: "Ich suche Bio-Tee. Gehört der zu Haushaltswaren?", answer: "Bio-Tee gehört zu Bio-Produkten. Ich zeige Ihnen das Bio-Regal.", wrong: ["Ja, Tee ist ein Haushaltsgerät.", "Nein, danach dürfen Kundinnen nicht fragen."], note: "Überbegriffe helfen beim Finden: Bio-Produkte, Kosmetik, Baby, Zahnpflege.", mode: "Überbegriffe" },
  { customer: "Ich brauche Babynahrung mit Karotte. Muss ich auf das Datum achten?", answer: "Ja. Bei Babynahrung prüfen wir das Mindesthaltbarkeitsdatum besonders sorgfältig. Ich zeige Ihnen die Gläschen.", wrong: ["Nein, bei Babynahrung ist das Datum egal.", "Nehmen Sie einfach irgendein Glas aus dem Regal."], note: "Bei Lebensmitteln und Babynahrung immer MHD, Glas und Deckel kontrollieren.", mode: "Babynahrung" },
  { customer: "Wo finde ich Rasiergel und Aftershave?", answer: "Das gehört zur Männerpflege. Ich zeige Ihnen das Regal mit Rasiergel, Deo und Aftershave.", wrong: ["Das steht bestimmt beim Kopierpapier.", "Rasiergel verkaufen wir nur bei der Babynahrung."], note: "Den passenden Überbegriff nennen und den Weg freundlich zeigen.", mode: "Männerpflege" }
];

const starterNames = new Set(["Windeln", "Baby-Feuchttücher", "Shampoo", "Zahnpasta", "Gesichtscreme", "Mascara", "Bio-Müsli", "Babygläschen Karotte", "Schokoladenriegel", "Rasiergel", "Waschmittel", "Spülmittel"]);

const state = {
  mode: "learn",
  filter: "starter",
  current: null,
  score: 0,
  voices: [],
  speechUnlocked: false,
  speechPrimed: false,
  pendingSpeech: null,
  speechToken: 0,
  selectedExpress: new Set(),
  selectedDisplay: new Set()
};

const panel = document.querySelector("#activity-panel");
const taskText = document.querySelector("#task-text");
const feedback = document.querySelector("#feedback");
const score = document.querySelector("#score");
const repeatButton = document.querySelector("#repeat");
const nextButton = document.querySelector("#next");
const voiceTestButton = document.querySelector("#voice-test");
const autoSpeak = document.querySelector("#auto-speak");
const levelFilter = document.querySelector("#level-filter");
const tabs = document.querySelectorAll(".tab");

function visibleProducts() {
  if (state.filter === "starter") {
    return products.filter((product) => starterNames.has(product.name));
  }
  if (state.filter === "core") {
    return products.filter((product) => product.level === "starter" || product.level === "core");
  }
  return products;
}

function flushPendingSpeech() {
  if (!state.pendingSpeech) {
    return;
  }
  const pending = state.pendingSpeech;
  state.pendingSpeech = null;
  speak(pending.text, true, pending.options);
}

function queueSpeech(text, options = {}) {
  state.pendingSpeech = { text, options };
}

function pickGermanVoice() {
  return state.voices.find((voice) => voice.lang?.toLowerCase() === "de-de")
    || state.voices.find((voice) => voice.lang?.toLowerCase().startsWith("de"))
    || state.voices[0]
    || null;
}

function loadVoices() {
  if (!("speechSynthesis" in window)) {
    return;
  }
  const voices = window.speechSynthesis.getVoices();
  if (Array.isArray(voices) && voices.length > 0) {
    state.voices = voices;
  }
}

function primeSpeech() {
  if (!("speechSynthesis" in window) || state.speechPrimed) {
    return;
  }
  state.speechPrimed = true;
  try {
    const utterance = new SpeechSynthesisUtterance(" ");
    utterance.lang = "de-DE";
    utterance.volume = 0;
    const germanVoice = pickGermanVoice();
    if (germanVoice) {
      utterance.voice = germanVoice;
    }
    window.speechSynthesis.speak(utterance);
  } catch (error) {
    state.speechPrimed = false;
  }
}

function unlockSpeech() {
  if (!("speechSynthesis" in window)) {
    return;
  }
  state.speechUnlocked = true;
  loadVoices();
  window.speechSynthesis.resume();
  if (!state.speechPrimed && !state.pendingSpeech) {
    primeSpeech();
  }
  flushPendingSpeech();
}

function speak(text, bypassLock = false, options = {}) {
  const { interrupt = true, onend = null, retry = true } = options;

  if (!("speechSynthesis" in window)) {
    setFeedback("Dieser Browser unterstützt hier keine Sprachausgabe.", "try");
    return;
  }

  if (!text) {
    return;
  }

  if (!state.speechUnlocked && !bypassLock) {
    queueSpeech(text, options);
    return;
  }

  loadVoices();

  if (interrupt) {
    window.speechSynthesis.cancel();
  }
  window.speechSynthesis.resume();
  const utterance = new SpeechSynthesisUtterance(text);
  const token = ++state.speechToken;
  utterance.lang = "de-DE";
  utterance.rate = 0.88;
  utterance.pitch = 1;
  utterance.volume = 1;
  const germanVoice = pickGermanVoice();
  if (germanVoice) {
    utterance.voice = germanVoice;
  }
  utterance.onend = () => {
    if (token !== state.speechToken) {
      return;
    }
    if (typeof onend === "function") {
      onend();
    }
  };
  utterance.onerror = (event) => {
    if (retry && ["interrupted", "canceled", "audio-busy"].includes(event?.error)) {
      window.setTimeout(() => {
        speak(text, true, { ...options, retry: false });
      }, 120);
      return;
    }
    setFeedback("Die Sprachausgabe konnte gerade nicht gestartet werden.", "try");
    if (typeof onend === "function") {
      onend();
    }
  };
  window.speechSynthesis.speak(utterance);
}

function setFeedback(text, kind = "") {
  feedback.textContent = text;
  feedback.className = `feedback ${kind}`.trim();
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function pickRandom(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function addPoint() {
  state.score += 1;
  score.textContent = state.score;
}

function productByName(name) {
  return products.find((product) => product.name === name);
}

function fallbackSvg(product) {
  const label = escapeXml(product.name);
  const icon = escapeXml(iconMarkup(product.icon));
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 280"><rect width="420" height="280" fill="#eaeef9"/><rect x="22" y="22" width="376" height="236" rx="18" fill="#ffffff" stroke="#1269b0" stroke-width="4"/><rect x="22" y="22" width="376" height="44" rx="18" fill="#ab7bb0"/><text x="210" y="138" text-anchor="middle" font-family="Arial" font-size="52" font-weight="700" fill="#1269b0">${icon}</text><text x="210" y="210" text-anchor="middle" font-family="Arial" font-size="30" font-weight="700" fill="#000000">${label}</text></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function escapeXml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function iconMarkup(icon) {
  const icons = {
    windel: "BABY",
    tücher: "TUCH",
    shampoo: "HAAR",
    zahn: "ZAHN",
    bürste: "ZAHN",
    creme: "CREME",
    lotion: "HAUT",
    mascara: "MAKE-UP",
    lippe: "PFLEGE",
    bio: "BIO",
    tee: "TEE",
    glas: "GLAS",
    brei: "BREI",
    riegel: "MHD",
    rasur: "RASUR",
    deo: "DEO",
    parfum: "DUFT",
    wasch: "WASCH",
    spül: "SPUEL",
    rolle: "ROLLE",
    foto: "FOTO",
    kopie: "KOPIE"
  };
  return icons[icon] || "WARE";
}

function imageSource(product) {
  return product.image || fallbackSvg(product);
}

function createPhoto(product) {
  const wrap = document.createElement("span");
  wrap.className = "photo";
  const image = document.createElement("img");
  image.src = imageSource(product);
  image.alt = product.name;
  image.loading = "lazy";
  image.addEventListener("error", () => {
    image.src = fallbackSvg(product);
  }, { once: true });
  wrap.append(image);
  return wrap;
}

function createProductCard(product) {
  const card = document.createElement("button");
  card.className = "item-card";
  card.type = "button";
  card.dataset.name = product.name;
  card.setAttribute("aria-label", `${product.name}. ${product.category}. ${product.task}`);

  const title = document.createElement("span");
  title.className = "item-title";
  title.textContent = product.name;

  const meta = document.createElement("p");
  meta.className = "item-meta";
  meta.textContent = product.category;

  const task = document.createElement("p");
  task.className = "item-task";
  task.textContent = product.task;

  card.append(createPhoto(product), title, meta, task);
  return card;
}

function answerButton(title, note, onClick) {
  const button = document.createElement("button");
  button.className = "answer-card";
  button.type = "button";
  const strong = document.createElement("strong");
  strong.textContent = title;
  const small = document.createElement("p");
  small.className = "small-note";
  small.textContent = note;
  button.append(strong, small);
  button.addEventListener("click", () => onClick(button));
  return button;
}

function drawLearn() {
  state.current = null;
  panel.innerHTML = "";
  panel.className = "activity-panel card-grid";
  taskText.textContent = "Tippe eine Karte an, um Begriff, Überbegriff und Aufgabe zu hören.";
  setFeedback("Lernmodus: Jede Karte spricht eine kurze Drogerie-Aufgabe vor.");
  visibleProducts().forEach((product) => {
    const card = createProductCard(product);
    card.addEventListener("click", () => {
      taskText.textContent = `${product.name}: ${product.category}`;
      setFeedback(product.task, "good");
      speak(`${product.name}. Überbegriff: ${product.category}. ${product.task}`);
    });
    panel.append(card);
  });
}

function drawCategory() {
  const pool = visibleProducts();
  const target = pickRandom(pool);
  state.current = target;
  panel.innerHTML = "";
  panel.className = "activity-panel quiz-layout";
  taskText.textContent = `Zu welchem Überbegriff gehört: ${target.name}?`;
  setFeedback("Wähle den passenden Bereich im Drogeriemarkt.");

  const taskCard = document.createElement("article");
  taskCard.className = "task-card";
  taskCard.append(createPhoto(target));
  taskCard.insertAdjacentHTML("beforeend", `<h2>${target.name}</h2><p class="small-note">${target.task}</p>`);

  const answers = document.createElement("div");
  answers.className = "answer-grid";
  const options = shuffle([target.category, ...shuffle(categories.filter((category) => category !== target.category)).slice(0, 3)]);
  options.forEach((category) => {
    answers.append(answerButton(category, "Überbegriff auswählen", (button) => {
      const isCorrect = category === target.category;
      button.classList.add(isCorrect ? "correct" : "wrong");
      if (isCorrect) {
        addPoint();
        setFeedback(`Richtig. ${target.name} gehört zu ${target.category}.`, "good");
        speak(`Richtig. ${target.name} gehört zu ${target.category}.`);
        window.setTimeout(nextTask, 1200);
        return;
      }
      setFeedback(`Fast. ${target.name} gehört zu ${target.category}.`, "try");
      speak(`Fast. ${target.name} gehört zu ${target.category}.`);
    }));
  });
  panel.append(taskCard, answers);
  if (autoSpeak.checked) {
    speak(`Zu welchem Überbegriff gehört ${target.name}?`);
  }
}

function drawExpress() {
  const order = pickRandom(expressOrders);
  const correctProducts = order.items.map(productByName);
  const distractors = shuffle(visibleProducts().filter((product) => !order.items.includes(product.name))).slice(0, 5);
  const options = shuffle([...correctProducts, ...distractors]);

  state.current = order;
  state.selectedExpress = new Set();
  panel.innerHTML = "";
  panel.className = "activity-panel card-grid";
  taskText.textContent = order.customer;
  setFeedback("Tippe alle Produkte an, die in die Express-Bestellung gehören.");

  options.forEach((product) => {
    const card = createProductCard(product);
    card.querySelector(".item-task").textContent = "In die Bestellung legen?";
    card.addEventListener("click", () => {
      const isCorrect = order.items.includes(product.name);
      card.classList.add(isCorrect ? "correct" : "wrong");
      if (!isCorrect) {
        setFeedback(`${product.name} gehört diesmal nicht in diese Bestellung.`, "try");
        speak(`${product.name} gehört diesmal nicht in die Bestellung.`);
        return;
      }
      state.selectedExpress.add(product.name);
      setFeedback(`${product.name} ist richtig.`, "good");
      speak(`${product.name} ist richtig.`);
      if (state.selectedExpress.size === order.items.length) {
        addPoint();
        setFeedback("Bestellung vollständig. Sehr gut gepackt.", "good");
        speak("Bestellung vollständig. Sehr gut gepackt.");
        window.setTimeout(nextTask, 1400);
      }
    });
    panel.append(card);
  });
  if (autoSpeak.checked) {
    speak(order.speak);
  }
}

function formatDate(offsetDays) {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  return new Intl.DateTimeFormat("de-DE").format(date);
}

function drawDateTask() {
  const task = pickRandom(dateTasks);
  const product = productByName(task.product);
  state.current = task;
  panel.innerHTML = "";
  panel.className = "activity-panel quiz-layout";
  taskText.textContent = `MHD prüfen: Was machst du mit ${task.product}?`;
  setFeedback("Prüfe das Datum und wähle die richtige Handlung.");

  const taskCard = document.createElement("article");
  taskCard.className = "task-card";
  taskCard.append(createPhoto(product));
  taskCard.insertAdjacentHTML("beforeend", `<h2>${task.product}</h2><span class="date-large">MHD: ${formatDate(task.dateOffset)}</span><p class="small-note">Regel: Abgelaufen aussortieren. Bald ablaufend nach vorne stellen. Lange haltbar im Regal lassen.</p>`);

  const answers = document.createElement("div");
  answers.className = "answer-grid";
  ["Aussortieren", "Nach vorne", "Im Regal lassen"].forEach((answer) => {
    answers.append(answerButton(answer, "Handlung auswählen", (button) => {
      const isCorrect = answer === task.answer;
      button.classList.add(isCorrect ? "correct" : "wrong");
      if (isCorrect) {
        addPoint();
        setFeedback(task.note, "good");
        speak(`Richtig. ${task.note}`);
        window.setTimeout(nextTask, 1400);
        return;
      }
      setFeedback(`Fast. Richtig ist: ${task.answer}. ${task.note}`, "try");
      speak(`Fast. Richtig ist: ${task.answer}.`);
    }));
  });
  panel.append(taskCard, answers);
  if (autoSpeak.checked) {
    speak(`Mindesthaltbarkeitsdatum prüfen. Was machst du mit ${task.product}?`);
  }
}

function drawDisplay() {
  const task = pickRandom(displayTasks);
  state.current = task;
  state.selectedDisplay = new Set();
  panel.innerHTML = "";
  panel.className = "activity-panel display-layout";
  taskText.textContent = task.prompt;
  setFeedback("Wähle die drei passenden Produkte. So sieht der Aufsteller ordentlich aus.");

  const stand = document.createElement("article");
  stand.className = "display-stand";
  stand.insertAdjacentHTML("beforeend", `<h2>${task.title}</h2><p class="small-note">Freie Fächer sollen mit passenden Produkten gefüllt werden.</p>`);

  const rowOne = document.createElement("div");
  rowOne.className = "display-row";
  const rowTwo = document.createElement("div");
  rowTwo.className = "display-row";

  task.correct.forEach((name) => {
    const slot = document.createElement("div");
    slot.className = "display-slot";
    slot.textContent = "frei";
    slot.dataset.name = name;
    rowOne.append(slot);
  });

  ["Etikett vorne", "gerade Reihe", "sauber"].forEach((label) => {
    const slot = document.createElement("div");
    slot.className = "display-slot filled";
    slot.textContent = label;
    rowTwo.append(slot);
  });

  stand.append(rowOne, rowTwo);

  const answers = document.createElement("div");
  answers.className = "card-grid";
  shuffle([...task.correct, ...task.distractors]).forEach((name) => {
    const product = productByName(name);
    const card = createProductCard(product);
    card.querySelector(".item-task").textContent = "Passt in diesen Aufsteller?";
    card.addEventListener("click", () => {
      const isCorrect = task.correct.includes(name);
      card.classList.add(isCorrect ? "correct" : "wrong");
      if (!isCorrect) {
        setFeedback(`${name} passt hier nicht. Achte auf den Überbegriff.`, "try");
        speak(`${name} passt hier nicht.`);
        return;
      }
      state.selectedDisplay.add(name);
      const slot = [...stand.querySelectorAll(".display-slot")].find((entry) => entry.dataset.name === name);
      if (slot) {
        slot.classList.add("filled", "correct");
        slot.textContent = name;
      }
      setFeedback(`${name} passt.`, "good");
      speak(`${name} passt.`);
      if (state.selectedDisplay.size === task.correct.length) {
        addPoint();
        setFeedback("Aufsteller fertig. Alles steht passend und ordentlich.", "good");
        speak("Aufsteller fertig. Alles steht passend und ordentlich.");
        window.setTimeout(nextTask, 1400);
      }
    });
    answers.append(card);
  });

  panel.append(stand, answers);
  if (autoSpeak.checked) {
    speak(task.prompt);
  }
}

function drawDialog() {
  const dialog = pickRandom(dialogs);
  const options = shuffle([dialog.answer, ...dialog.wrong]);
  state.current = dialog;
  panel.innerHTML = "";
  panel.className = "activity-panel quiz-layout";
  taskText.textContent = `Dialog üben: ${dialog.mode}`;
  setFeedback("Wähle eine freundliche, hilfreiche Antwort.");

  const dialogCard = document.createElement("article");
  dialogCard.className = "dialog-card";
  dialogCard.insertAdjacentHTML("beforeend", `<p class="role-label">Kundin oder Kunde sagt:</p><p class="speech-bubble">${dialog.customer}</p><p class="small-note">${dialog.note}</p>`);

  const answers = document.createElement("div");
  answers.className = "answer-grid";
  options.forEach((answer) => {
    answers.append(answerButton(answer, "Antwort sprechen", (button) => {
      const isCorrect = answer === dialog.answer;
      button.classList.add(isCorrect ? "correct" : "wrong");
      if (isCorrect) {
        addPoint();
        setFeedback(dialog.note, "good");
        speak(`Gute Antwort. ${answer}`);
        window.setTimeout(nextTask, 1800);
        return;
      }
      setFeedback("Diese Antwort ist nicht freundlich oder nicht hilfreich genug.", "try");
      speak("Versuche eine freundlichere Antwort.");
    }));
  });

  panel.append(dialogCard, answers);
  if (autoSpeak.checked) {
    speak(`Kundin sagt: ${dialog.customer}`);
  }
}

function nextTask() {
  if (state.mode === "category") {
    drawCategory();
    return;
  }
  if (state.mode === "express") {
    drawExpress();
    return;
  }
  if (state.mode === "date") {
    drawDateTask();
    return;
  }
  if (state.mode === "display") {
    drawDisplay();
    return;
  }
  if (state.mode === "dialog") {
    drawDialog();
    return;
  }
  drawLearn();
}

function updateMode(mode) {
  state.mode = mode;
  tabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.mode === mode));
  nextTask();
}

function repeatCurrent() {
  if (state.mode === "learn") {
    speak("Tippe eine Karte an, um Begriff, Überbegriff und Aufgabe zu hören.");
    return;
  }
  if (state.mode === "category" && state.current) {
    speak(`Zu welchem Überbegriff gehört ${state.current.name}?`);
    return;
  }
  if (state.mode === "express" && state.current) {
    speak(state.current.speak);
    return;
  }
  if (state.mode === "date" && state.current) {
    speak(`Mindesthaltbarkeitsdatum prüfen. Was machst du mit ${state.current.product}?`);
    return;
  }
  if (state.mode === "display" && state.current) {
    speak(state.current.prompt);
    return;
  }
  if (state.mode === "dialog" && state.current) {
    speak(`Kundin sagt: ${state.current.customer}`);
  }
}

function loadVoices() {
  if ("speechSynthesis" in window) {
    state.voices = window.speechSynthesis.getVoices();
  }
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => updateMode(tab.dataset.mode));
});

repeatButton.addEventListener("click", () => {
  unlockSpeech();
  repeatCurrent();
});
nextButton.addEventListener("click", () => {
  unlockSpeech();
  nextTask();
});
voiceTestButton.addEventListener("click", () => {
  unlockSpeech();
  speak("Hallo. Ich helfe dir beim Training im Drogeriemarkt.");
});
levelFilter.addEventListener("change", (event) => {
  state.filter = event.target.value;
  nextTask();
});

if ("speechSynthesis" in window) {
  loadVoices();
  window.speechSynthesis.addEventListener("voiceschanged", loadVoices);
  window.addEventListener("pageshow", loadVoices);
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      loadVoices();
      window.speechSynthesis.resume();
    }
  });
  window.addEventListener("pointerdown", unlockSpeech, { once: true });
  window.addEventListener("click", unlockSpeech, { once: true });
  window.addEventListener("keydown", unlockSpeech, { once: true });
  window.addEventListener("touchstart", unlockSpeech, { once: true });
}

drawLearn();
