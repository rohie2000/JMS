const colors = [
  { id: "rot", name: "Rot", hex: "#d71920", image: "bilder/schuh-rot.png", level: "starter" },
  { id: "blau", name: "Blau", hex: "#1f63b5", image: "bilder/schuh-blau.png", level: "starter" },
  { id: "gruen", name: "Gruen", spoken: "Gruen", hex: "#20824a", image: "bilder/schuh-gruen.png", level: "starter" },
  { id: "gelb", name: "Gelb", hex: "#e5b91e", image: "bilder/schuh-gelb.png", level: "more" },
  { id: "schwarz", name: "Schwarz", hex: "#151515", image: "bilder/schuh-schwarz.png", level: "more" }
];

const sizes = [
  { id: "klein", name: "Klein", spoken: "klein", label: "Gr. 28", numeric: 28, scale: 0.82, level: "starter" },
  { id: "mittel", name: "Mittel", spoken: "mittelgross", label: "Gr. 34", numeric: 34, scale: 0.98, level: "starter" },
  { id: "gross", name: "Gross", spoken: "gross", label: "Gr. 40", numeric: 40, scale: 1.14, level: "more" }
];

const levelColors = {
  starter: ["starter"],
  more: ["starter", "more"],
  all: ["starter", "more"]
};

const state = {
  mode: "learn",
  level: "starter",
  score: 0,
  current: null,
  voices: [],
  speechUnlocked: false,
  pendingSpeech: null,
  speechToken: 0,
  draggedId: null,
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
  return colors.filter((color) => levelColors[state.level].includes(color.level));
}

function activeSizes() {
  return sizes.filter((size) => levelColors[state.level].includes(size.level));
}

function createShoeList() {
  return activeColors().flatMap((color) => activeSizes().map((size) => ({
    id: `${color.id}-${size.id}`,
    color,
    size,
    title: `${color.name}er Schuh`,
    spoken: `${color.spoken || color.name}er Schuh, ${size.label}, ${size.spoken}`
  })));
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function pickRandom(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function setFeedback(text, kind = "") {
  feedback.textContent = text;
  feedback.className = `feedback ${kind}`.trim();
}

function addPoint() {
  state.score += 1;
  score.textContent = state.score;
  if (state.score > 0 && state.score % 12 === 0) {
    showCelebration();
  }
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

function pickGermanVoice() {
  return state.voices.find((voice) => voice.lang?.toLowerCase() === "de-de")
    || state.voices.find((voice) => voice.lang?.toLowerCase().startsWith("de"))
    || state.voices[0]
    || null;
}

function unlockSpeech() {
  if (!("speechSynthesis" in window)) {
    return;
  }
  state.speechUnlocked = true;
  loadVoices();
  window.speechSynthesis.resume();
  if (state.pendingSpeech) {
    const text = state.pendingSpeech;
    state.pendingSpeech = null;
    speak(text, true);
  }
}

function speak(text, bypassLock = false, onend = null) {
  if (!text) {
    return;
  }
  if (!("speechSynthesis" in window)) {
    return;
  }
  if (!state.speechUnlocked && !bypassLock) {
    state.pendingSpeech = text;
    return;
  }
  window.speechSynthesis.cancel();
  window.speechSynthesis.resume();
  const utterance = new SpeechSynthesisUtterance(text);
  const token = ++state.speechToken;
  utterance.lang = "de-DE";
  utterance.rate = 0.9;
  utterance.pitch = 1;
  const germanVoice = pickGermanVoice();
  if (germanVoice) {
    utterance.voice = germanVoice;
  }
  utterance.onend = () => {
    if (token === state.speechToken && typeof onend === "function") {
      onend();
    }
  };
  utterance.onerror = () => {
    if (typeof onend === "function") {
      onend();
    }
  };
  window.speechSynthesis.speak(utterance);
}

function speakAndContinue(text, callback) {
  speak(text, false, () => {
    window.setTimeout(callback, 650);
  });
}

function shoeCard(shoe, onClick, options = {}) {
  const button = document.createElement("button");
  button.className = "shoe-card";
  button.type = "button";
  button.draggable = options.draggable ?? true;
  button.dataset.shoeId = shoe.id;
  button.style.setProperty("--scale", shoe.size.scale);
  button.innerHTML = `
    <span class="shoe-image-box">
      <img src="${shoe.color.image}" alt="${shoe.title}">
    </span>
    <strong>${shoe.title}</strong>
    <span class="shoe-meta">
      <span class="color-dot" style="background:${shoe.color.hex}" aria-hidden="true"></span>
      <span class="badge">${shoe.color.name}</span>
      <span class="badge">${shoe.size.label}</span>
      <span class="badge">${shoe.size.name}</span>
    </span>
  `;
  button.addEventListener("click", () => onClick?.(button, shoe));
  button.addEventListener("dragstart", (event) => {
    state.draggedId = shoe.id;
    button.classList.add("dragging");
    event.dataTransfer.setData("text/plain", shoe.id);
  });
  button.addEventListener("dragend", () => {
    button.classList.remove("dragging");
    state.draggedId = null;
  });
  return button;
}

function disablePanelButtons() {
  panel.querySelectorAll("button").forEach((button) => {
    button.disabled = true;
  });
}

function drawLearn() {
  const shoes = createShoeList();
  state.current = { prompt: "Tippe einen Schuh an und hoere Farbe und Groesse." };
  panel.className = "activity-panel learn-grid";
  panel.innerHTML = "";
  taskText.textContent = state.current.prompt;
  setFeedback("Lernen: Tippe auf eine Karte. Die App liest Farbe und Groesse vor.");
  shoes.forEach((shoe) => {
    panel.append(shoeCard(shoe, (_button, selected) => {
      setFeedback(`${selected.color.name}, ${selected.size.label}, ${selected.size.name}.`, "good");
      speak(selected.spoken);
    }, { draggable: false }));
  });
}

function drawColorTask() {
  const shoe = pickRandom(createShoeList());
  const shelves = activeColors();
  state.current = { shoe, prompt: `Sortiere den ${shoe.color.spoken || shoe.color.name}en Schuh in das passende Farbregal.` };
  panel.className = "activity-panel choice-layout";
  panel.innerHTML = "";
  taskText.textContent = state.current.prompt;
  setFeedback("Tippe auf ein Regal oder ziehe den Schuh dorthin.");

  const card = shoeCard(shoe, () => {
    speak(shoe.spoken);
  });
  const grid = document.createElement("div");
  grid.className = "shelf-grid";
  shelves.forEach((color) => {
    grid.append(shelfButton({
      title: `${color.name}e Schuhe`,
      subtitle: "Farbregal",
      color,
      target: color.id,
      accepts: (selected) => selected.color.id === color.id,
      success: `Richtig. Der Schuh gehoert ins Regal ${color.name}.`
    }));
  });
  panel.append(card, grid);
  if (autoSpeak.checked) {
    speak(state.current.prompt);
  }
}

function drawSizeTask() {
  const shoe = pickRandom(createShoeList());
  const shelves = activeSizes();
  state.current = { shoe, prompt: `Sortiere den Schuh nach Groesse. Er hat ${shoe.size.label}.` };
  panel.className = "activity-panel choice-layout";
  panel.innerHTML = "";
  taskText.textContent = state.current.prompt;
  setFeedback("Welches Groessenregal passt?");

  const card = shoeCard(shoe, () => {
    speak(shoe.spoken);
  });
  const grid = document.createElement("div");
  grid.className = "shelf-grid";
  shelves.forEach((size) => {
    grid.append(shelfButton({
      title: `${size.name}e Schuhe`,
      subtitle: `${size.label} und aehnliche Groessen`,
      target: size.id,
      accepts: (selected) => selected.size.id === size.id,
      success: `Richtig. ${shoe.size.label} gehoert zum Regal ${size.name}.`
    }));
  });
  panel.append(card, grid);
  if (autoSpeak.checked) {
    speak(state.current.prompt);
  }
}

function shelfButton(config) {
  const button = document.createElement("button");
  button.className = "shelf-button";
  button.type = "button";
  if (config.target) {
    button.dataset.target = config.target;
  }
  const dot = config.color ? `<span class="color-dot" style="background:${config.color.hex}" aria-hidden="true"></span>` : "";
  button.innerHTML = `
    <strong>${dot}${config.title}</strong>
    <span>${config.subtitle}</span>
    <span class="shelf-preview" aria-hidden="true"></span>
  `;
  button.addEventListener("click", () => handleShelfChoice(button, config));
  addDropHandlers(button, config);
  return button;
}

function addDropHandlers(target, config) {
  target.addEventListener("dragover", (event) => {
    event.preventDefault();
    target.classList.add("is-over");
  });
  target.addEventListener("dragleave", () => {
    target.classList.remove("is-over");
  });
  target.addEventListener("drop", (event) => {
    event.preventDefault();
    target.classList.remove("is-over");
    handleShelfChoice(target, config);
  });
}

function handleShelfChoice(target, config) {
  const selected = state.current?.shoe;
  if (!selected) {
    return;
  }
  const correct = config.accepts(selected);
  target.classList.add(correct ? "correct" : "wrong");
  if (correct) {
    addPoint();
    disablePanelButtons();
    placeMiniShoe(target, selected);
    setFeedback(config.success, "good");
    speakAndContinue(config.success, nextTask);
    return;
  }
  setFeedback("Das Regal passt noch nicht. Schau noch einmal auf Farbe und Groesse.", "try");
  speak("Das Regal passt noch nicht. Versuche es noch einmal.");
  window.setTimeout(() => target.classList.remove("wrong"), 700);
}

function placeMiniShoe(target, shoe) {
  const preview = target.querySelector(".shelf-preview");
  if (!preview) {
    return;
  }
  const mini = document.createElement("span");
  mini.className = "mini-shoe";
  mini.style.borderColor = shoe.color.hex;
  mini.textContent = shoe.size.label.replace("Gr. ", "");
  preview.append(mini);
}

function drawMixedTask() {
  const shoe = pickRandom(createShoeList());
  state.current = { shoe, prompt: `Lege den ${shoe.color.spoken || shoe.color.name}en Schuh, ${shoe.size.label}, in das richtige Regal.` };
  panel.className = "activity-panel mixed-layout";
  panel.innerHTML = "";
  taskText.textContent = state.current.prompt;
  setFeedback("Jetzt zaehlen Farbe und Groesse zusammen.");

  const card = shoeCard(shoe, () => speak(shoe.spoken));
  const grid = document.createElement("div");
  grid.className = "mixed-grid";
  activeSizes().forEach((size) => {
    activeColors().forEach((color) => {
      const cell = document.createElement("button");
      cell.className = "shelf-cell";
      cell.type = "button";
      cell.dataset.target = `${color.id}-${size.id}`;
      cell.innerHTML = `
        <strong><span class="color-dot" style="background:${color.hex}" aria-hidden="true"></span> ${color.name}</strong>
        <span>${size.label} - ${size.name}</span>
      `;
      const config = {
        accepts: (selected) => selected.color.id === color.id && selected.size.id === size.id,
        success: `Richtig. ${color.name}, ${size.label}: Das ist das passende Regal.`
      };
      cell.addEventListener("click", () => handleShelfChoice(cell, config));
      addDropHandlers(cell, config);
      grid.append(cell);
    });
  });
  panel.append(card, grid);
  if (autoSpeak.checked) {
    speak(state.current.prompt);
  }
}

function drawSequence() {
  const shoes = shuffle(createShoeList()).slice(0, 4);
  state.sequence = shoes;
  state.current = { prompt: "Ladenrunde: Merke dir die vier Regale und sprich sie nacheinander nach." };
  panel.className = "activity-panel choice-layout";
  panel.innerHTML = "";
  taskText.textContent = state.current.prompt;
  setFeedback("Tippe die Karten an, um die Reihenfolge zu hoeren. Danach kann die Gruppe sie nachsprechen.");

  const list = document.createElement("ol");
  list.className = "sequence-list";
  shoes.forEach((shoe, index) => {
    const item = document.createElement("li");
    item.className = "sequence-item";
    item.innerHTML = `
      <span class="sequence-number">${index + 1}</span>
      <span>${shoe.color.name}es Regal, ${shoe.size.label}, ${shoe.size.name}</span>
    `;
    list.append(item);
  });

  const grid = document.createElement("div");
  grid.className = "choice-grid";
  shoes.forEach((shoe) => {
    grid.append(shoeCard(shoe, () => {
      speak(`${shoe.color.spoken || shoe.color.name}es Regal, ${shoe.size.label}, ${shoe.size.spoken}.`);
      setFeedback(`${shoe.color.name}es Regal, ${shoe.size.label}, ${shoe.size.name}.`, "good");
    }, { draggable: false }));
  });
  panel.append(list, grid);
  if (autoSpeak.checked) {
    speak("Ladenrunde. Hoere dir die Regale der Reihe nach an.");
  }
}

function nextTask() {
  if (state.mode === "color") {
    drawColorTask();
    return;
  }
  if (state.mode === "size") {
    drawSizeTask();
    return;
  }
  if (state.mode === "mixed") {
    drawMixedTask();
    return;
  }
  if (state.mode === "sequence") {
    drawSequence();
    return;
  }
  drawLearn();
}

function repeatCurrent() {
  speak(state.current?.prompt || "Tippe einen Schuh an und hoere Farbe und Groesse.");
}

function updateMode(mode) {
  state.mode = mode;
  tabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.mode === mode));
  nextTask();
}

function showCelebration() {
  const celebration = document.createElement("div");
  celebration.className = "celebration";
  celebration.setAttribute("role", "status");
  celebration.innerHTML = `
    <div class="celebration-card">
      <p>Prima sortiert!</p>
    </div>
  `;
  document.body.append(celebration);
  speak("Prima sortiert!");
  window.setTimeout(() => celebration.remove(), 2800);
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
  speak("Hallo. Ich helfe dir beim Sortieren im Schuhladen.", true);
});

levelFilter.addEventListener("change", (event) => {
  state.level = event.target.value;
  nextTask();
});

if ("speechSynthesis" in window) {
  loadVoices();
  window.speechSynthesis.addEventListener("voiceschanged", loadVoices);
  window.addEventListener("pageshow", loadVoices);
  window.addEventListener("pointerdown", unlockSpeech, { once: true });
  window.addEventListener("click", unlockSpeech, { once: true });
  window.addEventListener("keydown", unlockSpeech, { once: true });
  window.addEventListener("touchstart", unlockSpeech, { once: true });
}

drawLearn();
