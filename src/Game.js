import { INVALID_MOVE } from 'boardgame.io/core';
import { randomInteger } from './simulation/utilities'
const commercialBuildings = require('./data/commercial_buildings.csv')
const industrialBuildings = require('./data/industrial_buildings.csv')
const residentialBuildings = [{
  name: 'Tenement Block',
  map_max: 1200,
  income_min: 50,
  income_max: 150,
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

function getBlockStoreDB(blockType) {
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

function getInitialState(ctx) {
  const worldArea = 9
  const blocks = Array(worldArea * worldArea).fill(null).map((val, arrIdx) => {
    let idx = ctx.random.Die(4) - 1
    let tryBlock = {}
    do {
      tryBlock = blockTypes[idx]
      // if there are blocks left push one into the array
      if (tryBlock.present < tryBlock.max) {
        blockTypes[idx].present += 1
        let storesDB = getBlockStoreDB(tryBlock.key)
        const stores = Array(8).fill(null).map(() => {
          const idx = Math.floor(Math.random() * (storesDB.length - 1 + 1)) + 0;
          return {name: storesDB[idx].name, income: randomInteger(storesDB[idx].income_min, storesDB[idx].income_max) }
        })
        // console.log(`Block ${arrIdx} bldg idx ${idx} max: ${tryBlock.max} present: ${tryBlock.present} name: ${tryBlock.name}`)
        return { ...blockTypes[idx], owner: null, id: arrIdx, stores }
        
        // otherwise change the die
      } else idx = ctx.random.Die(4) - 1 
    } while (tryBlock.present >= tryBlock.max)
  })
  const G = {
    cells: blocks,
    worldArea,
    "0": {
      suspicion: 0,
      power: 10,
      money: 400,
      moves: 0,
    },
    "1": {
      suspicion: 0,
      power: 10,
      money: 400,
      moves: 0,
    },
  }
  return G;
}

export const GangstersOrganizedCards = {
  setup: getInitialState,
  
  turn: {
    minMoves: 1,
    maxMoves: (G, ctx) => (G[ctx.currentPlayer].moves <= 0),
  },

  moves: {
    captureBlock: (G, ctx, id) => {
      if (G.cells[id].owner !== null) {
        return INVALID_MOVE;
      }
      G.cells[id] = {...G.cells[id], ...{owner: ctx.currentPlayer}}
    },
    rollDice: (G, ctx) => {
      G[ctx.currentPlayer].moves = ctx.random.Die(6) + ctx.random.Die(6)
    }
  },
  
  endIf: (G, ctx) => {
    if (IsVictory(G.cells)) {
      return { winner: ctx.currentPlayer };
    }
    if (IsDraw(G.cells)) {
      return { draw: true };
    }
  },

  ai: {
    enumerate: (G, ctx) => {
      let moves = [];
      for (let i = 0; i < 9; i++) {
        if (G.cells[i] === null) {
          moves.push({ move: 'clickCell', args: [i] });
        }
      }
      return moves;
    },
  },
};

// Return true if `cells` is in a winning configuration.
function IsVictory(cells) {
  const positions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
    [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
  ];

  const isRowComplete = row => {
    const symbols = row.map(i => cells[i]);
    return symbols.every(i => i !== null && i === symbols[0]);
  };

  return positions.map(isRowComplete).some(i => i === true);
}

// Return true if all `cells` are occupied.
function IsDraw(cells) {
  return cells.filter(c => c.owner === null).length === 0;
}
