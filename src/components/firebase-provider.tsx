"use client";

import { ReactNode } from "react";

export default function FirebaseProvider({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
