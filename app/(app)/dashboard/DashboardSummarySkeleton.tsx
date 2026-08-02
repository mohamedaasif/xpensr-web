import { Skeleton } from "@/components/ui/skeleton";
import styles from "./DashboardSummary.module.css";

export default function DashboardSummarySkeleton() {
  return (
    <div className="flex gap-2 my-3">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className={"flex-1 rounded-xl p-4 " + styles["stat-card"]}
        >
          <div className="flex flex-col gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />

            <Skeleton className="h-7 w-32" />

            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      ))}
    </div>
  );
}
