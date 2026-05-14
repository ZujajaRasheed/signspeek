import HeaderWrapper from "./components/headerWrapper";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <HeaderWrapper />
        {children}
      </body>
    </html>
  );
}