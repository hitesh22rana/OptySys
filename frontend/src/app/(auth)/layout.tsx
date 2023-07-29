import Wrapper from "@/src/components/home/Wrapper";
import BackNavigation from "@/src/components/home/BackNavigation";

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
