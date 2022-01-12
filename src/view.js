class View {
  constructor(element, width, height, rows, columns) {
    this.element = element;
    this.width = width;
    this.height = height;

    this.canvas = document.createElement('canvas');
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.context = this.canvas.getContext('2d');

    this.element.appendChild(this.canvas);

    this.blockWidth = this.width / columns;
    this.blockHeight = this.height / rows;

  }

  render(game) {
    this.clearScreen();
    this.renderPlayfield(game.playfield);
    this.renderActivePiece(game.activePiece)
  }

  clearScreen() {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  renderPlayfield(playfield) {
    for (let i = 0; i < playfield.length; i++) {
      const line = playfield[i];
      for (let j = 0; j < line.length; j++) {
        const block = line[j];
        if (block) this.renderBlock(j * this.blockWidth, i * this.blockHeight, 'red');
      }
    }
  }

  renderActivePiece(activePiece) {
    const { x, y, blocks } = activePiece;

    for (let i = 0; i < blocks.length; i++) {
      const line = blocks[i];
      for (let j = 0; j < line.length; j++) {
        const block = line[j];
        if (block) {
          this.renderBlock((j + x) * this.blockWidth, (i + y) * this.blockHeight, 'red');
          // this.playfield[i + y][j + x] = block;
        }
      }
    }
  }

  renderBlock(x, y, color) {
    this.context.fillStyle = color;
    this.context.strokeStyle = 'black';
    this.context.lineWidth = 2;

    this.context.fillRect(x, y, this.blockWidth, this.blockHeight);
    this.context.strokeRect(x, y, this.blockWidth, this.blockHeight);
  }

}

export default View