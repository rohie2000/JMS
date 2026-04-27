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
  speechPrimed: false,
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
  speak(pending.text, true, pending.options);
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
  utterance.rate = 0.9;
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

renderPlaceholder("Die Sprachsteuerung ist bereit.");
setTask(repeatSpeech);
setFeedback("Bereit.");
