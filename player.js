class Player {
    constructor() {
        this.pos = createVector(width/2, height/2);
    }

    show() {
        stroke(255);
        strokeWeight(1);
        point(this.pos.x, this.pos.y);
    }
    
    




}
