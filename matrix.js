export class Matrix {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.array = new Uint8Array(width * height);
  }

  get(x, y) {
    return this.array[y * this.width + x];
  }

  set(x, y, value) {
    this.array[y * this.width + x] = value;
  }

  load(array) {
    this.array = new Uint16Array(array);
  }

  randomize() {
    for (let i = 0; i < this.array.length; ++i) {
      this.array[i] = Maths.rand(0, 3);
    }
  }
}
