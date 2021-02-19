let capture;

function setup() {
  createCanvas(400, 400);
  frameRate(60);
  // obj = { x: 1, y: 2 };
  capture = createCapture(VIDEO);
  // img = loadImage(capture.get(0, 0, 100, 100));
  capture.size(400, 400);
  capture.hide();
}

function draw() {
  background(0);
  // $.get('192.168.8.6:5000', JSON.stringify(obj), () => console.log('recieved'));
  image(capture, 0, 0);
}
