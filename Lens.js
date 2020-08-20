class Lens{
  constructor(t){
    this.tree = t;
    this.isFocus = false;
  }
  toggle(){
    this.isFocus = !this.isFocus;
    if (this.isFocus){this.focus();}
    else {zoomScale=0;}
  }
  focus(){
    let k = min(width,height)/600;
    zoomScale = (k>=1) ? floor(k) : -ceil(1/k);
    k = zoom(1);
    transX = width/2 - this.tree.x;
    transY = height/2 - this.tree.y;
  }
  show(){
    if (this.isFocus){this.focus();}
    fill('rgba(0,0,0,0)');
    stroke(0,255,255);
    strokeWeight(zoom(10));
    let pos = transform(this.tree.x,this.tree.y);
    circle(pos[0],pos[1],zoom(100+15));
  }
}
