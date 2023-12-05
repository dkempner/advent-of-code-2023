import { bitsToInt, solve } from './helper.ts'

solve((lines) => {
  const bigString = lines.join('\n')
  const groups = bigString.split('\n\n')

  const [seeds, ...maps] = groups
  const mapsArrays = maps.map((x) => x.split('\n'))

  const seedValues = seeds.split(':')[1].trim().split(' ').map(Number)

  const stages: ((val: number) => number | undefined)[][] = []

  mapsArrays.forEach((map) => {
    const mapping: ((val: number) => number | undefined)[] = []

    map.forEach((line, index) => {
      if (index === 0) return
      const [destination, source, count] = line.split(' ').map(Number)

      const func = (val: number): number | undefined => {
        if (val >= source && val < source + count) {
          const diff = val - source
          return destination + diff
        }
        return undefined
      }

      mapping.push(func)
    })

    stages.push(mapping)
  })

  let seedsFinal = [...seedValues]

  stages.forEach((stage) => {
    seedsFinal = seedsFinal.map((seed) => {
      const mapped = stage.find((x) => x(seed))?.(seed)
      return mapped || seed
    })
  })

  return Math.min(...seedsFinal)
})
