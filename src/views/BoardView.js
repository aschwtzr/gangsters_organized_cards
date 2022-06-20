import React from 'react';
import { playerPower } from '../simulation/player';
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
  const [selectedIds, setSelectedIds] = React.useState([])
  
  const selectedHoods = () => {
    const filtered = Object.entries(currentPlayer.hoods).filter(val => selectedIds.includes(val[0]))
    return filtered.map(arr => arr[1])
  }

  const toggleSelected = (id) => {
    const copy = [...selectedIds]
    if (copy.includes(id)) {
      copy.splice(copy.indexOf(id), 1)
    } else copy.push(id)
    setSelectedIds(copy)
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
            <button disabled={shouldDisable(1, currentMoves)} onClick={() => props.purchase(totalIncome, selectedHoods(), props.selectedBlock.id)}>Purchase</button>
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
          <HoodTable hoods={Object.values(currentPlayer.hoods)} action={(id) => toggleSelected(`${id}`)} buttonTitle={(id) => (selectedIds.includes(`${id}`) ? 'Unassign' : 'Assign')}/>
        </div>
      </div>
    </div>
  )
}