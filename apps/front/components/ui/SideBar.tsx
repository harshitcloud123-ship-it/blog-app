"use client";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import {
  PropsWithChildren,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { useOnClickOutside } from "usehooks-ts";

type Props = PropsWithChildren<{
  triggerIcon: ReactNode;
  triggerClassName?: string;
}>;
const SideBar = (props: Props) => {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    setShow(false);
  }, [pathname]);

  useOnClickOutside(ref as React.RefObject<HTMLElement>, (e) => {
    if (triggerRef.current && triggerRef.current.contains(e.target as Node)) {
      return;
    }
    setShow(false);
  });

  return (
    <>
      <button
        ref={triggerRef}
        className={props.triggerClassName}
        onClick={() => setShow((prev) => !prev)}
      >
        {props.triggerIcon}
      </button>
      <div
        ref={ref}
        className={cn(
          "w-60 fixed top-0 left-0 z-50 duration-300 transition-transform bg-white rounded-r-md h-screen shadow-lg",
          {
            "-translate-x-full": !show,
            "translate-x-0": show,
          },
        )}
      >
        {props.children}
      </div>
    </>
  );
};

export default SideBar;
