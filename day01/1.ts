import { solve, bitsToInt } from './helper.ts'

solve((lines) => {
  let sum = 0
  lines.forEach((line) => {
    const chars = line.split('').filter(isDigit).map(Number)
    const smushed = Number(`${chars.at(0)}${chars.at(-1)}`)
    sum = sum + smushed
  })
  return sum
})

function isDigit(char: string) {
  return !isNaN(Number(char))
}
