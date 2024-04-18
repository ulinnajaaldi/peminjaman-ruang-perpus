import dynamic from "next/dynamic";

export const AlertDelete = dynamic(
  () => import("@/components/common/alert-delete"),
);
export const ActionBackToHome = dynamic(
  () => import("@/components/common/action-back-to-home"),
);
