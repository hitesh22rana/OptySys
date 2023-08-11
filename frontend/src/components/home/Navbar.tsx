import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex sm:flex-row flex-col items-center justify-between">
      <Link href="/" className="bg-none">
        <Image
          src="/images/logo.png"
          width={100}
          height={100}
          alt="logo"
          draggable={false}
          className="sm:w-16 sm:h-16 drop-shadow-2xl hover:opacity-90 transition-opacity delay-75"
        />
      </Link>
      <div className="flex flex-row items-center justify-between gap-4 sm:w-auto w-full">
        <Link href="/login" className="w-full">
          <button className="sm:w-24 w-full h-10 md:text-lg text-base rounded text-white bg-[#28282B] hover:bg-[#353935]">
            Login
          </button>
        </Link>
        <Link href="/register" className="w-full">
          <button className="sm:w-24 w-full h-10 md:text-lg text-base rounded text-white bg-[#28282B] hover:bg-[#353935]">
            Signup
          </button>
        </Link>
      </div>
    </nav>
  );
}
