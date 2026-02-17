import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Happy Valentine's Day Babe 💕",
  description: "Hope you enjoy this little surprise I made for you! I'll see you around",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: "#000" }}>
        {children}
      </body>
    </html>
  );
}