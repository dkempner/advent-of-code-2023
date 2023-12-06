import { solve, bitsToInt } from './helper.ts'

const distanceMap = new Map<number, number>()

solve((lines) => {
  let options: number[] = []
  const [timesRaw, distancesRaw] = lines
  const times = timesRaw
    .split('Time:')[1]
    .trim()
    .split(' ')
    .filter((x) => x)
    .map(Number)
  const distances = distancesRaw
    .split('Distance:')[1]
    .trim()
    .split(' ')
    .filter((x) => x)
    .map(Number)

  const time = Number(times.map((x) => x.toString()).join(''))
  const distance = Number(distances.map((x) => x.toString()).join(''))

  let localOptions = 0

  for (let j = 0; j < time; j++) {
    if (calcDistance(j, time) > distance) {
      localOptions++
    }
  }

  options.push(localOptions)

  return options.reduce((prev, curr) => prev * curr, 1)
})

function calcDistance(hold: number, total: number) {
  const timeToSwim = total - hold
  return timeToSwim * hold
}
