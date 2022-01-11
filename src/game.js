class Game {
  score = 0;
  lines = 0;
  level = 0;
  playfieldWidth = 10;
  playfieldHeight = 20;
  playfield = [];
  activePiece = {
    x: 0,
    y: 0,
    blocks: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]
  }

  constructor() {
    for (let i = 0; i < this.playfieldHeight; i++) {
      this.playfield[i] = new Array(this.playfieldWidth).fill(0);
    }
  }

  movePieceLeft() {
    if (this.isValidMove(-1)) {
      this.activePiece.x -= 1;
    }
  }

  movePieceRight() {
    if (this.isValidMove(1)) {
      this.activePiece.x += 1;
    }
  }

  movePieceDown() {
    if (this.isValidMove(0, 1)) {
      this.activePiece.y += 1;
    }
  }

  isNotValidMove(deltaX = 0, deltaY = 0) {
    const { x: originX, y: originY } = this.activePiece;
    const x = originX + deltaX;
    const y = originY + deltaY;
    return x < 0 || x >= this.playfield[0].length || y >= this.playfield.length
  }

  isValidMove(deltaX = 0, deltaY = 0) {
    return !this.isNotValidMove(deltaX, deltaY)
  }

  isOutOfBounds() {
    const { x, y } = this.activePiece;
    return x < 0 || x > this.playfield[0].length || y > this.playfield.length; // FIXME: Last rule not needed
  }


}

export default Game;
