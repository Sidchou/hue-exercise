function draw() {
  // background(220);
  p[0].walk();
  p[0].display(0, 0, 30, 80, 24);
  for (let i = 1; i < 20; i++) {
    p[i].gravity(p[0].pVec);
    p[i].display();
  }
  img = get(200, 200);
  // console.log(img);
  let col = colorConv(img[0], img[1], img[2])

  // img.loadPixels();
  //   console.log(img.pixels[1280000],img.pixels[1280001],img.pixels[1280002])
  if (frameCount % 90 == 0){
    if (connection ==true){
    // background(80,0.1);
    // setLight();



    // let value = event.target.value;					// get the value

    // make a new payload:
    let payload = {};
    // put the value for the given control into the payload:
    payload = {"hue": Number(floor(col[0])),
		"sat": Number(floor(col[1])),
		"bri": Number(floor(col[2]))};


    setLight(4, payload, 'state');	// make the HTTP call
    console.log(col[0],col[1],col[2])}

}

// class particle {
//   constructor(x, y, m, h, s, b, a) {
//     this.pVec = createVector(x, y);
//     this.nVec = createVector(random(1000), random(1000));
//     this.vVec = createVector(0, 0);
//     this.aVec = createVector(0, 0);
//     this.m = m;
//     this.col = color(h, s, b, a);
//
//   }
//   walk() {
//     this.pVec.x = map(noise(this.nVec.x), 0, 1, 0, width);
//     this.pVec.y = map(noise(this.nVec.y), 0, 1, 0, height);
//     this.nVec.add(0.02, 0.02);
//   }
//   gravity(core) {
//     this.gVec = p5.Vector.sub(core, this.pVec);
//     this.aVec = this.gVec.mult(this.m).mult(0.001);
//     this.vVec.add(this.aVec);
//     this.pVec.add(this.vVec);
//   }
//   display() {
//     fill(this.col);
//     noStroke();
//     ellipse(this.pVec.x, this.pVec.y, this.m * 16);
//   }
//
}

function colorConv(r, g, b) {
  r = r / 255;
  g = g / 255;
  b = b / 255;
  let minRGB = Math.min(r, Math.min(g, b));
  let maxRGB = Math.max(r, Math.max(g, b));

  // Black-gray-white
  if (minRGB == maxRGB) {
    computedV = minRGB;
    return [0, 0, computedV];
  }

  // Colors other than black-gray-white:
  let d = (r == minRGB) ? g - b : ((b == minRGB) ? r - g : b - r);
  let h = (r == minRGB) ? 3 : ((b == minRGB) ? 1 : 5);
  computedH = 60 * (h - d / (maxRGB - minRGB));
  computedH = map(computedH,0,360,0,65535)
  computedS = (maxRGB - minRGB) / maxRGB *250;
  if (computedS > 250 ) {computedS=250}
  computedV = maxRGB *250;
  if (computedV > 250 ) {computedV=250}
  return [computedH, computedS, computedV];
}
