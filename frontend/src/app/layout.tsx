import "@/src/styles/globals.css";
import { Inter } from "next/font/google";

import NextTopLoader from "nextjs-toploader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ReactQueryProvider } from "@/src/lib/ReactQueryProvider";

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: "OptySys",
  description:
    "Streamlining opportunities with efficient matching and automation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryProvider>
      <html lang="en">
        <body className={inter.className}>
          <NextTopLoader showSpinner={false} />
          <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            style={{ zIndex: 99999 }}
          />
          {children}
        </body>
      </html>
    </ReactQueryProvider>
  );
}
