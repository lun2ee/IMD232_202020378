'use strict';

var sketch = function (p) {
  // An array with nodes
  var nodes = [];

  var nodeCount = 200;

  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.noStroke();

    // Create nodes
    createNodes();
  };
  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].x = p.constrain(nodes[i].x, 5, p.width - 5);
      nodes[i].y = p.constrain(nodes[i].y, 5, p.height - 5);
    }
  };

  p.draw = function () {
    p.fill(0, 20);
    p.rect(0, 0, p.width, p.height);

    p.fill(255);
    for (var i = 0; i < nodes.length; i++) {
      // Let all nodes repel each other
      nodes[i].attractNodes(nodes);
      // Apply velocity vector and update position
      nodes[i].update();
      // Draw node
      p.fill(
        nodes[i].charge > 0 ? p.color(255, 150, 150) : p.color(150, 150, 255)
      );
      p.ellipse(nodes[i].x, nodes[i].y, 20, 15);
    }
  };

  p.keyPressed = function () {
    if (p.key == 's' || p.key == 'S') p.saveCanvas(Date.now(), 'png');
    if (p.key == 'r' || p.key == 'R') {
      p.background(0);
      createNodes();
    }
  };

  function createNodes() {
    nodes = [];
    for (var i = 0; i < nodeCount; i++) {
      nodes.push(
        new Node(
          p.width / 2 + p.random(-1, 1),
          p.height / 2 + p.random(-1, 1),
          5,
          p.width - 5,
          5,
          p.height - 5
        )
      );
    }
  }
};

var p = new p5(sketch);
