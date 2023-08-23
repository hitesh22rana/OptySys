"use client";

import SectionWrapper from "@/src/components/dashboard/SectionWrapper";
import { useUserStore } from "@/src/stores";

export default function ProfilePage() {
  const { user } = useUserStore();

  console.log(user);

  return (
    <SectionWrapper
      heading="User Profile"
      subHeading="Manage your profile information and preferences."
    >
      <div></div>
    </SectionWrapper>
  );
}
