import { PropsWithChildren } from "react";
import SideBar from "./ui/SideBar";
import { Bars3Icon } from "@heroicons/react/16/solid";

type Props = PropsWithChildren;
const MobileNavbar = (props: Props) => {
  return (
    <div className="md:hidden flex items-center">
      <SideBar
        triggerIcon={<Bars3Icon className="w-6" />}
        triggerClassName="fixed top-2 left-2 z-50 text-slate-700 bg-white/80 p-1 rounded-md shadow-sm"
      >
        {props.children}
      </SideBar>
    </div>
  );
};

export default MobileNavbar;
