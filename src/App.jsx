import { hot } from 'react-hot-loader';

import { Board } from './Board';
import { Client } from 'boardgame.io/react';
import { GangstersOrganizedCards } from './Game';

const App = Client({ 
  game: GangstersOrganizedCards,
  board: Board,
 });

export default hot(module)(App);
