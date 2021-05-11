// ml5.js: Pose Classification
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/learning/ml5/7.2-pose-classification.html
// https://youtu.be/FYgYyq-xqAw

// All code: https://editor.p5js.org/codingtrain/sketches/JoZl-QRPK

// Separated into three sketches
// 1: Data Collection: https://editor.p5js.org/codingtrain/sketches/kTM0Gm-1q
// 2: Model Training: https://editor.p5js.org/codingtrain/sketches/-Ywq20rM9
// 3: Model Deployment: https://editor.p5js.org/codingtrain/sketches/c5sDNr8eM

let brain;

function setup() {
  createCanvas(1000, 1000);
  let options_train = {
    inputs: 34,
    outputs: 2,
    task: 'classification',
    debug: true
  }
  brain = ml5.neuralNetwork(options_train);
  brain.loadData('./data/classify_yoga.json', dataReady);
}

function dataReady() {
  brain.normalizeData();
  console.log('normalize');
  brain.train({epochs: 50}, finished); 
  console.log('train');
}

function finished() {
  console.log('model trained');
  brain.save();
}