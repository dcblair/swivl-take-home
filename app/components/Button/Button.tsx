import { filterClasses } from "@/utils/filterClasses";
import { ComponentPropsWithoutRef, memo, type ReactNode } from "react";

const variants = {
  primary: [
    "bg-orange-150 text-orange-600 rounded-sm px-2 py-1.5 drop-shadow-sm",
    "disabled:text-neutral-700 disabled:bg-neutral-300",
    "hover:bg-orange-200 drop-shadow-md",
  ],
  link: [
    "underline py-1.5",
    "focus-visible:outline-neutral-600 focus-visible:outline-offset-2",
    "disabled:text-neutral-350",
    "hover:text-neutral-500",
  ],
};

type Variant = keyof typeof variants;

interface ButtonProps
  extends Pick<
    ComponentPropsWithoutRef<"button">,
    "children" | "type" | "onClick"
  > {
  children: ReactNode;
  classNames?: string;
  variant?: Variant;
}

const BaseButton = ({
  classNames = "",
  children,
  variant = "primary",
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={filterClasses(
        "transition duration-300 ease-in-out text-ml cursor-pointer",
        variants[variant],
        classNames
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export const Button = memo(BaseButton);
