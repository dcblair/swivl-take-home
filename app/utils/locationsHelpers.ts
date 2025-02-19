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

// (000) 000-0000 => 000-000-0000
export const formatPhoneNumber = (phoneNumber: string) => {
  let parenCount = 0;

  // i imagine i could tailor the regex a bit to avoid the double replace
  return phoneNumber
    .replace(/[()]/g, function () {
      parenCount++;
      return parenCount === 2 ? "-" : "";
    })
    .replace(" ", "");
};
