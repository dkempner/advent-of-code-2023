import { solve, bitsToInt } from './helper.ts'

solve((lines) => {
  let answer = 0
  lines.forEach((line) => {
    answer = answer + calculate(parse(line))
  })
  return answer
})

function parse(line: string) {
  return line
    .split(' ')
    .filter((x) => x !== ' ')
    .map(Number)
}

function calculate(sequence: number[]) {
  let lists = [sequence]

  while (!lists.at(-1)!.every((x) => x === 0)) {
    const lastList = lists.at(-1)!
    const diffs: number[] = []
    for (let i = 0; i < lastList.length - 1; i++) {
      const diff = lastList[i + 1] - lastList[i]
      diffs.push(diff)
    }
    lists.push(diffs)
  }

  for (let i = lists.length - 1; i > 0; i--) {
    const list = lists[i]
    if (i === lists.length - 1) {
      list.unshift(0)
    }
    const behindList = lists[i - 1]
    behindList.unshift(behindList.at(0)! - list.at(0)!)
  }

  return sequence.at(0)!
}
