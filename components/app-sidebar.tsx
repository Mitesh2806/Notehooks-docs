"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ROUTES } from "@/app/lib/routes-config";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarContent>
        {ROUTES.map((item, index) => (
          <SidebarGroup key={index}>
            {/* Render Label only if items exist (like "Getting Started") */}
            {item.items && (
              <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items ? (
                  // If it has sub-items, render them
                  item.items.map((subItem, subIndex) => {
                    // Construct the href: /docs + parent href + child href
                    const href = `/docs${item.href}${subItem.href}`;
                    const isActive = pathname === href;
                    
                    return (
                      <SidebarMenuItem key={subIndex}>
                        <SidebarMenuButton asChild isActive={isActive}>
                          <Link href={href}>{subItem.title}</Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })
                ) : (
                  // If it has no sub-items, render it as a main link (e.g., "Contributing")
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === `/docs${item.href}`}
                    >
                      <Link href={`/docs${item.href}`}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}