type ClassValue = string | undefined | null | ClassValue[];

// filters classes, allows for handling conditional classes
export function filterClasses(...classes: ClassValue[]) {
  return classes.flat().filter(Boolean).join(" ").trim();
}
