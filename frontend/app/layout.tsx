import "@/styles/globals.css";
import { Open_Sans } from "next/font/google";

import NextTopLoader from "nextjs-toploader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const openSans = Open_Sans({ subsets: ["latin"] });

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
    <html lang="en">
      <body className={openSans.className}>
        <NextTopLoader showSpinner={false} />
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {children}
      </body>
    </html>
  );
}
