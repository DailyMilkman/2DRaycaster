let lights = [];
let walls = [];
let running = true;
let done = [];
let timeSteps = 10;
let pointer;
let checkbox;

function setup() {
  createCanvas(1920, 1080);
  pointer = createVector(width/2, height/2);

  for (let i = 0; i < 7; i++) {
    walls.push(new Wall(random(width), random(height), random(width), random(height)));
  }
   
  checkbox = createCheckbox('debug', false);
  checkbox.changed(debug);
  
}




function mousePressed() {
  for (let i = 0; i < 360; i += 2) {
      lights.push(new Ray(mouseX, mouseY, radians(i)));
    }


    for (let light of lights) {
      let closest = null;
      let record = Infinity;
      for (let wall of walls) {
        const pt = light.calculateIntersection(wall);
        if (pt) {
          const d = p5.Vector.dist(light.pos, pt);
          if (d < record) {
            record = d;
            closest = pt;
          }
        }
      }

      if (closest) {
        light.stop = closest;
      } else {
        light.stop = light.end ;
      }
    }
  
}



function debug(light) {
  if (checkbox.checked()) {
      line(light.pos.x, light.pos.y, light.stop.x, light.stop.y);
  }
}





function keyPressed() {
  if (keyCode == 32){
    for (let i = 0; i < 360; i += 2) {
        lights.push(new Ray(pointer.x, pointer.y, radians(i)))
      }


      for (let light of lights) {
        let closest = null;
        let record = Infinity;
        for (let wall of walls) {
          const pt = light.calculateIntersection(wall)
          if (pt) {
            const d = p5.Vector.dist(light.pos, pt);
            if (d < record) {
              record = d;
              closest = pt;
            }
          }
        }

        if (closest) {
          light.stop = closest
        } else {
          light.stop = light.end 
        }
      }
  }
}


function draw() {
  background(0);

  
  if (keyIsDown(LEFT_ARROW)) {
    pointer.x -= 2;
  }

  if (keyIsDown(RIGHT_ARROW)) {
    pointer.x += 2;
  }

  if (keyIsDown(UP_ARROW)) {
    pointer.y -= 2;
  }

  if (keyIsDown(DOWN_ARROW)) {
    pointer.y += 2;
  }


  for (let wall of walls){
    wall.show()
  }
  for (let i = 0; i < timeSteps; i++) {
    for(let light of lights) {
      let distance = abs(light.pos.dist(light.stop))
      if (distance > 1 && light.pos.x > -1 && light.pos.x < width+1 && light.pos.y > -1 && light.pos.y < height+1) {
        light.move()
        light.color -= .5
        light.show()
        debug(light)
        
      } else {
          var ind = lights.indexOf(light);
          done.push(light)
          if (ind != -1) {
            lights.splice(ind, 1);
            }
      }

      
    }
  }

  for (item of done) {
    if (item.color > 0) {
      item.show()
      item.color -= .8
    } else {
        var ind = done.indexOf(item);
        if (ind != -1) {
          done.splice(ind, 1);
        }
      }
  }
  stroke(255)
  fill(255)
  strokeWeight(3)
  point(pointer.x, pointer.y)

  
}

/*
function keyPressed() {
  if (keyCode == ENTER) {
    if (running == true) {
      running = false
      noLoop()
    }
    else if (running == false) {
      running = true
      loop()
    }
  }
}
*/
