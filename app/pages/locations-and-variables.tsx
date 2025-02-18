import { Button, Card } from "@/components";
import { useLocationStore } from "@/stores/locationStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router";

// todo: abstract into api, along with queries
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

interface LocationVariables {
  address: string;
  brandName: string;
  name: string;
  phoneNumber: string;
  storeHours: string;
}

type AssembledLocation = Location & LocationVariables;

type VariableKey = keyof LocationVariables;

const variableKeys = [
  "Address",
  "BrandName",
  "Name",
  "PhoneNumber",
  "StoreHours",
];

function LocationsAndVariables() {
  const { locationState, setLocationState } = useLocationStore();
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
    isSuccess,
  } = useQuery({
    queryKey: ["locationsData"],
    queryFn: async () => {
      const locationsRes = await fetch(
        `${import.meta.env.VITE_SWIVL_BASE_URL}/locations`
      );
      const locations: Location[] = await locationsRes.json();

      const assembledLocations = locations?.map(({ id, orgId }) => {
        const variablesOject = variableKeys?.reduce((acc, variableKey) => {
          // look for variable based on location id first, if not found, find based on orgId
          const foundVariable =
            variables?.[id]?.find((variable) => variable.key === variableKey)
              ?.value ||
            variables?.[orgId]?.find((variable) => variable.key === variableKey)
              ?.value ||
            "";

          const lowerCasedVariableKey =
            variableKey.charAt(0).toLocaleLowerCase() + variableKey.slice(1);

          acc[lowerCasedVariableKey as VariableKey] = foundVariable;

          return acc;
        }, {} as LocationVariables);
        return {
          ...variablesOject,
          id,
          orgId,
        };
      });

      return assembledLocations;
    },
    // set locations as dependent on variables
    enabled: !!variables,
  });

  // initialize locations store state
  useEffect(() => {
    if (!locations) return;

    const initialLocationState = locations.map(({ id }) => {
      return {
        id: id,
        isShowingVariables: false,
      };
    });

    setLocationState(initialLocationState);
  }, [isSuccess, locations, setLocationState]);

  const handleSetLocationState = (id: number) => {
    if (!locationState) return;

    const newLocationState = locationState.map((location) =>
      location.id === id
        ? { ...location, isShowingVariables: !location.isShowingVariables }
        : location
    );

    setLocationState(newLocationState);
  };

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
          (
            {
              address,
              brandName,
              id,
              name,
              phoneNumber,
              storeHours,
            }: AssembledLocation,
            index
          ) => (
            <Card key={id}>
              <div>
                <h2 className="font-poppins font-semibold">{name}</h2>
                <p>{address}</p>
                <p>{phoneNumber}</p>
                <div className="mt-1">
                  {/* todo: leverage id to toggle isShowingVariables */}
                  <Button
                    onClick={() => handleSetLocationState(id)}
                    variant="link"
                  >
                    {locationState && locationState[index]?.isShowingVariables
                      ? "Hide"
                      : "Show"}{" "}
                    Variables
                  </Button>
                  {locationState &&
                    locationState[index]?.isShowingVariables && (
                      <div className="mt-2 grid auto-cols-auto">
                        {/* store hours */}
                        <p>{storeHours}</p>
                        {/* brand name */}
                        <p>{brandName}</p>
                      </div>
                    )}
                </div>
              </div>
            </Card>
          )
        )}
    </div>
  );
}

export default LocationsAndVariables;
