import { Button, Card } from "@/components";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";

interface Variable {
  id: number;
  orgId: number;
  locationId: number | null;
  key: string;
  value: string;
}

interface Location {
  id: number;
  orgId: number;
}

interface AssembledLocation extends Location {
  address: string;
  brandName: string;
  name: string;
  phoneNumber: string;
  storeHours: string;
}

const variableKeys = [
  "Address",
  "BrandName",
  "Name",
  "PhoneNumber",
  "StoreHours",
];
type VariableKey = (typeof variableKeys)[number];

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

      // group variables by locationId || orgId
      const groupedVariables =
        variables?.length > 0
          ? Object.groupBy(
              variables,
              (variable: Variable) => variable?.locationId || variable?.orgId
            )
          : [];

      return groupedVariables;
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
      const locations: Location[] = await locationsRes.json();

      // todo: fix typing
      const parsedLocations: AssembledLocation[] = locations?.map(
        (location) => {
          const variablesObj = {};
          variableKeys?.forEach((variableKey: VariableKey) => {
            // look for variable based on location id first, if not found, find based on orgId
            const foundVariable =
              variables?.[location.id]?.find(
                (variable) => variable.key === variableKey
              )?.value ||
              variables?.[location.orgId]?.find(
                (variable) => variable.key === variableKey
              )?.value ||
              null;

            const lowerCasedVariableKey =
              variableKey.charAt(0).toLocaleLowerCase() + variableKey.slice(1);
            variablesObj[lowerCasedVariableKey] = foundVariable;
          });
          return variablesObj;
        }
      );
      return parsedLocations;
    },
    // set locations as dependent on variables
    enabled: !!variables,
  });

  /**
   * locations and variables logic
   * locations:
   * - locations exist at org level AND location level
   * - 3 locations under 1 org, 4
   *
   * display locations and variables
   * indicate whether variable is inherited from org or defined at location level
   *
   * keys: name, address, phone number
   * grab value of key to display
   *
   * if ("locationId" in variable), overrides org-level variable, else inherits org-level variable
   *
   * consider how to make this modular / flexible
   *  */

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

  return (
    <div className="flex flex-col space-y-6">
      {/* todo: flesh out loading state */}
      {areLocationsLoading || (areVariablesLoading && "loading")}
      {Array.isArray(locations) &&
        locations.map(
          ({
            address,
            brandName,
            id,
            name,
            phoneNumber,
            storeHours,
          }: AssembledLocation) => (
            <Card key={id}>
              <div>
                {/* variable key: name */}
                <h2 className="font-poppins font-semibold">{name}</h2>
                {/* variable key: address */}
                <p>{address}</p>
                {/* variable key: number */}
                <p>{phoneNumber}</p>
                <div className="mt-1">
                  {/* todo: leverage id to toggle isShowingVariables */}
                  <Button
                    onClick={() => {
                      console.log(id);
                    }}
                    variant="link"
                  >
                    {/* todo: add conditional logic for text rendering */}
                    Show/hide Variables
                  </Button>
                  {
                    <div className="mt-2 grid auto-cols-auto">
                      {/* store hours */}
                      <p>{storeHours}</p>
                      {/* brand name */}
                      <p>{brandName}</p>
                    </div>
                  }
                </div>
              </div>
            </Card>
          )
        )}
    </div>
  );
}

export default LocationsAndVariables;
