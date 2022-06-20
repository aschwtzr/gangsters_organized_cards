import { hoodIntimiditation } from '../simulation/player'

export const purchase = (income, hoods, cash) => {
  const intimidation = hoods.reduce((accum, curr) => {
    return accum += hoodIntimiditation(curr.guns, curr.fists, curr.intelligence)
  }, 0)
  return income - (intimidation * 1.2) > cash
}
export const attack = () => {}
export const configureIllegal = () => {}
export const boostDefense = () => {}
export const protect = () => {}