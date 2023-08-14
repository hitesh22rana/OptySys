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
      <div className="flex w-full flex-row items-center justify-between gap-4 sm:w-auto">
        <Link href="/login" className="w-full">
          <button className="h-10 w-full rounded bg-[#28282B] text-base text-white hover:bg-[#353935] sm:w-24 md:text-lg">
            Login
          </button>
        </Link>
        <Link href="/register" className="w-full">
          <button className="h-10 w-full rounded bg-[#28282B] text-base text-white hover:bg-[#353935] sm:w-24 md:text-lg">
            Signup
          </button>
        </Link>
      </div>
    </nav>
  );
}
