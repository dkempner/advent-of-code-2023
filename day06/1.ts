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

  for (let i = 0; i < times.length; i++) {
    let localOptions = 0
    const time = times[i]
    const distance = distances[i]

    for (let j = 0; j < time; j++) {
      if (calcDistance(j, time) > distance) {
        localOptions++
      }
    }
    options.push(localOptions)
  }

  return options.reduce((prev, curr) => prev * curr, 1)
})

function calcDistance(hold: number, total: number) {
  const timeToSwim = total - hold
  return timeToSwim * hold
}
