import Wrapper from "@/components/Wrapper";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Wrapper>{children}</Wrapper>;
}
