const balloonColors = [
  { name: "Rot", hex: "#d62828" },
  { name: "Blau", hex: "#1269b0" },
  { name: "Gelb", hex: "#ffd166" },
  { name: "Grün", hex: "#2a9d8f" }
];

const targetScore = 10;

const state = {
  score: 0,
  voices: [],
  speechUnlocked: false,
  pendingSpeech: null,
  intervalId: null,
  balloonId: 0,
  round: 0,
  finished: false,
  speechToken: 0
};

const panel = document.querySelector("#activity-panel");
const taskText = document.querySelector("#task-text");
const feedback = document.querySelector("#feedback");
const score = document.querySelector("#score");
const repeatButton = document.querySelector("#repeat");
const restartButton = document.querySelector("#restart");
const voiceTestButton = document.querySelector("#voice-test");
const autoSpeak = document.querySelector("#auto-speak");

function setFeedback(text, kind = "") {
  feedback.textContent = text;
  feedback.className = `feedback ${kind}`.trim();
}

function setScore(value) {
  state.score = value;
  score.textContent = value;
}

function pickRandom(items) {
  return items[Math.floor(Math.random() * items.length)];
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

  const utterance = new SpeechSynthesisUtterance(text);
  const token = ++state.speechToken;
  utterance.lang = "de-DE";
  utterance.rate = 0.92;
  utterance.pitch = 1;
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

function playMouseBeep() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) {
    return;
  }
  const context = new AudioContextClass();
  [0, 0.12, 0.24].forEach((offset, index) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = 1180 + index * 120;
    gain.gain.value = 0.0001;
    oscillator.connect(gain);
    gain.connect(context.destination);
    const start = context.currentTime + offset;
    gain.gain.exponentialRampToValueAtTime(0.12, start + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.12);
    oscillator.start(start);
    oscillator.stop(start + 0.14);
  });
}

function clearRound() {
  if (state.intervalId) {
    window.clearInterval(state.intervalId);
    state.intervalId = null;
  }
  panel.querySelectorAll(".balloon, .firework-burst, .balloon-pop-effect, .balloon-fragment, .mouse-finale").forEach((node) => node.remove());
  state.finished = false;
}

function updateCaughtText(text) {
  const label = document.querySelector("#balloon-color-text");
  if (!label) {
    return;
  }
  label.textContent = text;
  label.classList.remove("burst");
  void label.offsetWidth;
  label.classList.add("burst");
}

function createFireworkBurst(left, top, color) {
  const burst = document.createElement("div");
  burst.className = "firework-burst";
  burst.style.left = `${left}px`;
  burst.style.top = `${top}px`;
  burst.style.setProperty("--burst-color", color.hex);

  for (let index = 0; index < 14; index += 1) {
    const spark = document.createElement("span");
    spark.className = "spark";
    spark.style.setProperty("--spark-angle", `${(360 / 14) * index}deg`);
    spark.style.setProperty("--spark-distance", `${56 + (index % 4) * 10}px`);
    burst.append(spark);
  }

  panel.querySelector("#balloon-board").append(burst);
  window.setTimeout(() => burst.remove(), 700);
}

function createBalloonFragments(left, top, color, width, height) {
  const board = document.querySelector("#balloon-board");
  if (!board) {
    return;
  }

  const effect = document.createElement("div");
  effect.className = "balloon-pop-effect";
  effect.style.left = `${left}px`;
  effect.style.top = `${top}px`;
  effect.style.setProperty("--fragment-color", color.hex);

  const ring = document.createElement("span");
  ring.className = "balloon-pop-ring";
  effect.append(ring);

  const fragmentShapes = [
    "polygon(0 10%, 100% 0, 86% 100%, 18% 84%)",
    "polygon(10% 0, 100% 24%, 78% 100%, 0 74%)",
    "polygon(0 0, 82% 6%, 100% 76%, 26% 100%)",
    "polygon(24% 0, 100% 18%, 82% 94%, 0 100%, 8% 32%)",
    "polygon(8% 12%, 72% 0, 100% 44%, 58% 100%, 0 82%)"
  ];

  for (let index = 0; index < 24; index += 1) {
    const angle = ((Math.PI * 2) / 24) * index + (Math.random() - 0.5) * 0.38;
    const distance = 95 + Math.random() * 155;
    const fragment = document.createElement("span");
    const fragmentWidth = 20 + Math.random() * 30;
    const fragmentHeight = 24 + Math.random() * 38;
    const startX = (Math.random() - 0.5) * width * 0.42;
    const startY = (Math.random() - 0.5) * height * 0.42;
    const driftX = Math.cos(angle) * distance;
    const driftY = Math.sin(angle) * distance + 42 + Math.random() * 36;

    fragment.className = "balloon-fragment";
    fragment.style.left = `${startX}px`;
    fragment.style.top = `${startY}px`;
    fragment.style.width = `${fragmentWidth}px`;
    fragment.style.height = `${fragmentHeight}px`;
    fragment.style.setProperty("--fragment-x", `${driftX}px`);
    fragment.style.setProperty("--fragment-y", `${driftY}px`);
    fragment.style.setProperty("--fragment-rotate", `${(Math.random() > 0.5 ? 1 : -1) * (260 + Math.random() * 520)}deg`);
    fragment.style.setProperty("--fragment-delay", `${Math.random() * 90}ms`);
    fragment.style.clipPath = fragmentShapes[index % fragmentShapes.length];
    effect.append(fragment);
  }

  board.append(effect);
  window.setTimeout(() => effect.remove(), 1500);
}

function finishRound() {
  if (state.finished) {
    return;
  }
  state.finished = true;
  if (state.intervalId) {
    window.clearInterval(state.intervalId);
    state.intervalId = null;
  }

  panel.querySelectorAll(".balloon").forEach((balloon) => {
    balloon.classList.add("is-fading");
    window.setTimeout(() => balloon.remove(), 260);
  });

  const board = document.querySelector("#balloon-board");
  const finale = document.createElement("div");
  finale.className = "mouse-finale";
  finale.innerHTML = `
    <div class="mouse-figure" aria-hidden="true">
      <span class="mouse-ear left"></span>
      <span class="mouse-ear right"></span>
      <span class="mouse-body"></span>
      <span class="mouse-eye"></span>
      <span class="mouse-nose"></span>
      <span class="mouse-tail"></span>
    </div>
    <p>Pieps!</p>
    <small>10 Punkte geschafft.</small>
  `;
  board.append(finale);
  taskText.textContent = "10 Punkte geschafft. Die Maus ist da.";
  setFeedback("Super. Du hast 10 Punkte erreicht. Die Maus macht pieps.", "good");
  updateCaughtText("Geschafft!");
  speak("Super. Zehn Punkte geschafft. Pieps.", false, {
    onend: () => {
      playMouseBeep();
    }
  });
}

function addPoint() {
  setScore(state.score + 1);
  const progress = document.querySelector("#balloon-progress");
  if (progress) {
    progress.textContent = `${state.score} / ${targetScore} Punkte`;
  }
  if (state.score >= targetScore) {
    finishRound();
  }
}

function spawnBalloon() {
  if (state.finished) {
    return;
  }
  const board = document.querySelector("#balloon-board");
  const color = pickRandom(balloonColors);
  const balloon = document.createElement("button");
  const size = 84 + Math.round(Math.random() * 24);
  const boardWidth = board.clientWidth || 720;
  const left = Math.max(12, Math.round(Math.random() * Math.max(24, boardWidth - size - 24)));
  const duration = 4.8 + Math.random() * 2.8;

  balloon.type = "button";
  balloon.className = "balloon";
  balloon.dataset.id = `${state.round}-${++state.balloonId}`;
  balloon.setAttribute("aria-label", color.name);
  balloon.style.left = `${left}px`;
  balloon.style.width = `${size}px`;
  balloon.style.height = `${Math.round(size * 1.15)}px`;
  balloon.style.setProperty("--balloon-color", color.hex);
  balloon.style.setProperty("--balloon-duration", `${duration}s`);
  balloon.innerHTML = `<span>${color.name}</span><i aria-hidden="true"></i>`;

  balloon.addEventListener("click", () => {
    if (balloon.classList.contains("is-popped") || state.finished) {
      return;
    }
    const balloonRect = balloon.getBoundingClientRect();
    const boardRect = board.getBoundingClientRect();
    const burstLeft = balloonRect.left - boardRect.left + balloonRect.width / 2;
    const burstTop = balloonRect.top - boardRect.top + balloonRect.height / 2;
    createFireworkBurst(burstLeft, burstTop, color);
    createBalloonFragments(burstLeft, burstTop, color, balloonRect.width, balloonRect.height);
    balloon.classList.add("is-popped");
    updateCaughtText(color.name);
    addPoint();
    setFeedback(`Treffer. Das ist ${color.name}.`, "good");
    speak(color.name, false);
    window.setTimeout(() => balloon.remove(), 360);
  });

  balloon.addEventListener("animationend", () => {
    balloon.remove();
  });

  board.append(balloon);
}

function startRound() {
  clearRound();
  state.round += 1;
  setScore(0);
  taskText.textContent = "Fange Ballone in Rot, Blau, Gelb und Grün.";
  setFeedback("Tippe die aufsteigenden Ballone an.", "good");
  panel.innerHTML = `
    <section class="balloon-shell">
      <div class="balloon-info">
        <div>
          <p class="status-label">Ballonspiel</p>
          <h2>Fange die Grundfarben</h2>
          <p class="small-note">Tippe einen Ballon an. Er platzt mit Feuerwerk, Ballonteile fliegen weg, die Farbe wird gesagt und du sammelst Punkte bis 10.</p>
        </div>
        <div class="balloon-status">
          <strong id="balloon-progress">0 / ${targetScore} Punkte</strong>
          <span id="balloon-color-text">Los geht's!</span>
        </div>
      </div>
      <div class="balloon-board" id="balloon-board" aria-label="Ballonspielbereich"></div>
    </section>
  `;
  spawnBalloon();
  state.intervalId = window.setInterval(spawnBalloon, 950);
  if (autoSpeak.checked) {
    speak("Fange die Ballone. Höre die Grundfarben und sammle bis zehn Punkte.");
  }
}

repeatButton.addEventListener("click", () => {
  speak("Fange die Ballone in Rot, Blau, Gelb und Grün.");
});

restartButton.addEventListener("click", () => {
  startRound();
});

voiceTestButton.addEventListener("click", () => {
  speak("Hallo. Wir spielen jetzt das Ballonspiel mit Grundfarben.");
});

if ("speechSynthesis" in window) {
  loadVoices();
  window.speechSynthesis.addEventListener("voiceschanged", loadVoices);
  window.addEventListener("pointerdown", unlockSpeech, { once: true });
  window.addEventListener("keydown", unlockSpeech, { once: true });
}

startRound();
