import Wrapper from "@/components/common/Wrapper";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Wrapper>{children}</Wrapper>;
}
