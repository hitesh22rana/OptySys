import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex flex-col items-center justify-between sm:flex-row">
      <Link href="/" className="bg-none">
        <Image
          src="/images/logo.png"
          width={100}
          height={100}
          alt="logo"
          draggable={false}
          className="drop-shadow-2xl transition-opacity delay-75 hover:opacity-90 sm:h-16 sm:w-16"
        />
      </Link>
      <div className="flex w-full flex-row items-center justify-between gap-5 sm:w-auto">
        <Link href="/login" className="w-full">
          <button className="h-10 w-full rounded bg-gradient-to-r from-purple-500 to-pink-500 text-lg font-semibold text-white hover:bg-gradient-to-l focus:outline-none focus:ring-4 focus:ring-purple-200 sm:w-28">
            Login
          </button>
        </Link>
        <Link href="/register" className="w-full">
          <button className="h-10 w-full rounded bg-gradient-to-r from-purple-500 to-pink-500 text-lg font-semibold text-white hover:bg-gradient-to-l focus:outline-none focus:ring-4 focus:ring-purple-200 sm:w-28">
            Signup
          </button>
        </Link>
      </div>
    </nav>
  );
}
