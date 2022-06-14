import React from 'react';
import Block from './components/Block.js';
import Hood from './components/Hood.js'

export function Board({ ctx, G, moves }) {
  const [availableRecruits, setAvailableRecruits] = React.useState(null)
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
            captureBlock={() => moves.captureBlock(block.id)} 
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
  const wrapperStyle ={
    display: 'flex',
    flexDirection: 'row'
  }

  const fillRecruits = () => {
    setAvailableRecruits([<Hood key='recruit-0'/>, <Hood key='recruit-1'/>, <Hood key='recruit-2'/>])
  }
  return (
    <div>
      <div style={wrapperStyle}>
        <table id="city_board" style={{backgroundColor: 'rgb(51, 50, 49)'}}>
          <tbody>{tbody}</tbody>
        </table>
        <div style={{...wrapperStyle, ...{flexDirection: 'column'}}}>
          <div id='actions_panel' style={{...wrapperStyle, width: ''}}>
            <button onClick={() => moves.rollDice()}>Roll Dice</button>
            <button onClick={() => fillRecruits()}>Recruit Hoods</button>
          </div>
          <div id='recruitment_panel' style={{...wrapperStyle, ...{flexDirection: 'column', paddingLeft: '1.5rem'}}}>
            {availableRecruits}
          </div>
        </div>
      </div>
    </div>
  );
}

