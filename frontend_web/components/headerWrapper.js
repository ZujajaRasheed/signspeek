// "use client";

// import { useEffect, useState } from "react";
// import PublicHeader from "./publicHeader";
// import PrivateHeader from "./privateHeader";

// export default function HeaderWrapper() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const token = document.cookie.includes("token");
//     setIsLoggedIn(token);
//   }, []);

//   return (
//     <>
//       {isLoggedIn ? (
//         <PrivateHeader />
//       ) : (
//         <PublicHeader />
//       )}
//     </>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import PublicHeader from "./publicHeader";
import PrivateHeader from "./privateHeader";

export default function HeaderWrapper() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    setIsLoggedIn(document.cookie.includes("token"));
  }, []);

  if (isLoggedIn === null) return null; // prevent hydration mismatch

  return isLoggedIn ? <PrivateHeader /> : <PublicHeader />;
}