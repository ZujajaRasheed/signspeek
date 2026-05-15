

"use client";
import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SettingsForm() 
{

   const router = useRouter();


   const [username, setUsername] = useState("");
   const [email, setEmail] = useState("");
  
   const [gender, setGender] = useState(""); // READ ONLY
   const [user_mode, setUserMode] = useState("");
   const [language, setLanguage] = useState("");
   const [avatar, setAvatar] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");
  const [userType, setUserType] = useState("");

     const [currentPassword, setCurrentPassword] = useState("");
   const [newPassword, setNewPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");



    // Load user info
 useEffect(() => {
  async function fetchSettings() {
    const res = await fetch("/api/get-user-settings", {
      credentials: "include",
    });

    const data = await res.json();
    console.log(data);

    const user = data.user || data;

    setUsername(user.name || "");
    setEmail(user.email || "");
    setGender(user.gender || "");
    setUserMode(user.mode || "");
    setLanguage(user.language || "");
  }

  fetchSettings();
}, []);

   





async function handleSaveSettings(e) {
  console.log("SAVE CLICKED");
  e.preventDefault();
  

  if (newPassword && newPassword !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    const res = await fetch("/api/update-settings", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: username,
        email,
        mode: user_mode,
        language,
        user_type: userType,

        current_password: currentPassword,
        new_password: newPassword,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }
console.log("SAVE CLICKED");
    // redirect based on mode
   const mode = data.user?.mode || data.mode;

if (mode === "sign_to_text") {
  router.push("/sign-text");
} else {
  router.push("/select_user");
}

  } catch (err) {
    console.log(err);
  }
}



 

  const inputClass =
    "w-full p-2 border border-gray-300 rounded text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-100 focus:border-gray-300 transition";


  // Tab button styling based on image
  const getTabStyle = (tab) => 
    `px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
      activeTab === tab 
      ? "bg-[#1E63D0] text-white shadow-md" 
      : "text-gray-600 hover:bg-gray-100/50"
    }`;

  return (
    <div className="w-full max-w-5xl flex flex-col items-center">
      
      {/* 1. Small Rounded Nav Div */}
      <div className="flex bg-white/40 backdrop-blur-md p-1.5 rounded-full mb-10 shadow-sm border border-white/20  hover:shadow-md transition">
        <button onClick={() => setActiveTab("profile")} className={getTabStyle("profile")}>Profile</button>
        <button onClick={() => setActiveTab("preferences")} className={getTabStyle("preferences")}>Preferences</button>
        <button onClick={() => setActiveTab("security")} className={getTabStyle("security")}>Security</button>
        {/* <button onClick={() => setActiveTab("notifications")} className={getTabStyle("notifications")}>Notifications</button> */}
      </div>

      <div className="w-full md:w-[550px] flex flex-col md:flex-row gap-8 items-start ">
        {/* 2. Respective Content Box (Left side in your code) */}
        <div className="bg-white/90 backdrop-blur-lg p-8 rounded-3xl shadow-2xl w-full md:w-[600px] min-h-[350px]">
          
          {/* PROFILE PORTION */}
          {activeTab === "profile" && (
            <div className="space-y-5 ">
              <h2 className="text-xl font-bold text-[#0D2149] ">Profile Information</h2>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full border-2 border-[#1E63D0] p-0.5 relative">
                  <img src="/avatar-placeholder.png" className="rounded-full w-full h-full object-cover" alt="avatar" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#1E63D0] border-2 border-white rounded-full"></div>
                </div>
                <span className="text-sm text-gray-400 italic">Choose File No file chosen</span>
              </div>
            
        {/* Name + Email */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div>
             <label className="block mb-1 font-medium text-slate-500">
               Username
             </label>
             <input
               type="text"
               value={username}
               onChange={(e) => setUsername(e.target.value)}
               className={inputClass}
               required
             />
           </div>

           <div>
             <label className="block mb-1 font-medium text-slate-500">
               Email
             </label>
             <input
               type="email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               className={inputClass}
               required
             />
           </div>
         </div>

         {/* Gender (READ ONLY) */}
         <div>
           <label className="block mb-1 font-medium text-slate-500">
             Gender (set during signup)
           </label>
           <input
             type="text"
             value={gender}             disabled
             className="w-full p-2 border border-gray-200 rounded bg-gray-100 text-gray-500 cursor-not-allowed"
           />
         </div>
       </div>
          )}

          {/* PREFERENCES PORTION */}
          {activeTab === "preferences" && (
        <div className="space-y-4">
         <h2 className="text-lg font-semibold  text-black">Preferences</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div>
             <label className="block mb-1 font-medium text-slate-500 focus:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition duration-300  ">
               User Mode
             </label>
             <select
               value={user_mode}
               onChange={(e) => setUserMode(e.target.value)}
               className={inputClass}
               required
             >
             
              <option value="sign_to_text">Sign to Text</option>
<option value="text_to_sign">Text to Sign</option>
             </select>
           </div>

           <div>
             <label className="block mb-1 font-medium text-slate-500">
               Language
             </label>
             <select
               value={language}
               onChange={(e) => setLanguage(e.target.value)}
               className={inputClass}
               required
             >
             
               <option value="English">English</option>
               <option value="Urdu">Urdu</option>
             </select>
           </div>
         </div>
       </div>
          )}

          {/* SECURITY PORTION */}
          {activeTab === "security" && (
               <div className="space-y-4">
        <h2 className="text-lg font-semibold text-black">
          Security
        </h2>

        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className={inputClass}
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className={inputClass}
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={inputClass}
        />
      </div>

       )}

          {/* SHARED SAVE BUTTON */}
          <button type="button"
          onClick={handleSaveSettings}
          
          className="mt-10 w-full py-3 bg-[#1E63D0] text-white font-bold rounded-xl shadow-lg hover:scale-[1.02] transition-transform">
            Save Changes
          </button>
        </div>

        {/* 3. The Decorative Girl Image (Optional side element) */}
        <div className="hidden md:block flex-1">
           {/* You can place your character image here to match the right-side layout */}
        </div>
      </div>
    </div>
  );
}