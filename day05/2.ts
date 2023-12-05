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

  let lowest = Infinity

  let totalCount = 0
  let counter = 0

  for (let i = 0; i < seedsFinal.length - 1; i = i + 2) {
    const start = seedsFinal[i]
    const count = seedsFinal[i + 1]
    totalCount = count + totalCount

    for (let i = 0; i < count; i++) {
      const startDate = new Date()
      let valToTest = start + i
      stages.forEach((stage) => {
        const mapped = stage.find((x) => x(valToTest))?.(valToTest)
        valToTest = mapped || valToTest
      })
      if (valToTest < lowest) lowest = valToTest
      const endDate = new Date()
      const time = endDate.getUTCMilliseconds() - startDate.getUTCMilliseconds()
      counter++
      if (counter % 1000000 === 0) {
        console.log({
          time,
          counter,
          percent: counter / totalCount,
        })
      }
    }
  }

  console.log({ totalCount })
  return lowest
})
