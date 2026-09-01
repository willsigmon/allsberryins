export type BilingualAgentRecord = {
  firstName: string;
  languages?: readonly string[];
};

export function bilingualAgentFirstNames(
  roster: readonly BilingualAgentRecord[],
): string {
  return roster
    .filter((agent) => agent.languages?.includes("Spanish"))
    .map((agent) => agent.firstName)
    .join(", ");
}
