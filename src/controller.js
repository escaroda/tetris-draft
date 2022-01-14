class Controller {
  constructor(game, view) {
    this.game = game;
    this.view = view;
    
    this.assignControls();

    view.render(game);
  }

  startGame() {
    this.timer = setInterval(() => {
      this.game.movePieceDown();
      this.view.render(this.game);
    }, this.game.speed)
  }

  pauseGame() {
    clearInterval(this.timer);
    this.timer = null;
  }
  
  updateTimer() {
    clearInterval(this.timer);
    this.startGame();
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