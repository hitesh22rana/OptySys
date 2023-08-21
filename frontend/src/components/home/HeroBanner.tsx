"use client";

import Image from "next/image";

import TypewriterComponent from "typewriter-effect";

export default function HeroBanner() {
  return (
    <section className="flex h-full w-full flex-col items-center justify-start">
      <Image
        src="/images/logo.png"
        height={200}
        width={200}
        alt="logo"
        draggable={false}
        className="absolute bottom-0 left-0 right-0 top-0 m-auto h-96 w-96 bg-cover opacity-10 blur-sm"
      />

      <div className="space-y-7 py-32 text-center text-4xl text-[#28282B] md:space-y-5 md:text-6xl lg:text-7xl">
        <h1 className="font-extrabold">Streamlining opportunities with</h1>

        <div className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text pb-5 font-extrabold text-transparent">
          <TypewriterComponent
            options={{
              strings: ["efficient matching", "and automation."],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
    </section>
  );
}
