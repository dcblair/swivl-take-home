import { filterClasses } from "@/utils/filterClasses";
import { memo, type ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  classNames?: string;
}

const BaseCard = ({ classNames = "", children }: CardProps) => {
  return (
    <div
      className={filterClasses(
        "shadow-md bg-white pt-4 pb-3 px-6 rounded-md w-full",
        classNames
      )}
    >
      {children}
    </div>
  );
};

export const Card = memo(BaseCard);
