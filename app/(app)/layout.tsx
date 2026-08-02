import { Metadata } from "next";
import Sidemenu from "../_components/Sidemenu/Sidemenu";

export const metadata: Metadata = {
  title: {
    default: "Xpensr",
    template: "Xpensr | %s",
  },
};

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidemenu />
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
