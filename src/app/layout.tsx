import "@/styles/globals.css";
import Script from "next/script";
import GoogleAdSenseScript from "@/components/features/ads-sense/google-ads/GoogleAdSenseScript";
import AppClientLayout from "@/components/layouts/AppClientLayout";
import StructuredData from "@/components/seo/StructuredData";
import { baseMetadata } from "@/packages/seo/seo.config";
import { themeInitScript } from "@/packages/utils/apply-theme";

export const metadata = baseMetadata;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`h-full antialiased`}
    >
      <head>
        {/* Runs before hydration so the correct .dark class is applied
            before first paint — prevents a flash of the wrong theme. */}
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        <StructuredData />
        <GoogleAdSenseScript />
      </head>
      <body
        className="min-h-full flex flex-col"
        suppressHydrationWarning={true}
      >
        <AppClientLayout>{children}</AppClientLayout>
      </body>
    </html>
  );
}
