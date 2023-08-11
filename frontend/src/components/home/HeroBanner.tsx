"use client";

import Image from "next/image";

import TypewriterComponent from "typewriter-effect";

export default function HeroBanner() {
  return (
    <section className="flex flex-col items-center justify-start w-full h-full">
      <Image
        src="/images/logo.png"
        height={200}
        width={200}
        alt="logo"
        draggable={false}
        className="absolute top-0 left-0 right-0 bottom-0 m-auto bg-cover opacity-10 w-96 h-96 blur-[2px]"
      />

      <div className="text-[#28282B] text-center lg:text-7xl md:text-6xl text-4xl md:space-y-5 space-y-7 py-32">
        <h1 className="font-extrabold">Streamlining opportunities with</h1>

        <div className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
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
