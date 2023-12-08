import { solve, bitsToInt } from './helper.ts'

solve((lines) => {
  const unsplit = lines.join('\n')

  const [topLine, instructionsUnsplit] = unsplit.split('\n\n')
  const instructions = instructionsUnsplit.split('\n').map(processInstruction)

  const turns = topLine.split('')

  const instructionsHashed: {
    [key: string]: ReturnType<typeof processInstruction>
  } = {}
  instructions.forEach((i) => {
    instructionsHashed[i.node] = i
  })

  function findSteps(node: ReturnType<typeof processInstruction>) {
    let steps = 0
    let current = node
    while (true) {
      if (current.node.endsWith('Z')) break
      const mod = steps % turns.length
      const nextTurn = turns[mod]
      if (nextTurn === 'R') current = instructionsHashed[current.right]
      if (nextTurn === 'L') current = instructionsHashed[current.left]
      steps++
    }
    return steps
  }

  const minSteps = instructions
    .filter((x) => x.node.endsWith('A'))
    .map((x) => findSteps(x))

  return firstMultipleList(minSteps)
})

function processInstruction(val: string) {
  let [node, leftAndRight] = val.split(' = ')
  leftAndRight = leftAndRight.replace('(', '').replace(',', '').replace(')', '')
  const [left, right] = leftAndRight.split(' ')

  return {
    node,
    left,
    right,
  }
}

function firstMultiple(l: number, r: number) {
  let left = l
  let right = r

  while (left !== right) {
    if (left > right) right = right + r
    else {
      left = left + l
    }
  }

  // They're equal at this point
  return left
}

function firstMultipleList(list: number[]) {
  let currentList = list
  if (currentList.length < 2) throw new Error('')

  while (currentList.length > 1) {
    const [left, right, ...rest] = currentList
    currentList = [firstMultiple(left, right), ...rest]
  }

  return currentList.at(0)!
}
