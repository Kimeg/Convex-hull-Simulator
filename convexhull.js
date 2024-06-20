let WIDTH = 400;
let HEIGHT = 400;
let cur = null;
let conv_hull = [];

let points = [];
let init_index = null;
let N = 300;
let size = 10;
let offset = WIDTH/8;

class Point{
  constructor(x, y, i){
    this.pos = createVector(x, y);
    this.index = i;
  }
  
  _draw(c){
    if (cur.index == this.index){
      c = color(255, 0 ,0);
    }
    
    fill(c);
    stroke(c);
    ellipse(this.pos.x, this.pos.y, size, size);
  }
}

function generateData(){
  for (let i=0; i<N; i++){
    let rand_x = random(random(offset,WIDTH/2), random(WIDTH/2,WIDTH-offset));
    let rand_y = random(random(offset,HEIGHT/2), random(HEIGHT/2,HEIGHT-offset));
    points.push(new Point(rand_x, rand_y, i));
  }
}

function searchInitialPoint(){
  let x = Infinity;
  let point = null;
  
  points.forEach(p => {
    if (p.pos.x < x){
      x = p.pos.x;
      point = p;
    }
  });
  cur = point;
  conv_hull.push(cur);
  init_index = cur.index;
}

function searchConvexHull(){
  let p1, p2, v1, v2, cp, found;
  for (let i=0; i < points.length; i++){
    p1 = points[i];
    if (p1.index==cur.index){
      continue;
    }
    v1 = p5.Vector.sub(p1.pos, cur.pos);
    
    found = true;
    for (let j=0; j < points.length; j++){
      p2 = points[j];
      if (p2.index==p1.index || p2.index==cur.index){
        continue;
      }
      
      v2 = p5.Vector.sub(p2.pos, cur.pos);
      cp = p5.Vector.cross(v1, v2);
      //console.log(v1, v2, cp);
      if (cp.z < 0){
        found = false;
        break;
      }
    }
    
    if (found){
      cur = p1;
      //console.log(dist(p1.pos.x, p1.pos.y, WIDTH/2, HEIGHT/2));
      conv_hull.push(cur);
      break;
    }
  }
}

function update(){
  background(0);
  
  points.forEach(p =>{
    p._draw(color(random(255), random(255), random(255)));
  });
  
  conv_hull.forEach(p =>{
    p._draw(color(255, 0, 0));
  });
  
  for (let i=0; i<conv_hull.length-1; i++){
    let p1 = conv_hull[i];
    let p2 = conv_hull[i+1];
    
    stroke(0,255,0);
    line(p1.pos.x, p1.pos.y, p2.pos.x, p2.pos.y);
  }
}