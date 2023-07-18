export const createDateObjectFromString = dateString => {
  const year = dateString.substring(0, 4)
  const month = dateString.substring(5, 7)
  const day = dateString.substring(8, 10)
  return new Date(year, month - 1, day)
}