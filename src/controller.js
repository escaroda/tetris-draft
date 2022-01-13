class Controller {
  constructor(game, view) {
    this.game = game;
    this.view = view;

    // setInterval(() => {
    //   this.game.movePieceDown();
    //   this.view.render(game);
    // }, 1000)
    
    this.assignControls();

    view.render(game);
  }

  assignControls() {
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
        case 13: // Enter
          event.preventDefault();
          // Start , Pause or Resume
          view.render(game);
      }
    })
  }
}

export default Controller;