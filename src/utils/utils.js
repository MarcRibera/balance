export function dateFormatter(dateStr) {
  console.log(typeof dateStr);
  const date = new Date(dateStr);

  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    month: "narrow",
    day: "2-digit",
  }).format(date);
}
