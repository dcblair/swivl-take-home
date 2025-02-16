import { Outlet } from "react-router";

function Home() {
  return (
    <div className="size-full flex flex-col">
      <span className="">hey there!</span>
      <Outlet />
    </div>
  );
}

export default Home;
