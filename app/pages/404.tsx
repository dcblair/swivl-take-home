import { NavLink, useLocation } from "react-router";

function NotFound() {
  const location = useLocation();

  return (
    <div className="size-full flex flex-col items-center pt-32">
      <main>
        <h1 className="font-poppins text-3xl text-orange-600 font-bold">404</h1>
        <p>Something went wrong.</p>
        <p>
          Please try{" "}
          <NavLink
            className="underline hover:text-neutral-500 duration-300 ease-in-out"
            reloadDocument
            to={location.pathname}
          >
            refreshing the page
          </NavLink>
          , or{" "}
          <NavLink
            className="underline hover:text-neutral-500 duration-300 ease-in-out"
            to="/"
          >
            return to the home page.
          </NavLink>
        </p>
      </main>
    </div>
  );
}

export default NotFound;
