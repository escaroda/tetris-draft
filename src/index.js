import "./index.css";
import Game from './game';
import View from './view';

const root = document.querySelector('#root');

const game = new Game();
const view = new View(root, 320, 640, 20, 10);

window.game = game;
window.view = view;
view.render(game);

document.addEventListener('keydown', event => {
  event.preventDefault();
  switch (event.keyCode) {
    case 37:
      game.movePieceLeft();
      view.render(game);
      break;
    case 38:
      game.rotateClockwise();
      view.render(game);
      break;
    case 39:
      game.movePieceRight();
      view.render(game);
      break;
    case 40:
      game.movePieceDown();
      view.render(game);
      break;
  }
})

