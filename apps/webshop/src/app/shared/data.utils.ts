export const mapToArray = <T>(map: Record<string, T>): T[] =>
  Object.keys(map).map((key) => map[key]);
