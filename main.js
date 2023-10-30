const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

// Figured out how to make <canvas> responsive down below.

function setUpCanvas() {
  // update dimensions
  canvas.width = canvas.clientWidth; //
  canvas.height = canvas.width;

  return canvas.width;
}

// All the Event Listeners

window.addEventListener('resize', () => {
  console.log(canvas.clientWidth);
  console.log(canvas.width);
  // add all the render functions inside this resize event listener.
  setUpCanvas();
  grid.resize();
  grid.render();
});

setUpCanvas(); // render the canvas for the first time

const mouse = {
  // track the mouse postions for interactivity
  x: undefined,
  y: undefined,
};
canvas.addEventListener('mousemove', (event) => {
  mouse.x = event.layerX;
  mouse.y = event.layerY;
  console.log('mousemoving');
  grid.render();
});

const grid = {
  size: 9,
  squares: [],
  squareSize: () => {
    setUpCanvas(); // When we add interaction, this should be inside the for loops, so that they update as they move.
    let ss = canvas.width / grid.size;
    return ss;
  },
  create: function () {
    for (let i = 0; i < this.size; i++) {
      let row = [];
      for (let j = 0; j < this.size; j++) {
        let s = new Square(
          j * this.squareSize(), // x
          i * this.squareSize(), // y
          this.squareSize(), //  size
          'black' // color
        );
        this.squares.push(s);
      }
    }
    console.log(this.squares[0]);
    this.render();
  },
  render: function () {
    for (let s of this.squares) {
      s.update();
    }
  },
  resize: function () {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        const index = i * this.size + j;
        this.squares[index].x = j * this.squareSize();
        this.squares[index].y = i * this.squareSize();
      }
    }
    for (let s of this.squares) {
      s.size = this.squareSize();
    }

    this.render();
  },
};

grid.create();
grid.originalSize = grid.squareSize();

// ELEMENTS IN CANVAS

function Square(x, y, size, color) {
  this.x = x;
  this.y = y;
  this.originalX = this.x;
  this.originalY = this.y;
  this.size = size;
  this.color = color;
  this.dx = 1;
  this.dy = 1;
  this.ds = 1;
  this.draw = () => {
    c.fillStyle = this.color;
    c.fillRect(this.x, this.y, this.size, this.size);
    c.fill();
  };
  this.update = () => {
    // if (size <= 200) {
    //   this.size += this.ds;
    // }
    if (
      mouse.x > this.x &&
      mouse.x < this.x + this.size &&
      mouse.y > this.y &&
      mouse.y < this.y + this.size
    ) {
      this.color = 'white';
    } else {
      //this.color = 'black';
    }
    this.draw();
  };
}
