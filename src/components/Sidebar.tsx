import { SidebarData } from "@/data/SidebarData";
import { cn } from "@/lib/utils";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="flex flex-col justify-start space-y-6 border-r h-screen pt-10 w-52">
      {SidebarData.map(({ id, title, color, bgColor, icon: Icon, href }) => (
        <Link
          href={href}
          className={cn(bgColor, "flex space-x-4 p-4")}
          key={id}
        >
          <Icon className={cn(color, "h-6 w-6")} />
          <h1 className="font-semibold">{title}</h1>
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
