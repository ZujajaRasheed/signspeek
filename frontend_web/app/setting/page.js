// // frontend_web/app/settings/page.js
// import Footer from "@/components/footer";
// import PrivateHeader from "@/components/privateHeader";

// import SettingsForm from "@/components/SettingForm";

// export default function SettingsPage() {
//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
      
//       {/* Header */}
//       <PrivateHeader dashboard="/dashboard/sign_to_text" />

// <section
//                     className="min-h-[80vh] flex items-center bg-cover bg-center px-7"
//                     style={{ backgroundImage: "url('/homee.png')" }}
//                 >
//       {/* Main Content */}
//       <main className="flex-1 flex flex-col items-start justify-center p-2">
//         {/* <h1 className="py-4 text-2xl md:text-3xl font-bold text-black  ">
//           User's <span className="text-[#1E63D0]">Settings</span>
//         </h1> */}

//         <SettingsForm />
//       </main>
//       </section>

//       {/* Footer */}
//       <Footer />
//     </div> 
//   );
// }



// frontend_web/app/settings/page.js
import Footer from "@/components/footer";
// import PrivateHeader from "../components/privateHeader";
import SettingsForm from "@/components/SettingForm";











export default function SettingsPage() {

  return (
    <div className="min-h-screen flex flex-col">
      {/* <PrivateHeader dashboard="/dashboard/sign_to_text" /> */}

      {/* Main Section with Background Image */}
      <section 
        className="flex-1 bg-cover bg-center flex flex-col items-center py-10 px-4 bg-gray-100"
        // style={{ backgroundImage: "url('/setting.png')" }}
      >
        {/* Title according to image */}
        <h1 className="text-4xl font-bold text-[#0D2149] mb-8">Settings</h1>

        {/* The Form handles the Tab bar and the Content Box */}
        <SettingsForm />
      </section>

      <Footer />
    </div>
  );
}