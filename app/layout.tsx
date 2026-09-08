import type { Metadata, Viewport } from "next";
import { fraunces, grotesque, switzerFace } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://avanaenclave18.com"),
  title: "Avana Enclave 18",
  description:
    "Eighteen villas on a two-acre slope in Karjat valley, in the Sahyadri foothills of Raigad.",
};

export const viewport: Viewport = {
  themeColor: "#0C1E26",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const switzer = switzerFace();

  return (
    <html
      lang="en-IN"
      className={`${fraunces.variable} ${grotesque.variable} h-full`}
    >
      <head>
        {switzer && (
          <style
            // Only emitted when the licensed Switzer files are present.
            dangerouslySetInnerHTML={{ __html: switzer }}
          />
        )}
      </head>
      <body className="min-h-full">
        <a
          href="#main"
          className="sr-only rounded-s bg-amber px-4 py-2 text-amber-ink focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100]"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
