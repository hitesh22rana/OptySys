import dynamic from "next/dynamic";

const Wrapper = dynamic(() => import("@/src/components/home/Wrapper"));
const BackNavigation = dynamic(
  () => import("@/src/components/home/BackNavigation")
);

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Wrapper>
      <BackNavigation />
      {children}
    </Wrapper>
  );
}
