import { solve, bitsToInt } from './helper.ts'

const colors = ['blue', 'red', 'green'] as const
type Colors = typeof colors[number]

type Game = { [key in Colors]: number }

// 25:00

solve((lines) => {
  let sum = 0
  lines.forEach((line) => {
    const game = getGame(line)
    sum = sum + game.blue * game.red * game.green
  })
  return sum
})

function getGame(line: string) {
  const max: Game = {
    blue: 0,
    red: 0,
    green: 0,
  }

  const rounds = getRounds(removeGameId(line))

  rounds.forEach((round) => {
    const roundParts = round.split(',').map((x) => x.trim())
    roundParts.forEach((roundPart) => {
      const color = colors.find((x) => roundPart.includes(x))
      if (!color) throw new Error('')
      const number = Number(roundPart.replace(` ${color}`, ''))
      if (number > max[color]) max[color] = number
    })
  })

  return max
}

function removeGameId(line: string) {
  return line.split(': ').at(1)!
}

function getRounds(line: string) {
  return line.split(';').map((x) => x.trim())
}
