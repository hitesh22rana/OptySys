import Link from "next/link";

import { AiOutlineArrowLeft } from "react-icons/ai";

export default function BackNavigation() {
  return (
    <nav className="absolute">
      <Link
        href="/"
        className="flex flex-row items-center justify-start gap-2 sm:text-xl text-lg font-semibold pt-2 text-[#28282B] hover:animate-pulse"
      >
        <AiOutlineArrowLeft className="sm:text-2xl text-xl" />
        <span>Back to main</span>
      </Link>
    </nav>
  );
}
