import React from 'react';
import Block from './components/Block.js';

export function Board({ ctx, G, moves }) {
  let winner = '';
  if (ctx.gameover) {
    winner =
      ctx.gameover.winner !== undefined ? (
        <div id="winner">Winner: {ctx.gameover.winner}</div>
      ) : (
        <div id="winner">Draw!</div>
      );
  }

  let tbody = [];
  let blockIdx = 0
  if (G.cells.length) {
    for (let i = 0; i < G.worldArea; i++) {
      let cells = []
      for (let j = 0; j < G.worldArea; j++) {
        let block = G.cells[blockIdx]
        cells.push(
          <Block
            owner={block.owner}
            onClick={(id) => moves.clickCell(block.id)} 
            id={block.id}
            key={`block_${block.id}`}
            stores={block.stores}
            type={block.name}
          />
        );
        blockIdx++
      }
      tbody.push(<tr key={`city_row_${i}`}>{cells}</tr>);
    }
  }

  return (
    <div>
      <table id="board">
        <tbody>{tbody}</tbody>
      </table>
      <button>Seed World</button>
      {winner}
    </div>
  );
}

