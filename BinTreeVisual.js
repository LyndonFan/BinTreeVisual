var img;
var transX  = 0;
var transY  = 0;
var startX = 0;
var startY = 0;
var zoomScale = 0;
var eventLog = [];
var buttons = [];
var addButton, findButton, deleteButton, input;
var events = [];

function setup() { 
  createCanvas(windowWidth, windowHeight);
  
  b = new Tree(null,int(random(-5,5)),null);
  lens = new Lens(b);
  for (var i = 1; i < 16; i++){b.add(int(random(-10,10)));} 
  textAlign(CENTER,CENTER);
  buttons = [createButton('Add'), createButton('Find'), createButton('Delete')];
  input = createInput(0,'number');
  buttons[0].mousePressed(tryAdd);
  buttons[1].mousePressed(tryFind);
  buttons[2].mousePressed(tryDelete);
  for (i = 0; i < 3; i++){
    buttons[i].position(width+i*100-300,height-100);
    buttons[i].size(100,50);
    buttons[i].style('font-size:20px');
  }
  input.position(width-300,height-50);
  input.size(300,50);
  input.style('font-size:20px');
}

function processInput(){
  let v = input.value();
  input.value('');
  return int(v);
}

function tryAdd(){
  let v = processInput();
  if (!isNaN(v)){b.add(v);}
}

function tryFind(){
  let v = processInput();
  if (!isNaN(v)){lens.tree = b.find(v);}
}

function tryDelete(){
  let v = processInput();
  if (!isNaN(v)){b.delete(v);}
}

function resetTransform(){
  transX=0;transY=0;zoomScale=0;
}

function transform(x,y){
  return [zoom(x+transX-width/2)+width/2,zoom(y+transY-height/2)+height/2];
}

function zoom(d){
  return (zoomScale>=0) ? d*(1+zoomScale) : d/(1-zoomScale);
}

function draw() { 
  createCanvas(windowWidth, windowHeight);
  background(220);
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)){transX += 10;}
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)){transX -= 10;}
  if (keyIsDown(UP_ARROW) || keyIsDown(87)){transY += 10;}
  if (keyIsDown(DOWN_ARROW) || keyIsDown(83)){transY -= 10;}
  b.show();
  lens.show();
  fill(0,0,0);
  var t = lens.tree;
  input.position(width-300,height-50);
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
  if (keyCode === 82){resetTransform();}
  if (keyCode === 70){lens.toggle();}
}
