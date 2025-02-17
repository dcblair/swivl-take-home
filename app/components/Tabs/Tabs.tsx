import { type HTMLAttributes, memo, type ReactNode } from "react";
import { Tab } from "../Tab/Tab";
import { filterClasses } from "@/utils/filterClasses";

interface TabProps {
  name: string;
  href: string;
  content?: ReactNode;
}

interface TabsProps extends HTMLAttributes<HTMLElement> {
  classNames?: string;
  tabs: TabProps[];
}

const BaseTabs = ({ classNames, tabs, ...rest }: TabsProps) => {
  return (
    <nav
      className={filterClasses(
        "bg-white border-b-neutral-350 border-b-2 py-3 space-x-4 px-4 flex w-full",
        classNames
      )}
      {...rest}
    >
      {tabs.map(({ href, name, content }) => (
        <Tab key={name} to={href}>
          {content ?? name}
        </Tab>
      ))}
    </nav>
  );
};

export const Tabs = memo(BaseTabs);
