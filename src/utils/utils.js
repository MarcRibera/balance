export function sumArray(data) {
  const reducer = (accumulator, curr) => accumulator + curr
  const sum = data.reduce(reducer)
  return round2decimals(sum)
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

export function numberFormatter(number) {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
  }).format(number)
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
  const currentYear = new Date().getUTCFullYear()
  let years = []

  for (let initYear = 2021; initYear <= currentYear; initYear++) {
    years.push(initYear)
  }

  return years
}
const COLORS = [
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

export const CATEGORIES_COLORS = [
  { key: 'house', value: '#53A4DD' },
  { key: 'food', value: '#EC7AD2' },
  { key: 'sports', value: '#87E0C4' },
  { key: 'health', value: '#E13F3F' },
  { key: 'eating out', value: '#8CEDA8' },
  { key: 'entertainment', value: '#F0810A' },
  { key: 'bills', value: '#F0CD0A' },
  { key: 'car', value: '#566378' },
  { key: 'transport', value: '#F5776A' },
  { key: 'taxi', value: '#000000' },
  { key: 'cosmetic', value: '#6A77F5' },
  { key: 'clothes', value: '#B935FF' },
  { key: 'gifts', value: '#E66AF5' },
  { key: 'salary', value: '#35FF91' },
]

export function getColors() {
  return COLORS
}

export function getCategoriesColors() {
  return CATEGORIES_COLORS
}
