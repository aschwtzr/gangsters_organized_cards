import React from 'react';
import { playerPower } from '../simulation/player';
import Hood from '../components/Hood.js';
import { purchase } from '../simulation/boardMoves';
import HoodTable from '../components/HoodTable'

const wrapperStyle ={
  display: 'flex',
  flexDirection: 'row'
}

const shouldDisable = (requiredMoves, currentMoves) => { requiredMoves <= currentMoves}

export default function BoardView(props) {
  let currentMoves = props.currentMoves
  let currentPlayer = props.currentPlayer
  let owner = props.selectedBlock ? props.selectedBlock.owner : ''
  const totalIncome = props.selectedBlock ? props.selectedBlock.stores.reduce((sum, curr) => (sum += curr.income), 0) : []
  const [selected, setSelected] = React.useState([])
  // const toggleSelected = ()
  
  const selectedHoods = () => {
    const filtered = Object.entries(currentPlayer.hoods).filter(val => selected.includes(parseInt(val[0])))
    console.log(filtered)
    return filtered.map(arr => arr[1])
  }

  const select = (id) => {
    const copy = [...selected]
    copy.push(id)
    setSelected(copy)
  }

  return (
    <div>
      <div>
        <div>Stats</div>
        <div>Player Power: {playerPower(currentPlayer.hoods, currentPlayer.respect, currentPlayer.personalCash, currentPlayer.suspicion)} </div>
        <div>Personal Cash: {currentPlayer.personalCash} </div>
        <div>Money: {currentPlayer.money} </div>
      </div>
      {props.selectedBlock ? 
        <div id="current_block">
          <br/><br/>
          <div>Type: {props.selectedBlock.name}</div>
          <div>Total Income: ${totalIncome}</div>
          <div>Owner: {owner}</div>
          <div>Stores</div>
          <div> 
            {props.selectedBlock.stores.map((val, idx) => (<div key={`boardview_store_${idx}`}>{val.name}: ${val.income}</div>))}
          </div>
          <div id='block_actions_panel' style={{...wrapperStyle, width: ''}}>
            <button disabled={shouldDisable(1, currentMoves)} onClick={() => purchase(totalIncome, selected)} >Purchase</button>
            <button disabled={shouldDisable(2, currentMoves)} onClick={() => (console.log('ATTACK'))}>Attack</button>
            <button disabled={shouldDisable(1, currentMoves) && (owner === currentPlayer)} onClick={() => (console.log('PURCHASE'))} >Illegal</button>
            <button disabled={shouldDisable(1, currentMoves)} onClick={() => (console.log('PURCHASE'))} >Boost Defense</button>
            <button disabled={shouldDisable(1, currentMoves)} onClick={() => (console.log('PURCHASE'))} >Extort</button>
          </div>
          <div>
            <div>Selected</div>
            <HoodTable hoods={selectedHoods()}  />
          </div>
        </div> : <div></div>}
      <div>
        <br/><br/>
        <div>
          Hoods
        </div>
        <div>
          <HoodTable hoods={Object.values(currentPlayer.hoods)} action={(id) => select(id)} buttonTitle={'Recruit to Mission'}/>
        </div>
      </div>
    </div>
  )
}