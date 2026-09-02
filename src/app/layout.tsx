import "@/styles/globals.css";
import GoogleAdSenseScript from "@/components/features/ads-sense/google-ads/GoogleAdSenseScript";
import AppClientLayout from "@/components/layouts/AppClientLayout";
import StructuredData from "@/components/seo/StructuredData";
import { baseMetadata } from "@/packages/seo/seo.config";

export const metadata = baseMetadata;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`h-full antialiased`}
      suppressHydrationWarning={true}
    >
      <head>
        {/* No-flash dark enforcement is handled by next-themes' own
            forcedTheme script (see ThemeProvider) — the site has no theme
            toggle, so forcing it there is sufficient and avoids running two
            competing theme scripts that raced each other on first paint. */}
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
