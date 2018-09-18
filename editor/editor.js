const keyArray            = new Array(10);
const keyArrayUp          = new Array(10);

let key_repeat_x_plus   = false;
let key_repeat_x_minus  = false;
let key_repeat_z_plus   = false;
let key_repeat_z_minus  = false;

document.addEventListener("keydown", function(e) {
    switch(e.keyCode) {
    case 37: keyArray[0] = true; break;//left
    case 38: keyArray[1] = true; break;//up
    case 39: keyArray[2] = true; break;//right
    case 40: keyArray[3] = true; break;//down
    case 88: keyArray[4] = true; break;//x
    case 90: keyArray[5] = true; break;//z
    case 83: keyArray[6] = true; break;//s
    case 65: keyArray[7] = true; break;//a
    case 81: keyArray[8] = true; break;
    case 87: keyArray[9] = true; break;
    }
}, false);

document.addEventListener("keyup", function(e) {
    switch(e.keyCode) {
    case 37: keyArrayUp[0] = true; break;
    case 38: keyArrayUp[1] = true; break;   
    case 39: keyArrayUp[2] = true; break;
    case 40: keyArrayUp[3] = true; break;
    case 88: keyArrayUp[4] = true; break;
    case 90: keyArrayUp[5] = true; break;
    case 83: keyArrayUp[6] = true; break;
    case 65: keyArrayUp[7] = true; break;
    case 81: keyArrayUp[8] = true; break;
    case 67: keyArrayUp[9] = true; break;
    }
}, false);

const ai6 = new AI6GL();
const CUBE_NUM = 64;
const CUBE_NUM_3 = 8;
let cursorColor = 1;
const INIT_SIZE = 5.0;
const cursor = new Cube(1.0, 0.0, 0.0, 1.0, INIT_SIZE);
cursor.setPosition(0.0, 0.0, 0.0);
ai6.addObject(cursor);
// const object1 = new Grass();
// const object2 = new Cube();
// const object3 = new BevelCube();
// const object4 = new Octahedron2();
const stageArray = [];
const frameArray = [];
let i = 0;
for (let j = 0; j < CUBE_NUM_3; ++j) {
for (let k = 0; k < CUBE_NUM_3; ++k) {
for (let l = 0; l < CUBE_NUM_3; ++l) {
  if (j == 0 || k == 0 || l == 0) {
    frameArray.push(new Cube(0.0, 1.0, 0.0, 1.0, INIT_SIZE) );
    frameArray[i].setPosition((j-CUBE_NUM_3/2) * (INIT_SIZE + 1.0), (k-CUBE_NUM_3/2) * (INIT_SIZE + 1.0), (l-CUBE_NUM_3/2) * (INIT_SIZE + 1.0));
    ai6.addObject(frameArray[i]);
    ++i;
  }
}
}
}
const light = [0.0, 0.0, 0.0];
const eye = [30.0, 30.0, 30.0];
const target = [0.0, 0.0, 0.0];
const up = [0.0, 1.0, 0.0];

// object1.setPosition( 3.0, 0.0, 0.0);
// object2.setPosition(-3.0, 0.0, 0.0);
//      object4.setPosition( 3.5, 0.0, 0.0);
// ai6.addObject( object1 );
// ai6.addObject( object2 );
// ai6.addObject( object3 );
// ai6.addObject( object4 );
ai6.addLight(light);
ai6.setCamera(eye, target, up);

ai6.fetchShader(ai6.GL, mainLoop);
const socket = io();
socket.on('connect', () => {
  socket.on('initStage', (data) => {
    for (const cube of data) {
      stageArray.push( new Cube(cube.r, cube.g, cube.b, 1.0, INIT_SIZE) );
      stageArray[stageArray.length - 1].setPosition(cube.x, cube.y, cube.z);
      ai6.addObject(stageArray[stageArray.length - 1]);
      stageArray[stageArray.length - 1].SIZE = cube.s;
      let putData = {
        x: cube.x,
        y: cube.y,
        z: cube.z,
        r: cube.r,
        g: cube.g,
        b: cube.b,
        s: cube.s
      };
      socket.emit('putData', putData);
  
    }
  });
});
this.time = 0.0;
function mainLoop() {
  const MOVE = 1.0;
  if (keyArray[0]) { keyArray[0] = false;   for (const cube of frameArray) { cube.x -= MOVE; }  cursor.x -= MOVE; eye[0] -= MOVE; target[0] -= MOVE; }
  if (keyArray[1]) { keyArray[1] = false;   for (const cube of frameArray) { cube.z -= MOVE; }  cursor.z -= MOVE; eye[2] -= MOVE; target[2] -= MOVE;  }
  if (keyArray[2]) { keyArray[2] = false;   for (const cube of frameArray) { cube.x += MOVE; }  cursor.x += MOVE; eye[0] += MOVE; target[0] += MOVE;  }
  if (keyArray[3]) { keyArray[3] = false;   for (const cube of frameArray) { cube.z += MOVE; }  cursor.z += MOVE; eye[2] += MOVE; target[2] += MOVE;  }
  if (keyArray[4]) { keyArray[4] = false;   for (const cube of frameArray) { cube.y += MOVE; }  cursor.y += MOVE; eye[1] += MOVE; target[1] += MOVE;  }
  if (keyArray[5]) { keyArray[5] = false;   for (const cube of frameArray) { cube.y -= MOVE; }  cursor.y -= MOVE; eye[1] -= MOVE; target[1] -= MOVE;  }
  
  if (keyArray[6]) {
    keyArray[6] = false;
    stageArray.push( new Cube(cursor.r,cursor.g,cursor.b,1.0,INIT_SIZE) );
    stageArray[stageArray.length - 1].setPosition(cursor.x, cursor.y, cursor.z);
    ai6.addObject(stageArray[stageArray.length - 1]);
    stageArray[stageArray.length - 1].SIZE = cursor.SIZE;
    let putData = {
      x: cursor.x,
      y: cursor.y,
      z: cursor.z,
      r: cursor.r,
      g: cursor.g,
      b: cursor.b,
      s: cursor.SIZE
    };
    socket.emit('putData', putData);  
  }

  if (keyArray[7]) {
    keyArray[7] = false;
    cursorColor += 1;
    if (cursorColor >= 12) {
      cursorColor = 0;
    }
    if      (cursorColor == 1) {cursor.r = 1.0; cursor.g = 0.0; cursor.b = 0.0;}
    else if (cursorColor == 2) {cursor.r = 0.0; cursor.g = 1.0; cursor.b = 0.0;}
    else if (cursorColor == 3) {cursor.r = 0.0; cursor.g = 0.0; cursor.b = 1.0;}
    else if (cursorColor == 4) {cursor.r = 1.0; cursor.g = 1.0; cursor.b = 0.0;}
    else if (cursorColor == 5) {cursor.r = 1.0; cursor.g = 0.0; cursor.b = 1.0;}
    else if (cursorColor == 6) {cursor.r = 0.0; cursor.g = 1.0; cursor.b = 1.0;}
    else if (cursorColor == 7) {cursor.r = 0.5; cursor.g = 0.0; cursor.b = 0.0;}
    else if (cursorColor == 8) {cursor.r = 0.0; cursor.g = 0.5; cursor.b = 0.0;}
    else if (cursorColor == 9) {cursor.r = 0.0; cursor.g = 0.0; cursor.b = 0.5;}
    else if (cursorColor ==10) {cursor.r = 1.0; cursor.g = 1.0; cursor.b = 1.0;}
    else if (cursorColor ==11) {cursor.r = 0.5; cursor.g = 0.5; cursor.b = 0.5;}
    else if (cursorColor == 0) {cursor.r = 0.0; cursor.g = 0.0; cursor.b = 0.0;}
  }

  if (keyArray[8]) {
    keyArray[8] = false;
    cursor.SIZE += MOVE;
  }
  if (keyArray[9]) {
    keyArray[9] = false;
    cursor.SIZE -= MOVE;
  }
  this.time += 1;
  light[0] = Math.cos(this.time*0.01) * 100;
  light[1] = 30.0;
  light[2] = Math.sin(this.time*0.01) * 100;
  // eye[0] = Math.cos(Math.PI/180.0*this.time*-1) * 70;
  // eye[1] = 10.0;
  // eye[2] = Math.sin(Math.PI/180.0*this.time*-1) * 70;

  if (this.time >= 360) {
    this.time = 0;
  }
  // // light[0] = 0.0;
  ai6.draw(ai6.GL);
  requestAnimationFrame( mainLoop );
  for (const cube of frameArray) {
    cube.update();
  }
  for (const cube of stageArray) {
    cube.update();
  }
  cursor.update();
  // object1.update();
  // object2.update();
  // object3.update();
  // object4.update();
}
