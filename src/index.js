import "./index.css";
import Game from './game';
import View from './view';
import Controller from './controller';


const game = new Game();
const view = new View(document.body, 24, 24, 20, 10);
const controller = new Controller(game, view);

window.game = game;
window.view = view;
window.controller = controller;

