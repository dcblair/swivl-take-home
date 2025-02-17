import { filterClasses } from "@/utils/filterClasses";
import { memo, type ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  classNames?: string;
}

const BaseCard = ({ children }: CardProps) => {
  return (
    <div
      className={filterClasses(
        "shadow-md bg-white pt-4 pb-3 px-6 rounded-md w-full"
      )}
    >
      {children}
    </div>
  );
};

export const Card = memo(BaseCard);
