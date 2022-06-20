export const hoodIntimiditation = (guns, fists, intelligence) =>{
  return Math.floor(((guns + fists) / 2) * (intelligence / 10))
}

export const playerPower = (hoods, respect, personalCash, suspicion) => {
  const hoodPower = Object.values(hoods).reduce((accum, hood) => {
    return accum += hoodIntimiditation(hood.guns, hood.fists, hood.intelligence)
  }, 0)
  return (Math.floor(hoodPower / hoods.length) + respect + personalCash) - (suspicion * 3)
}

export const basePlayer = {
  suspicion: 0,
  respect: 10,
  power: 10,
  money: 400,
  personalCash: 0,
  moves: 0,
  hoods: {},
}