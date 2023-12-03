import { solve, bitsToInt } from './helper.ts'

solve((lines) => {
  let grid: string[][] = []

  lines.forEach((line, rowIndex) => {
    const row = line.split('')
    grid.push(row)
  })

  let firstRow = grid[0]

  const gears: number[] = []

  function isSafeCell(rowIndex: number, colIndex: number) {
    return (
      rowIndex >= 0 &&
      rowIndex < grid.length &&
      colIndex >= 0 &&
      colIndex < firstRow.length
    )
  }

  function check(rowIndex: number, colIndex: number) {
    if (!isSafeCell(rowIndex, colIndex)) return
    const cell = grid[rowIndex][colIndex]
    if (!isNumber(cell)) return

    let colIndexMin = colIndex
    let colIndexMax = colIndex

    while (
      isSafeCell(rowIndex, colIndexMin - 1) &&
      isNumber(grid[rowIndex][colIndexMin - 1])
    ) {
      colIndexMin = colIndexMin - 1
    }

    while (
      isSafeCell(rowIndex, colIndexMax + 1) &&
      isNumber(grid[rowIndex][colIndexMax + 1])
    ) {
      colIndexMax = colIndexMax + 1
    }

    let string = ''

    for (let i = colIndexMin; i <= colIndexMax; i++) {
      string = string + grid[rowIndex][i]
      grid[rowIndex][i] = ''
    }

    const asNumber = Number(string)
    return asNumber
  }

  grid.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (!isSymbol(cell)) return

      const checks = [
        check(rowIndex - 1, colIndex - 1),
        check(rowIndex - 1, colIndex),
        check(rowIndex - 1, colIndex + 1),
        check(rowIndex, colIndex - 1),
        check(rowIndex, colIndex + 1),
        check(rowIndex + 1, colIndex - 1),
        check(rowIndex + 1, colIndex),
        check(rowIndex + 1, colIndex + 1),
      ].filter((x) => x)

      if (checks.length === 2) gears.push(checks[0]! * checks[1]!)
    })
  })

  return gears.reduce((prev, curr) => prev + curr, 0)
})

function isSymbol(val: string) {
  return val !== '.' && Number.isNaN(Number(val))
}

function isNumber(val: string) {
  return !Number.isNaN(Number(val))
}
