"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { ReactNode } from "react";

interface RedirectBtnProps {
  url: string;
  children: ReactNode;
  className?: string;
}
export const RedirectBtn = ({ url, children, className }: RedirectBtnProps) => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push(url);
  };
  return (
    <Button onClick={handleRedirect} className={className}>
      {children}
    </Button>
  );
};
