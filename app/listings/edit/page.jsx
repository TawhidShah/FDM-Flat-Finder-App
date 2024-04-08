"use client";

import { useUser } from "@clerk/nextjs";

import { useRouter } from "next/navigation";

const Edit = () => {
  const { user } = useUser();
  const router = useRouter();

  if (user) {
    router.replace(`/user/${user.username}`);
    return null;
  }
};

export default Edit;
