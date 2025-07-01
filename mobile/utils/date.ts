export function formatDate(date: Date): string {
  return new Date(date)
    .toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
    .replace(".", "");
}
