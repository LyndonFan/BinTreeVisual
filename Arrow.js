class Arrow{
  constructor(startX,startY,endX,endY){
    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;
  }
  show(){
    let dX = this.endX - this.startX;
    let dY = this.endY - this.startY;
    let theta = atan(dY/dX);
    let xRatio = cos(theta);
    let yRatio = sin(theta);
    if (dY*yRatio<0){yRatio *= -1;}
    if (dX<0 && xRatio>0){xRatio *= -1;}
    strokeWeight(zoom(10));
    stroke(200*(dY<0),200*(dX>0)*(dY>0),200*(dX<0)*(dY>0));
    let tail = transform(this.startX+xRatio*70,this.startY+yRatio*70);
    let head = transform(this.startX+xRatio*90,this.startY+yRatio*90);
    line(head[0],head[1],tail[0],tail[1]);
    line(head[0],head[1],head[0],head[1]+zoom(10*(dY>0 ? -1 : 1)));
    line(head[0],head[1],head[0]+zoom(10*(dX>0 ? -1 : 1)),head[1]);
  }
}
