const appTitle = "Lernwerkstatt";
const introSpeech = "Hallo. Ich helfe dir in der Lernwerkstatt.";
const repeatSpeech = "Die Lernwerkstatt ist bereit. Tippe auf Stimme testen, Neue Aufgabe oder einen Modus.";

const modeTexts = {
  learn: "Lernen: Wir üben Begriffe und Aufgaben Schritt für Schritt.",
  category: "Überbegriffe: Wir ordnen Produkte und Themen passenden Gruppen zu.",
  express: "Express: Wir üben kurze Aufgaben schnell und nacheinander.",
  date: "MHD: Wir achten auf das Mindesthaltbarkeitsdatum.",
  display: "Aufsteller: Wir ordnen Waren sauber und passend ein.",
  dialog: "Dialog: Wir sprechen höfliche Sätze mit Kundinnen und Kunden."
};

const levelTexts = {
  starter: "Start aktiviert. Es werden einfache und wichtige Aufgaben geübt.",
  core: "Mehr Produkte aktiviert. Jetzt kommen zusätzliche Aufgaben dazu.",
  all: "Alles üben aktiviert. Die ganze Sammlung ist freigeschaltet."
};

const state = {
  voices: [],
  speechUnlocked: false,
  pendingSpeech: null,
  speechToken: 0,
  currentSpeech: repeatSpeech
};

const taskText = document.querySelector("#task-text");
const feedback = document.querySelector("#feedback");
const repeatButton = document.querySelector("#repeat");
const nextButton = document.querySelector("#next");
const voiceTestButton = document.querySelector("#voice-test");
const autoSpeak = document.querySelector("#auto-speak");
const levelFilter = document.querySelector("#level-filter");
const tabs = document.querySelectorAll(".tab");
const panel = document.querySelector("#activity-panel");

function setFeedback(text, kind = "") {
  feedback.textContent = text;
  feedback.className = `feedback ${kind}`.trim();
}

function setTask(text) {
  taskText.textContent = text;
}

function renderPlaceholder(message) {
  panel.innerHTML = `
    <article class="task-card">
      <div class="task-copy">
        <p class="eyebrow">Sprachausgabe aktiv</p>
        <h2>${appTitle}</h2>
        <p>${message}</p>
      </div>
    </article>
  `;
}

function queueSpeech(text, options = {}) {
  state.pendingSpeech = { text, options };
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

function loadVoices() {
  if ("speechSynthesis" in window) {
    state.voices = window.speechSynthesis.getVoices();
  }
}

function announce(text, feedbackText = text) {
  state.currentSpeech = text;
  setTask(feedbackText);
  renderPlaceholder(feedbackText);
  setFeedback("Sprachausgabe bereit.");
  if (autoSpeak.checked) {
    speak(text);
  }
}

function updateMode(mode) {
  tabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.mode === mode);
  });

  const text = modeTexts[mode] ?? repeatSpeech;
  announce(text, text);
}

repeatButton.addEventListener("click", () => {
  unlockSpeech();
  speak(state.currentSpeech);
});

nextButton.addEventListener("click", () => {
  unlockSpeech();
  announce("Neue Aufgabe. Wähle einen Modus oder starte mit Stimme testen.");
});

voiceTestButton.addEventListener("click", () => {
  unlockSpeech();
  speak(introSpeech);
  setFeedback("Stimme wird abgespielt.");
});

levelFilter.addEventListener("change", (event) => {
  const text = levelTexts[event.target.value] ?? levelTexts.starter;
  announce(text, text);
});

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    unlockSpeech();
    updateMode(tab.dataset.mode);
  });
});

if ("speechSynthesis" in window) {
  loadVoices();
  window.speechSynthesis.addEventListener("voiceschanged", loadVoices);
  window.addEventListener("pointerdown", unlockSpeech, { once: true });
  window.addEventListener("keydown", unlockSpeech, { once: true });
  window.addEventListener("touchstart", unlockSpeech, { once: true });
}

renderPlaceholder("Die Sprachsteuerung ist bereit.");
setTask(repeatSpeech);
setFeedback("Bereit.");
