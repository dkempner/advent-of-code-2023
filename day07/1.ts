import { solve, bitsToInt } from './helper.ts'

const CARDS = 'AKQJT98765432'.split('').reverse()

solve((lines) => {
  let sorted: { hand: string; bid: number }[] = []
  lines.forEach((line) => {
    const [handRaw, bidRaw] = line.trim().split(' ')
    const hand = handRaw
    const bid = Number(bidRaw)

    sorted.push({ hand, bid })
  })

  sorted = sorted.sort((a, b) => {
    const aScored = scoreHandType(a.hand)
    const bScored = scoreHandType(b.hand)
    const diff = aScored - bScored

    if (diff !== 0) return diff

    const aCards = a.hand.split('')
    const bCards = b.hand.split('')

    for (let i = 0; i < aCards.length; i++) {
      const aCard = aCards[i]
      const bCard = bCards[i]

      if (aCard === bCard) continue

      const aCardScore = CARDS.indexOf(aCard)
      const bCardScore = CARDS.indexOf(bCard)

      return aCardScore - bCardScore
    }

    return 0
  })

  let final = 0

  for (let i = 0; i < sorted.length; i++) {
    const rank = i + 1
    const subject = sorted[i]
    final = final + subject.bid * rank
  }

  return final
})

function scoreHandType(hand: string) {
  const cards = hand.split('')
  const map = new Map<string, number>()

  cards.forEach((card) => {
    const current = map.get(card) || 0
    map.set(card, current + 1)
  })

  const length = map.size

  const entries = [...map.entries()]

  const base = (() => {
    if (length === 1) return 7
    if (length === 2) {
      if (entries.find(([key, value]) => value === 4)) return 6
      return 5
    }
    if (length === 3) {
      if (entries.find(([key, value]) => value === 3)) return 4
      return 3
    }
    if (length === 4) {
      return 2
    }

    return 1
  })()

  return base
}
