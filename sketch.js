var cities = [];
var totalCities = 10;
var recordDistance;
var bestEver;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  for (var i = 0; i < totalCities; i++) {
    var v = createVector(random(width), random(height));
    cities[i] = v;
  }
  var d = calcDistance(cities)
  recordDistance = d;
  bestEver = cities.slice();
}

function draw() {
  background(0);
  fill(255);
  for (var i = 0; i < cities.length; i++) {
    ellipse(cities[i].x, cities[i].y, 8, 8);
  }
  
  stroke(255);
  strokeWeight(1);
  noFill();
  beginShape();
  for (var i = 0; i < cities.length; i++) {
    vertex(cities[i].x, cities[i].y);
  }
  endShape();

  stroke(0, 255, 0);
  strokeWeight(4);
  noFill();
  beginShape();
  for (var i = 0; i < bestEver.length; i++) {
    vertex(bestEver[i].x, bestEver[i].y);
  }
  endShape();
  
  // var i = floor(random(cities.length));
  // var j = floor(random(cities.length));
  // swap(cities, i, j)
  //Fisher–Yates shuffle
  var currentIndex = cities.length
  var randomIndex = floor(random(currentIndex));

  while (0 != currentIndex) {
    currentIndex -= 1;
    shuffle(cities, currentIndex, randomIndex)
    var d = calcDistance(cities);
    if(d < recordDistance) {
      recordDistance = d;
      bestEver = cities.slice()
    }
    console.log(recordDistance)
  }
}

function shuffle(array, currentIndex, randomIndex) {
  var temporaryValue;
    
  temporaryValue = array[currentIndex];
  array[currentIndex] = array[randomIndex];
  array[randomIndex] = temporaryValue;
}
 
/*function swap (a, i, j) {
  var temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}*/

function calcDistance(points) {
  var sum = 0;
  for (let i = 0; i < points.length - 1; i++) {
    var d = dist(points[i].x, points[i].y, points[i+1].x, points[i+1].y);
    sum += d;
  }
  return sum
}