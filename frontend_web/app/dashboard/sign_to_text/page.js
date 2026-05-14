"use client";
import CameraFeed from ".../components/cameraFeed";
import LiveTextBox from ".../components/liveTextBox";     
import FinalSentence from ".../components/finalSentence";
import Footer from ".../components/footer";
import { LuCheck } from "react-icons/lu";
import { useSearchParams } from "next/navigation";
import {useState} from "react";
import Image from "next/image";

// import PrivateHeader from ".../components/privateHeader";

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
  {/* <PrivateHeader dashboard="sign_to_text" /> */}

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



// "use client";

// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { LuCheck } from "react-icons/lu";

// // Dummy CameraFeed placeholder
// const CameraFeed = () => (
//   <div className="bg-slate-900 rounded-3xl aspect-video flex items-center justify-center text-slate-500 italic">
//     Camera Feed
//   </div>
// );

// // Live words component
// const LiveTex tBox = ({ liveWords, onOk, onClear }) => (
//   <div className="bg-white/40 backdrop-blur-md p-4 rounded-3xl border border-white/30 shadow-lg">
//     <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">
//       Recognized Words
//     </h3>
//     <div className="flex flex-wrap gap-2 min-h-[80px]">
//       <AnimatePresence>
//         {liveWords.map((word) => (
//           <motion.span
//             key={word}
//             initial={{ scale: 0.5, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             exit={{ scale: 0.5, opacity: 0 }}
//             transition={{ type: "spring", stiffness: 300 }}
//             className="px-4 py-2 bg-blue-50 text-blue-700 rounded-xl font-medium border border-blue-100 shadow-sm"
//           >
//             {word}
//           </motion.span>
//         ))}
//       </AnimatePresence>
//     </div>
//     <div className="mt-4 flex gap-2">
//       <button
//         onClick={onOk}
//         className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-2xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
//       >
//         <LuCheck className="stroke-[2px]" size={20} />
//         OK
//       </button>
//       <button
//         onClick={onClear}
//         className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 font-semibold py-2 rounded-2xl shadow-md transition-all"
//       >
//         Clear
//       </button>
//     </div>
//   </div>
// );

// // Final sentence component
// const FinalSentence = ({ finalSentence, clearAll }) => (
//   <div className="bg-white/40 backdrop-blur-md p-6 rounded-3xl border border-white/30 shadow-lg flex flex-col gap-4">
//     <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">
//       Final AI Sentence
//     </h3>
//     <div className="bg-slate-50 p-4 rounded-2xl flex-1 text-lg leading-relaxed text-slate-700 italic border border-slate-100">
//       {finalSentence || "Press OK to generate sentence..."}
//     </div>
//     <button
//       onClick={clearAll}
//       className="mt-2 bg-red-50 hover:bg-red-100 text-red-600 font-semibold py-2 rounded-xl shadow-sm"
//     >
//       Clear Sentence
//     </button>
//   </div>
// );

// export default function SignToTextPage() {
//   const [liveWord, setLiveWord] = useState(["hello", "world", "this", "is", "a", "test"]);
//   const [finalSentence, setFinalSentence] = useState("");

//   // Optional: Auto-sentence completion after 3+ words
//   useEffect(() => {
//     if (liveWord.length >= 3) {
//       const timer = setTimeout(async () => {
//         try {
//           const response = await fetch("http://localhost:5000/correct-sentence", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ words: liveWord, language: "English" }),
//           });
//           const data = await response.json();
//           setFinalSentence(data.corrected);
//           setLiveWord([]);
//         } catch (err) {
//           console.error("Auto-sentence error:", err);
//         }
//       }, 2000); // 2 seconds delay
//       return () => clearTimeout(timer);
//     }
//   }, [liveWord]);

//   // Manual OK click
//   const handleOk = async () => {
//     if (liveWord.length === 0) return;
//     try {
//       const response = await fetch("http://localhost:5000/correct-sentence", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ words: liveWord, language: "English" }),
//       });
//       const data = await response.json();
//       setFinalSentence(data.corrected);
//       setLiveWord([]);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleClearWord = () => setLiveWord([]);
//   const handleClearFinal = () => setFinalSentence("");

//   return (
//     <div className="bg-[#F5F8FF] min-h-screen w-full flex flex-col p-6">
//       <h1 className="text-3xl font-bold mb-6">Deaf Dashboard</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <CameraFeed />

//         <div className="flex flex-col gap-6">
//           <LiveTextBox
//             liveWords={liveWord}
//             onOk={handleOk}
//             onClear={handleClearWord}
//           />

//           <FinalSentence
//             finalSentence={finalSentence}
//             clearAll={handleClearFinal}
//           />

//           <div className="flex items-center gap-2 text-[#3C4043] text-lg">
//             <span>Tip: Press “</span>
//             <LuCheck className="text-[#1E63D0] stroke-[2px]" size={20} />
//             <span className="font-semibold">OK'</span>
//             <span> to confirm full sentence.</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }