"use client"

import * as React from "react"
import {
  ListOrdered,
  PiIcon,
  SpadeIcon,
  SquareTerminal,
  Users,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { ModeToggle } from "@/components/mode-toggle"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { CardStackIcon } from '@radix-ui/react-icons'

// This is sample data.
const data = {
  navMain: [
    {
      title: "Spillere",
      url: "/players",
      icon: Users,
    },
    {
      title: "Resultatliste",
      url: "/leaderboard",
      icon: ListOrdered,
    },
    {
      title: "Spill",
      url: "/matches",
      icon: SquareTerminal,
      // Direct link - no items array
    }
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/">
                <SpadeIcon className="!size-5" />
                <span className="text-base font-semibold">VM i Tress</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center justify-center p-2">
              <ModeToggle />
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
