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
    get blocks() {
      return this.rotations[this.rotationIndex]
    },
    rotationIndex: 0,
    rotations: [
      [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 1, 0],
        [0, 1, 1],
        [0, 1, 0],
      ],
      [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0],
      ],
      [
        [0, 1, 0],
        [1, 1, 0],
        [0, 1, 0],
      ],
    ]
  }

  constructor() {
    for (let i = 0; i < this.playfieldHeight; i++) {
      this.playfield[i] = new Array(this.playfieldWidth).fill(0);
    }
  }

  clearPlayfield() {
    for (const line of this.playfield) {
      for (const j in line) {
        line[j] = 0;
      }
    }
  }

  movePieceLeft() {
    this.movePiece(-1, 0);
  }

  movePieceRight() {
    this.movePiece(1, 0);
  }

  movePieceDown() {
    this.movePiece(0, 1);
  }

  movePiece(deltaX = 0, deltaY = 0) {
    this.clearPlayfield();
    if (this.isValidMove(deltaX, deltaY)) {
      this.activePiece.x += deltaX;
      this.activePiece.y += deltaY;
    }
    this.drawPiece();
  }

  rotateClockwise() {
    this.activePiece.rotationIndex = (this.activePiece.rotationIndex + 1) % this.activePiece.rotations.length;
  }

  rotateCounterClockwise() {
    this.activePiece.rotationIndex = this.activePiece.rotationIndex ? this.activePiece.rotationIndex - 1 : this.activePiece.rotations.length - 1;
  }

  isNotValidMove(deltaX = 0, deltaY = 0) {
    const { x: originX, y: originY } = this.activePiece;
    const x = originX + deltaX;
    const y = originY + deltaY;
    const blocks = this.activePiece.blocks;

    for (let i = 0; i < blocks.length; i++) {
      const line = blocks[i];
      for (let j = 0; j < line.length; j++) {
        const block = line[j];
        if (block && (this.isOutOfBounds(x + j, y + i) || this.hasCollision(x + j, y + i))) return true
      }
    }
    return false
  }

  isValidMove(deltaX = 0, deltaY = 0) {
    return !this.isNotValidMove(deltaX, deltaY)
  }

  isOutOfBounds(x, y) {
    return x < 0 || x >= this.playfield[0].length || y >= this.playfield.length
  }

  hasCollision(x, y) {
    return this.playfield[y][x] !== 0
  }
  
  drawPiece() {
    const { x, y, blocks } = this.activePiece;

    for (let i = 0; i < blocks.length; i++) {
      const line = blocks[i];
      for (let j = 0; j < line.length; j++) {
        const block = line[j];
        if (block) this.playfield[i + y][j + x] = block;
      }
    }
  }

}

export default Game;
