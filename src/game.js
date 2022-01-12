class Game {
  score = 0;
  lines = 0;
  level = 0;
  playfieldWidth = 10;
  playfieldHeight = 20;

  constructor() {
    this.activePiece = this.createPiece();
    this.nextPiece = this.createPiece();
    this.playfield = this.createPlayfield();
  }

  createPlayfield() {
    const playfield = [];
    for (let i = 0; i < this.playfieldHeight; i++) {
      playfield[i] = new Array(this.playfieldWidth).fill(0);
    }
    return playfield
  }

  createPiece() {
    return {
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
      ],
    };
  }

  nextActivePiece() {
    this.activePiece = this.nextPiece;
    this.nextPiece = this.createPiece();
  }

  lockActivePiece() {
    console.log('hasCollision', 'lockActivePiece')
    const { x, y, blocks } = this.activePiece;

    for (let i = 0; i < blocks.length; i++) {
      const line = blocks[i];
      for (let j = 0; j < line.length; j++) {
        const block = line[j];
        if (block) this.playfield[i + y][j + x] = block;
      }
    }
    this.nextActivePiece();
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
    if (this.isValidMove(deltaX, deltaY)) {
      this.activePiece.x += deltaX;
      this.activePiece.y += deltaY;
    }
  }

  rotateClockwise() {
    if (this.isValidMove(0, 0, 1)) {
      const rotationIndex = (this.activePiece.rotationIndex + 1) % this.activePiece.rotations.length;
      this.activePiece.rotationIndex = rotationIndex;
    }
  }

  isNotValidMove(deltaX = 0, deltaY = 0, deltaRotation = 0) {
    const { x: originX, y: originY } = this.activePiece;
    const x = originX + deltaX;
    const y = originY + deltaY;

    // TODO: Check rotations separately to jump(shift) out of collisions? 
    const blocks = this.activePiece.rotations[(this.activePiece.rotationIndex + deltaRotation) % this.activePiece.rotations.length];

    for (let i = 0; i < blocks.length; i++) {
      const line = blocks[i];
      for (let j = 0; j < line.length; j++) {
        const block = line[j];
        if (block && (this.isOutOfBounds(x + j, y + i) || this.hasCollision(x + j, y + i))) return true
      }
    }
    return false
  }

  isValidMove(deltaX = 0, deltaY = 0, deltaRotation = 0) {
    return !this.isNotValidMove(deltaX, deltaY, deltaRotation)
  }

  isOutOfBounds(x, y) {
    return x < 0 || x >= this.playfield[0].length;
  }

  hasCollision(x, y) {
    const hasCollision = y >= this.playfield.length || this.playfield[y][x] !== 0;
    if (hasCollision) {
      this.lockActivePiece()
    }
    return hasCollision
  }
  
}

export default Game;
