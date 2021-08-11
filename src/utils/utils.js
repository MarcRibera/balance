export function dateFormatter(dateStr) {
  const date = new Date(dateStr);

  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    month: "narrow",
    day: "2-digit",
  }).format(date);
}

export function sprintDateFormatter(dateStr) {
  const date = new Date(dateStr);

  return new Intl.DateTimeFormat("en-GB", {
    month: "long",
    day: "2-digit",
  }).format(date);
}
