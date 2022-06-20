import { hoodIntimiditation } from '../simulation/player'

export const purchase = (income, hoods, dice) => {
  // Attempt to purchase a property. 
  const intimidation = hoods.reduce((accum, curr) => {
    const intimidation = hoodIntimiditation(curr.guns, curr.fists, curr.intelligence)
    console.log(`${curr.name.first}'s Intimidation: ${intimidation}`)
    return accum += intimidation
  }, 0)
  const playerMultiplier = dice(6) / 10 + 4
  const boardMultiplier = dice(6) / 10 + 1
  console.log(`Block Income: ${income}`)
  console.log(`Total Intimidation: ${intimidation}`)
  console.log(`Player Multiplier: ${playerMultiplier}`)
  console.log(`Board Multiplier: ${boardMultiplier}`)
  console.log(`Board Result: ${income * boardMultiplier}`)
  console.log(`Player Result: ${intimidation * playerMultiplier}`)

  return {
    success: income * boardMultiplier < intimidation * playerMultiplier,
    price: income - (intimidation * (playerMultiplier / 10))
  }
}
export const attack = () => {}
export const configureIllegal = () => {}
export const boostDefense = () => {}
export const protect = () => {}