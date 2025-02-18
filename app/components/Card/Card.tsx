import { filterClasses } from "@/utils/filterClasses";
import { memo, type ReactNode } from "react";

type Outlets = "wrapper" | "hiddenContent";

interface CardProps {
  children: ReactNode;
  hiddenContent?: ReactNode;
  isOpen?: boolean;
  classNames?: Partial<Record<Outlets, string>>;
}

const BaseCard = ({
  classNames = {},
  children,
  hiddenContent = null,
  isOpen = false,
}: CardProps) => {
  const internalClassNames = {
    cardWrapper: filterClasses(
      "shadow-md bg-white pt-4 pb-3 px-6 rounded-md w-full grid transition-all overflow-hidden ease-in-out duration-500",
      isOpen ? "max-h-48" : "max-h-[8.5rem]",
      classNames.wrapper
    ),
    hiddentContent: filterClasses(
      isOpen ? "animate-fadeIn" : "animate-fadeOut",
      classNames.hiddenContent
    ),
  };
  return (
    <div className={internalClassNames.cardWrapper}>
      {children}
      {hiddenContent && (
        <div className={internalClassNames.hiddentContent}>{hiddenContent}</div>
      )}
    </div>
  );
};

export const Card = memo(BaseCard);
