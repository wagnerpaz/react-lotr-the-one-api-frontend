export default function removeEmptyProps<T>(obj: T): Partial<T> {
  const result = {} as Partial<T>;
  for (const key in obj) {
    if (obj[key]) {
      result[key] = obj[key];
    }
  }
  return result;
}
