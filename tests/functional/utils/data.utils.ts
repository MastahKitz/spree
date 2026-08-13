/**
 * Generates a unique ID using the current epoch timestamp.
 */
export function generateUniqueId(): string {
  return `${Date.now()}`;
}
