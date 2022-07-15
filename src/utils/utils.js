export function sumArray(data) {
  const reducer = (accumulator, curr) => accumulator + curr
  return data.reduce(reducer)
}

const THOUSAND = 1000
const MILLION = 1e6
const BILLION = 1e9
const TRILLION = 1e12

export function readableNumber(number, precision = 0) {
  if (number >= TRILLION) return `${(number / TRILLION).toFixed(precision)}T`
  if (number >= BILLION) return `${(number / BILLION).toFixed(precision)}G`
  if (number >= MILLION) return `${(number / MILLION).toFixed(precision)}M`
  if (number >= THOUSAND) return `${(number / THOUSAND).toFixed(precision)}K`
  if (number % 1 != 0) return number.toFixed(precision)

  return number
}

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

export function getCategories() {
  const categories = [
    'House',
    'Food',
    'Sports',
    'Health',
    'Eating out',
    'Entertainment',
    'Bills',
    'Car',
    'Transport',
    'Taxi',
    'Cosmetic',
    'Clothes',
    'Gifts',
    'Salary',
  ]
  // const categoriresSorted = categories.sort()
  return categories
}

export function getYears() {
  return [2021, 2022]
}

export function getCategoriesColors() {
  return [
    '#53A4DD', // house
    '#EC7AD2', // food
    '#87E0C4', // sports
    '#E13F3F', // health
    '#8CEDA8', // eating out
    '#F0810A', // entertainment
    '#F0CD0A', // bills
    '#566378', // cart
    '#F5776A', // transport
    '#000000', // taxi
    '#6A77F5', // cosmetic
    '#B935FF', // clothes
    '#E66AF5', // gifts
    '#35FF91', // salary
  ]
}
