import React, { PropsWithChildren } from "react";
import { SidebarComponent } from "./_components/Sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const ChatLayout = ({ children }: PropsWithChildren) => {
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
