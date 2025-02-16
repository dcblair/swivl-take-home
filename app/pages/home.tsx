import { Outlet } from "react-router";

function Home() {
  return (
    <div className="size-full flex flex-col">
      <span className="">tabs go here</span>
      <Outlet />
    </div>
  );
}

export default Home;
