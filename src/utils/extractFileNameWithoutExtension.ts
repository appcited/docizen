/**
 * Extracts the file name without extension.
 *
 * @param filePath The full file path.
 * @returns The file name without its extension.
 */
export function extractFileNameWithoutExtension(filePath: string): string {
  // Overridden type because we know it will always have at least one element
  const parts = filePath.split('/') as [string, ...string[]];
  const fileName = parts[parts.length - 1];
  return fileName.replace(/\.[^.]+$/, '')
}
