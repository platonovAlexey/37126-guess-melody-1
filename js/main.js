import {showScreen} from './util.js';
import {SCREENS as screen} from "./data/game-data";
import welcome from './gameplay/welcome';

showScreen(welcome(screen.welcome));
