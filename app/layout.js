import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/app/ClientLayout";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Sathya Mobiles",
  description: "Sathya Mobiles",
  icons: {
    icon: "/images/logo/sathyalogo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
         <link
        rel="stylesheet"
        href="https://cdn-uicons.flaticon.com/3.0.0/uicons-regular-rounded/css/uicons-regular-rounded.css"
      />
      <link
        rel="stylesheet"
        href="https://cdn-uicons.flaticon.com/3.0.0/uicons-solid-rounded/css/uicons-solid-rounded.css"
      />
      <link
        rel="stylesheet"
        href="https://cdn-uicons.flaticon.com/3.0.0/uicons-bold-rounded/css/uicons-bold-rounded.css"
      />
      <link
        rel="stylesheet"
        href="https://cdn-uicons.flaticon.com/3.0.0/uicons-regular-straight/css/uicons-regular-straight.css"
      />
      <link
        rel="stylesheet"
        href="https://cdn-uicons.flaticon.com/3.0.0/uicons-thin-straight/css/uicons-thin-straight.css"
      />
      <link
        rel="stylesheet"
        href="https://cdn-uicons.flaticon.com/3.0.0/uicons-solid-straight/css/uicons-solid-straight.css"
      />

      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClientLayout>{children}</ClientLayout>
        {/* ✅ Tracking Script */}
        {/*
         <Script id="adtarbo-pixel" strategy="afterInteractive">
          {`
            (function(d, s, id) { 
              var js, ajs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) return;
              js = d.createElement(s); 
              js.id = id; 
              js.aun_id = "pIA3DS2EI2r7"; 
              js.src = "https://pixel.adtarbo.com/pixelTrack1.js"; 
              ajs.parentNode.insertBefore(js, ajs);
            })(document, 'script', 'adtarbo-js-v2');
          `}
        </Script>
      */}
      <script>
        {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-TNNQWMR');
      `}
      </script>

      <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TNNQWMR"
      height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>

        <style>{`
          @font-face {
            font-family: 'Atlassian Sans';
            font-style: normal;
            font-weight: 400 653;
            font-display: swap;
            src: local('AtlassianSans'), local('Atlassian Sans Text'),
              url('/fonts/AtlassianSans-latin.woff2') format('woff2');
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC,
              U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F,
              U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
          }

          /* Prevent scrolling when mobile menu is open */
          body.menu-open {
            overflow: hidden;
            height: 100vh;
          }
        `}</style>
        
      </body>
    </html>
  );
}
