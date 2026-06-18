const speakButton = document.querySelector("#speak-button");
const stopButton = document.querySelector("#stop-button");
const anthemButton = document.querySelector("#anthem-button");
const anthemAudio = document.querySelector("#anthem-audio");
const speechText = document.querySelector("#speech-text");

function getGermanVoice() {
  const voices = window.speechSynthesis?.getVoices?.() ?? [];
  return (
    voices.find((voice) => voice.lang === "de-DE") ||
    voices.find((voice) => voice.lang.startsWith("de")) ||
    null
  );
}

function speakCountryInfo() {
  if (!("speechSynthesis" in window)) {
    speakButton.textContent = "Sprachausgabe nicht verfügbar";
    speakButton.disabled = true;
    return;
  }

  window.speechSynthesis.cancel();
  anthemAudio.pause();
  anthemAudio.currentTime = 0;
  anthemButton.setAttribute("aria-pressed", "false");

  const utterance = new SpeechSynthesisUtterance(speechText.textContent.trim());
  utterance.lang = "de-DE";
  utterance.rate = 0.95;
  utterance.pitch = 1;

  const voice = getGermanVoice();
  if (voice) {
    utterance.voice = voice;
  }

  utterance.addEventListener("start", () => {
    speakButton.setAttribute("aria-pressed", "true");
  });

  utterance.addEventListener("end", () => {
    speakButton.setAttribute("aria-pressed", "false");
  });

  window.speechSynthesis.speak(utterance);
}

speakButton.addEventListener("click", speakCountryInfo);

stopButton.addEventListener("click", () => {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
  anthemAudio.pause();
  anthemAudio.currentTime = 0;
  anthemButton.setAttribute("aria-pressed", "false");
  speakButton.setAttribute("aria-pressed", "false");
});

anthemButton.addEventListener("click", async () => {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
  speakButton.setAttribute("aria-pressed", "false");

  if (!anthemAudio.paused) {
    anthemAudio.pause();
    anthemAudio.currentTime = 0;
    anthemButton.setAttribute("aria-pressed", "false");
    return;
  }

  anthemAudio.currentTime = 0;
  try {
    await anthemAudio.play();
    anthemButton.setAttribute("aria-pressed", "true");
  } catch {
    anthemButton.textContent = "Hymne nicht verfügbar";
    anthemButton.disabled = true;
  }
});

anthemAudio.addEventListener("ended", () => {
  anthemButton.setAttribute("aria-pressed", "false");
});

if ("speechSynthesis" in window) {
  window.speechSynthesis.addEventListener("voiceschanged", getGermanVoice);
}
