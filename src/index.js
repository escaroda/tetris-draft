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
  // console.log(event.keyCode);
  switch (event.keyCode) {
    case 37:
      event.preventDefault();
      game.movePieceLeft();
      view.render(game);
      break;
    case 38:
      event.preventDefault();
      game.rotateClockwise();
      view.render(game);
      break;
    case 39:
      event.preventDefault();
      game.movePieceRight();
      view.render(game);
      break;
    case 40:
      event.preventDefault();
      game.movePieceDown();
      view.render(game);
      break;
    case 32: // Space
      event.preventDefault();
      game.movePieceDownAboveLock()
      view.render(game);
  }
})

