// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseNumericObjectValues<T extends Record<string, any>>(
  obj: T
): Record<keyof T, number | null> {
  const result: Partial<Record<keyof T, number | null>> = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];

      if (typeof value === "string" || typeof value === "number") {
        const parsed = Number(value);
        result[key] = isNaN(parsed) ? null : parsed;
      } else {
        result[key] = null;
      }
    }
  }

  return result as Record<keyof T, number | null>;
}
