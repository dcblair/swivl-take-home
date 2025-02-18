import { Variable } from "./variablesApi";

export interface Location {
  id: number;
  orgId: number;
}

export interface LocationVariables {
  address: string;
  brandName: string;
  name: string;
  phoneNumber: string;
  storeHours: string;
}

export type AssembledLocation = Location & LocationVariables;

export type VariableKey = keyof LocationVariables;

const variableKeys = [
  "Address",
  "BrandName",
  "Name",
  "PhoneNumber",
  "StoreHours",
];

// Partial<Record<number, Variable[]>> is the return type for groupedVariables
export const fetchLocations = async (
  variables: Partial<Record<number, Variable[]>>
) => {
  const locationsRes = await fetch(
    `${import.meta.env.VITE_SWIVL_BASE_URL}/locations`
  );

  if (!locationsRes.ok) {
    throw new Error("Error fetching locations");
  }

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
};
