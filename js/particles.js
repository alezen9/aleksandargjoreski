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
      if((p5.Vector.sub(this.position,p.position).mag()) < 50){
        stroke(255,50);
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
  
  function setup() {
    var cnv = createCanvas(windowWidth, windowHeight);
    cnv.parent('particles');
    var n;
      // 40 particles
      if(windowWidth < 870){
          n = 15;
      }else{
          n = 40;
      }
    for (var i = 0; i < n; i++) {
      particles.push(new Particle());
    }
  }

  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }
  
  function draw() {
    background(0);
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