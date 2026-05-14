"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function PublicHeader() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">

        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/logoo.png"
              alt="Logo"
              width={120}
              height={120}
              className="object-contain"
              priority
            />
          </Link>
        </div>

        <nav className="flex items-center md:gap-6 gap-4 font-medium">
          {navItems.map((item) => {
            const active = pathname === item.path;

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`relative pb-1 transition-all ${
                  active
                    ? "text-[#1E63D0] "
                    : "text-gray-700 hover:text-[#1E63D0] hover:scale-105"
                }`}
              >
                {item.name}

                {active && (
                  <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-[#1E63D0] rounded-full"></span>
                )}
              </Link>
            );
          })}

          <Link
            href="/authPage"            
             className="px-2 md:px-8 py-2 border border-[#1E63D0] text-[#1E63D0] rounded-3xl shadow-md transition-all active:scale-95 hover:bg-gray-200 "

          >
            Login
          </Link>

          <Link
            href="/authPage"
            className="md:px-18 px-2 py-2 bg-[#1E63D0] text-white  rounded-3xl shadow-md transition-all active:scale-95 hover:bg-[#155ABF] "
          >
            Register
          </Link>
        </nav>

      </div>
    </header>
  );
}
















// "use client";

// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import Image from "next/image";
// import { useEffect, useState } from "react";

// export default function Header() {
//   const pathname = usePathname();
//   const router = useRouter();

//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const token = document.cookie.includes("token");
//     setIsLoggedIn(token);
//   }, []);

//   const logout = () => {
//     document.cookie =
//       "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
//     setIsLoggedIn(false);
//     router.push("/");
//   };

//   // 🔴 PUBLIC LINKS
//   const publicNav = [
//     { name: "Home", path: "/" },
//     { name: "About", path: "/about" },
//     { name: "Contact", path: "/contact" },
//   ];

//   // 🟢 PRIVATE LINKS (still visible but protected on click)
//   const privateNav = [
//     { name: "Dashboard", path: "/dashboard" },
//     { name: "Settings", path: "/settings" },
//     { name: "Learn", path: "/learn" },
//   ];

//   const handlePrivateClick = (e, path) => {
//     if (!isLoggedIn) {
//       e.preventDefault();
//       router.push("/login");
//     } else {
//       router.push(path);
//     }
//   };

//   return (
//     <header className="w-full bg-white">
//       <div className="container mx-auto px-6 py-4 flex justify-between items-center">

//         {/* 🔵 LOGO */}
//         <div className="flex items-center">
//           <Link href="/">
//             <Image
//               src="/logoo.png"
//               alt="Logo"
//               width={120}
//               height={120}
//               className="object-contain"
//               priority
//             />
//           </Link>
//         </div>

//         {/* 🔵 NAVIGATION */}
//         <nav className="flex items-center md:gap-6 gap-4 font-medium">

//           {/* PUBLIC LINKS */}
//           {publicNav.map((item) => {
//             const active = pathname === item.path;

//             return (
//               <Link
//                 key={item.path}
//                 href={item.path}
//                 className={`relative pb-1 transition-all ${
//                   active
//                     ? "text-[#1E63D0]"
//                     : "text-gray-700 hover:text-[#1E63D0] hover:scale-105"
//                 }`}
//               >
//                 {item.name}

//                 {active && (
//                   <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-[#1E63D0] rounded-full"></span>
//                 )}
//               </Link>
//             );
//           })}

//           {/* PRIVATE LINKS (CLICK CONTROL) */}
//           {privateNav.map((item) => {
//             const active = pathname === item.path;

//             return (
//               <a
//                 key={item.path}
//                 href={item.path}
//                 onClick={(e) => handlePrivateClick(e, item.path)}
//                 className={`relative pb-1 transition-all cursor-pointer ${
//                   active
//                     ? "text-[#1E63D0]"
//                     : "text-gray-700 hover:text-[#1E63D0] hover:scale-105"
//                 }`}
//               >
//                 {item.name}

//                 {active && (
//                   <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-[#1E63D0] rounded-full"></span>
//                 )}
//               </a>
//             );
//           })}

//           {/* AUTH BUTTONS */}
//           {!isLoggedIn ? (
//             <>
//               <Link
//                 href="/authPage"
//                 className="px-2 md:px-8 py-2 border border-[#1E63D0] text-[#1E63D0] rounded-3xl shadow-md transition-all active:scale-95 hover:bg-gray-200"
//               >
//                 Login
//               </Link>

//               <Link
//                 href="/authPage"
//                 className="md:px-10 px-2 py-2 bg-[#1E63D0] text-white rounded-3xl shadow-md transition-all active:scale-95 hover:bg-[#155ABF]"
//               >
//                 Register
//               </Link>
//             </>
//           ) : (
//             <button
//               onClick={logout}
//               className="px-4 py-2 bg-red-500 text-white rounded-3xl shadow-md transition-all active:scale-95 hover:bg-red-600"
//             >
//               Logout
//             </button>
//           )}

//         </nav>
//       </div>
//     </header>
//   );
// }