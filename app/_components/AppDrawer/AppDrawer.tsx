"use client";

import { ReactNode } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import styles from "./AppDrawer.module.css";

interface AppDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  title: string;
  description?: string;

  children: ReactNode;

  footer?: ReactNode;

  direction?: "left" | "right" | "top";
  className?: string;
}

export function AppDrawer({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  direction = "right",
  className,
}: AppDrawerProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction={direction}>
      <DrawerContent
        // className={`w-full max-w-xl ml-auto h-screen ${className ?? ""}`}
        className={styles.drawer}
      >
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>

          {description && <DrawerDescription>{description}</DrawerDescription>}
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto px-5">{children}</div>

        {footer && <DrawerFooter>{footer}</DrawerFooter>}
      </DrawerContent>
    </Drawer>
  );
}
