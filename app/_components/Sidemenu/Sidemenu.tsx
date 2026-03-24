"use client";

import { NavLinks } from "@/app/_utils/constants";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/logo.png";
import { usePathname } from "next/navigation";

const Sidemenu = () => {
  const path = usePathname();

  return (
    <div className="flex flex-col py-6 px-10 bg-(--primary-color)">
      <Image src={logo} alt="xpensr logo" width={150} className="mb-8" />
      {NavLinks.map((item: { name: string; href: string; icon: any }) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`my-2 py-1 pl-1 pr-4 flex gap-2 items-center
                ${
                  path === item.href || path.startsWith(item.href)
                    ? "bg-(--text-white) text-(--text-black) rounded"
                    : "text-(--text-white)"
                }`}
          >
            <Icon className="w-5 h-5" />
            {item.name}
          </Link>
        );
      })}
    </div>
  );
};

export default Sidemenu;
