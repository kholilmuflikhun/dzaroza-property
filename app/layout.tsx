import type { Metadata } from "next";
import { getPublicEnv } from "@/lib/config/public-env";
import "./globals.css";

const publicEnv = getPublicEnv();

export const metadata: Metadata = {
  metadataBase: new URL(publicEnv.NEXT_PUBLIC_SITE_URL),
  title: { default: "Dzaroza Property", template: "%s | Dzaroza Property" },
  description: "Layanan managerial property, konstruksi, renovasi, dan solusi properti dengan akad yang jelas dan transparan.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id"><body>{children}</body></html>;
}
