export interface Variable {
  id: number;
  orgId: number;
  locationId: number | null;
  key: string;
  value: string;
}

export type GroupedVariables = Partial<Record<number, Variable[]>>;

export const fetchVariables = async () => {
  const variableRes = await fetch(
    `${import.meta.env.VITE_SWIVL_BASE_URL}/variables`
  );

  if (!variableRes.ok) {
    throw new Error("Error fetching variables");
  }

  const variables: Variable[] = await variableRes.json();

  // group variables by locationId || orgId
  const groupedVariables =
    variables?.length > 0
      ? Object.groupBy(
          variables,
          (variable: Variable) => variable?.locationId || variable?.orgId
        )
      : [];

  return groupedVariables;
};
