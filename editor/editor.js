const ai6 = new AI6GL();
// const object1 = new Grass();
// const object2 = new Cube();
// const object3 = new BevelCube();
// const object4 = new Octahedron2();
const cubeArray = [];
const CUBE_NUM = 64;
const CUBE_NUM_3 = 8;
let i = 0;
for (let j = 0; j < CUBE_NUM_3; ++j) {
for (let k = 0; k < CUBE_NUM_3; ++k) {
for (let l = 0; l < 1;          ++l) {
  cubeArray.push(new Cube(0.0, 1.0, 0.0, 1.0, 5.0) );
  cubeArray[i].setPosition((j-CUBE_NUM_3/2) * 6.0, (k-CUBE_NUM_3/2) * 6.0, (l) * 6.0);
  ai6.addObject(cubeArray[i]);
  ++i;
}
}
}
const light = [0.0, 0.0, 0.0];
const eye = [0.0, 30.0, 80.0];
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

this.time = 0.0;
function mainLoop() {
  this.time += 1;
  light[0] = Math.cos(this.time*0.1) * 100;
  light[1] = 30.0;
  light[2] = Math.sin(this.time*0.1) * 100;
  eye[0] = Math.cos(Math.PI/180.0*this.time*-1) * 70;
  eye[1] = 10.0;
  eye[2] = Math.sin(Math.PI/180.0*this.time*-1) * 70;

  if (this.time >= 360) {
    this.time = 0;
  }
  // // light[0] = 0.0;
  ai6.draw(ai6.GL);
  requestAnimationFrame( mainLoop );
  for (let l = 0; l < CUBE_NUM; ++l) {
      cubeArray[l].update();
  }

  // object1.update();
  // object2.update();
  // object3.update();
  // object4.update();
}
