import { filterClasses } from "@/utils/filterClasses";
import { memo, type ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  hiddenContent?: ReactNode;
  isOpen?: boolean;
  classNames?: string;
}

const BaseCard = ({
  classNames = "",
  children,
  hiddenContent = null,
  isOpen = false,
}: CardProps) => {
  return (
    <div
      className={filterClasses(
        "shadow-md bg-white pt-4 pb-3 px-6 rounded-md w-full grid transition-all overflow-hidden ease-in-out duration-500",
        isOpen ? "max-h-48" : "max-h-32",
        classNames
      )}
    >
      <div>{children}</div>
      {hiddenContent && <div className="overflow-hidden">{hiddenContent}</div>}
    </div>
  );
};

export const Card = memo(BaseCard);
