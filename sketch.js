var cities = [];
var totalCities = 40;

var popSize = 500;
var fitness = [];

var population = [];
var recordDistance = Infinity;
var genCounter = 0;
var bestEver;
var currentBest;

var statusP;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  var order = [];
  for (var i = 0; i < totalCities; i++) {
    var v = createVector(random(width), random(height/3));
    cities[i] = v;
    order[i] = i;
  }

  for (let i = 0; i < popSize; i++) {
    population[i] = shuffle(order);
  }
  statusP = createP('').style('font-size', '32pt');
}

function draw() {
  background(0);

  calculateFitness();
  normalizeFitness();
  nextGeneration();

  stroke(0, 255, 0);
  strokeWeight(3);
  noFill();
  beginShape();
  for (let i = 0; i < bestEver.length; i++) {
    const n = bestEver[i];
    vertex(cities[n].x, cities[n].y);
  }
  endShape(CLOSE);

  fill(0, 255, 0);
  noStroke()
  for (var i = 0; i < bestEver.length; i++) {
    ellipse(cities[i].x, cities[i].y, 8, 8);
  }

  translate(0, height/2);
  stroke(255);
  strokeWeight(1);
  noFill();
  beginShape();
  for (let i = 0; i < currentBest.length; i++) {
    const n = currentBest[i];
    vertex(cities[n].x, cities[n].y);
  }
  endShape(CLOSE);

  fill(255);
  noStroke()
  for (var i = 0; i < currentBest.length; i++) {
    ellipse(cities[i].x, cities[i].y, 8, 8);
  }

  textSize(25);
  text(recordDistance, 160, 400);
}

function swap (a, i, j) {
  var temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}

function calcDistance(points, order) {
  var cityA, cityB, d, sum = 0;

  for (let i = 0; i < order.length; i++) {
    cityA = points[order[i]];
    if (i < (order.length - 1)) 
      cityB = points[order[i + 1]];
    else 
      cityB = points[order[0]]

    d = dist(cityA.x, cityA.y, cityB.x, cityB.y);
    sum += d;
  }
  return sum
}