import { DashboardIcon } from "@radix-ui/react-icons";
import { Compass } from "lucide-react";

export const SidebarData = [
  {
    id: 1,
    title: "Dashboard",
    href: "/home",
    icon: DashboardIcon,
    color: "text-violet-500",
    bgColor: "bg-violet-500/20",
  },
  {
    id: 2,
    title: "Browse",
    href: "/browse",
    icon: Compass,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/20",
  },
];
