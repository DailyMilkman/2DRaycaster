

class Ray {
    constructor(x, y, angle) {
        this.pos = createVector(x, y);
        this.vel = 0;
        this.angle = angle;
        this.steps = timeSteps / 4;
        this.color = 255;
        this.moving = true;
        this.stop = null;
        let endPoint = createVector(cos(this.angle), sin(this.angle));
        this.end = createVector(this.pos.x + (endPoint.x * 10000), this.pos.y + (endPoint.y * 10000));


        this.heading = 0;
    }

    move() {
        this.vel = p5.Vector.fromAngle(this.angle);
        this.vel.setMag(3)
        this.pos.add(this.vel.div(this.steps));
        
        }


    

    show() {
        strokeWeight(2);
        stroke(this.color);
        point(this.pos.x, this.pos.y);

        //let future = p5.Vector.mult()
        
        
        //translate(this.pos.x, this.pos.y);
        //this.angle = this.vel.heading();
        
        //console.log(abs(this.pos.dist(this.stop)))
        //let endPoint = createVector(cos(this.angle), sin(this.angle))
        
        
    }




    calculateIntersection(wall) {
        
        const x1 = wall.x1;
        const y1 = wall.y1;
        const x2 = wall.x2;
        const y2 = wall.y2;

        const x3 = this.pos.x;
        const y3 = this.pos.y;
        const x4 = this.end.x;
        const y4 = this.end.y;

        const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        if (den == 0) {
            this.stop = this.end;
            return;
        }

        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
        const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;
        if (t > 0 && t < 1 && u > 0) {
            const pt = createVector();
            pt.x = x1 + t * (x2 - x1);
            pt.y = y1 + t * (y2 - y1);
            return pt;
        } else {
            this.stop = this.end;
            return
        }
    }
          
      
}
   




