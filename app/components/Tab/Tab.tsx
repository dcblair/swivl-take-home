import { filterClasses } from "@/utils/filterClasses";
import { type CSSProperties, memo, type ReactNode } from "react";
import { NavLink, NavLinkProps } from "react-router";

interface TabProps extends NavLinkProps {
  active?: boolean;
  classNames?: string;
  styles?: Partial<CSSProperties>;
  children: ReactNode;
  to: string;
}

const BaseTab = ({
  active = false,
  classNames = "",
  children,
  styles = {},
  to,
  ...rest
}: TabProps) => {
  // todo: active state, disabled state

  return (
    <NavLink
      className={filterClasses(
        "text-black tracking-wide text-xl px-4 py-2.5 rounded-lg w-fit",
        active && "bg-orange-150 text-orange-500 font-semibold",
        "aria-disabled:text-neutral-400 aria-disabled:bg-neutral-200 pointer-events-none",
        classNames
      )}
      style={styles}
      to={to}
      {...rest}
    >
      {children}
    </NavLink>
  );
};

export const Tab = memo(BaseTab);
