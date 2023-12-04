import { bitsToInt, solve } from "./helper.ts";

solve((lines) => {
  let totalScore = 0;
  lines.forEach((line) => {
    const { winningNumbers, myNumbers } = parseLine(line);
    const myWinningNumbers = getMyWinningNumbers(winningNumbers, myNumbers);
    const score = scoreMyWinningNumbers(myWinningNumbers);

    console.log({
      winningNumbers,
      myNumbers,
      myWinningNumbers,
      score,
    });

    totalScore += score;
  });
  console.log(totalScore);
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
  if (!myWinningNumbers.length) return 0;
  return myWinningNumbers.reduce((acc, curr, index) => {
    if (index === 0) {
      return acc;
    }

    return acc * 2;
  }, 1);
}
