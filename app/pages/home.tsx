import { Tabs } from "@/components/Tabs/Tabs";
import { Outlet } from "react-router";

function Home() {
  const tabs = [
    { name: "Details", href: "/" },
    { name: "Cortex", href: "/cortex" },
    { name: "Escalations", href: "/escalations" },
    { name: "Sequences", href: "/sequences" },
    { name: "Locations and Variables", href: "/locations-and-variables" },
    { name: "spot.is", href: "/spot-is" },
  ];

  return (
    <div className="size-full flex flex-col">
      <header>
        <Tabs aria-label="navigation" tabs={tabs} />
      </header>
      <div className="py-8 px-6">
        <Outlet />
      </div>
    </div>
  );
}

export default Home;
