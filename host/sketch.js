function setup() {
  createCanvas(400, 400);
  console.log('open: ');
  // ws = new WebSocket('ws://192.168.8.6:8001');
}

// ws.onopen = function (event) {
//   console.log('connection open');
//   ws.send('hello server');
// };

async function getdata() {
  const data = await fetch('192.168.8.6:8001/data.json').catch((error) => {
    console.log('abc');
    console.error(error);
  });
  console.log(data);
}

function draw() {
  background(220);
  // requestData();
}
