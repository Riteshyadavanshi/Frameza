import React, { PropsWithChildren } from "react";
import { SidebarComponent } from "./_components/Sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { User } from "@/lib/generated/prisma/client";

const ChatLayout = async ({ children }: PropsWithChildren) => {
  const isUser = await auth();
  const user: User = isUser?.user as User;
  if (!isUser?.user) {
    redirect("/auth");
  }

  if (!user.creadits) {
    redirect("/subscription");
  }
  return (
    <>
      <SidebarProvider>
        <SidebarComponent />
        <main className="w-full">
          <div className="w-full border-b bg-neutral-900">
            <SidebarTrigger className="text-white size-8" />
          </div>
          {children}
        </main>
      </SidebarProvider>
    </>
  );
};

export default ChatLayout;
