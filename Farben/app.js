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

const levelGroups = {
  basic: ["basic"],
  more: ["basic", "more"],
  shades: ["basic", "more", "shades"],
  all: ["basic", "more", "shades"]
};

const state = {
  mode: "learn",
  level: "basic",
  score: 0,
  current: null,
  voices: [],
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

function speak(text) {
  if (!("speechSynthesis" in window)) {
    setFeedback("Dieser Browser unterstützt hier keine Sprachausgabe.", "try");
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "de-DE";
  utterance.rate = 0.9;
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

  const family = document.createElement("p");
  family.className = "small-note";
  family.textContent = `Farbfamilie: ${color.family}`;

  button.append(name, family);
  button.addEventListener("click", () => onClick(button, color));
  return button;
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
      setFeedback(`${selected.name}. Diese Farbe gehört zur Farbfamilie ${selected.family}.`, "good");
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
        speak(`Richtig. Das ist ${answer.name}.`);
        window.setTimeout(nextTask, 1300);
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
        speak(`Sehr gut gehört. ${answer.name} ist richtig.`);
        window.setTimeout(nextTask, 1300);
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
        speak("Prima. Die Reihenfolge stimmt.");
        window.setTimeout(nextTask, 1500);
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

function drawFamily() {
  const all = activeColors();
  const families = [...new Set(all.map((color) => color.family))];
  const family = pickRandom(families);
  const correct = all.filter((color) => color.family === family);
  const answer = pickRandom(correct);
  const options = shuffle([answer, ...shuffle(all.filter((color) => color.family !== family)).slice(0, 5)]);
  state.current = { family, answer, prompt: `Welche Farbe gehört zur Farbfamilie ${family}?` };
  panel.innerHTML = "";
  panel.className = "activity-panel color-grid";
  taskText.textContent = state.current.prompt;
  setFeedback("Suche eine passende Farbe aus dieser Farbfamilie.");

  options.forEach((color) => {
    panel.append(colorButton(color, (button, selected) => {
      const isCorrect = selected.family === family;
      button.classList.add(isCorrect ? "correct" : "wrong");
      if (isCorrect) {
        addPoint();
        disableButtons();
        setFeedback(`${selected.name} passt zur Farbfamilie ${family}.`, "good");
        speak(`${selected.name} passt zur Farbfamilie ${family}.`);
        window.setTimeout(nextTask, 1300);
        return;
      }
      setFeedback(`${selected.name} gehört zur Farbfamilie ${selected.family}.`, "try");
      speak(`${selected.name} gehört zur Farbfamilie ${selected.family}.`);
    }));
  });

  if (autoSpeak.checked) {
    speak(state.current.prompt);
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
  if (state.mode === "family") {
    drawFamily();
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

repeatButton.addEventListener("click", repeatCurrent);
nextButton.addEventListener("click", nextTask);
voiceTestButton.addEventListener("click", () => {
  speak("Hallo. Ich helfe dir beim Üben der Farben.");
});
levelFilter.addEventListener("change", (event) => {
  state.level = event.target.value;
  nextTask();
});

if ("speechSynthesis" in window) {
  loadVoices();
  window.speechSynthesis.addEventListener("voiceschanged", loadVoices);
}

drawLearn();
