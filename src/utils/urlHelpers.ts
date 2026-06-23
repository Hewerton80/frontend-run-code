/// <reference types="vite/client" />

/**
 * Garante que um ID seja uma string não-vazia antes de usá-lo em uma URL.
 * Em desenvolvimento, emite um aviso no console se o ID for inválido.
 *
 * @example
 * assertRouteId(classroom?.uuid, "classroomId") // "abc-123" ou ""
 */
export function assertRouteId(
  id: string | number | null | undefined,
  label = "id",
): string {
  if (id === null || id === undefined || id === "") {
    if (import.meta.env.DEV) {
      console.warn(`[urlHelpers] assertRouteId: "${label}" is empty or null`);
    }
    return "";
  }
  return String(id);
}

/**
 * Retorna true se a string for um path absoluto válido (começa com "/").
 *
 * @example
 * isAbsolutePath("/home")      // true
 * isAbsolutePath("lists")      // false
 */
export function isAbsolutePath(path: string): boolean {
  return path.startsWith("/");
}

export const parseUrl = (
  url: string,
  queryParams: Record<string, string | number> = {},
) => {
  if (!Object.keys(queryParams).length) return url;
  return `${url}?${new URLSearchParams(queryParams as Record<string, string>).toString()}`;
};
