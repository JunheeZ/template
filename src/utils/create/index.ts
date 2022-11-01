import { createBEM } from "./bem";

const prefixed = "z-";

export function createNamespace(name: string) {
  const prefixedName = `${prefixed}${name}`;
  return [
    prefixedName,
    createBEM(prefixedName)
  ] as const;
}
