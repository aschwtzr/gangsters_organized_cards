import React from 'react';
import { hoodIntimiditation } from '../simulation/player'
export default function Hood(props) {
  const [recruited, setRecruited] = React.useState(false)

  // adds the hood to the player's gang and hides the card from view
  const recruitSelf = () => {
    props.recruit(props.info)
    setRecruited(true)
  }

  const intimiditation = hoodIntimiditation(props.info.guns, props.info.fists, props.info.intelligence)
  console.log(props.info && !recruited)
  return(
    <div>
      {props.info && !recruited ? ( 
      <div>
          <img src={props.info.picture.thumbnail} />
          <div>{props.info.name.first} {props.info.name.last}</div>
          <div>{props.info.dob.age} years-old</div>
          <div>{props.info.nat}</div>
          <div>Weekly Take: ${props.info.salary}</div>
          <div>Gun Handling: {props.info.guns}</div>
          <div>Fist Fightin': {props.info.fists}</div>
          <div>Intelligence: {props.info.intelligence}</div>
          <div>Intimidation: {intimiditation}</div>
          { recruited || props.owned ? '' : <button onClick={() => recruitSelf()}>Recruit</button> }          
          <br/>
      </div>) : (<div/>)}
    </div>
  )
}