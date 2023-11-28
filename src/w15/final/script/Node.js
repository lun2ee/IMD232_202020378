// Node.js
var Node = function (x, y, minX, maxX, minY, maxY) {
  p5.Vector.call(this, x, y, 0);
  this.minX = Number.MIN_VALUE || minX;
  this.maxX = Number.MAX_VALUE || maxX;
  this.minY = Number.MIN_VALUE || minY;
  this.maxY = Number.MAX_VALUE || maxY;
  this.radius = 100;
  this.ramp = 1;
  this.strength = -1;
  this.damping = 0.5;
  this.velocity = p.createVector();
  this.pVelocity = p.createVector();
  this.maxVelocity = 10;

  // Add charge property to simulate attractive and repulsive forces
  this.charge = p.random() > 0.5 ? 1 : -1; // Randomly assign charges
  // Modify the radius and strength based on charge
  this.radius = 100;
  this.strength = this.charge * 0.2; // Adjust the strength based on charge
};

Node.prototype = Object.create(p5.Vector.prototype);

Node.prototype.attractNodes = function (nodeArray) {
  for (var i = 0; i < nodeArray.length; i++) {
    var otherNode = nodeArray[i];
    if (otherNode === undefined) break;
    if (otherNode === this) continue;

    this.attract(otherNode);
  }
};

Node.prototype.attract = function (otherNode) {
  var thisNodeVector = p.createVector(this.x, this.y);
  var otherNodeVector = p.createVector(otherNode.x, otherNode.y);
  var d = thisNodeVector.dist(otherNodeVector);

  if (d > 0 && d < this.radius) {
    var s = p.pow(d / this.radius, 1 / this.ramp);
    var f = (s * 9 * this.strength * (1 / (s + 1) + (s - 3) / 4)) / d;
    var df = thisNodeVector.sub(otherNodeVector);
    df.mult(f);

    otherNode.velocity.x += df.x;
    otherNode.velocity.y += df.y;
  }
};

Node.prototype.update = function () {
  this.velocity.limit(this.maxVelocity);

  this.x += this.velocity.x;
  this.y += this.velocity.y;

  if (this.x < this.minX) {
    this.x = this.minX - (this.x - this.minX);
    this.velocity.x = -this.velocity.x;
  }
  if (this.x > this.maxX) {
    this.x = this.maxX - (this.x - this.maxX);
    this.velocity.x = -this.velocity.x;
  }

  if (this.y < this.minY) {
    this.y = this.minY - (this.y - this.minY);
    this.velocity.y = -this.velocity.y;
  }
  if (this.y > this.maxY) {
    this.y = this.maxY - (this.y - this.maxY);
    this.velocity.y = -this.velocity.y;
  }

  this.velocity.mult(1 - this.damping);
};

Node.prototype.constructor = Node;
