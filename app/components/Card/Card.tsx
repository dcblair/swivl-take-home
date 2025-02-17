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
        "shadow-md bg-white py-6 px-8 rounded-md w-full"
      )}
    >
      {children}
    </div>
  );
};

export const Card = memo(BaseCard);
