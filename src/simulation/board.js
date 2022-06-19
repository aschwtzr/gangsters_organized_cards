const commercialBuildings = require('../data/commercial_buildings.csv')
const industrialBuildings = require('../data/industrial_buildings.csv')
const residentialBuildings = [{
  name: 'Tenement Block',
  map_max: 1200,
  income_min: 30,
  income_max: 100,
}]

const municipalBuildings = [{
  name: 'Municipal Building',
  map_max: 300,
  income_min: 0,
  income_max: 0,
}]

// Each block is either commercial, industrial or residential, plus one municipal block which contains city services (police, court, mayor, etc.)
// The map contains 144 blocks of which 143 are available.
export const blockTypes =  [
  { max: 10, name: 'Municipal', key: 'municipal', present: 0 },
  { max: 100, name: 'Residential', key: 'residential', present: 0 },
  { max: 90, name: 'Commercial', key: 'commercial', present: 0 },
  { max: 50, name: 'Industrial', key: 'industrial', present: 0 }
]

export function getBlockStoreDB(blockType) {
  switch (blockType) {
    case 'municipal':
      return municipalBuildings
    case 'residential':
      return residentialBuildings
    case 'commercial':
      return commercialBuildings
    case 'industrial':
      return industrialBuildings
  }
}