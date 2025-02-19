import { filterClasses } from "@/utils/filterClasses";
import { memo, type ReactNode } from "react";
import { NavLink, NavLinkProps } from "react-router";

interface TabProps extends NavLinkProps {
  classNames?: string;
  children: ReactNode;
}

const BaseTab = ({ classNames = "", children, ...rest }: TabProps) => {
  return (
    <NavLink
      /**
       * From docs: - Automatically applies `aria-current="page"` to the link when the link is active.
       * See [`aria-current`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current) on MDN.
       *  */
      className={({ isActive }) =>
        filterClasses(
          "text-black tracking-wide text-center text-xl p-2.5 transition-colors outline-0 outline-orange-500 ease-in-out rounded-lg",
          isActive
            ? "bg-orange-150 text-orange-500 [text-shadow:_0_0.7px_0_var(--color-orange-500)] transition-all duration-500"
            : "duration-300",
          "focus-visible:outline-2",
          "hover:text-orange-600",
          "aria-disabled:text-neutral-400 aria-disabled:bg-neutral-200 aria-disabled:pointer-events-none",
          classNames
        )
      }
      {...rest}
    >
      {children}
    </NavLink>
  );
};

export const Tab = memo(BaseTab);
