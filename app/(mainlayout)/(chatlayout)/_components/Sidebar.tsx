import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { BadgeIndianRupee, Edit } from "lucide-react";
import Image from "next/image";
export const SidebarComponent = () => {
  const links = [
    {
      title: "Chat",
      url: "#",
      icon: Edit,
    },
    {
      title: "Billing",
      url: "#",
      icon: BadgeIndianRupee,
    },
  ];
  return (
    <Sidebar className="mt-20" collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center md:hidden ">
          <Image
            src={"/logo.png"}
            alt="logo"
            height={400}
            width={400}
            className="size-20"
          />
          <h1 className="text-white text-2xl font-bold -mt-4">Frameza</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="px-4">
          {links.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};
