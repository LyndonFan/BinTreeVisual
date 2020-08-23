class Tree{
  constructor(l,v,r,p=null){
    this.left = l;
    this.val = v;
    this.right = r;
    this.height = null;
    this.width = null;
    this.hUpdated = false;
    this.wUpdated = false;
    this.parent = p;
    this.x = width/2;
    this.y = 100;
  }
  askHeight(){
    if (this.hUpdated && (this.height!==null)){return this.height;}
    let h = 1;
    if (this.left!==null){h = max(h,1+this.left.askHeight());}
    if (this.right!==null){h = max(h,1+this.right.askHeight());}
    this.height = h;
    this.hUpdated = true;
    return h;
  }
  askWidth(){
    if (this.wUpdated && (this.width!==null)){return this.width;}
    let w = 1;
    if (this.left!==null){w += this.left.askWidth();}
    if (this.right!==null){w += this.right.askWidth();}
    this.width = w;
    this.wUpdated = true;
    return w;
  }
  
  add(newV){
    this.hUpdated = false;
    this.wUpdated = false;
    if (newV < this.val){
      //events.push((this,'a','l'));
      if (this.left===null){this.left = new Tree(null,newV,null,this);}
      else {this.left.add(newV);}
    } else if (newV > this.val){
      //events.push((this,'a','r'));
      if (this.right===null){this.right = new Tree(null,newV,null,this);}
      else {this.right.add(newV);}
    }
  }
  find(v){
    if (this.val === v){
      return this;
    } else if (this.left !== null && v < this.val){
      return this.left.find(v);
    } else if (this.right !== null && v > this.val){
      return this.right.find(v);
    } else {
      return this;
    }
  }
  delete(v){
    let t = this.find(v);
    console.log(t);
    if (t.left !== null){
      t.hUpdated = false;
      t.wUpdated = false;
      if (t.left.right !== null){
        let curr = t.left;
        while (curr.right.right !== null){curr = curr.right;}
        t.val = curr.right.val;
        curr.right = null;
      } else {
        t.val = t.left.val;
        t.left = t.left.left;
      }
    } else if (t.right !== null){
      t.hUpdated = false;
      t.wUpdated = false;
      if (t.right.left !== null){
        let curr2 = t.right;
        while (curr2.left.left !== null){curr2 = curr2.left;}
        t.val = curr2.left.val;
        curr2.left = null;
      } else {
        t.val = t.right.val;
        t.right = t.right.right;
      }
    }
    
  }
  
  show(){
    this.drawLines(width/2,100);
    this.drawCircles(width/2,100);
  }
  drawLines(x,y){
    this.x = x;
    this.y = y;
    fill(0);
    strokeWeight(zoom(10));
    if (this.left!==null){
      let dist = (this.left.right===null) ? 1 : 1+this.left.right.askWidth();
      dist*=100;
      let start = transform(x,y);
      let end = transform(x-dist, y+100);
      line(start[0],start[1],end[0],end[1]);
      this.left.drawLines(x-dist,y+100);
    }
    if (this.right!==null){
      let dist = (this.right.left===null) ? 1 : 1+this.right.left.askWidth();
      dist*=100;
      let start = transform(x,y);
      let end = transform(x+dist, y+100);
      line(start[0],start[1],end[0],end[1]);
      this.right.drawLines(x+dist,y+100);
    }
  }
  drawCircles(x,y){
    fill(255);
    let pos = transform(x,y);
    strokeWeight(zoom(10));
    circle(pos[0],pos[1],zoom(100));
    fill(0);
    let mag = abs(this.val)<10 ? 1 : ceil(log(abs(this.val),10));
    strokeWeight(1);
    textSize(zoom(80/pow(mag,0.5)));
    textAlign(CENTER);
    let textpos = transform(x,y);
    text(this.val,textpos[0],textpos[1]);
    if (this.left!==null){
      let dist = (this.left.right===null) ? 1 : 1+this.left.right.askWidth();
      dist*=100;
      this.left.drawCircles(x-dist,y+100);
    }
    if (this.right!==null){
      let dist = (this.right.left===null) ? 1 : 1+this.right.left.askWidth();
      dist*=100;
      this.right.drawCircles(x+dist,y+100);
    }
  }
}
