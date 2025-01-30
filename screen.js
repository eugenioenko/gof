class SvgScreen {
  constructor(svgId, width, height, cellWidth) {
    this.svgId = svgId;
    this.width = width;
    this.height = height;
    this.cellWidth = cellWidth;
    this.rects = new Array(this.width * this.height);
    const svgWidth = this.width * this.cellWidth;
    const svgHeight = this.height * this.cellWidth;

    this.svg = document.getElementById("svg");
    this.svg.setAttribute("width", svgWidth);
    this.svg.setAttribute("height", svgHeight);
    this.svg.setAttribute("viewBox", `0 0 ${svgWidth} ${svgHeight}`);
    this.svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    document.body.appendChild(svg);
    for (let x = 0; x < this.width; ++x) {
      for (let y = 0; y < this.height; ++y) {
        const rect = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "rect"
        );
        rect.setAttribute("x", `${x * cellWidth}`);
        rect.setAttribute("y", `${y * cellWidth}`);
        rect.setAttribute("width", `${cellWidth}`);
        rect.setAttribute("height", `${cellWidth}`);
        rect.setAttribute("fill", "#335");
        rect.setAttribute("id-x", x);
        rect.setAttribute("id-y", y);
        this.rects[this.getIndex(x, y)] = rect;
        this.svg.appendChild(rect);
      }
    }
  }

  getIndex(x, y) {
    return y * this.width + x;
  }

  pixel(x, y, value) {
    this.rects[this.getIndex(x, y)].setAttribute("fill", value);
  }

  circle(cx, cy, r) {
    let x = 0;
    let y = -r;
    let p = -r;
    while (x < -y) {
      if (p > 0) {
        y += 1;
        p += 2 * (x + y) + 1;
      } else {
        p += 2 * x + 1;
      }
      this.pixel(cx + x, cy + y, "#fff");
      this.pixel(cx - x, cy + y, "#fff");
      this.pixel(cx + x, cy - y, "#fff");
      this.pixel(cx - x, cy - y, "#fff");
      this.pixel(cx + y, cy + x, "#fff");
      this.pixel(cx + y, cy - x, "#fff");
      this.pixel(cx - y, cy + x, "#fff");
      this.pixel(cx - y, cy - x, "#fff");
      x += 1;
    }
  }

  randomize() {
    for (let i = 0; i < this.rects.length; ++i) {
      if (Math.random() > 0.95) {
        this.rects[i].setAttribute("fill", "#fff");
      }
    }
  }
}
