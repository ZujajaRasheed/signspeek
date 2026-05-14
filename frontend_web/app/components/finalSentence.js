'use client'
import speakText from "@/app/components/speakerButton";
import { MdVolumeUp } from "react-icons/md"

export default function FinalSentence({finalSentence,clearAll}){










    return(
       <div className="bg-white border border-[#E1E8F5] p-4 rounded-2xl shadow-sm">
             <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">
      Final Sentence
   </h3>
       
             <div className="border p-5 min-h-30 rounded-xl mb-4">
            <p className="text-gray-700 whitespace-pre-line">{finalSentence}</p>            </div>
       
             <div className="flex gap-3 mb-4 px-8">
               {/* <SpeakerButton text={finalSentence} /> */}
       


          <button
                 onClick={() => speakText(finalSentence)}
         className="flex-1 bg-[#1E63D0] hover:bg-[#155ABF]  text-white font-bold py-2 rounded-2xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 hover:shadow-lg"
               >
                <MdVolumeUp className="text-white mr-2" size={20} />
                 Speak
               </button>
               <button
                 onClick={clearAll}
                   className="flex-1  border border-gray-300 text-gray-500  font-bold py-2 rounded-2xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 hover:bg-gray-200"
               >
                 Clear
               </button>
       
            
             </div>
     
           </div>
    );
}