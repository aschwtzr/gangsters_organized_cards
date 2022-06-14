import React from 'react';
import axios from 'axios';
import { randomInteger } from '../simulation/utilities'

const randomUserURL = 'https://randomuser.me/api/'

export default function Block(props) {
  const [personalInfo, setPersonalInfo] = React.useState(null)
  React.useEffect(() => {
    axios.get(randomUserURL).then(res => {
      const traits = {
        guns: randomInteger(10, 100),
        fists: randomInteger(30, 100),
        intelligence: randomInteger(10, 100),
        salary: 0
      }
      traits.salary = Math.floor((traits.guns * 1.2) + traits.fists + (traits.intelligence * 1.4) / 2)
      console.log({...res.data.results[0], ...traits})
      setPersonalInfo({...res.data.results[0], ...traits})
    })
  }, []);

  return(
    <div>
      {personalInfo ? ( 
      <div>
          <img src={personalInfo.picture.thumbnail} />
          <div>{personalInfo.name.first} {personalInfo.name.last}</div>
          <div>{personalInfo.dob.age} years-old</div>
          <div>{personalInfo.nat}</div>
          <div>Weekly Take: ${personalInfo.salary}</div>
          <div>Gun Handling: {personalInfo.guns}</div>
          <div>Fist Fightin': {personalInfo.fists}</div>
          <div>Intelligence: {personalInfo.intelligence}</div>
          <br/>
      </div>) : (<div/>)}
    </div>
  )
}