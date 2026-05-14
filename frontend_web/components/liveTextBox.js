"use client";




import { LuCheck } from "react-icons/lu";





export default function LiveTextBox({ liveWords = [], onOk, onClear }) {
  // words will always be an array
  return (
    <div className="bg-white border border-[#E1E8F5] p-4 rounded-2xl shadow-sm">
      <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">
       Recognized Words
   </h3>

      <div className="border p-3 min-h-15 rounded-xl mb-3">
        {liveWords.length === 0 ? (
          <p className="text-gray-400 text-sm">
            Start signing to see words here…
          </p>
        ) : (
          liveWords.map((word, index) => (
            <span
              key={index}
              className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded-lg mr-2 mb-1"
            >
              {word}
            </span>
          ))
        )}
      </div>

      <div className="flex gap-3 mb-2 px-8">
      

        <button
          onClick={onClear}
                   className="flex-1  border border-gray-300 text-gray-500  font-bold py-2 rounded-2xl shadow-md transition-all active:scale-95 flex items-center hover:bg-gray-200 justify-center gap-2"

        >
          Clear
        </button>

        {/* <button 
          onClick={onOk}
        //   #68A082 green
          className=" flex px-8  bg-[#1E63D0] hover:bg-[#155ABF] text-white font-semibold rounded-md transition hover:scale-105 hover:shadow"
        >
              <LuCheck className="text-white mr-2 stroke-[2px]" size={15} />
          OK
        </button> */}

              <button
        onClick={onOk}
         className="flex-1 bg-[#1E63D0] hover:bg-[#155ABF]  text-white font-bold py-2 rounded-2xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 hover:shadow-lg"
       >
         <LuCheck className="stroke-[2px]" size={20} />
         OK
       </button>
      </div>
    </div>
  );
}
