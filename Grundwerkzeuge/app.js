const tools = [
  {
    name: "Hammer",
    category: "Schlagen und Formen",
    image: "bilder/Hammer_02.jpg",
    use: "Mit dem Hammer schlage ich Nägel ins Holz.",
    property: "Der Hammer hat einen harten Kopf und einen festen Stiel.",
    safety: "Ich achte auf meine Finger.",
    level: "starter"
  },
  {
    name: "Gummihammer",
    category: "Schlagen und Formen",
    image: "bilder/Gummihammer_02.jpg",
    use: "Mit dem Gummihammer schlage ich vorsichtig, ohne das Material stark zu beschadigen.",
    property: "Der Kopf ist weich aus Gummi.",
    safety: "Ich schlage ruhig und halte das Werkstück sicher fest.",
    level: "core"
  },
  {
    name: "Beisszange",
    category: "Greifen und Schneiden",
    image: "bilder/Beisszange_02.jpg",
    use: "Mit der Beisszange ziehe ich Nägel aus Holz.",
    property: "Die Beisszange hat starke Backen zum Ziehen und Schneiden.",
    safety: "Ich halte Abstand zu meinen Fingern.",
    level: "starter"
  },
  {
    name: "Flachzange",
    category: "Greifen und Schneiden",
    image: "bilder/Flachzange_02.jpg",
    use: "Mit der Flachzange halte und biege ich Draht.",
    property: "Die Flachzange hat flache Greifbacken.",
    safety: "Ich halte das Material gut fest und arbeite langsam.",
    level: "core"
  },
  {
    name: "Rohrzange",
    category: "Greifen und Schneiden",
    image: "bilder/Rohrzange_02.jpg",
    use: "Mit der Rohrzange halte und drehe ich Rohr oder runde Teile.",
    property: "Die Rohrzange kann weit geoffnet werden und greift fest.",
    safety: "Ich prufe den festen Sitz, bevor ich Kraft gebe.",
    level: "core"
  },
  {
    name: "Seitenschneider",
    category: "Greifen und Schneiden",
    image: "bilder/Seitenschneider_02.jpg",
    use: "Mit dem Seitenschneider schneide ich Draht oder Kabelbinder.",
    property: "Der Seitenschneider hat scharfe Schneiden an der Seite.",
    safety: "Ich schneide weg von meinem Körper.",
    level: "starter"
  },
  {
    name: "Abisolierzange",
    category: "Greifen und Schneiden",
    image: "bilder/Abisolierzange_02.jpg",
    use: "Mit der Abisolierzange entferne ich die Hülle von einem Kabel.",
    property: "Die Abisolierzange schneidet nur die Isolierung ab.",
    safety: "Ich arbeite nur an stromlosen Kabeln.",
    level: "all"
  },
  {
    name: "Schlitzschraubendreher",
    category: "Schrauben und Drehen",
    image: "bilder/Schlitzschraubendreher_01.jpg",
    use: "Mit dem Schlitzschraubendreher drehe ich Schrauben mit einem geraden Schlitz.",
    property: "Die Spitze ist gerade und flach.",
    safety: "Ich nutze immer die passende Spitze fur die Schraube.",
    level: "starter"
  },
  {
    name: "Kreuzschlitz-Schraubendreher",
    category: "Schrauben und Drehen",
    image: "bilder/Kreuzschlitz-Schraubendreher_01.jpg",
    use: "Mit dem Kreuzschlitz-Schraubendreher drehe ich Schrauben mit Kreuz.",
    property: "Die Spitze hat die Form von einem Kreuz.",
    safety: "Ich drucke gerade auf die Schraube, damit ich nicht abrutsche.",
    level: "starter"
  },
  {
    name: "Bits",
    category: "Schrauben und Drehen",
    image: "bilder/Bits_02.jpg",
    use: "Bits sind Wechselspitzen fur Schrauben mit verschiedenen Formen.",
    property: "Bits sind klein und konnen schnell gewechselt werden.",
    safety: "Ich wahle den passenden Bit, bevor ich starte.",
    level: "all"
  },
  {
    name: "Gabelschlussel",
    category: "Schrauben und Drehen",
    image: "bilder/Gabelschluessel_01.jpg",
    use: "Mit dem Gabelschlüssel löse oder feste ich Muttern und Schrauben.",
    property: "Der Schlussel ist an beiden Seiten offen.",
    safety: "Ich setze den Schlussel gerade an, damit er nicht abrutscht.",
    level: "core"
  },
  {
    name: "Ringschlussel",
    category: "Schrauben und Drehen",
    image: "bilder/Ringschluessel_03.jpg",
    use: "Mit dem Ringschlüssel drehe ich Muttern besonders sicher.",
    property: "Der Ringschlussel umschliesst die Mutter fast ganz.",
    safety: "Ich ziehe ruhig und rutsche nicht plötzlich.",
    level: "all"
  },
  {
    name: "Bleistift",
    category: "Anzeichnen und Messen",
    image: "bilder/Bleistift_01.jpg",
    use: "Mit dem Bleistift zeichne ich Linien und Markierungen an.",
    property: "Der Bleistift macht sichtbare, gut radierbare Linien.",
    safety: "Die Spitze zeigt nicht auf andere Personen.",
    level: "starter"
  },
  {
    name: "Gliedermassstab",
    category: "Anzeichnen und Messen",
    image: "bilder/Gliedermassstab_02.jpg",
    use: "Mit dem Gliedermassstab messe ich Längen.",
    property: "Der Gliedermassstab lasst sich aufklappen und wieder zusammenfalten.",
    safety: "Ich klappe ihn langsam auf, damit ich mich nicht einklemme.",
    level: "starter"
  },
  {
    name: "Metalllineal",
    category: "Anzeichnen und Messen",
    image: "bilder/Metalllineal_01.jpg",
    use: "Mit dem Metalllineal messe ich kurze Strecken und ziehe gerade Linien.",
    property: "Das Metalllineal ist gerade, hart und stabil.",
    safety: "Meine Finger bleiben weg von scharfen Kanten und vom Cutter.",
    level: "core"
  },
  {
    name: "Wasserwage",
    category: "Anzeichnen und Messen",
    image: "bilder/Wasserwage_01.jpg",
    use: "Mit der Wasserwaage prüfe ich, ob etwas gerade ist.",
    property: "In der Wasserwage ist eine kleine Libelle mit Luftblase.",
    safety: "Ich lege die Wasserwage ruhig auf das Werkstück.",
    level: "core"
  },
  {
    name: "Holzwinkel",
    category: "Anzeichnen und Messen",
    image: "bilder/Holzwinkel_01.jpg",
    use: "Mit dem Holzwinkel prüfe oder zeichne ich einen rechten Winkel.",
    property: "Der Holzwinkel hilft bei genauen Ecken mit 90 Grad.",
    safety: "Ich arbeite sauber an der Kante und drucke nicht zu stark.",
    level: "core"
  },
  {
    name: "Fuchsschwanzsage",
    category: "Sagen und Trennen",
    image: "bilder/Fuchsschwanzsaege_02.jpg",
    use: "Mit der Fuchsschwanzsage sage ich Holz von Hand.",
    property: "Die Sage hat ein langes Blatt mit groben Zahnen.",
    safety: "Ich halte das Holz fest und sage langsam vom Korper weg.",
    level: "starter"
  },
  {
    name: "Puksage",
    category: "Sagen und Trennen",
    image: "bilder/Puksaege_01.jpg",
    use: "Mit der Puk-Säge sage ich dünnes Metall oder Kunststoff.",
    property: "Die Puksage hat ein feines, eingespanntes Sageblatt.",
    safety: "Ich arbeite mit wenig Druck und trage eine Schutzbrille.",
    level: "all"
  },
  {
    name: "Cutter",
    category: "Sagen und Trennen",
    image: "bilder/Cutter_01.jpg",
    use: "Mit dem Cutter schneide ich Papier, Karton oder dünnes Material.",
    property: "Der Cutter hat eine sehr scharfe Klinge.",
    safety: "Ich schneide immer weg vom Korper und schiebe die Klinge danach ein.",
    level: "starter"
  },
  {
    name: "Schraubzwinge",
    category: "Spannen und Halten",
    image: "bilder/Schraubzwinge_01.jpg",
    use: "Mit der Schraubzwinge halte ich Werkstücke fest.",
    property: "Die Schraubzwinge spannt Material mit Druck zusammen.",
    safety: "Meine Finger bleiben aus dem Spannbereich heraus.",
    level: "starter"
  },
  {
    name: "Bohrschraubstock",
    category: "Spannen und Halten",
    image: "bilder/Bohrschraubstock_01.jpg",
    use: "Mit dem Bohrschraubstock spanne ich ein Werkstück für das Bohren ein.",
    property: "Der Bohrschraubstock halt das Werkstuck sehr fest.",
    safety: "Ich bohre nie in ein loses Werkstuck.",
    level: "all"
  },
  {
    name: "Bohrerkassette",
    category: "Bohren",
    image: "bilder/Bohrerkassette_01.jpg",
    use: "In der Bohrerkassette liegen Bohrer in verschiedenen Grossen.",
    property: "Die Bohrer haben unterschiedliche Durchmesser.",
    safety: "Ich nehme nur den passenden Bohrer und raume ihn wieder sicher zuruck.",
    level: "all"
  },
  {
    name: "Raspel",
    category: "Bearbeiten und Schleifen",
    image: "bilder/Raspel_flach_01.jpg",
    use: "Mit der Raspel bearbeite ich Holz und trage Material ab.",
    property: "Die Raspel ist rau und hat viele kleine Zahne.",
    safety: "Ich halte meine zweite Hand weg von der Arbeitsrichtung.",
    level: "core"
  },
  {
    name: "Schleifklotz",
    category: "Bearbeiten und Schleifen",
    image: "bilder/Schleifklotz_01.jpg",
    use: "Mit dem Schleifklotz glatte ich Flachen und Kanten.",
    property: "Der Schleifklotz macht Holz oder andere Flachen glatter.",
    safety: "Ich arbeite ruhig und schutze mich vor Staub.",
    level: "core"
  },
  {
    name: "Holzleim",
    category: "Kleben",
    image: "bilder/Holzleim_01.jpg",
    use: "Mit Holzleim klebe ich Holzteile zusammen.",
    property: "Holzleim verbindet Holz nach dem Trocknen fest.",
    safety: "Ich nutze nur wenig Leim und wische Reste ab.",
    level: "starter"
  }
];

const categories = [
  "Anzeichnen und Messen",
  "Schrauben und Drehen",
  "Greifen und Schneiden",
  "Schlagen und Formen",
  "Sagen und Trennen",
  "Spannen und Halten",
  "Bohren",
  "Bearbeiten und Schleifen",
  "Kleben"
];

const safetyTasks = [
  {
    title: "Cutter benutzen",
    prompt: "Du schneidest Karton mit dem Cutter. Was ist sicher?",
    answer: "Ich schneide weg von meinem Korper und schiebe die Klinge danach ein.",
    wrong: [
      "Ich schneide zu mir hin, dann sehe ich es besser.",
      "Ich lasse die Klinge nach der Arbeit einfach offen."
    ],
    note: "Scharfe Klingen werden immer sicher gefuhrt und danach geschlossen."
  },
  {
    title: "Hammerarbeit",
    prompt: "Du hammerst einen Nagel ein. Was ist wichtig?",
    answer: "Ich achte auf meine Finger.",
    wrong: [
      "Ich halte den Nagel ganz lange oben fest und schaue nicht auf meine Hand.",
      "Eine Schutzbrille brauche ich nie."
    ],
    note: "Beim Schlagen konnen Splitter fliegen. Abstand und Schutz sind wichtig."
  },
  {
    title: "Sagen",
    prompt: "Du sagst ein Brett. Was ist sicher?",
    answer: "Ich halte das Holz fest und sage langsam vom Korper weg.",
    wrong: [
      "Ich sage sehr schnell, auch wenn das Brett wackelt.",
      "Ich halte meine Hand direkt vor das Sageblatt."
    ],
    note: "Nur ein festes Werkstuck kann sicher bearbeitet werden."
  },
  {
    title: "Kabel bearbeiten",
    prompt: "Du willst ein Kabel abisolieren. Was ist richtig?",
    answer: "Ich arbeite nur an stromlosen Kabeln.",
    wrong: [
      "Strom ist egal, ich probiere es einfach.",
      "Ich nehme lieber irgendein scharfes Messer und arbeite schnell."
    ],
    note: "Elektrische Arbeiten nur sicher und nur ohne Strom."
  },
  {
    title: "Werkstuck spannen",
    prompt: "Du willst bohren. Was machst du zuerst?",
    answer: "Ich spanne das Werkstuck sicher ein.",
    wrong: [
      "Ich halte das Werkstuck mit der Hand fest.",
      "Ich lege das Werkstuck lose auf den Tisch."
    ],
    note: "Lose Werkstucke durfen nicht gebohrt werden."
  },
  {
    title: "Bohrer auswahlen",
    prompt: "Du nimmst einen Bohrer aus der Kassette. Was ist wichtig?",
    answer: "Ich nehme den passenden Bohrer in der richtigen Grosse.",
    wrong: [
      "Ich nehme irgendeinen Bohrer. Das ist egal.",
      "Ich werfe die Bohrer nach der Arbeit lose in die Kiste."
    ],
    note: "Das richtige Werkzeug macht die Arbeit sicherer und genauer."
  }
];

const sentenceTasks = [
  { tool: "Hammer", text: "Mit dem Hammer hämmer ich Nägel ins Holz." },
  { tool: "Beisszange", text: "Mit der Beisszange ziehe ich Nägel aus Holz." },
  { tool: "Flachzange", text: "Mit der Flachzange halte und biege ich Draht." },
  { tool: "Seitenschneider", text: "Mit dem Seitenschneider schneide ich Draht." },
  { tool: "Schlitzschraubendreher", text: "Mit dem Schlitzschraubendreher drehe ich eine Schraube mit geradem Schlitz." },
  { tool: "Kreuzschlitz-Schraubendreher", text: "Mit dem Kreuzschlitz-Schraubendreher drehe ich eine Schraube mit Kreuz." },
  { tool: "Gliedermassstab", text: "Mit dem Gliedermassstab messe ich eine Lange." },
  { tool: "Wasserwage", text: "Mit der Wasserwage prufe ich, ob etwas gerade ist." },
  { tool: "Schraubzwinge", text: "Mit der Schraubzwinge halte ich ein Werkstuck fest." },
  { tool: "Holzleim", text: "Mit Holzleim klebe ich zwei Holzteile zusammen." }
];

const dialogs = [
  {
    mode: "Werkzeug holen",
    customer: "Bitte gib mir das Werkzeug zum Messen. Ich weiss den Namen nicht.",
    answer: "Gerne. Zum Messen nehmen wir oft den Gliedermassstab oder ein Lineal. Ich zeige dir beides.",
    wrong: [
      "Nimm einfach irgendetwas von der Werkbank.",
      "Das musst du alleine wissen."
    ],
    note: "Freundlich helfen und den Fachbegriff langsam nennen."
  },
  {
    mode: "Sicherheit",
    customer: "Ich will gleich mit dem Cutter schneiden. Muss ich etwas beachten?",
    answer: "Ja. Schneide immer weg vom Korper und schiebe die Klinge danach wieder ein.",
    wrong: [
      "Nein. Beim Cutter ist Sicherheit nicht so wichtig.",
      "Du kannst die Klinge einfach offen liegen lassen."
    ],
    note: "Bei scharfen Werkzeugen immer ruhig und sicher arbeiten."
  },
  {
    mode: "Werkstuck spannen",
    customer: "Kann ich das Brett beim Bohren einfach mit der Hand festhalten?",
    answer: "Nein. Das Werkstuck muss sicher gespannt werden, zum Beispiel mit einer Schraubzwinge oder in einem Schraubstock.",
    wrong: [
      "Ja, das geht immer und ist schneller.",
      "Lege das Brett locker hin. Das reicht."
    ],
    note: "Sicheres Spannen schutzt die Hand und macht die Arbeit genauer."
  },
  {
    mode: "Werkzeug finden",
    customer: "Ich suche eine Zange zum Schneiden von Draht.",
    answer: "Dafur passt der Seitenschneider. Ich zeige dir das Werkzeug.",
    wrong: [
      "Nimm lieber Holzleim.",
      "Das ist egal. Jede Zange kann alles."
    ],
    note: "Das passende Werkzeug wird uber den Einsatz gefunden."
  },
  {
    mode: "Eigenschaft erklaren",
    customer: "Warum nehme ich fur manche Schlage einen Gummihammer?",
    answer: "Der Gummihammer schlagt weicher. So wird das Material weniger beschadigt.",
    wrong: [
      "Weil ein Gummihammer immer schwerer ist als ein normaler Hammer.",
      "Weil man damit auch schrauben kann."
    ],
    note: "Eigenschaften helfen bei der richtigen Auswahl."
  }
];

const starterNames = new Set([
  "Hammer",
  "Beisszange",
  "Seitenschneider",
  "Schlitzschraubendreher",
  "Kreuzschlitz-Schraubendreher",
  "Bleistift",
  "Gliedermassstab",
  "Fuchsschwanzsage",
  "Cutter",
  "Schraubzwinge",
  "Holzleim"
]);

const state = {
  mode: "learn",
  filter: "starter",
  current: null,
  score: 0,
  voices: []
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

function visibleTools() {
  if (state.filter === "starter") {
    return tools.filter((tool) => starterNames.has(tool.name));
  }
  if (state.filter === "core") {
    return tools.filter((tool) => tool.level === "starter" || tool.level === "core");
  }
  return tools;
}

function speak(text) {
  if (!("speechSynthesis" in window)) {
    setFeedback("Dieser Browser unterstutzt hier keine Sprachausgabe.", "try");
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "de-DE";
  utterance.rate = 0.88;
  utterance.pitch = 1;
  const germanVoice = state.voices.find((voice) => voice.lang.toLowerCase().startsWith("de"));
  if (germanVoice) {
    utterance.voice = germanVoice;
  }
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

function toolByName(name) {
  return tools.find((tool) => tool.name === name);
}

function fallbackSvg(tool) {
  const label = escapeXml(tool.name);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 280"><rect width="420" height="280" fill="#eaeef9"/><rect x="22" y="22" width="376" height="236" rx="18" fill="#ffffff" stroke="#1269b0" stroke-width="4"/><rect x="22" y="22" width="376" height="44" rx="18" fill="#ab7bb0"/><text x="210" y="150" text-anchor="middle" font-family="Arial" font-size="34" font-weight="700" fill="#1269b0">WERKZEUG</text><text x="210" y="212" text-anchor="middle" font-family="Arial" font-size="28" font-weight="700" fill="#000000">${label}</text></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function escapeXml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function imageSource(tool) {
  return tool.image || fallbackSvg(tool);
}

function createPhoto(tool) {
  const wrap = document.createElement("span");
  wrap.className = "photo";
  const image = document.createElement("img");
  image.src = imageSource(tool);
  image.alt = tool.name;
  image.loading = "lazy";
  image.addEventListener("error", () => {
    image.src = fallbackSvg(tool);
  }, { once: true });
  wrap.append(image);
  return wrap;
}

function createToolCard(tool) {
  const card = document.createElement("button");
  card.className = "item-card";
  card.type = "button";
  card.dataset.name = tool.name;
  card.setAttribute("aria-label", `${tool.name}. ${tool.category}. ${tool.use}`);

  const title = document.createElement("span");
  title.className = "item-title";
  title.textContent = tool.name;

  const meta = document.createElement("p");
  meta.className = "item-meta";
  meta.textContent = tool.category;

  const task = document.createElement("p");
  task.className = "item-task";
  task.textContent = tool.use;

  card.append(createPhoto(tool), title, meta, task);
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
  taskText.textContent = "Tippe eine Karte an, um Werkzeug, Fachbegriff, Einsatz und Sicherheit zu horen.";
  setFeedback("Lernmodus: Jede Karte spricht in einfacher Sprache.");

  visibleTools().forEach((tool) => {
    const card = createToolCard(tool);
    card.addEventListener("click", () => {
      state.current = { speak: `${tool.name}. Bereich: ${tool.category}. ${tool.use} ${tool.property} ${tool.safety}` };
      taskText.textContent = `${tool.name}: ${tool.category}`;
      setFeedback(`${tool.use} ${tool.safety}`, "good");
      speak(state.current.speak);
    });
    panel.append(card);
  });
}

function drawCategory() {
  const pool = visibleTools();
  const target = pickRandom(pool);
  state.current = { speak: `Zu welchem Fachbereich gehort ${target.name}?` };
  panel.innerHTML = "";
  panel.className = "activity-panel quiz-layout";
  taskText.textContent = `Zu welchem Fachbegriff-Bereich gehort: ${target.name}?`;
  setFeedback("Wahle den passenden Bereich.");

  const taskCard = document.createElement("article");
  taskCard.className = "task-card";
  taskCard.append(createPhoto(target));
  taskCard.insertAdjacentHTML("beforeend", `<h2>${target.name}</h2><p class="small-note">${target.use}</p>`);

  const answers = document.createElement("div");
  answers.className = "answer-grid";
  const options = shuffle([target.category, ...shuffle(categories.filter((category) => category !== target.category)).slice(0, 3)]);
  options.forEach((category) => {
    answers.append(answerButton(category, "Bereich auswahlen", (button) => {
      const isCorrect = category === target.category;
      button.classList.add(isCorrect ? "correct" : "wrong");
      if (isCorrect) {
        addPoint();
        setFeedback(`Richtig. ${target.name} gehort zu ${target.category}.`, "good");
        speak(`Richtig. ${target.name} gehort zu ${target.category}.`);
        window.setTimeout(nextTask, 1200);
        return;
      }
      setFeedback(`Fast. ${target.name} gehort zu ${target.category}.`, "try");
      speak(`Fast. ${target.name} gehort zu ${target.category}.`);
    }));
  });

  panel.append(taskCard, answers);
  if (autoSpeak.checked) {
    speak(state.current.speak);
  }
}

function drawUse() {
  const pool = visibleTools();
  const target = pickRandom(pool);
  state.current = { speak: `Wofur benutzt man ${target.name}?` };
  panel.innerHTML = "";
  panel.className = "activity-panel quiz-layout";
  taskText.textContent = `Wofur benutzt du ${target.name}?`;
  setFeedback("Wahle den passenden Einsatz.");

  const taskCard = document.createElement("article");
  taskCard.className = "task-card";
  taskCard.append(createPhoto(target));
  taskCard.insertAdjacentHTML("beforeend", `<h2>${target.name}</h2><p class="small-note">${target.property}</p>`);

  const answers = document.createElement("div");
  answers.className = "answer-grid";
  const options = shuffle([target.use, ...shuffle(pool.filter((tool) => tool.name !== target.name).map((tool) => tool.use)).slice(0, 3)]);
  options.forEach((entry) => {
    answers.append(answerButton(entry, "Einsatz auswahlen", (button) => {
      const isCorrect = entry === target.use;
      button.classList.add(isCorrect ? "correct" : "wrong");
      if (isCorrect) {
        addPoint();
        setFeedback(`Richtig. ${target.use}`, "good");
        speak(`Richtig. ${target.use}`);
        window.setTimeout(nextTask, 1400);
        return;
      }
      setFeedback(`Fast. Richtig ist: ${target.use}`, "try");
      speak(`Fast. Richtig ist: ${target.use}`);
    }));
  });

  panel.append(taskCard, answers);
  if (autoSpeak.checked) {
    speak(state.current.speak);
  }
}

function drawSafety() {
  const task = pickRandom(safetyTasks);
  state.current = { speak: task.prompt };
  panel.innerHTML = "";
  panel.className = "activity-panel quiz-layout";
  taskText.textContent = task.prompt;
  setFeedback("Wahle die sichere Handlung.");

  const taskCard = document.createElement("article");
  taskCard.className = "task-card";
  taskCard.insertAdjacentHTML("beforeend", `<h2>${task.title}</h2><p class="badge">Arbeitsschutz</p><p class="small-note">${task.note}</p>`);

  const answers = document.createElement("div");
  answers.className = "answer-grid";
  shuffle([task.answer, ...task.wrong]).forEach((answer) => {
    answers.append(answerButton(answer, "Sicherheit auswahlen", (button) => {
      const isCorrect = answer === task.answer;
      button.classList.add(isCorrect ? "correct" : "wrong");
      if (isCorrect) {
        addPoint();
        setFeedback(task.note, "good");
        speak(`Richtig. ${task.answer}`);
        window.setTimeout(nextTask, 1600);
        return;
      }
      setFeedback(`Fast. Sicher ist: ${task.answer}`, "try");
      speak(`Fast. Sicher ist: ${task.answer}`);
    }));
  });

  panel.append(taskCard, answers);
  if (autoSpeak.checked) {
    speak(state.current.speak);
  }
}

function drawProperty() {
  const pool = visibleTools();
  const target = pickRandom(pool);
  state.current = { speak: `Welche Eigenschaft passt zu ${target.name}?` };
  panel.innerHTML = "";
  panel.className = "activity-panel quiz-layout";
  taskText.textContent = `Welche Eigenschaft passt zu ${target.name}?`;
  setFeedback("Wahle die passende Eigenschaft.");

  const taskCard = document.createElement("article");
  taskCard.className = "task-card";
  taskCard.append(createPhoto(target));
  taskCard.insertAdjacentHTML("beforeend", `<h2>${target.name}</h2><p class="small-note">${target.use}</p>`);

  const answers = document.createElement("div");
  answers.className = "answer-grid";
  const options = shuffle([target.property, ...shuffle(pool.filter((tool) => tool.name !== target.name).map((tool) => tool.property)).slice(0, 3)]);
  options.forEach((entry) => {
    answers.append(answerButton(entry, "Eigenschaft auswahlen", (button) => {
      const isCorrect = entry === target.property;
      button.classList.add(isCorrect ? "correct" : "wrong");
      if (isCorrect) {
        addPoint();
        setFeedback(`Richtig. ${target.property}`, "good");
        speak(`Richtig. ${target.property}`);
        window.setTimeout(nextTask, 1400);
        return;
      }
      setFeedback(`Fast. Richtig ist: ${target.property}`, "try");
      speak(`Fast. Richtig ist: ${target.property}`);
    }));
  });

  panel.append(taskCard, answers);
  if (autoSpeak.checked) {
    speak(state.current.speak);
  }
}

function drawSentence() {
  const task = pickRandom(sentenceTasks);
  const correctTool = toolByName(task.tool);
  const options = shuffle([task.tool, ...shuffle(visibleTools().filter((tool) => tool.name !== task.tool).map((tool) => tool.name)).slice(0, 3)]);

  state.current = { speak: task.text };
  panel.innerHTML = "";
  panel.className = "activity-panel sentence-layout";
  taskText.textContent = "Welches Werkzeug passt in den Satz?";
  setFeedback("Lies den Satz. Wahle das richtige Werkzeug. Sprich den Satz danach laut nach.");

  const sentenceCard = document.createElement("article");
  sentenceCard.className = "sentence-card";
  sentenceCard.append(createPhoto(correctTool));
  sentenceCard.insertAdjacentHTML("beforeend", `<strong>Ubungssatz</strong><p class="sentence-text">${task.text}</p><p class="small-note">Nach dem Losen kann der Satz laut wiederholt werden.</p>`);

  const answers = document.createElement("div");
  answers.className = "answer-grid";
  options.forEach((name) => {
    answers.append(answerButton(name, "Werkzeug auswahlen", (button) => {
      const isCorrect = name === task.tool;
      button.classList.add(isCorrect ? "correct" : "wrong");
      if (isCorrect) {
        addPoint();
        setFeedback(task.text, "good");
        speak(task.text);
        window.setTimeout(nextTask, 1800);
        return;
      }
      setFeedback(`Fast. Richtig ist: ${task.tool}.`, "try");
      speak(`Fast. Richtig ist: ${task.tool}. ${task.text}`);
    }));
  });

  panel.append(sentenceCard, answers);
  if (autoSpeak.checked) {
    speak(task.text);
  }
}

function drawDialog() {
  const dialog = pickRandom(dialogs);
  const options = shuffle([dialog.answer, ...dialog.wrong]);
  state.current = { speak: `Dialog. ${dialog.customer}` };
  panel.innerHTML = "";
  panel.className = "activity-panel quiz-layout";
  taskText.textContent = `Dialog uben: ${dialog.mode}`;
  setFeedback("Wahle eine freundliche und sichere Antwort.");

  const dialogCard = document.createElement("article");
  dialogCard.className = "dialog-card";
  dialogCard.insertAdjacentHTML("beforeend", `<p class="role-label">Eine Person sagt:</p><p class="speech-bubble">${dialog.customer}</p><p class="small-note">${dialog.note}</p>`);

  const answers = document.createElement("div");
  answers.className = "answer-grid";
  options.forEach((answer) => {
    answers.append(answerButton(answer, "Antwort auswahlen", (button) => {
      const isCorrect = answer === dialog.answer;
      button.classList.add(isCorrect ? "correct" : "wrong");
      if (isCorrect) {
        addPoint();
        setFeedback(dialog.note, "good");
        speak(`Gute Antwort. ${answer}`);
        window.setTimeout(nextTask, 1800);
        return;
      }
      setFeedback("Diese Antwort ist nicht passend genug.", "try");
      speak("Versuche eine freundlichere und sicherere Antwort.");
    }));
  });

  panel.append(dialogCard, answers);
  if (autoSpeak.checked) {
    speak(state.current.speak);
  }
}

function nextTask() {
  if (state.mode === "category") {
    drawCategory();
    return;
  }
  if (state.mode === "use") {
    drawUse();
    return;
  }
  if (state.mode === "safety") {
    drawSafety();
    return;
  }
  if (state.mode === "property") {
    drawProperty();
    return;
  }
  if (state.mode === "sentence") {
    drawSentence();
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

function currentSpeech() {
  if (!state.current) {
    return "Bereit fur das Training mit Grundwerkzeugen.";
  }
  return state.current.speak || taskText.textContent;
}

function loadVoices() {
  state.voices = window.speechSynthesis ? window.speechSynthesis.getVoices() : [];
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => updateMode(tab.dataset.mode));
});

levelFilter.addEventListener("change", (event) => {
  state.filter = event.target.value;
  nextTask();
});

repeatButton.addEventListener("click", () => {
  speak(currentSpeech());
});

nextButton.addEventListener("click", () => {
  nextTask();
});

voiceTestButton.addEventListener("click", () => {
  speak("Hallo. Wir lernen heute Grundwerkzeuge in einfacher Sprache.");
});

if ("speechSynthesis" in window) {
  loadVoices();
  window.speechSynthesis.onvoiceschanged = loadVoices;
}

nextTask();
