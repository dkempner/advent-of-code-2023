import { solve, bitsToInt } from './helper.ts'

const digits = [
  'zero',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
]

solve((lines) => {
  let sum = 0
  lines.forEach((line) => {
    let replacedLine = line

    digits.forEach((digit, index) => {
      replacedLine = replacedLine.replace(
        new RegExp(digit, 'g'),
        `${digit}${index}${digit}`
      )
    })

    const chars = replacedLine.split('').filter(isDigit).map(Number)
    const smushed = Number(`${chars.at(0)}${chars.at(-1)}`)

    sum = sum + smushed
  })
  return sum
})

function isDigit(char: string) {
  return !isNaN(Number(char))
}

new RegExp('')
