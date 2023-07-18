import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex flex-row items-center justify-between p-2">
      <span className="text-3xl font-bold">OptySys</span>
      <div className="flex flex-row items-center justify-between gap-4">
        <Link href="/login">
          <button className="text-lg px-4 py-1 rounded bg-black text-white">
            Login
          </button>
        </Link>
        <Link href="/register">
          <button className="text-lg px-4 py-1 rounded bg-black text-white">
            Signup
          </button>
        </Link>
      </div>
    </nav>
  );
}
