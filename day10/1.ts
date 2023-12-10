import { solve, bitsToInt } from './helper.ts'

solve((lines) => {
  const grid = lines.map((x) => x.split(''))
  const farthest = lines.map((x) => x.split('').map((x) => Infinity))
  const visitedCount = lines.map((x) => x.split('').map((x) => 0))
  let start = [0, 0]

  let biggest = 0

  for (let i = 0; i < grid.length; i++) {
    const row = grid[i]
    for (let j = 0; j < row.length; j++) {
      const cell = row[j]
      if (cell === 'S') start = [i, j]
    }
  }

  farthest[start[0]][start[1]] = 0
  visitedCount[start[0]][start[1]] = 1

  const toExplore = (() => {
    let list: number[][] = []

    function explore(row: number, col: number, mustBe: string[]) {
      if (row < 0 || col < 0) return
      const cell = grid.at(row)?.at(col)
      if (!cell) return
      if (cell === '.') return
      if (!mustBe.includes(cell)) return
      list.push([row, col, 0])
    }

    const [row, col] = start

    // Going North
    explore(row - 1, col, ['|', '7', 'F'])

    // Going West
    explore(row, col - 1, ['-', 'L', 'F'])

    // Going East
    explore(row, col + 1, ['-', 'J', '7'])

    // Going South
    explore(row + 1, col, ['|', 'L', 'J'])

    return list
  })()

  function explore(row: number, col: number, prevFarthest: number) {
    const newFarthest = prevFarthest + 1
    farthest[row][col] = newFarthest
    if (newFarthest > biggest) biggest = newFarthest
    visitedCount[row][col] = visitedCount[row][col] + 1
    const cell = grid[row][col]
    const localList: number[][] = []

    switch (cell) {
      case '|': {
        localList.push([row - 1, col])
        localList.push([row + 1, col])
        break
      }
      case '-': {
        localList.push([row, col - 1])
        localList.push([row, col + 1])
        break
      }
      case 'L': {
        localList.push([row - 1, col])
        localList.push([row, col + 1])
        break
      }
      case 'J': {
        localList.push([row - 1, col])
        localList.push([row, col - 1])
        break
      }
      case '7': {
        localList.push([row + 1, col])
        localList.push([row, col - 1])
        break
      }
      case 'F': {
        localList.push([row + 1, col])
        localList.push([row, col + 1])
        break
      }
      default: {
        break
      }
    }

    localList.forEach((l) => {
      if (visitedCount[l[0]][l[1]] > 0) return
      toExplore.push([l[0], l[1], newFarthest])
    })
  }

  while (toExplore.length) {
    const [row, col, prevFurthest] = toExplore.shift()!
    explore(row, col, prevFurthest)
  }

  return biggest
})
