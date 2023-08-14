import Link from "next/link";

import { AiOutlineArrowLeft } from "react-icons/ai";

export default function BackNavigation() {
  return (
    <nav className="absolute">
      <Link
        href="/"
        className="flex flex-row items-center justify-start gap-2 pt-2 text-lg font-semibold text-[#28282B] hover:animate-pulse sm:text-xl"
      >
        <AiOutlineArrowLeft className="text-lg sm:text-xl" />
        <span>Back to main</span>
      </Link>
    </nav>
  );
}
