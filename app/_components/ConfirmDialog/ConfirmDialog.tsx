"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { ReactNode } from "react";
import styles from "./ConfirmDialog.module.css";

type ConfirmDialogProps = {
  trigger: ReactNode;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  size?: "sm" | "default";
  onConfirm: () => void;
  onCancel?: () => void;
  icon?: ReactNode;
  isDanger?: boolean;
};

export function ConfirmDialog({
  trigger,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  size = "sm",
  onConfirm,
  onCancel,
  icon,
  isDanger = false,
}: ConfirmDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>

      <AlertDialogContent size={size} className={styles.modal}>
        <AlertDialogHeader>
          {icon && (
            <AlertDialogMedia
              className={`${styles.modalIcon} ${isDanger ? styles.modalIconDanger : styles.modalIconDefault}`}
            >
              {icon}
            </AlertDialogMedia>
          )}
          <AlertDialogTitle className={styles.modalTitle}>
            {title}
          </AlertDialogTitle>

          {description && (
            <AlertDialogDescription className={styles.modalSubtitle}>
              {description}
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel variant="outline" onClick={onCancel}>
            {cancelText}
          </AlertDialogCancel>

          <AlertDialogAction variant="destructive" onClick={onConfirm}>
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
