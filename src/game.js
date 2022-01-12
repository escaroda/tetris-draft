import { pieces } from './pieces';

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
    const randomIndex = Math.floor(Math.random() * pieces.length);
    const { name, blocks } = pieces[randomIndex];
    const piece = { name, blocks };
    piece.x = Math.floor((this.playfieldWidth - blocks[0].length) / 2)
    piece.y = 0;

    return piece;
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

  movePieceLeft(deltaX = -1) {
    this.movePiece(deltaX, 0);
  }

  movePieceRight(deltaX = 1) {
    this.movePiece(deltaX, 0);
  }

  movePieceDown(deltaY = 1) {
    this.movePiece(0, deltaY);
  }

  movePieceDownAboveLock(deltaY = 1) {
    let moveDown = deltaY;
    while (this.isValidMove(0, moveDown)) {
      moveDown++
    }
    this.activePiece.y += moveDown - 1;
  }

  movePieceDownUntilLock(deltaY = 1) {
    while (this.isValidMove(0, deltaY)) {
      this.activePiece.y += 1;
    }
  }

  movePiece(deltaX = 0, deltaY = 0) {
    if (this.isValidMove(deltaX, deltaY)) {
      this.activePiece.x += deltaX;
      this.activePiece.y += deltaY;
    }
  }

  rotateClockwise() {
    if (this.activePiece.name !== 'O') { // Don't rotate square?
      const rotatedBlocks = this.activePiece.blocks[0].map((val, index) => this.activePiece.blocks.map(row => row[index]).reverse());

      if (this.isValidMove(0, 0, rotatedBlocks)) {
        this.activePiece.blocks = rotatedBlocks;
      }
    }
  }

  isNotValidMove(deltaX = 0, deltaY = 0, blocks = this.activePiece.blocks) {
    const { x: originX, y: originY } = this.activePiece;
    const x = originX + deltaX;
    const y = originY + deltaY;

    // TODO: Check rotations separately to jump(shift) out of bounds & collisions? 

    for (let i = 0; i < blocks.length; i++) {
      const line = blocks[i];
      for (let j = 0; j < line.length; j++) {
        const block = line[j];
        if (block && (this.isOutOfBounds(x + j, y + i) || this.hasCollision(x + j, y + i, !!deltaY, deltaY === 1))) return true
      }
    }
    return false
  }

  isValidMove(deltaX = 0, deltaY = 0, blocks = this.activePiece.blocks) {
    return !this.isNotValidMove(deltaX, deltaY, blocks)
  }

  isOutOfBounds(x, y) {
    return x < 0 || x >= this.playfield[0].length;
  }

  hasCollision(x, y, isMoveDown, doLockActivePiece) { // doLockActivePiece is needed for movePieceDownAboveLock
    const hasCollision = y >= this.playfield.length || this.playfield[y][x] !== 0;
    if (hasCollision && isMoveDown && doLockActivePiece) this.lockActivePiece();
    return hasCollision
  }
  
}

export default Game;
