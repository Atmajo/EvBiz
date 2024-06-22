import LandingNav from "@/components/LandingNav";
import { ReactNode } from "react";

const LandingLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className="flex flex-col bg-slate-300 h-screen"
      style={{
        background:
          "0% 0% / auto 25px repeat-y linear-gradient(to top, #ff000000 0% 49%, #ffffff59 49% 51%, #0000ff00 51%), 0% 0% / 25px auto repeat-x linear-gradient(to right, #ff000000 0% 49%, #ffffff59 49% 51%, #0000ff00 51%), radial-gradient(farthest-corner at 100% 100%, #e3261cff 0%, #a121afff 60%, #261ce3ff 100%)",
        backgroundBlendMode: "overlay",
        display: "flex",
        width: "100%",
        height: "screen",
      }}
    >
      <LandingNav />
      {children}
    </div>
  );
};

export default LandingLayout;
