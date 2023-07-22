import Wrapper from "@/components/home/Wrapper";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Wrapper>{children}</Wrapper>;
}
