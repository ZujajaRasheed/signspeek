"use client";


import Footer from "@/components/footer";
import CameraFeed from "@/components/cameraFeed";
import LiveTextBox from "@/components/liveTextBox";
import FinalSentence from "@/components/finalSentence";
import { LuCheck } from "react-icons/lu";
import { useSearchParams } from "next/navigation";
import {useState} from "react";
import Image from "next/image";

import PrivateHeader from "@/components/privateHeader";

export default function SignToTextPage() {  

  const [liveWord, setLiveWord] = useState(["hello", "world", "this", "is", "a", "test"]);
const [finalSentence, setFinalSentence] = useState("میرا نام زرجا ہے اور میں سیکھ رہا ہوں۔");


  const searchParams = useSearchParams();
  const language = searchParams.get("language") || "English";

  const handleOk =async () => {
    if (liveWord.length === 0) return;
    const response = await fetch("http://localhost:5000/correct-sentence", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ words: liveWord, language }),
  });
  const data = await response.json();
  setFinalSentence(data.corrected); 

    

    setLiveWord([]);
  }

  const handleClearWord = () => {
    setLiveWord([]);
  }

  const handleClearFinal = () => {
    setFinalSentence("");
  }
return(
 <section
  className="flex flex-col min-h-screen bg-cover bg-center  bg-amber-600 "
  style={{ backgroundImage: "url('/setting.png')" }}
>
  {/* Header */}
  <PrivateHeader  />

  {/* Main content */}
  <div className="flex-1 container mx-auto py-6 px-4 shadow-lg rounded-lg bg-white/40 mt-7 mb-7 ">
    <h1 className="text-2xl md:text-2xl font-bold text-start border-b-2 border-gray-200 text-[#1E63D0] drop-shadow-lg ">
      Sign<span className="text-[#1E63D0]"> Language</span> Translator
    </h1>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-10 ">
      <CameraFeed
  onWordDetected={(word) => {
    setLiveWord(prev => {
      if (prev[prev.length - 1] === word) return prev; // prevent repeat
      return [...prev, word];
    });
  }}
/>

      <div className="space-y-4">
        <LiveTextBox
          liveWords={liveWord}
          onOk={handleOk}
          onClear={handleClearWord}
        />
        <FinalSentence
          finalSentence={finalSentence}
          clearAll={handleClearFinal}
        />

        <div className="flex items-center gap-2 text-[#3C4043] text-lg">
          <span>Tip: Press “</span>
          <LuCheck className="text-[#1E63D0] stroke-[2px]" size={20} />
          <span className="font-semibold">OK'</span>
          <span> to confirm full sentence.</span>
        </div>
      </div>
    </div>
  </div>

 
  <Footer />
</section>
);

}
