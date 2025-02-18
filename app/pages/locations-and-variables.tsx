import { Button, Card } from "@/components";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";

function LocationsAndVariables() {
  const navigate = useNavigate();

  const {
    data: variables,
    error: variablesError,
    isPending: areVariablesLoading,
  } = useQuery({
    queryKey: ["variablesData"],
    queryFn: async () => {
      const variableRes = await fetch(
        `${import.meta.env.VITE_SWIVL_BASE_URL}/variables`
      );
      const variables = await variableRes.json();
      return variables;
    },
  });

  const {
    data: locations,
    error: locationsError,
    isPending: areLocationsLoading,
  } = useQuery({
    queryKey: ["locationsData"],
    queryFn: async () => {
      const locationsRes = await fetch(
        `${import.meta.env.VITE_SWIVL_BASE_URL}/locations`
      );
      const locationss = await locationsRes.json();
      return locationss;
    },
  });
  // 3 locations under 1 org
  //
  // keys: name, address, phone number
  // grab value of key to display

  // todo: flesh out error state
  if (locationsError || variablesError) {
    return (
      <div>
        <p>
          Something went wrong.{" "}
          <Button variant="link" onClick={() => navigate(0)}>
            Click here to refresh.
          </Button>
        </p>
      </div>
    );
  }

  console.log(variables, "variables", locations, "locations");

  return (
    <div className="flex flex-col space-y-6">
      {/* todo: flesh out loading state */}
      {areLocationsLoading || (areVariablesLoading && "loading")}
      <Card>
        <div>
          <h2 className="font-poppins">Sickvile</h2>
          <p>1337 Kevin Mitnick Rd, Warrendale, PA</p>
          <p>212-555-1234</p>
          <div className="mt-1">
            <Button onClick={() => {}}>Show Variables</Button>
            {
              <div className="mt-2 grid auto-cols-auto">
                {/* variables here */}
              </div>
            }
          </div>
        </div>
      </Card>

      <Card>
        <div>
          <h2 className="font-poppins">Sickvile</h2>
          <p>1337 Kevin Mitnick Rd, Warrendale, PA</p>
          <p>212-555-1234</p>
          <Button onClick={() => {}} variant="link">
            Show Variables
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default LocationsAndVariables;
