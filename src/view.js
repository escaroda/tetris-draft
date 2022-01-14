class View {

  lineWidth = 2;

  /**
   * http://colorizer.org/
   */
  static colors = {
    1: '#36a9a1', // cyan
    2: '#3677a9', // blue
    3: '#a96836', // orange
    4: '#a9a136', // yellow
    5: '#77a936', // green
    6: '#6836a9', // purple
    7: '#a9363e', // red
  }

  constructor(element, blockWidth, blockHeight, rows, columns) {
    this.element = element;
    this.blockWidth = blockWidth;
    this.blockHeight = blockHeight;

    this.width = this.blockWidth * columns;
    this.height = this.blockHeight * rows;

    this.infoCanvas = document.createElement('canvas');
    this.infoCanvas.width = this.width;
    this.infoCanvas.height = this.height / 6;
    this.infoContext = this.infoCanvas.getContext('2d');

    this.canvas = document.createElement('canvas');
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.context = this.canvas.getContext('2d');

    this.element.appendChild(this.infoCanvas);
    this.element.appendChild(this.canvas);



  }

  render(game) {
    this.clearScreen();
    this.renderPlayfield(game.playfield);
    this.renderPiece(this.context, game.activePiece);
    this.renderInfoPanel(game)
  }

  clearScreen() {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  renderPlayfield(playfield) {
    for (let i = 0; i < playfield.length; i++) {
      const line = playfield[i];
      for (let j = 0; j < line.length; j++) {
        const block = line[j];
        if (block) this.renderBlock(this.context, j * this.blockWidth, i * this.blockHeight, View.colors[block]);
      }
    }
  }

  renderPiece(context, activePiece, shiftX = 0, shiftY = 0) {
    const { x, y, blocks } = activePiece;

    for (let i = 0; i < blocks.length; i++) {
      const line = blocks[i];
      for (let j = 0; j < line.length; j++) {
        const block = line[j];
        if (block) this.renderBlock(context, (j + x + shiftX) * this.blockWidth, (i + y + shiftY) * this.blockHeight, View.colors[block]);
      }
    }
  }

  renderBlock(context, x, y, color) {
    context.fillStyle = color;
    context.strokeStyle = '#111';
    context.lineWidth = this.lineWidth;

    context.fillRect(x, y, this.blockWidth, this.blockHeight);
    context.strokeRect(x, y, this.blockWidth, this.blockHeight);
  }

  renderInfoPanel({ level, score, lines, nextPiece }) {
    this.infoContext.clearRect(0, 0, this.width, this.height);
    
    this.infoContext.textAlign = 'start';
    this.infoContext.textBaseline = 'top';
    this.infoContext.fillStyle = '#bbbbbb';
    this.infoContext.font = 'bold 16px "Cascadia Code", Menlo, monospaced';
    
    this.infoContext.fillText(`Score ${score}`, 0, 0);
    this.infoContext.fillText(`Lines ${lines}`, 0, 20);
    this.infoContext.fillText(`Level ${level}`, 0, 40);

    this.renderPiece(this.infoContext, nextPiece, 3);
    
  }

}

export default View