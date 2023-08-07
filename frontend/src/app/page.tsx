import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/src/components/home/Navbar"));
const Wrapper = dynamic(() => import("@/src/components/home/Wrapper"));

export default function Home() {
  return (
    <Wrapper>
      <Navbar />
    </Wrapper>
  );
}
