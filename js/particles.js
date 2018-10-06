class Particle {
    constructor(){
      this.position = createVector(random(width),random(height));
      this.mass = 2;
      this.velocity = createVector(random(-0.5,0.5),random(-0.5,0.5));
    }
  
    update() {
      this.position.add(this.velocity);
    }
  
    display() {
      noStroke();
      fill(255,100);
      ellipse(this.position.x, this.position.y, this.mass, this.mass);
    }
  
    drawLine(p){
      if((p5.Vector.sub(this.position,p.position).mag()) < 80){
        stroke(255,20);
        strokeWeight(0.5);
        line(this.position.x,this.position.y,p.position.x,p.position.y);
      }
    }
    checkEdges() {
      if ((this.position.x > (width - this.mass/2)) || (this.position.x < (0 + this.mass/2))){
        this.velocity.x *= -1;
      }
          if ((this.position.y > (height - this.mass/2)) || (this.position.y < (0 + this.mass/2))){
        this.velocity.y *= -1;
      }
    }
  }
  
  var particles = [];
  var X_AXIS = 2;
  
  function setup() {
    var cnv = createCanvas(windowWidth, windowHeight);
    cnv.parent('particles');
    var n;
      // 40 particles
      if(windowWidth < 870){
          n = 15;
      }else{
          n = 60;
      }
    for (var i = 0; i < n; i++) {
      particles.push(new Particle());
    }
  }

  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }
  
  function draw() {
    background(	0, 58, 58);
    //setGradient(0, 0, windowWidth, windowHeight, color(72,209,204), color(0,128,128), X_AXIS);
    for (var i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].display();
      for (var j = 0; j < particles.length; j++) {
        if(particles[i] != particles[j]){
          particles[i].drawLine(particles[j]);
        }
      }
      particles[i].checkEdges();
    }
  }

  function setGradient(x, y, w, h, c1, c2, axis) {

    noFill();
    if (axis == X_AXIS) {  // Left to right gradient
      for (var i = x; i <= x+w; i++) {
        var inter = map(i, x, x+w, 0, 1);
        var c = lerpColor(c1, c2, inter);
        stroke(c);
        line(i, y, i, y+h);
      }
    }
  }