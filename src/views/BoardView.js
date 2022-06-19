import React from 'react';
import { playerPower } from '../simulation/player'
import Hood from '../components/Hood.js';

const wrapperStyle ={
  display: 'flex',
  flexDirection: 'row'
}

const shouldDisable = (requiredMoves, currentMoves) => { requiredMoves <= currentMoves}

export default function BoardView(props) {
  let currentMoves = props.currentMoves
  let currentPlayer = props.currentPlayer
  let owner = props.selectedBlock ? props.selectedBlock.owner : ''
  console.log(currentPlayer)
  
  return (
    <div>
      <div>
        <div>Stats</div>
        <div>Player Power: {playerPower(currentPlayer.hoods, currentPlayer.respect, currentPlayer.personalCash, currentPlayer.suspicion)} </div>
        <div>Personal Cash: {currentPlayer.personalCash} </div>
      </div>
      <div>
        <div>
          Hoods
        </div>
        <div>
          {currentPlayer.hoods.map((data, idx) => {
            return <Hood key={`board_view_hood_${idx}`} info={data} recruit={() => () => {}} owned={true} />          
          })}
        </div>
      </div>
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