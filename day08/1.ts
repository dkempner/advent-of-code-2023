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

  let steps = 0
  let current = instructionsHashed['AAA']
  while (true) {
    if (current.node === 'ZZZ') break
    const mod = steps % turns.length
    const nextTurn = turns[mod]
    if (nextTurn === 'R') current = instructionsHashed[current.right]
    if (nextTurn === 'L') current = instructionsHashed[current.left]
    steps++
  }
  return steps
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
