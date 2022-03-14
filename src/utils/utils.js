export function dateFormatter(dateStr) {
  const date = new Date(dateStr)

  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    month: 'narrow',
    day: '2-digit',
  }).format(date)
}

export function sprintDateFormatter(dateStr) {
  const date = new Date(dateStr)

  return new Intl.DateTimeFormat('en-GB', {
    month: 'long',
    day: '2-digit',
  }).format(date)
}

export function round2decimals(num) {
  return (Math.round(num * 100) / 100).toFixed(2)
}

export function getMonthNames() {
  return [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
}
