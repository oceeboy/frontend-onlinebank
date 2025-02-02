import { Inter, IBM_Plex_Serif } from "next/font/google";
import "./globals.css";

import type { Metadata } from "next";
import { bankDetail } from "@/constants/bankdetails";

export const dynamic = "force-dynamic";

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-ibm-plex-serif",
});
export const metadata: Metadata = {
  title: `${bankDetail.bankName}`,
  description: `${bankDetail.bankName} is a modern banking platform for everyone.`,
  icons: {
    icon: "/icons/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${ibmPlexSerif.variable}`}>
        {/* React Query setup */}

        {/* Toaster setup */}

        {/* Render page content */}
        {children}
        {/* Devtools for react-query */}
        <script src="//code.jivosite.com/widget/XjcRAhwyMW" async></script>
      </body>
    </html>
  );
}
