import { GroupedVariables } from "@/api";

export const lowercaseFirstLetter = (string: string) =>
  string.charAt(0).toLocaleLowerCase() + string.slice(1);

export const findVariable = (
  variableKey: string,
  variables: GroupedVariables,
  id: number,
  orgId: number
) => {
  return (
    variables?.[id]?.find((variable) => variable.key === variableKey)?.value ||
    variables?.[orgId]?.find((variable) => variable.key === variableKey)
      ?.value ||
    ""
  );
};
