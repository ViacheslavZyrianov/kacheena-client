const emojis = [
  '1F638;',
  '1F639;',
  '1F63A;',
  '1F63B;',
  '1F63C;',
  '1F63D;',
  '1F63E;',
  '1F63F;',
  '1F640;',
  '1F648;',
]

const getDigitalRoot = number => {
  if (number < 10) return number

  let sum = 0
  while (number > 0) {
    sum += number % 10
    number = Math.floor(number / 10)
  }

  return getDigitalRoot(sum)
}

const getInitials = fullName => {
  return fullName
    .split(' ')
    .map(name => name.charAt(0).toUpperCase())
    .join('')
}

const generate = fullName => {
  const initials = getInitials(fullName)
  const code = initials
    .split('')
    .map(i => i.charCodeAt(0))
    .join('')

  return emojis[getDigitalRoot(Number(code))]
}

export default generate