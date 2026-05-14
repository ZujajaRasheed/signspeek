import { NextResponse } from "next/server";
import * as sdk from "microsoft-cognitiveservices-speech-sdk";

export const runtime = "nodejs"; // ✅ correct

export async function POST(req) {
  try {
    const { text } = await req.json();
    if (!text) return NextResponse.json({ error: "No text provided" }, { status: 400 });

    const isUrdu = /[\u0600-\u06FF]/.test(text);
    const voiceName = isUrdu ? "ur-PK-UzmaNeural" : "en-US-AriaNeural";

    const speechConfig = sdk.SpeechConfig.fromSubscription(
      process.env.AZURE_TTS_KEY,
      process.env.AZURE_TTS_REGION
    );
    console.log("KEY:", process.env.AZURE_TTS_KEY);
console.log("REGION:", process.env.AZURE_TTS_REGION);
    speechConfig.speechSynthesisVoiceName = voiceName;
    speechConfig.speechSynthesisOutputFormat =
      sdk.SpeechSynthesisOutputFormat.Audio16Khz32KBitRateMonoMp3;

    const synthesizer = new sdk.SpeechSynthesizer(speechConfig);

    return new Promise((resolve) => {
      synthesizer.speakTextAsync(
        text,
        (result) => {
          synthesizer.close();

          // JS SDK returns audio as Uint8Array
          const buffer = Buffer.from(result.audioData);

          resolve(
            new NextResponse(buffer, {
              status: 200,
              headers: { "Content-Type": "audio/mpeg" },
            })
          );
        },
        (err) => {
          synthesizer.close();
          resolve(
            NextResponse.json({ error: err.message || "TTS failed" }, { status: 500 })
          );
        }
      );
    });
  } catch (err) {
    console.error("Backend error:", err);
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}