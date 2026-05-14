"use client";

import Footer from "@/components/footer";
import Image from "next/image";
import { useState } from "react";
import { FaGlobe } from "react-icons/fa"; // Globe for English
import { GiPalmTree } from "react-icons/gi"; // Example icon for Urdu
import {useRouter} from "next/navigation";

export default function SelectUserType() {
  const [language, setLanguage] = useState("English");
  const [userType, setUserType] = useState("");
  const [mode, setMode] = useState("");
const router=useRouter();











async function saveUserPreferences(type, mode) {
  await fetch("/api/user/update-settings", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_type: type,
      mode: mode,
      language: language,
    }),
  });
}








  return (
    <div className="min-h-screen flex flex-col bg-white">

      {/* Top: Logo and Language Buttons */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4 ">
      
        {/* Logo */}
        <Image src="/logoN.png" alt="Logo" width={200} height={50} />

        {/* Language buttons stacked vertically */}
        <div className="flex flex-col space-y-2 mt-4 md:mt-0">
          <button
            onClick={() => setLanguage("English")}
            className={`flex items-center px-6 py-2 rounded-md shadow border border-gray-300 transition transform hover:scale-105 hover:shadow-lg ${
              language === "English" ? "bg-[#1E63D0] text-white" : "bg-white text-[#1E63D0]"
            }`}
          >
            <FaGlobe className="mr-2" />
            English
          </button>

          <button
            onClick={() => setLanguage("Urdu")}
            className={`flex items-center px-6 py-2 rounded-md shadow border border-gray-300 transition transform hover:scale-105 hover:shadow-lg ${
              language === "Urdu" ? "bg-[#1E63D0] text-white" : "bg-white text-[#1E63D0]"
            }`}
          >
            <GiPalmTree className="mr-2" />
            Urdu
          </button>
        </div>

      </div>

      {/* Heading below logo */}
      <div className="container mx-auto flex justify-center mt-4 px-4">
        <Image src="/heading1.png" alt="Heading" width={300} height={200} />
      </div>

      {/* Main content: images/buttons slightly higher */}
      <div className="flex flex-1 flex-col md:flex-row items-center justify-center px-4 mt-4 md:mt-6 space-y-8 md:space-y-0 md:space-x-16">
        
        {/* Sign Language User */}
        <div className="flex flex-col items-center transition transform hover:scale-105">
          <Image src="/deaf.png" alt="Deaf Icon" width={250} height={250} className="mb-4"/>
          <button
          onClick={async()=> {
          setUserType("Deaf");
          setMode("sign_to_text");
          await saveUserPreferences("Deaf", "sign_to_text");
          router.push(`/dashboard/sign_to_text?language=${language}`)}}
          className="px-12 py-4 bg-[#1E63D0] hover:bg-[#155ABF] text-white font-semibold rounded-md transition transform hover:scale-105 hover:shadow-lg">
            I use Sign Language
          </button>
        </div>

        {/* Voice/Text User */}
        <div className="flex flex-col items-center transition transform hover:scale-105">
          <Image src="/textuser.png" alt="Text User Icon" width={250} height={250} className="mb-4"/>
          <button onClick={async() =>
           {
          setUserType("Non-Deaf");
          setMode("text_to_sign");
         await saveUserPreferences("Non-Deaf", "text_to_sign");
         router.push(`/dashboard/text_to_sign?language=${language}`);
}}
          className="px-14 py-4 bg-[#1E63D0] hover:bg-[#155ABF] text-white font-semibold rounded-md transition transform hover:scale-105 hover:shadow-lg">
            I use Voice/Text
          </button>
        </div>

      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
