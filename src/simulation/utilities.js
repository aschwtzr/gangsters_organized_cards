import axios from 'axios';

const randomUserURL = 'https://randomuser.me/api/'

export function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min ) + min);
}

export function normalizeHoodTraits(randomUserJSON) {
}

export function randomHood() {
  return new Promise((resolve, reject) => {
    axios.get(randomUserURL).then(res => {
      const traits = {
        guns: randomInteger(10, 100),
        fists: randomInteger(30, 100),
        intelligence: randomInteger(10, 100),
        salary: 0
      }
      traits.salary = Math.floor((traits.guns * 1.2) + traits.fists + (traits.intelligence * 1.4) / 2)
      resolve({...res.data.results[0], ...traits})
    }).catch(e => reject(e))
  })
}

export function makeHood() {

}