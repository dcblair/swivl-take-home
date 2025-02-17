import { type HTMLAttributes, memo, type ReactNode } from "react";
import { Tab } from "../Tab/Tab";
import { filterClasses } from "@/utils/filterClasses";

interface TabProps {
  name: string;
  href: string;
  content?: ReactNode;
}

interface TabsProps extends HTMLAttributes<HTMLElement> {
  classNames?: Partial<string>;
  tabs: TabProps[];
}

const BaseTabs = ({ classNames, tabs, ...rest }: TabsProps) => {
  return (
    <nav
      className={filterClasses(
        "bg-white border-b-gray-400 border-b-4 py-4 space-x-4 px-8 flex w-full",
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
