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
    
    if (this.isNotValidMove(0, 0, this.nextPiece)) {
      console.log('GAME OVER');
    } else {
      this.activePiece = this.nextPiece; // TODO: Check if nextPiece(activePiece) has collisions
      this.nextPiece = this.createPiece();
    }
  }

  lockActivePiece() {
    const { x, y, blocks } = this.activePiece;

    for (let i = 0; i < blocks.length; i++) {
      const line = blocks[i];
      for (let j = 0; j < line.length; j++) {
        const block = line[j];
        if (block) this.playfield[i + y][j + x] = block;
      }
    }
    this.removeSolidLines();
    this.nextActivePiece();
  }

  removeSolidLines() {
    const linesToRemove = [];
    for (const lineIndex in this.playfield) {
      if (!~this.playfield[lineIndex].indexOf(0)) linesToRemove.push(lineIndex) // Remove if there is no zeros
    }

    if (linesToRemove.length) {
      const linesToAdd = []

      while (linesToRemove.length) {
        this.playfield.splice(linesToRemove.pop(), 1)
        linesToAdd.push(new Array(this.playfieldWidth).fill(0))
      }
      this.playfield.unshift(...linesToAdd);
      this.updateScore(linesToAdd.length);
    }
    
  }

  updateScore(removedLines) {
    this.lines += removedLines;
    this.level = Math.floor(this.lines * 0.1);
    this.score += 19 * Math.pow(removedLines, 2) * (this.level + 1);
    console.log('state', this.lines, this.score, this.level);
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

  isNotValidMove(deltaX = 0, deltaY = 0, piece = this.activePiece) {
    const { x: originX, y: originY, blocks } = piece;
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

  isValidMove(deltaX = 0, deltaY = 0, piece = this.activePiece) {
    return !this.isNotValidMove(deltaX, deltaY, piece)
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
