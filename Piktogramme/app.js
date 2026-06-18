const groups = {
  gebot: { name: "Gebotszeichen", color: "blue", short: "Du sollst etwas tun." },
  rettung: { name: "Rettungszeichen", color: "green", short: "Hier findest du Hilfe." },
  brand: { name: "Brandschutzzeichen", color: "red", short: "Hier ist etwas gegen Feuer." },
  warnung: { name: "Warnzeichen", color: "yellow", short: "Achtung! Hier ist Gefahr." }
};

const signs = [
  ["schutzbrille", "Augenschutz benutzen", "gebot", "Gebotszeichen_Augenschutz_benutzen.png", "Setze eine Schutzbrille auf."],
  ["atemschutz", "Atemschutz benutzen", "gebot", "Gebotszeichen_Atemschutz_benutzen.png", "Benutze eine Atemschutz-Maske."],
  ["handschutz", "Handschutz benutzen", "gebot", "Gebotszeichen_Handschutz_benutzen.png", "Ziehe Schutz-Handschuhe an."],
  ["handlauf", "Handlauf benutzen", "gebot", "Gebotszeichen_Handlauf_benutzen.png", "Halte dich am Handlauf fest."],
  ["warnweste", "Warnweste benutzen", "gebot", "Gebotszeichen_Warnweste_benutzen.png", "Ziehe eine Warnweste an."],
  ["anleitung", "Anleitung beachten", "gebot", "Gebotszeichen_Anleitung_beachten.png", "Lies zuerst die Anleitung."],
  ["erstehilfe", "Erste Hilfe", "rettung", "Rettungszeichen_Erste_Hilfe.png", "Hier bekommst du Erste Hilfe."],
  ["arzt", "Arzt", "rettung", "Rettungszeichen_Arzt.png", "Hier findest du einen Arzt."],
  ["aed", "Defibrillator", "rettung", "Rettungszeichen_AED.png", "Hier ist ein Gerät für den Notfall."],
  ["notdusche", "Not-Dusche", "rettung", "Rettungszeichen_Notdusche.png", "Hier ist eine Dusche für den Notfall."],
  ["nottelefon", "Not-Telefon", "rettung", "Rettungszeichen_Nottelefon.png", "Hier kannst du im Notfall anrufen."],
  ["sammelstelle", "Sammelstelle", "rettung", "Rettungszeichen_Sammelstelle.png", "Hier treffen sich alle im Notfall."],
  ["brandmelder", "Brandmelder", "brand", "Brandschutzzeichen_Brandmelder.png", "Drücke hier, wenn es brennt."],
  ["brandtelefon", "Brandmelde-Telefon", "brand", "Brandschutzzeichen_Brandmeldetelefon.png", "Mit diesem Telefon meldest du ein Feuer."],
  ["feuerleiter", "Feuerleiter", "brand", "Brandschutzzeichen_Feuerleiter.png", "Hier ist eine Leiter für den Brandfall."],
  ["feueraufzug", "Feuerwehr-Aufzug", "brand", "Brandschutzzeichen_Feuerwehraufzug.png", "Diesen Aufzug benutzt die Feuerwehr."],
  ["brandpfeil", "Weg zum Brandschutz", "brand", "Brandschutzzeichen_Pfeil_links.png", "Der Pfeil zeigt zu einem Gerät gegen Feuer."],
  ["allgemeingefahr", "Allgemeine Warnung", "warnung", "Warnung_allgemein.png", "Achtung! Hier ist eine Gefahr."],
  ["strom", "Elektrische Spannung", "warnung", "Warnung_vor_elektrischer_Spannung.png", "Achtung! Strom kann gefährlich sein."],
  ["wachhund", "Wachhund", "warnung", "Warnung_vor_dem_Wachhund.png", "Achtung! Hier ist ein Wachhund."],
  ["absturz", "Absturz-Gefahr", "warnung", "Warnung_vor_Absturzgefahr.png", "Achtung! Du kannst hier tief fallen."],
  ["gas", "Gasflaschen", "warnung", "Warnung_vor_Gasflaschen.png", "Achtung! Hier stehen Gasflaschen."],
  ["heiss", "Heiße Oberfläche", "warnung", "Warnung_vor_heisser_Oberflaeche.png", "Achtung! Die Oberfläche ist heiß."],
  ["rutsch", "Rutsch-Gefahr", "warnung", "Warnung_vor_Rutschgefahr.png", "Achtung! Du kannst hier ausrutschen."],
  ["quetsch", "Quetsch-Gefahr", "warnung", "Warnung_vor_Quetschgefahr.png", "Achtung! Etwas kann dich einquetschen."]
].map(([id, name, group, file, meaning]) => ({ id, name, group, file, meaning }));

const state = {
  mode: "discover", score: 0, selectedGroups: new Set(Object.keys(groups)),
  selectedSigns: new Set(signs.map(sign => sign.id)), current: null, memorySequence: [], memoryIndex: 0,
  voices: [], speechUnlocked: false
};

const $ = selector => document.querySelector(selector);
const panel = $("#activity-panel");
const taskText = $("#task-text");
const feedback = $("#feedback");
const autoSpeak = $("#auto-speak");

function activeSigns() {
  return signs.filter(sign => state.selectedGroups.has(sign.group) && state.selectedSigns.has(sign.id));
}
function shuffle(items) { return [...items].sort(() => Math.random() - .5); }
function random(items) { return items[Math.floor(Math.random() * items.length)]; }
function image(sign) { return `Bilder/${encodeURIComponent(sign.file)}`; }
function loadVoices() { state.voices = window.speechSynthesis?.getVoices?.() || []; }
function speak(text) {
  state.currentSpeech = text;
  if (!text || !("speechSynthesis" in window)) return;
  if (!state.speechUnlocked) return;
  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "de-DE"; utterance.rate = .88;
  utterance.voice = state.voices.find(v => v.lang.toLowerCase() === "de-de") || state.voices.find(v => v.lang.toLowerCase().startsWith("de")) || null;
  speechSynthesis.speak(utterance);
}
function unlockSpeech() { state.speechUnlocked = true; loadVoices(); window.speechSynthesis?.resume?.(); }
function announce(text) { state.currentSpeech = text; if (autoSpeak.checked) speak(text); }
function setFeedback(text, kind = "") { feedback.textContent = text; feedback.className = `feedback ${kind}`; }
function setTask(text) { taskText.textContent = text; }
function addPoint() { state.score++; $("#score").textContent = state.score; }
function card(sign, options = {}) {
  const button = document.createElement("button");
  button.type = "button"; button.className = `sign-card ${options.small ? "small" : ""}`;
  button.innerHTML = `<span class="sign-image"><img src="${image(sign)}" alt="${sign.name}"></span>${options.hideText ? "" : `<span class="sign-copy"><small>${groups[sign.group].name}</small><strong>${sign.name}</strong>${options.meaning ? `<span>${sign.meaning}</span>` : ""}</span>`}`;
  return button;
}

function renderCategoryChips() {
  const area = $("#category-chips"); area.innerHTML = "";
  Object.entries(groups).forEach(([key, group]) => {
    const button = document.createElement("button"); button.type = "button";
    button.className = `category-chip ${group.color} ${state.selectedGroups.has(key) ? "active" : ""}`;
    button.innerHTML = `<span class="shape"></span><span><strong>${group.name}</strong><small>${signs.filter(s => s.group === key).length} Zeichen</small></span>`;
    button.addEventListener("click", () => {
      if (state.selectedGroups.has(key) && state.selectedGroups.size === 1) { setFeedback("Mindestens eine Gruppe muss ausgewählt sein.", "try"); return; }
      state.selectedGroups.has(key) ? state.selectedGroups.delete(key) : state.selectedGroups.add(key);
      renderCategoryChips(); updateSelectionInfo(); nextTask();
    }); area.append(button);
  });
}
function updateSelectionInfo() {
  $("#selection-info").textContent = `${activeSigns().length} Zeichen sind ausgewählt.`;
}
function renderPicker() {
  const picker = $("#sign-picker"); picker.innerHTML = "";
  signs.filter(s => state.selectedGroups.has(s.group)).forEach(sign => {
    const label = document.createElement("label"); label.className = "picker-item";
    label.innerHTML = `<input type="checkbox" ${state.selectedSigns.has(sign.id) ? "checked" : ""}><img src="${image(sign)}" alt=""><span>${sign.name}</span>`;
    label.querySelector("input").addEventListener("change", event => {
      if (!event.target.checked && activeSigns().length === 2) { event.target.checked = true; setFeedback("Wähle mindestens zwei Zeichen aus.", "try"); return; }
      event.target.checked ? state.selectedSigns.add(sign.id) : state.selectedSigns.delete(sign.id);
      updateSelectionInfo(); nextTask();
    }); picker.append(label);
  });
}

function drawDiscover() {
  setTask("Tippe auf ein Zeichen. Du hörst die Bedeutung."); setFeedback("Schau dir die Zeichen in Ruhe an.");
  panel.className = "activity-panel sign-grid"; panel.innerHTML = "";
  activeSigns().forEach(sign => { const button = card(sign, { meaning: true }); button.onclick = () => { setFeedback(`${sign.name}: ${sign.meaning}`, "good"); announce(`${sign.name}. ${sign.meaning}`); }; panel.append(button); });
  state.currentSpeech = "Tippe auf ein Zeichen. Du hörst die Bedeutung.";
}
function drawName() {
  const all = activeSigns(), answer = random(all), choices = shuffle([answer, ...shuffle(all.filter(s => s.id !== answer.id)).slice(0, 3)]);
  state.current = answer; setTask("Was bedeutet dieses Zeichen?"); setFeedback("Tippe auf den passenden Satz.");
  panel.className = "activity-panel quiz-layout"; panel.innerHTML = `<article class="focus-card"><img src="${image(answer)}" alt="Gesuchtes Piktogramm"><span>Was bedeutet das?</span></article><div class="answer-list"></div>`;
  choices.forEach(choice => { const b = document.createElement("button"); b.className = "answer-button"; b.textContent = choice.meaning; b.onclick = () => checkAnswer(b, choice.id === answer.id, `${answer.name}. ${answer.meaning}`); panel.querySelector(".answer-list").append(b); });
  announce("Was bedeutet dieses Zeichen?");
}
function drawGroup() {
  const answer = random(activeSigns()), choices = shuffle(Object.keys(groups)).slice(0, 4);
  state.current = answer; setTask("Zu welcher Gruppe gehört das Zeichen?"); setFeedback("Achte auf Farbe und Form.");
  panel.className = "activity-panel quiz-layout"; panel.innerHTML = `<article class="focus-card"><img src="${image(answer)}" alt="${answer.name}"><strong>${answer.name}</strong></article><div class="answer-list"></div>`;
  choices.forEach(key => { const b = document.createElement("button"); b.className = `answer-button group-answer ${groups[key].color}`; b.innerHTML = `<span class="shape"></span><span><strong>${groups[key].name}</strong><small>${groups[key].short}</small></span>`; b.onclick = () => checkAnswer(b, key === answer.group, `${answer.name} ist ein ${groups[answer.group].name}.`); panel.querySelector(".answer-list").append(b); });
  announce("Zu welcher Gruppe gehört das Zeichen?");
}
function drawMemory() {
  const all = activeSigns(); state.memorySequence = shuffle(all).slice(0, Math.min(3, all.length)); state.memoryIndex = 0;
  setTask("Merke dir die Zeichen von links nach rechts."); setFeedback("Drücke auf: Ich bin bereit."); panel.className = "activity-panel memory-layout";
  panel.innerHTML = `<div class="memory-row"></div><button class="primary-button ready-button" type="button">Ich bin bereit</button>`;
  state.memorySequence.forEach(s => panel.querySelector(".memory-row").append(card(s, { small: true })));
  panel.querySelectorAll(".sign-card").forEach(b => b.disabled = true);
  panel.querySelector(".ready-button").onclick = drawMemoryChoices; announce("Merke dir die Zeichen von links nach rechts.");
}
function drawMemoryChoices() {
  setTask("Tippe die Zeichen in der richtigen Reihenfolge."); panel.innerHTML = `<div class="memory-progress">1 von ${state.memorySequence.length}</div><div class="memory-row choices"></div>`;
  const extras = shuffle(activeSigns().filter(s => !state.memorySequence.includes(s))).slice(0, 2);
  shuffle([...state.memorySequence, ...extras]).forEach(sign => { const b = card(sign, { small: true, hideText: true }); b.onclick = () => {
    const expected = state.memorySequence[state.memoryIndex];
    if (sign.id !== expected.id) { b.classList.add("wrong"); setFeedback(`Noch nicht. Suche: ${expected.name}.`, "try"); speak(`Noch nicht. Suche ${expected.name}.`); return; }
    b.classList.add("correct"); b.disabled = true; state.memoryIndex++; panel.querySelector(".memory-progress").textContent = `${Math.min(state.memoryIndex + 1, state.memorySequence.length)} von ${state.memorySequence.length}`;
    if (state.memoryIndex === state.memorySequence.length) { addPoint(); setFeedback("Super gemerkt!", "good"); speak("Super gemerkt!"); panel.querySelectorAll("button").forEach(x => x.disabled = true); }
  }; panel.querySelector(".choices").append(b); }); announce("Tippe die Zeichen in der richtigen Reihenfolge.");
}
const missions = [
  { groups: ["rettung"], text: "Eine Person ist verletzt. Welches Zeichen zeigt Hilfe?" },
  { groups: ["brand"], text: "Du siehst Feuer. Welches Zeichen hilft beim Melden oder Löschen?" },
  { groups: ["warnung"], text: "Wo musst du besonders vorsichtig sein?" },
  { groups: ["gebot"], text: "Welches Zeichen sagt: Du musst etwas tun?" }
];
function drawMission() {
  const possible = missions.filter(m => activeSigns().some(s => m.groups.includes(s.group))), mission = random(possible);
  const answer = random(activeSigns().filter(s => mission.groups.includes(s.group))), distractors = shuffle(activeSigns().filter(s => !mission.groups.includes(s.group))).slice(0, 3);
  state.current = { ...answer, mission: mission.text }; setTask(mission.text); setFeedback("Denke an die Farben der Zeichen."); panel.className = "activity-panel mission-grid"; panel.innerHTML = "";
  shuffle([answer, ...distractors]).forEach(sign => { const b = card(sign, { small: true }); b.onclick = () => checkAnswer(b, mission.groups.includes(sign.group), `${sign.name} hilft hier. ${sign.meaning}`); panel.append(b); }); announce(mission.text);
}
function checkAnswer(button, correct, successText) {
  if (!correct) { button.classList.add("wrong"); setFeedback("Das passt noch nicht. Versuche es noch einmal.", "try"); speak("Das passt noch nicht. Versuche es noch einmal."); return; }
  button.classList.add("correct"); panel.querySelectorAll("button").forEach(b => b.disabled = true); addPoint(); setFeedback(`Richtig! ${successText}`, "good"); speak(`Richtig! ${successText}`);
}
function nextTask() {
  if (activeSigns().length < 2) return;
  ({ discover: drawDiscover, name: drawName, group: drawGroup, memory: drawMemory, mission: drawMission })[state.mode]();
}

document.querySelectorAll(".tab").forEach(tab => tab.addEventListener("click", () => { state.mode = tab.dataset.mode; document.querySelectorAll(".tab").forEach(t => t.classList.toggle("active", t === tab)); nextTask(); }));
$("#repeat").onclick = () => { unlockSpeech(); speak(state.currentSpeech || taskText.textContent); };
$("#next").onclick = () => { unlockSpeech(); nextTask(); };
$("#voice-test").onclick = () => { unlockSpeech(); speak("Hallo! Ich lese dir die Aufgaben vor."); setFeedback("Die Stimme ist bereit.", "good"); };
$("#choose-signs").onclick = () => { const picker = $("#sign-picker"); picker.hidden = !picker.hidden; $("#choose-signs").textContent = picker.hidden ? "Zeichen auswählen" : "Auswahl schließen"; if (!picker.hidden) renderPicker(); };
window.addEventListener("pointerdown", unlockSpeech, { once: true });
if ("speechSynthesis" in window) { loadVoices(); speechSynthesis.addEventListener("voiceschanged", loadVoices); }
renderCategoryChips(); updateSelectionInfo(); drawDiscover();
