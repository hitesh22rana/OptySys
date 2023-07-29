import Wrapper from "@/components/home/Wrapper";
import BackNavigation from "@/components/home/BackNavigation";

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
