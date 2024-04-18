import "@styles/globals.css";
import { Providers } from "./Providers";

export const metadata = {
  title: "Chat App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
