import { INVALID_MOVE } from 'boardgame.io/core';
import { randomInteger } from './simulation/utilities'
import { basePlayer } from './simulation/player'
import { blockTypes, getBlockStoreDB } from './simulation/board'
import { purchase } from './simulation/boardMoves';

function getInitialState(ctx) {
  const worldArea = 8
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
    hasRolled: false,
    worldArea,
    "0": { ...basePlayer },
    "1": { ...basePlayer },
    availableRecruits: {},
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
      G.hasRolled = true
      G[ctx.currentPlayer].moves = ctx.random.Die(6) + ctx.random.Die(6)
    },
    purchase: (G, ctx, income, hoods, blockId) => {
      const movedHoodIds = hoods.map(hood => hood.gId)
      const copy = {...G[ctx.currentPlayer].hoods}
      movedHoodIds.forEach(id => copy[id].moved = true)
      G[ctx.currentPlayer].hoods = copy
      G[ctx.currentPlayer].moves -= 1
      let success, price
      ({success, price} = purchase(income, hoods, (n) => (ctx.random.Die(n))))
      console.log(`SUCCESS: ${success}`)
      console.log(`PRICE: ${price}`)
      if (success) {
        G.cells[blockId] = {...G.cells[blockId], ...{owner: ctx.currentPlayer}}
        G[ctx.currentPlayer].money -= Math.floor(price)
      }
    },
    recruitHood: (G, ctx, data) => {
      const copy = {...G.availableRecruits}
      delete copy[data.gId]
      G.availableRecruits = copy
      G[ctx.currentPlayer].moves -= 1
      G[ctx.currentPlayer].money -= data.salary
      G[ctx.currentPlayer].hoods = {...G[ctx.currentPlayer].hoods, ...{[data.gId]: data}}
    },
    setAvailableRecruits: (G, ctx, hoods) => {
      G.availableRecruits = hoods
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
