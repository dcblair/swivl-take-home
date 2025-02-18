import { fetchLocations, fetchVariables } from "@/api";
import { Button, Card } from "@/components";
import { useLocationStore } from "@/stores/locationStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router";

function LocationsAndVariables() {
  const { locationState, setLocationState } = useLocationStore();
  const navigate = useNavigate();

  const {
    data: variables,
    error: variablesError,
    isPending: areVariablesLoading,
  } = useQuery({
    queryKey: ["variablesData"],
    queryFn: fetchVariables,
  });

  const {
    data: locations,
    error: locationsError,
    isPending: areLocationsLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["locationsData"],
    queryFn: () => variables && fetchLocations(variables),
    // set locations as dependent on variables
    enabled: !!variables,
  });

  // initialize locations store state
  // note: due to this logic, the show/hide state won't persist
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
            { address, brandName, id, name, phoneNumber, storeHours },
            index
          ) => (
            <Card
              key={id}
              isOpen={locationState && locationState[index]?.isShowingVariables}
              hiddenContent={
                <div className="mt-2">
                  <p>{storeHours}</p>
                  <p>{brandName}</p>
                </div>
              }
            >
              <div>
                <h2 className="font-poppins font-semibold">{name}</h2>
                <p>{address}</p>
                <p>{phoneNumber}</p>
                <div className="mt-1">
                  <Button
                    onClick={() => handleSetLocationState(id)}
                    variant="link"
                  >
                    {locationState && locationState[index]?.isShowingVariables
                      ? "Hide"
                      : "Show"}{" "}
                    Variables
                  </Button>
                </div>
              </div>
            </Card>
          )
        )}
    </div>
  );
}

export default LocationsAndVariables;
