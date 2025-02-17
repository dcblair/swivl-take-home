import { filterClasses } from "@/utils/filterClasses";
import { type CSSProperties, memo } from "react";
import { NavLink } from "react-router";

interface TabProps {
  active?: boolean;
  classNames?: string;
  styles?: Partial<CSSProperties>;
  name: string;
  to: string;
}

const BaseTab = ({
  active = true,
  classNames = "",
  name,
  styles,
  to,
  ...rest
}: TabProps) => {
  // todo: active state, disabled state

  return (
    <NavLink
      className={filterClasses(
        "",
        active && "bg-orange-150 text-orange-500",
        classNames
      )}
      style={styles}
      to={to}
      {...rest}
    >
      {name}
    </NavLink>
  );
};

export const Tab = memo(BaseTab);
