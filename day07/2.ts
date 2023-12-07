import { solve, bitsToInt } from './helper.ts'

const CARDS = 'AKQT98765432J'.split('').reverse()
const HAND_TYPES = [
  '',
  'High Card',
  'One pair',
  'Two pair',
  'Three of a kind',
  'Full house',
  'Four of a kind',
  'Five of a kind',
]

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
  const cardsRaw = hand.split('')
  const jokerCount = cardsRaw.filter((x) => x === 'J').length
  const cards = hand.split('').filter((x) => x !== 'J')
  const map = new Map<string, number>()

  cards.forEach((card) => {
    const current = map.get(card) || 0
    map.set(card, current + 1)
  })

  const sorted = [...map.entries()]
    .sort((a, b) => {
      return a[1] - b[1]
    })
    .reverse()

  const most = sorted.at(0)
  if (!most) return 7
  const [mostKey, mostValue] = most
  map.set(mostKey, mostValue + jokerCount)

  const length = map.size

  const entries = [...map.entries()]

  const base = (() => {
    // 5 of a kind
    if (length === 1) return 7
    if (length === 2) {
      // 4 of a kind
      if (entries.find(([key, value]) => value === 4)) return 6
      // full house
      return 5
    }
    if (length === 3) {
      // 3 of a kind
      if (entries.find(([key, value]) => value === 3)) return 4

      // 2 pair
      return 3
    }
    // pair
    if (length === 4) {
      return 2
    }

    // nothing
    return 1
  })()

  return base
}
