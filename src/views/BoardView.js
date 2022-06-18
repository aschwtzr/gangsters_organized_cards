import React from 'react';

const wrapperStyle ={
  display: 'flex',
  flexDirection: 'row'
}

const shouldDisable = (requiredMoves, currentMoves) => { requiredMoves <= currentMoves}

export default function RecruitBoard(props) {
  let currentMoves = props.currentMoves
  let owner = props.selectedBlock.owner
  
  return (
    <div>
      {props.selectedBlock ? 
        <div id="current_block">
          <div>Type: {props.selectedBlock.name}</div>
          <div>Total Income: ${props.selectedBlock.stores.reduce((sum, curr) => (sum += curr.income), 0)}</div>
          <div>Owner: {owner}</div>
          <div>Stores</div>
          <div> 
            {props.selectedBlock.stores.map((val, idx) => (<div key={`boardview_store_${idx}`}>{val.name}: ${val.income}</div>))}
          </div>
          <div id='block_actions_panel' style={{...wrapperStyle, width: ''}}>
            <button disabled={shouldDisable(2, currentMoves)} onClick={() => (console.log('ATTACK'))}>Attack</button>
            <button disabled={shouldDisable(1, currentMoves)} onClick={() => (console.log('PURCHASE'))} >Purchase</button>
            <button disabled={shouldDisable(1, currentMoves) && (owner === currentPlayer)} onClick={() => (console.log('PURCHASE'))} >Illegal</button>
            <button disabled={shouldDisable(1, currentMoves)} onClick={() => (console.log('PURCHASE'))} >Boost Defense</button>
            <button disabled={shouldDisable(1, currentMoves)} onClick={() => (console.log('PURCHASE'))} >Protect</button>
          </div>
        </div> : <div></div>}
    </div>
  )
}