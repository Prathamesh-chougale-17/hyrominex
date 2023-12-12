// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import Header from "@/components/Navbar/Header";
import { FooterLinks } from "@/components/Footer/Footer";
import { Metadata } from "next";
import Provider from "./Provider";
import "./globals.css";
export const metadata: Metadata = {
  title: "Hydrominex",
  description: "Made by Team Hydrominex",
  icons:
    "https://img.freepik.com/premium-vector/dump-truck-icon-isolated-white-background_103044-862.jpg?w=740",
  metadataBase: new URL(
    "https://hydrominex-prathamesh-chougale-17.vercel.app/"
  ),
  openGraph: {
    title: "Hydrominex",
    description: "Hydrominex's personal website",
    url: "https://hydrominex-prathamesh-chougale-17.vercel.app/",
    siteName: "Hydrominex",
    images: [
      {
        url: "https://img.freepik.com/premium-vector/dump-truck-icon-isolated-white-background_103044-862.jpg?w=740",
        width: 800,
        height: 600,
        alt: "Hydrominex",
      },
    ],
    locale: "en_IE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <Provider>
          <MantineProvider defaultColorScheme="dark">
            <Header />
            {children}
            <FooterLinks />
          </MantineProvider>
        </Provider>
      </body>
    </html>
  );
}
