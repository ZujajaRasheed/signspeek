"use client";
import { useRef, useState, useEffect } from "react";

export default function CameraFeed({ onWordDetected }) {

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [isCameraOn, setIsCameraOn] = useState(false);

  // 🎥 Start Camera
  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true
    });

    videoRef.current.srcObject = stream;
    setIsCameraOn(true);
  };

  // 🛑 Stop Camera
  const stopCamera = () => {
    const stream = videoRef.current.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach(track => track.stop());
    setIsCameraOn(false);
  };

  // 🔁 Capture frames every 1 second
  useEffect(() => {
    if (!isCameraOn) return;

    const interval = setInterval(() => {
      captureFrame();
    }, 1000); // every 1 sec

    return () => clearInterval(interval);
  }, [isCameraOn]);

  // 📸 Capture frame & send to backend
  const captureFrame = async () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    const ctx = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0);

    const image = canvas.toDataURL("image/jpeg");

    // 🔥 Send to backend
    const res = await fetch("http://localhost:8000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ image })
    });

    const data = await res.json();

    if (data.word) {
      onWordDetected(data.word); // send word to parent
    }
  };

  return (
    <div className="bg-transparent rounded-xl p-4 flex flex-col items-start">

      {/* 🎥 Video */}
      <video
        ref={videoRef}
        autoPlay
        className="w-full h-100 bg-black rounded-lg"
      />

      <canvas ref={canvasRef} style={{ display: "none" }} />

      {/* 🎮 Buttons */}
      <div className="mt-4  flex gap-3 px-8 ">
        <button
          onClick={startCamera}
                   className="flex-1  border border-[#1E63D0] px-14 hover:bg-green-900  text-gray-500  bg-green-800 rounded-2xl   shadow-md transition-all active:scale-95 font-bold flex items-center justify-center gap-2 hover:shadow-lg"

          // className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Start
        </button>

        <button
          onClick={stopCamera}
                             className="flex-1  bg-red-700 text-gray-500  font-bold py-2 px-4 rounded-2xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 hover:bg-red-900 "

          // className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Stop
        </button>
      </div>
    </div>
  );
}