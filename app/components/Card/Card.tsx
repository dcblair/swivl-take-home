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
      "shadow-md bg-white p-6 rounded-md w-full transition-all overflow-hidden ease-in-out duration-500",
      isOpen ? "max-h-52" : "max-h-[8.68rem]",
      classNames.wrapper
    ),
    hiddenContent: filterClasses(
      isOpen ? "animate-fadeIn" : "animate-fadeOut",
      classNames.hiddenContent
    ),
  };
  return (
    <div className={internalClassNames.cardWrapper}>
      {loading && (
        <FontAwesomeIcon
          aria-hidden="false"
          aria-label="Content loading"
          className="my-4 animate-spinFaster"
          color="oklch(0.65 0.21 37.7)"
          icon={faSpinner}
          role="status"
          size="2xl"
        />
      )}
      {children}
      {hiddenContent && (
        <div className={internalClassNames.hiddenContent}>{hiddenContent}</div>
      )}
    </div>
  );
};

export const Card = memo(BaseCard);
