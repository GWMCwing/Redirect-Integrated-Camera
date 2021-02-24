let capture;

function setup() {
  createCanvas(400, 400);
  frameRate(60);
  // obj = { x: 1, y: 2 };
  capture = createCapture(VIDEO);
  capture.size(400, 400);

  capture.hide();
}

function draw() {
  background(0);
  // $.get('192.168.8.6:5000', JSON.stringify(obj), () => console.log('recieved'));
  image(capture, 0, 0);
}

async function sendImg() {
  let data = 1;
  img = capture.loadPixels();
  fetch('/cameraData.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  console.log(JSON.stringify(data));
}
