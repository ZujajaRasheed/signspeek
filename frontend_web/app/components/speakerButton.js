"use client";

export default async function speakText(text) {
  if (!text || typeof window === "undefined") return;

  try {
    // Send text to TTS API
    const response = await fetch("/api/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }), // use the text passed to the function
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("TTS API error:", error);
      return;
    }

    // Convert response to audio and play
    const arrayBuffer = await response.arrayBuffer();
    const audioBlob = new Blob([arrayBuffer], { type: "audio/mpeg" });
    const audioUrl = URL.createObjectURL(audioBlob);

    const audio = new Audio(audioUrl);
    audio.play();
  } catch (err) {
    console.error("Frontend TTS error:", err);
  }
}