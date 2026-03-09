import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { AppProviders } from "./providers";
import MuiCacheProvider from "./MuiCacheProvider";

export const metadata: Metadata = {
  title: "FusionBoard Dashboard",
  description: "Dashboard unificat pentru toate proiectele tale.",
};

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={manrope.variable}>
        <MuiCacheProvider>
          <AppProviders>{children}</AppProviders>
        </MuiCacheProvider>
      </body>
    </html>
  );
}
