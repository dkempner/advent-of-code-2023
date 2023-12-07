type SolveCallback = (input: string[]) => void

export function solve(cb: SolveCallback) {
  const input = Deno.readTextFileSync('./input')
  const lines = input.split('\n')
  console.log(cb(lines))
}

export const bitsToInt = (bits: string) => {
  return parseInt(bits, 2)
}
