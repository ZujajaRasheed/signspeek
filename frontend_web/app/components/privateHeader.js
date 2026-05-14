// "use client";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import Image from "next/image";

// export default function PrivateHeader({ dashboard }) {
//   const pathname = usePathname();

//   const navItems = [
//     { name: "Dashboard", path: dashboard },
//     { name: "About", path: "/about" },
//     { name: "Learn", path: "/learn" },
//     { name: "Settings", path: "/setting" },
//   ];

//   return (
//     <header className="w-full bg-white shadow-md">
//       <div className="container mx-auto px-6 py-4 flex justify-between items-center">

//         {/* Logo */}
//         <Link href="/">
//           <Image
//             src="/logoo.png"
//             alt="Logo"
//             width={140}
//             height={140}
//             className="object-contain"
//             priority
//           />
//         </Link>

//         {/* Navigation */}
//         <nav className="flex items-center gap-6">
//           {navItems.map((item) => {
//             const isActive =
//               item.path && (pathname === item.path || pathname.startsWith(item.path + "/"));

//             return (
//               <Link
//                 key={item.path}
//                 href={item.path}
//                 className={`px-3 py-2 transition-all duration-300
//                   ${
//                     isActive
//                       ? "text-[#1E63D0] "
//                       : "text-black hover:text-[#1E63D0] hover:scale-105"
//                   }`}
//               >
//                 {item.name}
//               </Link>
//             );
//           })}

//           {/* Logout */}
//           <button onClick={async () => {
//     await fetch("/api/auth/logout", {
//       method: "POST",
//     });

//     window.location.href = "/";
//   }}
//             type="button"
//              className="px-2 md:px-8 py-2 border border-[#1E63D0] text-[#1E63D0] rounded-3xl shadow-lg transition-all active:scale-95 hover:bg-gray-100 "
//           >
//             Logout
//           </button>
//         </nav>

//       </div>
//     </header>
//   );
// }








"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function PrivateHeader({ dashboard }) {
  const pathname = usePathname();

  // 🔥 dynamic dashboard detection
  const activeDashboard =
    pathname.includes("sign-to-text")
      ? "/sign-to-text"
      : pathname.includes("text-to-sign")
      ? "/text-to-sign"
      : dashboard || "/dashboard";

  const navItems = [
    { name: "Dashboard", path: activeDashboard },
    { name: "About", path: "/about" },
    { name: "Learn", path: "/learn" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <header className="w-full bg-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO */}
        <Link href="/">
          <Image
            src="/logoo.png"
            alt="Logo"
            width={140}
            height={140}
            className="object-contain"
            priority
          />
        </Link>

        {/* NAV */}
        <nav className="flex items-center gap-6">

          {navItems.map((item) => {
            const isActive =
              pathname === item.path ||
              pathname.startsWith(item.path + "/");

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`px-3 py-2 transition-all duration-300 ${
                  isActive
                    ? "text-[#1E63D0]"
                    : "text-black hover:text-[#1E63D0] hover:scale-105"
                }`}
              >
                {item.name}
              </Link>
            );
          })}

          {/* LOGOUT */}
          <button
            onClick={async () => {
              await fetch("/api/auth/logout", {
                method: "POST",
              });

              window.location.href = "/";
            }}
            className="px-2 md:px-8 py-2 border border-[#1E63D0] text-[#1E63D0] rounded-3xl shadow-lg transition-all active:scale-95 hover:bg-gray-100"
          >
            Logout
          </button>

        </nav>
      </div>
    </header>
  );
}