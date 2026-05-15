














// "use client";

// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import Footer from "@/components/footer";
// import PublicHeader from "@/components/publicHeader";
// import { LuArrowDownRight } from "react-icons/lu";

// export default function Home() {
//   const router = useRouter();

//   const handleGetStarted = async () => {
//     try {
//       const res = await fetch("/api/auth/checkLogin");
//       const data = await res.json();

//       if (data.loggedIn) {
//         router.push("/select_user");
//       } else {
//         router.push("/authPage");
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div className="relative min-h-screen overflow-hidden">

//       {/* Header */}
//       <PublicHeader />

//       {/* Background */}
//       <div className="absolute inset-0 -z-10">
//         <Image
//           src="/backgrounds.png"
//           alt="Background"
//           fill
//           className="object-cover"
//           priority
//         />
//       </div>

//       {/* MAIN CONTENT (LEFT ALIGNED - YOUR ORIGINAL STYLE) */}
//       <div className="flex flex-col items-start justify-center px-8  md:px-28 pt-80 min-h-[90vh]">

//         <h1 className="text-3xl md:text-5xl text-[#1E63D0] font-[Inter]  font-bold  mb-4 text-left">
//           Bridging Communication
//         </h1>

//         <h2 className="text-2xl font-[Inter]  md:text-4xl text-[#1E63D0] text-left">
//           with Sign Language AI
//         </h2>

//         {/* Box */}
//         <div className="bg-[#F5F8FF] rounded-2xl p-6 md:p-12 mt-14 flex flex-col items-center justify-center shadow-[0_20px_40px_rgba(30,99,208,0.25)] hover:shadow-[0_35px_70px_rgba(30,99,208,0.35)] transition-all duration-300 border border-white/60 backdrop-blur-sm max-w-xl">

//           <p className="text-[#2B3B4F] italic text-lg md:text-2xl text-center">
//             Welcome to SignSpeek: Transforming Sign language
//             into Text & Speech
//           </p>

//           {/* BUTTON (YOUR ORIGINAL ANIMATION RESTORED) */}
//           <button
//             onClick={handleGetStarted}
//             className="group mt-6 px-6 py-3 bg-[#1E63D0] text-white font-semibold md:w-72 w-52 rounded-xl shadow-md hover:bg-white hover:text-[#1E63D0] hover:border hover:border-[#1E63D0] transition duration-500 flex items-center justify-center gap-2"
//           >
//             Get Started

//             <LuArrowDownRight
//               size={18}
//               className="transition-transform duration-300 group-hover:rotate-[316deg]"
//             />
//           </button>

//         </div>
//       </div>

//       {/* FOOTER FIXED (YOUR ORIGINAL STYLE RESTORED) */}
//       <div className="fixed bottom-0 left-0 w-full z-30">
//         <Footer />
//       </div>

//     </div>
//   );
// }












// "use client";

// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import Footer from "@/components/footer";
// import PublicHeader from "@/components/publicHeader";
// import { LuArrowDownRight } from "react-icons/lu";

// export default function Home() {
//   const router = useRouter();

//   const handleGetStarted = async () => {
//     try {
//       const res = await fetch("/api/auth/checkLogin");
//       const data = await res.json();

//       if (data.loggedIn) {
//         router.push("/select_user");
//       } else {
//         router.push("/authPage");
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//   <div className="relative min-h-screen bg-[#F8FBFF]">

//       {/* Header */}
//       <PublicHeader />

// {/* DESKTOP BACKGROUND */}
// <div className="hidden lg:block fixed inset-0 z-0">
//   <Image
//     src="/backgrounds.png"
//     alt="Desktop Background"
//     fill
//     priority
//     className="object-cover"
//   />
// </div>

// {/* MOBILE BACKGROUND */}
// <div className="block lg:hidden fixed inset-0 z-0">
//   <Image
//     src="/phone_bg.png"
//     alt="Mobile Background"
//     fill
//     priority
//     className="object-cover object-top"
//   />
// </div>

//       {/* ================= MAIN CONTENT ================= */}

//       {/* DESKTOP/LAPTOP LAYOUT */}
//      <div className="hidden lg:flex relative z-10 flex-col items-start justify-center px-28 pt-72 min-h-[90vh]">
//         <h1 className="text-5xl text-[#1E63D0] font-bold mb-4 leading-tight">
//           Bridging Communication
//         </h1>

//         <h2 className="text-4xl text-[#1E63D0]">
//           with Sign Language AI
//         </h2>

//         {/* BOX */}
//         <div className="bg-[#F5F8FF]/90 rounded-3xl py-4 px-10 mt-14 flex flex-col items-center justify-center shadow-[0_20px_40px_rgba(30,99,208,0.25)] hover:shadow-[0_35px_70px_rgba(30,99,208,0.35)] transition-all duration-300 border border-white/60 backdrop-blur-sm max-w-xl">

//         <p className="text-[#2B3B4F] italic text-lg md:text-2xl text-center leading-relaxed">
//   Welcome to <span className="font-semibold text-[#1E63D0]">SignSpeak</span>:
//   Bridging communication through AI-powered
//   <br />
//   Sign to Text & Speech
//   <br />
//   and Text & Speech to Sign Translation.
// </p>

//           {/* BUTTON */}
//           <button
//             onClick={handleGetStarted}
//             className="group mt-8 px-6 py-4 bg-[#1E63D0] text-white font-semibold w-72 rounded-xl shadow-md hover:bg-white hover:text-[#1E63D0] hover:border hover:border-[#1E63D0] transition duration-500 flex items-center justify-center gap-2"
//           >
//             Get Started

//             <LuArrowDownRight
//               size={18}
//               className="transition-transform duration-300 group-hover:rotate-[316deg]"
//             />
//           </button>
//         </div>
//       </div>

//       {/* ================= MOBILE + TABLET LAYOUT ================= */}
//       <div className="lg:hidden flex flex-col items-center justify-start px-6 pt-[420px] pb-24 min-h-screen">

//         {/* HEADING */}
//         <div className="text-center">
//           <h1 className="text-3xl sm:text-4xl font-bold text-[#1E63D0] leading-tight">
//             Bridging Communication
//           </h1>

//           <h2 className="text-2xl sm:text-3xl text-[#1E63D0] mt-2">
//             with Sign Language AI
//           </h2>
//         </div>

//         {/* BOX */}
//         <div className="bg-[#F5F8FF]/90 rounded-3xl p-6 sm:p-8 mt-10 flex flex-col items-center justify-center shadow-[0_20px_40px_rgba(30,99,208,0.20)] border border-white/60 backdrop-blur-sm w-full max-w-md">

//           <p className="text-[#2B3B4F] italic text-base sm:text-lg text-center leading-relaxed">
//             Sign to Text & Speech
//             <br />
//             Speech/Text to Sign
//             <br />
//             with Sentence Support
//           </p>

//           {/* BUTTON */}
//           <button
//             onClick={handleGetStarted}
//             className="group mt-6 px-6 py-3 bg-[#1E63D0] text-white font-semibold w-full rounded-xl shadow-md hover:bg-white hover:text-[#1E63D0] hover:border hover:border-[#1E63D0] transition duration-500 flex items-center justify-center gap-2"
//           >
//             Get Started

//             <LuArrowDownRight
//               size={18}
//               className="transition-transform duration-300 group-hover:rotate-[316deg]"
//             />
//           </button>
//         </div>
//       </div>

//       {/* FOOTER */}
//       <div className="relative z-30">
//         <Footer />
//       </div>
//     </div>
//   );
// }















































"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Footer from "@/components/footer";
import PublicHeader from "@/components/publicHeader";
import { LuArrowDownRight } from "react-icons/lu";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import {
  HiOutlineMicrophone,
  HiOutlineSpeakerWave,
  HiOutlineLanguage,
} from "react-icons/hi2";

import { MdOutlineSignLanguage } from "react-icons/md";

export default function Home() {
  const router = useRouter();

  const handleGetStarted = async () => {
    try {
      const res = await fetch("/api/auth/checkLogin");
      const data = await res.json();

      if (data.loggedIn) {
        router.push("/select_user");
      } else {
        router.push("/authPage");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-[#F8FBFF] overflow-hidden">

      {/* ================= HEADER ================= */}
      <div className="relative z-50">
        <PublicHeader />
      </div>

      {/* ================= DESKTOP BACKGROUND ================= */}
      <div className="hidden lg:block fixed inset-0 z-0">
        <Image
          src="/backgrounds.png"
          alt="Desktop Background"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* ================= MOBILE/TABLET BACKGROUND ================= */}
      <div className="block lg:hidden fixed inset-0 z-0">
        <Image
          src="/phone-bg.png"
          alt="Mobile Background"
          fill
          priority
          className="object-cover object-top"
        />
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <main className="relative z-10 flex-1">

        {/* ================= HERO SECTION ================= */}

        {/* DESKTOP */}
        <section className="hidden lg:flex flex-col items-start justify-center px-24 pt-56 pb-24">

          <div className="max-w-2xl">

            <h1 className="text-6xl font-bold leading-tight text-[#1E63D0]">
              Bridging Communication
            </h1>

            <h2 className="text-5xl mt-3 text-[#1E63D0] font-semibold">
              with Sign Language AI
            </h2>

            {/* DESCRIPTION */}
            <p className="mt-10 text-xl leading-relaxed text-[#2B3B4F] max-w-xl">
              Empowering seamless communication through intelligent
              AI-powered Sign Language translation —
              converting signs into text & speech and transforming
              text or voice back into expressive signs with sentence support.
            </p>

            {/* BUTTON */}
            <button
              onClick={handleGetStarted}
              className="group mt-10 px-8 py-4 bg-[#1E63D0] text-white font-semibold rounded-2xl shadow-lg hover:bg-white hover:text-[#1E63D0] hover:border hover:border-[#1E63D0] transition-all duration-500 flex items-center justify-center gap-2"
            >
              Get Started

              <LuArrowDownRight
                size={20}
                className="transition-transform duration-300 group-hover:rotate-[316deg]"
              />
            </button>

          </div>
        </section>

        {/* MOBILE + TABLET */}
        <section className="lg:hidden flex flex-col items-center px-6 pt-[390px] pb-20 text-center">

          <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-[#1E63D0]">
            Bridging Communication
          </h1>

          <h2 className="text-3xl sm:text-4xl mt-3 text-[#1E63D0] font-semibold">
            with Sign Language AI
          </h2>

          {/* DESCRIPTION */}
          <p className="mt-8 text-base sm:text-lg leading-relaxed text-[#2B3B4F] max-w-md">
            AI-powered Sign Language translation that converts
            signs into text & speech and transforms text or voice
            back into expressive signs with sentence support.
          </p>

          {/* BUTTON */}
          <button
            onClick={handleGetStarted}
            className="group mt-8 px-6 py-4 bg-[#1E63D0] text-white font-semibold rounded-2xl shadow-lg w-full max-w-sm hover:bg-white hover:text-[#1E63D0] hover:border hover:border-[#1E63D0] transition-all duration-500 flex items-center justify-center gap-2"
          >
            Get Started

            <LuArrowDownRight
              size={18}
              className="transition-transform duration-300 group-hover:rotate-[316deg]"
            />
          </button>
        </section>

        {/* ================= FEATURES SECTION ================= */}

        <section className="relative z-10 px-6 lg:px-20 pb-24">

          <div className="bg-white/80 backdrop-blur-md rounded-[40px] shadow-[0_20px_60px_rgba(30,99,208,0.15)] border border-white/60 py-14 px-6 lg:px-12">

            {/* HEADING */}
            <div className="text-center mb-14">

              <h2 className="text-4xl lg:text-5xl font-bold text-[#1F2A3C]">
                Powerful Features
              </h2>

              <p className="mt-4 text-[#4A5B72] text-lg">
                Everything you need for seamless AI-powered communication.
              </p>

            </div>

            {/* FEATURE CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">

              {/* CARD 1 */}
              <div className="bg-[#F8FBFF] rounded-3xl p-8 shadow-md hover:shadow-xl transition duration-300 border border-[#E7EEFF]">

                <div className="w-16 h-16 rounded-2xl bg-[#EAF2FF] flex items-center justify-center text-[#1E63D0] text-3xl">
                  <MdOutlineSignLanguage />
                </div>

                <h3 className="mt-6 text-2xl font-bold text-[#1F2A3C]">
                  Sign Recognition
                </h3>

                <p className="mt-3 text-[#55657A] leading-relaxed">
                  Detect and understand sign language gestures instantly using advanced AI recognition.
                </p>

              </div>

              {/* CARD 2 */}
              <div className="bg-[#F8FBFF] rounded-3xl p-8 shadow-md hover:shadow-xl transition duration-300 border border-[#E7EEFF]">

                <div className="w-16 h-16 rounded-2xl bg-[#EAF2FF] flex items-center justify-center text-[#1E63D0] text-3xl">
                  <HiOutlineSpeakerWave />
                </div>

                <h3 className="mt-6 text-2xl font-bold text-[#1F2A3C]">
                  Text & Speech
                </h3>

                <p className="mt-3 text-[#55657A] leading-relaxed">
                  Convert detected signs into real-time readable text and natural voice output.
                </p>

              </div>

              {/* CARD 3 */}
              <div className="bg-[#F8FBFF] rounded-3xl p-8 shadow-md hover:shadow-xl transition duration-300 border border-[#E7EEFF]">

                <div className="w-16 h-16 rounded-2xl bg-[#EAF2FF] flex items-center justify-center text-[#1E63D0] text-3xl">
                  <HiOutlineMicrophone />
                </div>

                <h3 className="mt-6 text-2xl font-bold text-[#1F2A3C]">
                  Voice to Sign
                </h3>

                <p className="mt-3 text-[#55657A] leading-relaxed">
                  Transform spoken words and text into expressive sign language animations.
                </p>

              </div>

              {/* CARD 4 */}
              <div className="bg-[#F8FBFF] rounded-3xl p-8 shadow-md hover:shadow-xl transition duration-300 border border-[#E7EEFF]">

                <div className="w-16 h-16 rounded-2xl bg-[#EAF2FF] flex items-center justify-center text-[#1E63D0] text-3xl">
                  <HiOutlineLanguage />
                </div>

                <h3 className="mt-6 text-2xl font-bold text-[#1F2A3C]">
                  Sentence Support
                </h3>

                <p className="mt-3 text-[#55657A] leading-relaxed">
                  Supports full sentence translation for smoother and more natural communication.
                </p>

              </div>


              {/* CARD 5 */}
<div className="bg-[#F8FBFF] rounded-3xl p-8 shadow-md hover:shadow-xl transition duration-300 border border-[#E7EEFF]">

  <div className="w-16 h-16 rounded-2xl bg-[#EAF2FF] flex items-center justify-center text-[#1E63D0] text-3xl">
    <HiOutlineChatBubbleLeftRight />
  </div>

  <h3 className="mt-6 text-2xl font-bold text-[#1F2A3C]">
    AI Chatbot
  </h3>

  <p className="mt-3 text-[#55657A] leading-relaxed">
    Intelligent chatbot assistance for communication guidance,
    accessibility support, and interactive conversations.
  </p>

</div>

            </div>

          </div>

        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="relative z-20 mt-auto">
        <Footer />
      </footer>
    </div>
  );
}