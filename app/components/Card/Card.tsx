import { filterClasses } from "@/utils/filterClasses";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo, type ReactNode } from "react";

type Outlets = "wrapper" | "hiddenContent";

interface CardProps {
  children?: ReactNode;
  classNames?: Partial<Record<Outlets, string>>;
  hiddenContent?: ReactNode;
  isOpen?: boolean;
  loading?: boolean;
}

const BaseCard = ({
  classNames = {},
  children,
  hiddenContent = null,
  isOpen = false,
  loading = false,
}: CardProps) => {
  const internalClassNames = {
    cardWrapper: filterClasses(
      "shadow-md bg-white pt-4 pb-3 px-6 rounded-md w-full transition-all overflow-hidden ease-in-out duration-500",
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
      {loading && (
        <FontAwesomeIcon
          className="my-4 animate-spinFaster"
          color="oklch(0.65 0.21 37.7)"
          icon={faSpinner}
          size="2xl"
        />
      )}
      {children}
      {hiddenContent && (
        <div className={internalClassNames.hiddentContent}>{hiddenContent}</div>
      )}
    </div>
  );
};

export const Card = memo(BaseCard);
