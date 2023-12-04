import { bitsToInt, solve } from "./helper.ts";

solve((lines) => {
  const counts: number[] = Array.from({ length: lines.length });
  counts.fill(1);
  lines.forEach((line, index) => {
    const { winningNumbers, myNumbers } = parseLine(line);
    const myWinningNumbers = getMyWinningNumbers(winningNumbers, myNumbers);
    const score = scoreMyWinningNumbers(myWinningNumbers);
    const multiplier = counts[index];

    if (!score) return;

    for (let i = 1; i < score + 1; i++) {
      const indexToAccess = index + i;
      const current = counts[indexToAccess];
      const newValue = current + multiplier;
      counts[indexToAccess] = newValue;
    }
  });

  const sum = counts.reduce((acc, curr) => acc + curr, 0);
  console.log(sum);
});

function parseLine(line: string) {
  const [card, numbers] = line.split(":").filter((x) => x);
  const [winningNumbersRaw, myNumbersRaw] = numbers.split(" | ");
  return {
    cardNumber: Number(card.split(" ")[1]),
    winningNumbers: winningNumbersRaw.trim().split(" ").filter((x) => x).map((
      x,
    ) => Number(x)),
    myNumbers: myNumbersRaw.trim().split(" ").filter((x) => x).map((x) =>
      Number(x)
    ),
  };
}

function getMyWinningNumbers(
  winningNumbers: number[],
  myNumbers: number[],
): number[] {
  const myWinningNumbers: number[] = [];
  myNumbers.forEach((myNumber) => {
    if (
      winningNumbers.includes(myNumber) && !myWinningNumbers.includes(myNumber)
    ) {
      myWinningNumbers.push(myNumber);
    }
  });
  return myWinningNumbers;
}

function scoreMyWinningNumbers(
  myWinningNumbers: number[],
): number {
  return myWinningNumbers.length;
}
