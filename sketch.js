let delay = 10;
let _timer = delay;

function setup() {
  createCanvas(WIDTH, HEIGHT);
  
  generateData();
  searchInitialPoint();
}

function time(){
  _timer++;
  if (_timer < delay){
    return false;
  }
  _timer = 0;
  return true;
}

function draw() {
  if (!time()){
    return;
  }
  
  if (cur.index==init_index && conv_hull.length > 1){
    console.log('done', conv_hull.length-1);
    noLoop();
  }
  
  searchConvexHull();
  update();
}