export function assertNotNull<T>(item: T | undefined): T {
  if (item == null) {
    throw new Error("Item is null or undefined");
  }
  return item;
}
