import React from 'react';
import Block from '../components/Block';

export default function CityView(props) {
  const selectBlockAndSetView = (block) => {
    props.setSelectedBlock(block)
    props.setCurrentView('board')
  }
  let tbody = [];
  let blockIdx = 0
  if (props.cells.length) {
    for (let i = 0; i < props.worldArea; i++) {
      let cells = []
      for (let j = 0; j < props.worldArea; j++) {
        let block = props.cells[blockIdx]
        cells.push(
          <Block
            owner={block.owner}
            captureBlock={() => props.captureBlock(block.id)}
            selectBlock={() => selectBlockAndSetView(block)}
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

  return(
    <table id="city_board" style={{backgroundColor: 'rgb(51, 50, 49)'}}>
      <tbody>{tbody}</tbody>
    </table>
  )
}