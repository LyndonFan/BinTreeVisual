var img;
var transX  = 0;
var transY  = 0;
var startX = 0;
var startY = 0;
var zoomScale = 0;

function setup() { 
  createCanvas(800, 600);
  rectMode(CENTER);
  
  b = new Tree(new Tree(null,1,null), 3, new Tree(null,5,null));
  b.add(6);
  b.add(0);
  b.add(2);
  b.add(4);
}

function control(){
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)){transX += 10;}
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)){transX -= 10;}
  if (keyIsDown(UP_ARROW) || keyIsDown(87)){transY += 10;}
  if (keyIsDown(DOWN_ARROW) || keyIsDown(83)){transY -= 10;}
}

function transform(x,y){
  return [zoom(x+transX-width/2)+width/2,zoom(y+transY-height/2)+height/2];
}

function zoom(d){
  return (zoomScale>=0) ? d*(1+zoomScale) : d/(1-zoomScale);
}

function draw() { 
  background(220);
  control();
  //let tup = transform(0,0);
  //image(img, tup[0], tup[1], zoom(800), zoom(400));
  //tup = transform(width/2,height/2);
  //fill(255);
  //circle(tup[0],tup[1],zoom(100));
  //fill(0);
  //text(transform(0,0),width/2,height/2);
  b.show();
}

function mousePressed() {
   startX = mouseX;
   startY = mouseY;
}

function mouseDragged() {
  var diff = startX - mouseX;
  transX -= startX - mouseX;
  transY -= startY - mouseY;
  startX = mouseX;
  startY = mouseY;
}

function keyPressed(){
  if (keyCode === 81){zoomScale--;}
  if (keyCode === 69){zoomScale++;}
  if (keyCode === 82){transX=0;transY=0;zoomScale=0;}
}
