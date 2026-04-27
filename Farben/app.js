const colors = [
  { name: "Rot", hex: "#d62828", family: "Rot", level: "basic" },
  { name: "Blau", hex: "#1269b0", family: "Blau", level: "basic" },
  { name: "Gelb", hex: "#ffd166", family: "Gelb", level: "basic" },
  { name: "Grün", hex: "#2a9d8f", family: "Grün", level: "basic" },
  { name: "Schwarz", hex: "#111111", family: "Schwarz", level: "basic" },
  { name: "Weiß", hex: "#ffffff", family: "Weiß", level: "basic" },
  { name: "Orange", hex: "#f77f00", family: "Orange", level: "more" },
  { name: "Lila", hex: "#8338ec", family: "Lila", level: "more" },
  { name: "Rosa", hex: "#ff8fab", family: "Rosa", level: "more" },
  { name: "Braun", hex: "#8d5524", family: "Braun", level: "more" },
  { name: "Grau", hex: "#8d99ae", family: "Grau", level: "more" },
  { name: "Türkis", hex: "#00b4d8", family: "Blau", level: "more" },
  { name: "Dunkelrot", hex: "#7f1d1d", family: "Rot", level: "shades" },
  { name: "Hellrot", hex: "#ff6b6b", family: "Rot", level: "shades" },
  { name: "Weinrot", hex: "#800020", family: "Rot", level: "shades" },
  { name: "Dunkelblau", hex: "#0b3d91", family: "Blau", level: "shades" },
  { name: "Hellblau", hex: "#8ecae6", family: "Blau", level: "shades" },
  { name: "Dunkelgrün", hex: "#1b5e20", family: "Grün", level: "shades" },
  { name: "Hellgrün", hex: "#95d5b2", family: "Grün", level: "shades" },
  { name: "Goldgelb", hex: "#ffb703", family: "Gelb", level: "shades" },
  { name: "Zitronengelb", hex: "#fff44f", family: "Gelb", level: "shades" },
  { name: "Dunkellila", hex: "#4c1d95", family: "Lila", level: "shades" },
  { name: "Flieder", hex: "#cdb4db", family: "Lila", level: "shades" },
  { name: "Beige", hex: "#e6ccb2", family: "Braun", level: "shades" }
];

const optionPresets = {
  Rot: ["Rot", "Orange", "Gelb", "Grün"],
  Orange: ["Orange", "Gelb", "Rot", "Braun"],
  Gelb: ["Gelb", "Orange", "Grün", "Weiß"],
  Blau: ["Blau", "Grün", "Grau", "Schwarz"],
  Lila: ["Lila", "Rot", "Blau", "Rosa"],
  Schwarz: ["Schwarz", "Grau", "Weiß", "Braun"],
  Weiß: ["Weiß", "Grau", "Gelb", "Schwarz"],
  Grün: ["Grün", "Gelb", "Braun", "Orange"]
};

function createObjectPrompt({ name, article, answer, category, image }) {
  return {
    name,
    article,
    answer,
    category,
    speak: `Welche Farbe hat ${article} ${name}?`,
    image,
    options: optionPresets[answer] ?? [answer, "Rot", "Blau", "Gelb"]
  };
}

const objectPrompts = [
  createObjectPrompt({ name: "Apfel", article: "der", answer: "Rot", category: "Lebensmittel", image: "apple" }),
  createObjectPrompt({ name: "Tomate", article: "die", answer: "Rot", category: "Lebensmittel", image: "tomato" }),
  createObjectPrompt({ name: "Erdbeere", article: "die", answer: "Rot", category: "Lebensmittel", image: "strawberry" }),
  createObjectPrompt({ name: "Marienkäfer", article: "der", answer: "Rot", category: "Tier", image: "ladybug" }),
  createObjectPrompt({ name: "Feuerwehrauto", article: "das", answer: "Rot", category: "Fahrzeug", image: "firetruck" }),
  createObjectPrompt({ name: "Feuerlöscher", article: "der", answer: "Rot", category: "Alltag", image: "extinguisher" }),
  createObjectPrompt({ name: "Orange", article: "die", answer: "Orange", category: "Lebensmittel", image: "orangefruit" }),
  createObjectPrompt({ name: "Karotte", article: "die", answer: "Orange", category: "Lebensmittel", image: "carrot" }),
  createObjectPrompt({ name: "Kürbis", article: "der", answer: "Orange", category: "Lebensmittel", image: "pumpkin" }),
  createObjectPrompt({ name: "Orang-Utan", article: "der", answer: "Orange", category: "Tier", image: "orangutan" }),
  createObjectPrompt({ name: "Banane", article: "die", answer: "Gelb", category: "Lebensmittel", image: "banana" }),
  createObjectPrompt({ name: "Zitrone", article: "die", answer: "Gelb", category: "Lebensmittel", image: "lemon" }),
  createObjectPrompt({ name: "Küken", article: "das", answer: "Gelb", category: "Tier", image: "chick" }),
  createObjectPrompt({ name: "Blaubeere", article: "die", answer: "Blau", category: "Lebensmittel", image: "blueberry" }),
  createObjectPrompt({ name: "Fußgängerschild", article: "das", answer: "Blau", category: "Verkehr", image: "pedestrian" }),
  createObjectPrompt({ name: "Jeans", article: "die", answer: "Blau", category: "Kleidung", image: "jeans" }),
  createObjectPrompt({ name: "Aubergine", article: "die", answer: "Lila", category: "Lebensmittel", image: "eggplant" }),
  createObjectPrompt({ name: "Lavendel", article: "der", answer: "Lila", category: "Pflanze", image: "lavender" }),
  createObjectPrompt({ name: "Pflaume", article: "die", answer: "Lila", category: "Lebensmittel", image: "plum" }),
  createObjectPrompt({ name: "Rabe", article: "der", answer: "Schwarz", category: "Tier", image: "raven" }),
  createObjectPrompt({ name: "Reifen", article: "der", answer: "Schwarz", category: "Fahrzeug", image: "tire" }),
  createObjectPrompt({ name: "Kochplatte", article: "die", answer: "Schwarz", category: "Küche", image: "stove" }),
  createObjectPrompt({ name: "Ei", article: "das", answer: "Weiß", category: "Lebensmittel", image: "egg" }),
  createObjectPrompt({ name: "Schaf", article: "das", answer: "Weiß", category: "Tier", image: "sheep" }),
  createObjectPrompt({ name: "Milch", article: "die", answer: "Weiß", category: "Getränk", image: "milk" }),
  createObjectPrompt({ name: "Gurke", article: "die", answer: "Grün", category: "Lebensmittel", image: "cucumber" }),
  createObjectPrompt({ name: "Brokkoli", article: "der", answer: "Grün", category: "Lebensmittel", image: "broccoli" }),
  createObjectPrompt({ name: "Frosch", article: "der", answer: "Grün", category: "Tier", image: "frog" }),
  createObjectPrompt({ name: "Blatt", article: "das", answer: "Grün", category: "Pflanze", image: "leaf" }),
  createObjectPrompt({ name: "Kiwi", article: "die", answer: "Grün", category: "Lebensmittel", image: "kiwi" })
];

const levelGroups = {
  basic: ["basic"],
  more: ["basic", "more"],
  shades: ["basic", "more", "shades"],
  all: ["basic", "more", "shades"]
};

const state = {
  mode: "object",
  level: "basic",
  score: 0,
  current: null,
  voices: [],
  speechUnlocked: false,
  pendingSpeech: null,
  speechToken: 0,
  objectStarted: false,
  sequenceIndex: 0,
  sequence: []
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

function activeColors() {
  return colors.filter((color) => levelGroups[state.level].includes(color.level));
}

function flushPendingSpeech() {
  if (!state.pendingSpeech) {
    return;
  }
  const pending = state.pendingSpeech;
  state.pendingSpeech = null;
  window.setTimeout(() => speak(pending.text, true, pending.options), 80);
}

function unlockSpeech() {
  if (!("speechSynthesis" in window)) {
    return;
  }
  state.speechUnlocked = true;
  window.speechSynthesis.resume();
  flushPendingSpeech();
}

function queueSpeech(text, options = {}) {
  state.pendingSpeech = { text, options };
}

function speak(text, bypassLock = false, options = {}) {
  const { interrupt = true, onend = null } = options;

  if (!("speechSynthesis" in window)) {
    setFeedback("Dieser Browser unterstützt hier keine Sprachausgabe.", "try");
    return;
  }

  if (!state.speechUnlocked && !bypassLock) {
    queueSpeech(text, options);
    return;
  }

  if (interrupt) {
    window.speechSynthesis.cancel();
  }
  window.speechSynthesis.resume();
  const utterance = new SpeechSynthesisUtterance(text);
  const token = ++state.speechToken;
  utterance.lang = "de-DE";
  utterance.rate = 0.9;
  utterance.pitch = 1;
  utterance.volume = 1;
  const germanVoice = state.voices.find((voice) => voice.lang.toLowerCase().startsWith("de"));
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
  utterance.onerror = () => {
    setFeedback("Die Sprachausgabe konnte gerade nicht gestartet werden.", "try");
    if (typeof onend === "function") {
      onend();
    }
  };
  window.speechSynthesis.speak(utterance);
}

function speakAndContinue(text, callback, pause = 700) {
  speak(text, false, {
    onend: () => {
      window.setTimeout(() => {
        callback();
      }, pause);
    }
  });
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
  if (state.score === 20) {
    showWichtel();
  }
}

function textColor(hex) {
  const clean = hex.replace("#", "");
  const red = parseInt(clean.slice(0, 2), 16);
  const green = parseInt(clean.slice(2, 4), 16);
  const blue = parseInt(clean.slice(4, 6), 16);
  const brightness = (red * 299 + green * 587 + blue * 114) / 1000;
  return brightness > 150 ? "#111111" : "#ffffff";
}

function createSwatch(color, label = color.name) {
  const swatch = document.createElement("span");
  swatch.className = "color-swatch";
  swatch.style.backgroundColor = color.hex;
  swatch.style.color = textColor(color.hex);
  swatch.textContent = label;
  return swatch;
}

function colorButton(color, onClick, hideName = false) {
  const button = document.createElement("button");
  button.className = "color-card";
  button.type = "button";
  button.append(createSwatch(color, hideName ? "?" : color.name));

  const name = document.createElement("strong");
  name.textContent = hideName ? "Welche Farbe ist das?" : color.name;

  button.append(name);
  button.addEventListener("click", () => onClick(button, color));
  return button;
}

function colorByName(name) {
  return colors.find((color) => color.name === name);
}

function promptImageSource(entry, revealed = false) {
  return `bilder/${entry.image}${revealed ? "" : "-grau"}.png`;
}

function createPromptCard(entry, revealed = false) {
  const card = document.createElement("article");
  card.className = `prompt-card ${revealed ? "revealed" : ""}`.trim();
  card.innerHTML = `
    <div class="prompt-visual">
      <img class="prompt-image" src="${promptImageSource(entry, revealed)}" alt="${entry.name}">
    </div>
    <div class="prompt-copy">
      <p class="item-meta">${entry.category}</p>
      <h3>${entry.name}</h3>
      <p class="small-note">${revealed ? `Jetzt siehst du ${entry.article} ${entry.name.toLowerCase()} in ${entry.answer}.` : `Das Bild ist zuerst grau. Welche Farbe hat ${entry.article} ${entry.name.toLowerCase()}?`}</p>
    </div>
  `;
  return card;
}

function disableButtons() {
  panel.querySelectorAll("button").forEach((button) => {
    button.disabled = true;
  });
}

function drawLearn() {
  state.current = null;
  panel.innerHTML = "";
  panel.className = "activity-panel color-grid";
  taskText.textContent = "Tippe eine Farbe an, um den Namen zu hören.";
  setFeedback("Lernen: Schau dir die Farben an und höre die Namen.");

  activeColors().forEach((color) => {
    panel.append(colorButton(color, (_button, selected) => {
      setFeedback(`${selected.name}.`, "good");
      speak(`${selected.name}.`);
    }));
  });
}

function drawFind() {
  const all = activeColors();
  const answer = pickRandom(all);
  const options = shuffle([answer, ...shuffle(all.filter((color) => color.name !== answer.name)).slice(0, 5)]);
  state.current = { answer, prompt: `Welche Farbe ist ${answer.name}?` };
  panel.innerHTML = "";
  panel.className = "activity-panel color-grid";
  taskText.textContent = state.current.prompt;
  setFeedback("Tippe auf die passende Farbkarte.");

  options.forEach((color) => {
    panel.append(colorButton(color, (button, selected) => {
      const isCorrect = selected.name === answer.name;
      button.classList.add(isCorrect ? "correct" : "wrong");
      if (isCorrect) {
        addPoint();
        disableButtons();
        setFeedback(`Richtig. Das ist ${answer.name}.`, "good");
        speakAndContinue(`Richtig. Das ist ${answer.name}.`, nextTask);
        return;
      }
      setFeedback(`Das war ${selected.name}. Suche ${answer.name}.`, "try");
      speak(`Das war ${selected.name}. Suche ${answer.name}.`);
    }, true));
  });

  if (autoSpeak.checked) {
    speak(state.current.prompt);
  }
}

function drawListen() {
  const all = activeColors();
  const answer = pickRandom(all);
  const options = shuffle([answer, ...shuffle(all.filter((color) => color.name !== answer.name)).slice(0, 5)]);
  state.current = { answer, prompt: `Höre gut zu. Tippe auf ${answer.name}.` };
  panel.innerHTML = "";
  panel.className = "activity-panel color-grid";
  taskText.textContent = "Höre die Farbe und tippe auf die passende Karte.";
  setFeedback("Bei dieser Aufgabe hilft dir die Sprachausgabe.");

  options.forEach((color) => {
    panel.append(colorButton(color, (button, selected) => {
      const isCorrect = selected.name === answer.name;
      button.classList.add(isCorrect ? "correct" : "wrong");
      if (isCorrect) {
        addPoint();
        disableButtons();
        setFeedback(`Sehr gut gehört. ${answer.name} ist richtig.`, "good");
        speakAndContinue(`Sehr gut gehört. ${answer.name} ist richtig.`, nextTask);
        return;
      }
      setFeedback("Höre nochmal genau hin.", "try");
      speak(`Das war ${selected.name}. Höre nochmal genau hin.`);
    }, true));
  });

  speak(state.current.prompt);
}

function drawSequence() {
  const all = activeColors();
  state.sequence = shuffle(all).slice(0, Math.min(3, all.length));
  state.sequenceIndex = 0;
  state.current = { prompt: `Tippe die Farben in dieser Reihenfolge: ${state.sequence.map((color) => color.name).join(", ")}.` };
  panel.innerHTML = "";
  panel.className = "activity-panel sequence-layout";
  taskText.textContent = state.current.prompt;
  setFeedback("Merke dir die Reihenfolge und tippe dann die Farben an.");

  const target = document.createElement("div");
  target.className = "sequence-target";
  state.sequence.forEach((color, index) => {
    const chip = document.createElement("span");
    chip.className = "sequence-chip";
    chip.textContent = `${index + 1}. ${color.name}`;
    target.append(chip);
  });

  const grid = document.createElement("div");
  grid.className = "color-grid";
  shuffle([...state.sequence, ...shuffle(all.filter((color) => !state.sequence.includes(color))).slice(0, 3)]).forEach((color) => {
    grid.append(colorButton(color, (button, selected) => {
      const expected = state.sequence[state.sequenceIndex];
      const isCorrect = selected.name === expected.name;
      button.classList.add(isCorrect ? "correct" : "wrong");
      if (!isCorrect) {
        setFeedback(`Jetzt wäre ${expected.name} dran.`, "try");
        speak(`Jetzt wäre ${expected.name} dran.`);
        return;
      }

      button.disabled = true;
      state.sequenceIndex += 1;
      if (state.sequenceIndex === state.sequence.length) {
        addPoint();
        disableButtons();
        setFeedback("Prima. Die Reihenfolge stimmt.", "good");
        speakAndContinue("Prima. Die Reihenfolge stimmt.", nextTask);
        return;
      }

      setFeedback(`Richtig. Jetzt ${state.sequence[state.sequenceIndex].name}.`, "good");
      speak(`Richtig. Jetzt ${state.sequence[state.sequenceIndex].name}.`);
    }));
  });

  panel.append(target, grid);
  if (autoSpeak.checked) {
    speak(state.current.prompt);
  }
}

function drawObjectColor() {
  const visibleColors = activeColors();
  const availableNames = new Set(visibleColors.map((color) => color.name));
  const candidates = objectPrompts.filter((entry) => availableNames.has(entry.answer));
  const entry = !state.objectStarted
    ? candidates.find((candidate) => candidate.image === "banana") || pickRandom(candidates)
    : pickRandom(candidates);
  state.objectStarted = true;
  const options = shuffle(entry.options)
    .map((name) => visibleColors.find((color) => color.name === name))
    .filter(Boolean)
    .slice(0, 4);

  if (!options.some((color) => color.name === entry.answer)) {
    drawFind();
    return;
  }

  state.current = { entry, prompt: entry.speak };
  panel.innerHTML = "";
  panel.className = "activity-panel object-layout";
  taskText.textContent = entry.speak;
  setFeedback("Wähle die richtige Farbe für das graue Bild.");
  const promptCard = createPromptCard(entry);

  const grid = document.createElement("div");
  grid.className = "color-grid";
  options.forEach((color) => {
    grid.append(colorButton(color, (button, selected) => {
      const isCorrect = selected.name === entry.answer;
      button.classList.add(isCorrect ? "correct" : "wrong");
      if (isCorrect) {
        addPoint();
        disableButtons();
        promptCard.replaceWith(createPromptCard(entry, true));
        setFeedback(`Richtig. ${entry.article} ${entry.name} ist ${entry.answer}.`, "good");
        speakAndContinue(`Richtig. ${entry.article} ${entry.name} ist ${entry.answer}.`, nextTask);
        return;
      }
      setFeedback(`${selected.name} passt hier nicht. Versuche es noch einmal.`, "try");
      speak(`${selected.name} passt hier nicht. Versuche es noch einmal.`);
    }));
  });

  panel.append(promptCard, grid);
  if (autoSpeak.checked) {
    speak(entry.speak);
  }
}

function nextTask() {
  if (state.mode === "find") {
    drawFind();
    return;
  }
  if (state.mode === "listen") {
    drawListen();
    return;
  }
  if (state.mode === "sequence") {
    drawSequence();
    return;
  }
  if (state.mode === "object") {
    drawObjectColor();
    return;
  }
  drawLearn();
}

function repeatCurrent() {
  if (state.current?.prompt) {
    speak(state.current.prompt);
    return;
  }
  speak("Tippe eine Farbe an, um den Namen zu hören.");
}

function updateMode(mode) {
  state.mode = mode;
  tabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.mode === mode));
  nextTask();
}

function showWichtel() {
  const wichtel = document.createElement("div");
  wichtel.className = "wichtel-show";
  wichtel.setAttribute("role", "status");
  wichtel.setAttribute("aria-live", "assertive");
  wichtel.innerHTML = `
    <div class="wichtel-card">
      <div class="wichtel-figure" aria-hidden="true">
        <span class="wichtel-hat"></span>
        <span class="wichtel-head"></span>
        <span class="wichtel-beard"></span>
        <span class="wichtel-body"></span>
        <span class="wichtel-hand left"></span>
        <span class="wichtel-hand right"></span>
      </div>
      <p>Das hast du prima gemacht!</p>
    </div>
  `;
  document.body.append(wichtel);
  speak("Das hast du prima gemacht!");
  window.setTimeout(() => wichtel.remove(), 4400);
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
  speak("Hallo. Ich helfe dir beim Üben der Farben.");
});
levelFilter.addEventListener("change", (event) => {
  state.level = event.target.value;
  nextTask();
});

if ("speechSynthesis" in window) {
  loadVoices();
  window.speechSynthesis.addEventListener("voiceschanged", loadVoices);
  window.addEventListener("pointerdown", unlockSpeech, { once: true });
  window.addEventListener("keydown", unlockSpeech, { once: true });
  window.addEventListener("touchstart", unlockSpeech, { once: true });
}

drawLearn();
