class particle {
  constructor(x, y, m, h, s, b, a) {
    this.pVec = createVector(x, y);
    this.nVec = createVector(random(1000), random(1000));
    this.vVec = createVector(0, 0);
    this.aVec = createVector(0, 0);
    this.m = m;
    this.col = color(h, s, b, a);

  }
  walk() {
    this.pVec.x = map(noise(this.nVec.x), 0, 1, 100, width-100);
    this.pVec.y = map(noise(this.nVec.y), 0, 1, 100, height-100);
    this.nVec.add(0.02, 0.02);
  }
  gravity(core) {
    this.gVec = p5.Vector.sub(core, this.pVec);
    this.aVec = this.gVec.mult(this.m).mult(0.001);
    this.vVec.add(this.aVec);
    this.pVec.add(this.vVec);
  }
  display() {
    fill(this.col);
    noStroke();
    ellipse(this.pVec.x, this.pVec.y, this.m * 50);
  }

}
