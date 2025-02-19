import { findVariable, lowercaseFirstLetter } from "@/utils/locationsHelpers";
import { GroupedVariables } from "./variablesApi";

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

export const fetchLocations = async (variables: GroupedVariables) => {
  const locationsRes = await fetch(
    `${import.meta.env.VITE_SWIVL_BASE_URL}/locations`
  );

  if (!locationsRes.ok) {
    throw new Error("Error fetching locations");
  }

  const locations: Location[] = await locationsRes.json();

  const assembledLocations = locations?.map(({ id, orgId }) => {
    const variablesObject = variableKeys?.reduce((acc, variableKey) => {
      // look for variable based on location id first, if not found, find based on orgId
      const foundVariable = findVariable(variableKey, variables, id, orgId);

      acc[lowercaseFirstLetter(variableKey) as VariableKey] = foundVariable;

      return acc;
    }, {} as LocationVariables);
    return {
      ...variablesObject,
      id,
      orgId,
    };
  });

  return assembledLocations;
};
