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

  if (locationsError || variablesError) {
    return (
      <div className="flex flex-col items-center pt-28">
        <div>
          <div className="mb-2.5">
            <h2 className="text-2xl font-poppins text-orange-600">Oops</h2>
          </div>
          <p>Something went wrong. </p>
          <Button variant="link" onClick={() => navigate(0)}>
            Click here to refresh.
          </Button>
        </div>
      </div>
    );
  }

  if (areLocationsLoading || areVariablesLoading) {
    return <Card loading />;
  }

  return (
    <div className="flex flex-col space-y-6">
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
                  <p>Store Hours: {storeHours}</p>
                  <p>Brand Name: {brandName}</p>
                </div>
              }
            >
              <div>
                <h2 className="font-poppins font-semibold">{name}</h2>
                <p>{address}</p>
                <p>{phoneNumber}</p>
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
            </Card>
          )
        )}
    </div>
  );
}

export default LocationsAndVariables;
