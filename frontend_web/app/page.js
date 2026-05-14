"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Footer from "./components/footer";
import { LuArrowDownRight } from "react-icons/lu";

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
    <div className="relative min-h-screen overflow-hidden">

      Background
      <div className="absolute inset-0 -z-10 relative">
        <Image
          src="/backgrounds.png"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center px-4 md:px-10 pt-32">

        <h1 className="text-3xl md:text-6xl font-bold text-[#1F2A3C] mb-4 text-center">
          Bridging Communication
        </h1>

        <h2 className="text-2xl md:text-5xl text-[#2F3E55] text-center">
          with Sign Language AI
        </h2>

        {/* Box */}
        <div className="bg-[#F5F8FF] rounded-2xl p-6 md:p-10 mt-24 flex flex-col items-center justify-center shadow-[0_20px_40px_rgba(30,99,208,0.25)] hover:shadow-[0_35px_70px_rgba(30,99,208,0.35)] transition-all duration-300 border border-white/60 backdrop-blur-sm">

          <p className="text-[#2B3B4F] text-lg md:text-2xl max-w-md md:max-w-xl text-center">
            Welcome to SignSpeek: Transforming Sign language
            into Text & Speech
          </p>

          <button
            onClick={handleGetStarted}
            className="group mt-6 px-6 py-3 bg-[#1E63D0] text-white font-semibold md:w-72 w-52 rounded-xl shadow-md hover:bg-white hover:text-[#1E63D0] hover:border hover:border-[#1E63D0] transition duration-500 flex items-center justify-center gap-2"
          >
            Get Started

            <LuArrowDownRight
              size={18}
              className="transition-transform duration-300 group-hover:rotate-[316deg]"
            />
          </button>

        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 w-full z-30">
        <Footer />
      </div>

    </div>
  );
}










  




// "use client";

// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import Footer from "./components/footer";
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

//       {/* Background */}
//       <div className="absolute inset-0 -z-10 relative">
//         <Image
//           src="/backgrounds.png"
//           alt="Background"
//           fill
//           className="object-cover"
//           priority
//         />
//       </div>

//       {/* Main Content */}
//       <div className="flex flex-col items-center justify-center px-4 md:px-10 pt-32">

//         <h1 className="text-3xl md:text-6xl font-bold text-[#1F2A3C] mb-4 text-center">
//           Bridging Communication
//         </h1>

//         <h2 className="text-2xl md:text-5xl text-[#2F3E55] text-center">
//           with Sign Language AI
//         </h2>

//         {/* Box */}
//         <div className="bg-[#F5F8FF] rounded-2xl p-6 md:p-10 mt-24 flex flex-col items-center justify-center shadow-[0_20px_40px_rgba(30,99,208,0.25)] hover:shadow-[0_35px_70px_rgba(30,99,208,0.35)] transition-all duration-300 border border-white/60 backdrop-blur-sm">

//           <p className="text-[#2B3B4F] text-lg md:text-2xl max-w-md md:max-w-xl text-center">
//             Welcome to SignSpeek: Transforming Sign language
//             into Text & Speech
//           </p>

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

//       {/* Footer */}
//       <div className="fixed bottom-0 left-0 w-full z-30">
//         <Footer />
//       </div>

//     </div>
//   );
// }