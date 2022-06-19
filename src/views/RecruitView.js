import React from 'react';
import Hood from '../components/Hood.js';

export default function RecruitBoard(props) {
  return (
    <div>
      <div>{props.name}</div>
      {props.availableRecruits.length ? 
      <div>
        {props.availableRecruits.map((data, idx) => {
          return <Hood key={`recruit_board_hood_${idx}`} info={data} recruit={() => props.recruit({data, idx})} player={props.player} />
        })}
      </div> : <div />}
      <button onClick={() => fetchRecruits()}>Get New Roster</button>
    </div>
  )
}