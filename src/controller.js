class Controller {
  constructor(game, view) {
    this.game = game;
    this.view = view;

    this.currentSpeed = this.game.speed;
    
    this.assignControls();

    this.view.render(this.game);
  }

  // startGame() {
  //   this.game.status = 1;
  //   this.view.render(this.game);
  //   this.timer = setInterval(() => {
  //     this.game.movePieceDown();
  //     this.view.render(this.game);
      
  //   }, this.currentSpeed)
  // }

  // pauseGame() {
  //   this.game.status = 2;
  //   clearInterval(this.timer);
  //   this.timer = null;
  //   this.view.render(this.game);
  // }
  
  // updateTimer() {
  //   clearInterval(this.timer);
  //   this.startGame();
  // }

  assignControls() {
    document.addEventListener('keydown', event => {
      // console.log(event.keyCode);
     

      switch (event.keyCode) {
        case 37:
          event.preventDefault();
          this.game.movePieceLeft();
          this.view.render(this.game);
          break;
        case 38:
          event.preventDefault();
          this.game.rotateClockwise();
          this.view.render(this.game);
          break;
        case 39:
          event.preventDefault();
          this.game.movePieceRight();
          this.view.render(this.game);
          break;
        case 40:
          event.preventDefault();
          this.game.movePieceDown();
          this.view.render(this.game);
          break;
        case 32: // Space
          event.preventDefault();
          this.game.movePieceDownAboveLock()
          this.view.render(this.game);
          break;
        case 13: // Enter
          event.preventDefault();
          console.log('enter')
          // if (!this.game.status) {
          //   this.startGame()
          // } else if (this.game.status === 1) {
          //   this.pauseGame()
          // } else {
          //   this.startGame() // resume
          // }
          // Start , Pause or Resume
          // view.render(game);
          break;
      }

      
    })
  }
}

export default Controller;