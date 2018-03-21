//////////////////////////////////////////////////////////////////
// Assignment 1:  Programing
/////////////////////////////////////////////////////////////////


// SETUP RENDERER AND SCENE
var scene = new THREE.Scene();
var body;
var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xffffff); // white background colour
document.body.appendChild(renderer.domElement);

// SETUP CAMERA
var camera = new THREE.PerspectiveCamera(30, 1, 0.1, 1000); // view angle, aspect ratio, near, far
camera.position.set(-8,3,10);
camera.lookAt(scene.position);
scene.add(camera);

var cam2 = new THREE.PerspectiveCamera(100, 1, 0.1, 1000);
scene.add(cam2);
cam2.matrixAutoUpdate = false;

// SETUP ORBIT CONTROL OF THE CAMERA
var controls = new THREE.OrbitControls(camera);
controls.damping = 0.2;

////////////////////////////////////////////////////////////////////////////////
//  loadOBJ( ):  loads OBJ file vertex mesh, with vertex normals
////////////////////////////////////////////////////////////////////////////////

function loadOBJ(objName, file, material, scale, xOff, yOff, zOff, xRot, yRot, zRot) {
  var onProgress = function(query) {
    if ( query.lengthComputable ) {
      var percentComplete = query.loaded / query.total * 100;
      console.log( Math.round(percentComplete, 2) + '% downloaded' );
    }
  };
  var onError = function() {
    console.log('Failed to load ' + file);
  };
  var loader = new THREE.OBJLoader();
  loader.load(file, function(object) {
    object.traverse(function(child) {
      if (child instanceof THREE.Mesh) {
        child.material = material;
      }
    });
    object.position.set(xOff,yOff,zOff);
    object.rotation.x= xRot;
    object.rotation.y = yRot;
    object.rotation.z = zRot;
    object.scale.set(scale,scale,scale);
    object.name = objName;
    scene.add(object);

  }, onProgress, onError);
}

////////////////////////////////////////////////////////////////////////////////////
//   resize( ):  adjust camera parameters if the window is resized
////////////////////////////////////////////////////////////////////////////////////

function resize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

window.addEventListener('resize', resize);
resize();

////////////////////////////////////////////////////////////////////////////////////
//   create the needed objects
////////////////////////////////////////////////////////////////////////////////////

  // FLOOR WITH CHECKERBOARD 

var floorTexture = new THREE.ImageUtils.loadTexture('images/checkerboard.jpg');
floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(4, 4);
var floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.DoubleSide });
var floorGeometry = new THREE.PlaneBufferGeometry(20, 20);
var floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.position.y = 0;
floor.rotation.x = Math.PI / 2;
scene.add(floor);

  // LIGHTS:  needed for phong illumination model

var light = new THREE.PointLight(0xFFFFFF);
light.position.x=-70;
light.position.y=100;
light.position.z=70;
scene.add(light);
var ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

  // MATERIALS

var brownMaterial = new THREE.MeshPhongMaterial( { 
     ambient: 0x402020, color: 0xFFDEAD, specular: 0x808080, shininess: 10.0, shading: THREE.SmoothShading });
var whiteMaterial = new THREE.MeshPhongMaterial( { 
     ambient: 0x404040, color: 0x808080, specular: 0x808080, shininess: 40.0, shading: THREE.SmoothShading });
var normalMaterial = new THREE.MeshNormalMaterial();
var silverMaterial = new THREE.MeshPhongMaterial( { 
     ambient: 0x402020, color: 0xA9A9A9 , specular: 0x808080, shininess: 10.0, shading: THREE.SmoothShading });

  // Sphere

var sphereGeometry = new THREE.SphereGeometry( 1, 32, 32 );
var whiteSphere = new THREE.Mesh( sphereGeometry, whiteMaterial );
scene.add( whiteSphere );
whiteSphere.position.set(3,1,0);

  // Thigh1

var thigh1Length = 0.7;
var thigh1Angle = 0;       // animation parameter
var thigh1Geometry = new THREE.CylinderGeometry( 0.12, 0.08, thigh1Length, 16 );
var thigh1 = new THREE.Mesh( thigh1Geometry, brownMaterial );
scene.add( thigh1 );
thigh1.matrixAutoUpdate = false;

  //Thigh2

var thigh2Length = 0.7;
var thigh2Angle = 0;
var thigh2Geo = new THREE.CylinderGeometry(0.12, 0.08, thigh2Length, 16);
var thigh2 = new THREE.Mesh(thigh2Geo, brownMaterial);
scene.add(thigh2);
thigh2.matrixAutoUpdate = false;

  //Thigh3

var thigh3Length = 0.7;
var thigh3Angle = 15;
var thigh3Geo = new THREE.CylinderGeometry(0.12, 0.08, thigh3Length, 16);
var thigh3 = new THREE.Mesh(thigh3Geo, brownMaterial);
scene.add(thigh3);
thigh3.matrixAutoUpdate = false;

  //Thigh4

var thigh4Length = 0.7;
var thigh4Angle = 15;
var thigh4Geo = new THREE.CylinderGeometry(0.12, 0.08, thigh4Length, 16);
var thigh4 = new THREE.Mesh(thigh4Geo, brownMaterial);
scene.add(thigh4);
thigh4.matrixAutoUpdate = false;

  //Knee1

var Knee1Geo = new THREE.SphereGeometry(0.08, 32, 32);
var knee1 = new THREE.Mesh(Knee1Geo, brownMaterial);
scene.add(knee1);
knee1.matrixAutoUpdate = false;

  //Knee2

var Knee2Geo = new THREE.SphereGeometry(0.08, 32, 32);
var knee2 = new THREE.Mesh(Knee2Geo, brownMaterial);
scene.add(knee2);
knee2.matrixAutoUpdate = false;

  //Knee3

var Knee3Geo = new THREE.SphereGeometry(0.08, 32, 32);
var knee3 = new THREE.Mesh(Knee3Geo, brownMaterial);
scene.add(knee3);
knee3.matrixAutoUpdate = false;

  //Knee4

var Knee4Geo = new THREE.SphereGeometry(0.08, 32, 32);
var knee4 = new THREE.Mesh(Knee4Geo, brownMaterial);
scene.add(knee4);
knee4.matrixAutoUpdate = false;

  //Calf1

var calf1Length = 0.5;
var calf1Angle = 0;
var Calf1Geo = new THREE.CylinderGeometry(0.08, 0.06, calf1Length, 16);
var calf1 = new THREE.Mesh(Calf1Geo, brownMaterial);
scene.add(calf1);
calf1.matrixAutoUpdate = false;

  //Calf2

var calf2Length = 0.5;
var calf2Angle = 0;
var Calf2Geo = new THREE.CylinderGeometry(0.08, 0.06, calf2Length, 16);
var calf2 = new THREE.Mesh(Calf2Geo, brownMaterial);
scene.add(calf2);
calf2.matrixAutoUpdate = false;

  //Calf3

var calf3Length = 0.5;
var calf3Angle = 0;
var Calf3Geo = new THREE.CylinderGeometry(0.08, 0.06, calf3Length, 16);
var calf3 = new THREE.Mesh(Calf3Geo, brownMaterial);
scene.add(calf3);
calf3.matrixAutoUpdate = false;

  //Calf4

var calf4Length = 0.5;
var calf4Angle = 0;
var Calf4Geo = new THREE.CylinderGeometry(0.08, 0.06, calf4Length, 16);
var calf4 = new THREE.Mesh(Calf4Geo, brownMaterial);
scene.add(calf4);
calf4.matrixAutoUpdate = false;

 //shoulder1
var shoulder1AngleZ = 10; 
var shoulder1AngleY = 0; 
var shoulder1AngleX = 0; 
var shoulder1Geo = new THREE.SphereGeometry(0.1, 32, 32);
var shoulder1 = new THREE.Mesh(shoulder1Geo, brownMaterial);
scene.add(shoulder1);
shoulder1.matrixAutoUpdate = false;

  //Upperarm1
var uarmLength = 0.4;
var uarm1Angle = 30;
var uarm1Geo = new THREE.CylinderGeometry(0.1, 0.07, uarmLength, 16);
var uarm1 = new THREE.Mesh(uarm1Geo, brownMaterial);
scene.add(uarm1);
uarm1.matrixAutoUpdate = false;

  //elbow1
var elbow1AngleZ = 0;
var elbow1AngleY = 0;
var elbow1AngleX = 0;
var elbow1Geo = new THREE.SphereGeometry(0.07, 32, 32);
var elbow1 = new THREE.Mesh(elbow1Geo, brownMaterial);
scene.add(elbow1);
elbow1.matrixAutoUpdate = false;

  //lowerarm1
var larmLength = 0.5;
var larm1Angle = 30;
var larm1Geo = new THREE.CylinderGeometry(0.07, 0.05, larmLength, 16);
var larm1 = new THREE.Mesh(larm1Geo, brownMaterial);
scene.add(larm1);
larm1.matrixAutoUpdate = false;

  //hand1
var hand1Geo = new THREE.SphereGeometry(0.07, 32, 32);
var hand1 = new THREE.Mesh(hand1Geo, brownMaterial);
scene.add(hand1);
hand1.matrixAutoUpdate = false;

 //shoulder2
var shoulder2AngleZ = -60; 
var shoulder2AngleY = 0; 
var shoulder2AngleX = 0; 
var shoulder2Geo = new THREE.SphereGeometry(0.1, 32, 32);
var shoulder2 = new THREE.Mesh(shoulder2Geo, brownMaterial);
scene.add(shoulder2);
shoulder2.matrixAutoUpdate = false;

  //Upperarm2
var uarm2Angle = 30;
var uarm2Geo = new THREE.CylinderGeometry(0.1, 0.07, uarmLength, 16);
var uarm2 = new THREE.Mesh(uarm2Geo, brownMaterial);
scene.add(uarm2);
uarm2.matrixAutoUpdate = false;

  //elbow2
var elbow2AngleZ = 60;
var elbow2AngleY = 0;
var elbow2AngleX = 0;
var elbow2Geo = new THREE.SphereGeometry(0.07, 32, 32);
var elbow2 = new THREE.Mesh(elbow2Geo, brownMaterial);
scene.add(elbow2);
elbow2.matrixAutoUpdate = false;

  //lowerarm2
var larmLength = 0.5;
var larm2Angle = 30;
var larm2Geo = new THREE.CylinderGeometry(0.07, 0.05, larmLength, 16);
var larm2 = new THREE.Mesh(larm2Geo, brownMaterial);
scene.add(larm2);
larm2.matrixAutoUpdate = false;

  //hand2
var hand2AngleX = 90;
var hand2AngleY = 0;
var hand2AngleZ = 0;
var hand2Geo = new THREE.SphereGeometry(0.07, 32, 32);
var hand2 = new THREE.Mesh(hand2Geo, brownMaterial);
scene.add(hand2);
hand2.matrixAutoUpdate = false;

  //dummy coordinate
var dummyGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.005, 16);
var dummy = new THREE.Mesh(spearbodyGeo, brownMaterial);
scene.add(dummy);
dummy.matrixAutoUpdate = false;

  //spearbody
var spearbodyLength = 3;
var spearbodyGeo = new THREE.CylinderGeometry(0.03, 0.03, spearbodyLength, 16);
var spearbody = new THREE.Mesh(spearbodyGeo, silverMaterial);
scene.add(spearbody);
spearbody.matrixAutoUpdate = false;

  //spearhead 
var spearheadGeo = new THREE.Geometry(); 
var v0 = new THREE.Vector3(0,0.2,0);
var v1 = new THREE.Vector3(-0.05,0,0.05);
var v2 = new THREE.Vector3(-0.05,0,-0.05);
var v3 = new THREE.Vector3(0.05,0,-0.05);
var v4 = new THREE.Vector3(0.05,0,0.05);

spearheadGeo.vertices.push(v0);
spearheadGeo.vertices.push(v1);
spearheadGeo.vertices.push(v2);
spearheadGeo.vertices.push(v3);
spearheadGeo.vertices.push(v4);

spearheadGeo.faces.push( new THREE.Face3( 1, 2, 3 ) );
spearheadGeo.faces.push( new THREE.Face3( 1, 4, 3 ) );
spearheadGeo.faces.push( new THREE.Face3( 2, 0, 1 ) );
spearheadGeo.faces.push( new THREE.Face3( 1, 0, 4 ) );
spearheadGeo.faces.push( new THREE.Face3( 4, 0, 3 ) );
spearheadGeo.faces.push( new THREE.Face3( 3, 0, 2 ) );
spearheadGeo.computeFaceNormals();
brownMaterial.side = THREE.DoubleSide;
var spearhead = new THREE.Mesh(spearheadGeo, silverMaterial);
scene.add(spearhead);
spearhead.matrixAutoUpdate = false;

  // Body
//   //tag
// var tagGeo = new THREE.SphereGeometry(0.2, 32, 32);
// var tag = new THREE.Mesh(tagGeo, brownMaterial);
// scene.add(tag);
// tag.matrixAutoUpdate = false;

loadOBJ('body','centaur/cent_no_legs_no_arms.obj',brownMaterial,1,0,0,0,0,0,0);

//////////////////////////////////////////////////////////////////
// printMatrix():  prints a matrix
//////////////////////////////////////////////////////////////////

function printMatrix(name,matrix) {       // matrices are stored column-major, although matrix.set() uses row-major
    console.log('Matrix ',name);
    var e = matrix.elements;
    console.log(e[0], e[4], e[8], e[12]);
    console.log(e[1], e[5], e[9], e[13]);
    console.log(e[2], e[6], e[10], e[14]);
    console.log(e[3], e[7], e[11], e[15]);
}

//////////////////////////////////////////////////////////////////
// setupBody():  build model Matrix for body, and then its children
//////////////////////////////////////////////////////////////////

// function setupTag(parentMatrix) {
//   tag.matrix.copy(parentMatrix);
//   tag.updateMatrixWorld();
// }

var bodyHeight=0.2;
var bodyAngle=0.0;
var bodyX = 0;
var bodyY = 0;
var bodyAngleZ = 0;
var turn = 0;
var turnx = 0;
var turny = 0;
function setupBody(parentMatrix) {
//  printMatrix("body parent",parentMatrix);
  body.matrix.copy(parentMatrix);     // copy the parent link transformation
  var turnAngle = turn*Math.PI/180.0;
  if (forward || backward) {
    turnx = Math.sin(turnAngle) * 0.2;
    turny = Math.cos(turnAngle) * 0.2;
    var sign = forward ? 1 : -1;
    bodyX += turnx * sign;
    bodyY += turny * sign; 
  }
  body.matrix.multiply(new THREE.Matrix4().makeTranslation(bodyX,0,bodyY));   
  body.matrix.multiply(new THREE.Matrix4().makeTranslation(0,bodyHeight,0)); 
  body.matrix.multiply(new THREE.Matrix4().makeRotationY(turnAngle)); 
  setupLeg1(body.matrix);
  setupLeg2(body.matrix);
  setupLeg3(body.matrix);
  setupLeg4(body.matrix);
  setupShoulder2(body.matrix);
  setupShoulder1(body.matrix);
  body.matrix.multiply(new THREE.Matrix4().makeScale(0.07,0.07,0.07));   // post multiply by scale matrix, to scale down body geometry
  body.updateMatrixWorld();         // force update of internal body.matrixWorld
}

//////////////////////////////////////////////////////////////////
// setupHead():  build model Matrix for head
//////////////////////////////////////////////////////////////////

var legAngle = -15;
var calfAngle = -15;

function setupShoulder1(parentMatrix) {
  shoulder1.matrix.copy(parentMatrix);
  shoulder1.matrix.multiply(new THREE.Matrix4().makeTranslation(0.25, 1.75, 0.3));
  shoulder1.matrix.multiply(new THREE.Matrix4().makeRotationZ(shoulder1AngleZ*Math.PI/180.0));
  shoulder1.matrix.multiply(new THREE.Matrix4().makeRotationY(shoulder1AngleY*Math.PI/180.0));
  shoulder1.matrix.multiply(new THREE.Matrix4().makeRotationX(shoulder1AngleX*Math.PI/180.0));
  setupArm1(shoulder1.matrix);
  shoulder1.updateMatrixWorld();
}

function setupArm1(parentMatrix) {
  uarm1.matrix.copy(parentMatrix);
  uarm1.matrix.multiply(new THREE.Matrix4().makeTranslation(0, -uarmLength/2, 0));
  setupElbow1(uarm1.matrix);
  uarm1.updateMatrixWorld();
}

function setupElbow1(parentMatrix) {
  elbow1.matrix.copy(parentMatrix);
  elbow1.matrix.multiply(new THREE.Matrix4().makeTranslation(0, -uarmLength/2, 0));
  elbow1.matrix.multiply(new THREE.Matrix4().makeRotationZ(elbow1AngleZ*Math.PI/180.0));
  elbow1.matrix.multiply(new THREE.Matrix4().makeRotationY(elbow1AngleY*Math.PI/180.0));
  elbow1.matrix.multiply(new THREE.Matrix4().makeRotationX(elbow1AngleX*Math.PI/180.0));
  setupLarm1(elbow1.matrix)
  elbow1.updateMatrixWorld();
}

function setupLarm1(parentMatrix) {
  larm1.matrix.copy(parentMatrix);
  larm1.matrix.multiply(new THREE.Matrix4().makeTranslation(0, -larmLength/2, 0));
  setupHand1(larm1.matrix);
  larm1.updateMatrixWorld();
}

function setupHand1(parentMatrix) {
  hand1.matrix.copy(parentMatrix);
  hand1.matrix.multiply(new THREE.Matrix4().makeTranslation(0, -larmLength/2, 0));
  hand1.updateMatrixWorld();
}

function setupShoulder2(parentMatrix) {
  shoulder2.matrix.copy(parentMatrix);
  shoulder2.matrix.multiply(new THREE.Matrix4().makeTranslation(-0.25, 1.75, 0.3));
  shoulder2.matrix.multiply(new THREE.Matrix4().makeRotationZ(shoulder2AngleZ*Math.PI/180.0));
  shoulder2.matrix.multiply(new THREE.Matrix4().makeRotationY(shoulder2AngleY*Math.PI/180.0));
  shoulder2.matrix.multiply(new THREE.Matrix4().makeRotationX(shoulder2AngleX*Math.PI/180.0));
  setupArm2(shoulder2.matrix);
  shoulder2.updateMatrixWorld();
}

function setupArm2(parentMatrix) {
  uarm2.matrix.copy(parentMatrix);
  uarm2.matrix.multiply(new THREE.Matrix4().makeTranslation(0, -uarmLength/2, 0));
  setupElbow2(uarm2.matrix);
  uarm2.updateMatrixWorld();
}

function setupElbow2(parentMatrix) {
  elbow2.matrix.copy(parentMatrix);
  elbow2.matrix.multiply(new THREE.Matrix4().makeTranslation(0, -uarmLength/2, 0));
  elbow2.matrix.multiply(new THREE.Matrix4().makeRotationZ(elbow2AngleZ*Math.PI/180.0));
  elbow2.matrix.multiply(new THREE.Matrix4().makeRotationY(elbow2AngleY*Math.PI/180.0));
  elbow2.matrix.multiply(new THREE.Matrix4().makeRotationX(elbow2AngleX*Math.PI/180.0));
  setupLarm2(elbow2.matrix)
  elbow2.updateMatrixWorld();
}

function setupLarm2(parentMatrix) {
  larm2.matrix.copy(parentMatrix);
  larm2.matrix.multiply(new THREE.Matrix4().makeTranslation(0, -larmLength/2, 0));
  setupHand2(larm2.matrix);
  larm2.updateMatrixWorld();
}

function setupHand2(parentMatrix) {
  hand2.matrix.copy(parentMatrix);
  hand2.matrix.multiply(new THREE.Matrix4().makeTranslation(0, -larmLength/2, 0));
  hand2.matrix.multiply(new THREE.Matrix4().makeRotationZ(hand2AngleZ*Math.PI/180.0));
  hand2.matrix.multiply(new THREE.Matrix4().makeRotationY(hand2AngleY*Math.PI/180.0));
  hand2.matrix.multiply(new THREE.Matrix4().makeRotationX(hand2AngleX*Math.PI/180.0));
  setupDummy(hand2.matrix);
  hand2.updateMatrixWorld();
}

var displaceY = 0;
var displaceZ = 0;
var spearpos = 3;
function setupDummy(parentMatrix) {
  dummy.matrix.copy(parentMatrix);
  dummy.matrix.multiply(new THREE.Matrix4().makeTranslation(0, displaceY, displaceZ));
  dummy.matrix.multiply(new THREE.Matrix4().makeTranslation(0, spearpos*spearbodyLength/4, 0));
  setupSpear(dummy.matrix);
  dummy.updateMatrixWorld();
}

var spearAngle = 0;
function setupSpear(parentMatrix) {
  spearbody.matrix.copy(parentMatrix);
  spearbody.matrix.multiply(new THREE.Matrix4().makeRotationX(spearAngle*Math.PI/180.0));
  setupSHead(spearbody.matrix);
  spearbody.updateMatrixWorld();
}

function setupSHead(parentMatrix) {
  spearhead.matrix.copy(parentMatrix);
  spearbody.matrix.multiply(new THREE.Matrix4().makeTranslation(0, -spearbodyLength/2, 0));
  spearhead.updateMatrixWorld();
}

function setupCalf1(parentMatrix) {
  calf1.matrix.copy(parentMatrix);
  calf1.matrix.multiply(new THREE.Matrix4().makeTranslation(0,0.025,0));
  calf1.matrix.multiply(new THREE.Matrix4().makeRotationX(calf1Angle*Math.PI/180.0));
  calf1.matrix.multiply(new THREE.Matrix4().makeTranslation(0, -calf1Length/2, 0));
  calf1.updateMatrixWorld();
}

function setupCalf2(parentMatrix) {
  calf2.matrix.copy(parentMatrix);
  calf2.matrix.multiply(new THREE.Matrix4().makeTranslation(0,0.025,0));
  calf2.matrix.multiply(new THREE.Matrix4().makeRotationX(calf2Angle*Math.PI/180.0));
  calf2.matrix.multiply(new THREE.Matrix4().makeTranslation(0, -calf2Length/2, 0));
  calf2.updateMatrixWorld();
}

function setupCalf3(parentMatrix) {
  calf3.matrix.copy(parentMatrix);
  calf3.matrix.multiply(new THREE.Matrix4().makeTranslation(0,0.025,0));
  calf3.matrix.multiply(new THREE.Matrix4().makeRotationX(calf3Angle*Math.PI/180.0 - Math.PI/10));
  calf3.matrix.multiply(new THREE.Matrix4().makeTranslation(0, -calf3Length/2, 0));
  calf3.updateMatrixWorld();
}

function setupCalf4(parentMatrix) {
  calf4.matrix.copy(parentMatrix);
  calf4.matrix.multiply(new THREE.Matrix4().makeTranslation(0,0.025,0));
  calf4.matrix.multiply(new THREE.Matrix4().makeRotationX(calf4Angle*Math.PI/180.0 - Math.PI/10));
  calf4.matrix.multiply(new THREE.Matrix4().makeTranslation(0, -calf4Length/2, 0));
  calf4.updateMatrixWorld();
}

function setupKnee1(parentMatrix) {
  knee1.matrix.copy(parentMatrix);
  knee1.matrix.multiply(new THREE.Matrix4().makeTranslation(0, -thigh1Length, 0));
  setupCalf1(knee1.matrix);
  knee1.updateMatrixWorld();
}

function setupKnee2(parentMatrix) {
  knee2.matrix.copy(parentMatrix);
  knee2.matrix.multiply(new THREE.Matrix4().makeTranslation(0, -thigh2Length, 0));
  setupCalf2(knee2.matrix);
  knee2.updateMatrixWorld();
}

function setupKnee3(parentMatrix) {
  knee3.matrix.copy(parentMatrix);
  knee3.matrix.multiply(new THREE.Matrix4().makeTranslation(0, -thigh3Length, 0));
  setupCalf3(knee3.matrix);
  knee3.updateMatrixWorld();
}

function setupKnee4(parentMatrix) {
  knee4.matrix.copy(parentMatrix);
  knee4.matrix.multiply(new THREE.Matrix4().makeTranslation(0, -thigh4Length, 0));
  setupCalf4(knee4.matrix);
  knee4.updateMatrixWorld();
}

function setupLeg1(parentMatrix) {
//  printMatrix("leg parent",parentMatrix);
  thigh1.matrix.copy(parentMatrix);     // copy the parent link transformation
  thigh1.matrix.multiply(new THREE.Matrix4().makeTranslation(-0.15,1.0,0.3));              // post multiply by translate matrix
  thigh1.matrix.multiply(new THREE.Matrix4().makeRotationX((thigh1Angle*Math.PI/180.0)));           // post multiply by rotation matrix
  setupKnee1(thigh1.matrix);
  thigh1.matrix.multiply(new THREE.Matrix4().makeTranslation(0,-0.5*thigh1Length,0));              // post multiply by translate matrix
  thigh1.updateMatrixWorld();         // force update of internal body.matrixWorld
}

function setupLeg2(parentMatrix) {
//  printMatrix("leg parent",parentMatrix);
  thigh2.matrix.copy(parentMatrix);     // copy the parent link transformation
  thigh2.matrix.multiply(new THREE.Matrix4().makeTranslation(0.15,1.0,0.3));              // post multiply by translate matrix
  thigh2.matrix.multiply(new THREE.Matrix4().makeRotationX((thigh2Angle*Math.PI/180.0)));           // post multiply by rotation matrix
  setupKnee2(thigh2.matrix);
  thigh2.matrix.multiply(new THREE.Matrix4().makeTranslation(0,-0.5*thigh2Length,0));              // post multiply by translate matrix
  thigh2.updateMatrixWorld();         // force update of internal body.matrixWorld
}

function setupLeg3(parentMatrix) {
//  printMatrix("leg parent",parentMatrix);
  thigh3.matrix.copy(parentMatrix);     // copy the parent link transformation
  thigh3.matrix.multiply(new THREE.Matrix4().makeTranslation(-0.13,1.0,-0.3));              // post multiply by translate matrix
  thigh3.matrix.multiply(new THREE.Matrix4().makeRotationX(thigh3Angle*Math.PI/180.0));           // post multiply by rotation matrix
  setupKnee3(thigh3.matrix);
  thigh3.matrix.multiply(new THREE.Matrix4().makeTranslation(0,-0.5*thigh3Length,0));              // post multiply by translate matrix
  thigh3.updateMatrixWorld();         // force update of internal body.matrixWorld
}

function setupLeg4(parentMatrix) {
//  printMatrix("leg parent",parentMatrix);
  thigh4.matrix.copy(parentMatrix);     // copy the parent link transformation
  thigh4.matrix.multiply(new THREE.Matrix4().makeTranslation(0.13,1.0,-0.3));              // post multiply by translate matrix
  thigh4.matrix.multiply(new THREE.Matrix4().makeRotationX(thigh4Angle*Math.PI/180.0));           // post multiply by rotation matrix
  setupKnee4(thigh4.matrix);
  setupCam(thigh4.matrix);
  thigh4.matrix.multiply(new THREE.Matrix4().makeTranslation(0,-0.5*thigh4Length,0));              // post multiply by translate matrix
  thigh4.updateMatrixWorld();         // force update of internal body.matrixWorld
}

function setupCam(parentMatrix) {
  cam2.matrix.copy(parentMatrix);
  var t2 = new THREE.Vector3(thigh2.matrix.elements[12], thigh2.matrix.elements[13], thigh2.matrix.elements[14]);
  cam2.lookAt(t2);
  cam2.matrix.multiply(new THREE.Matrix4().makeTranslation(0.0,-thigh4Length/2,0.5));
  cam2.matrix.multiply(new THREE.Matrix4().makeRotationY(Math.PI));
  cam2.updateMatrixWorld();
}

//////////////////////////////////////////////////////////////////
// updateWorld():  update all degrees of freedom, as needed, and recompute matrices
//////////////////////////////////////////////////////////////////

var clock = new THREE.Clock(true);

function updateWorld() {
  var modelMatrix = new THREE.Matrix4();
  modelMatrix.identity();
    // only start the matrix setup if the 'body' object has been loaded
  if (body != undefined) {   
    setupBody(modelMatrix);     
  }
}

//////////////////////////////////////////////////////////////////
//  checkKeyboard():   listen for keyboard presses
//////////////////////////////////////////////////////////////////

var keyboard = new THREEx.KeyboardState();
var mode = 0;
var ani = false;
var camSwitch = false;
var forward = false;
var backward = false;

function checkKeyboard() {
   body = scene.getObjectByName( 'body' );

    if (body != undefined) {
     body.matrixAutoUpdate = false;
    }
  forward = keyboard.pressed("W");
  backward = keyboard.pressed("S");
  for (var i=0; i<6; i++)
  {
    if (keyboard.pressed(i.toString()))
    {
      mode = i;
      break;
    }
  }
  switch(mode)
  {
    //add poses here:
    case 0:       // pose
      headAngle = 0;
      elbow2AngleX = -90;
      spearpos = 2
      camera.matrixAutoUpdate = true;
      break;     
    case 1:       // pose hind legs raised
      bodyHeight = 0.55;
      bodyAngle = 30;
      thigh1Angle = -45;
      thigh2Angle = -25;
      calf1Angle = 20;
      thigh3Angle = 30;
      thigh4Angle = 30;
      shoulder2AngleX = 30;
      shoulder2AngleZ = -30;
      elbow2AngleZ = -20;
      hand2AngleY = -80;
      hand2AngleZ = -40;
      hand2AngleX = 70;
      camera.matrixAutoUpdate = true;
      break;
    case 2:       // pose front legs raised
      bodyHeight = 0.22;
      bodyAngle = -20;
      thigh3Angle = 30;
      thigh4Angle = 30;
      thigh1Angle = -45;
      thigh2Angle = -25;
      shoulder1AngleX = -90;
      shoulder1AngleZ = -20;
      calf1Angle = 30;
      calf2Angle = 20;
      elbow2AngleZ = -100;
      camera.matrixAutoUpdate = true;
      break;
    case 3:      {     // animation
      if (prev != 3) {
        ani = !ani;
      }
    }
      break;
    case 4:  // camera moves with left hind leg and looks at front right leg
      if (prev != 4) {
        camSwitch = !camSwitch;
      }
      break;
    case 5:
      
      throwS();

      break;
    default:
      break;
  }
  prev = mode;
  if (ani) {
    animation();
  }
  // if (keyboard.pressed("W")) {
  //   bodyY += 0.08;
  //   camera.matrixAutoUpdate = true;
  // }
  // if (keyboard.pressed("S")) {
  //   bodyY -= 0.08;
  //   camera.matrixAutoUpdate = true;
  // }
  if (keyboard.pressed("R")) {
    bodyHeight = 0.2;
    bodyAngle = 0;
    thigh1Angle = 0;
    thigh2Angle = 0;
    thigh3Angle = 15;
    thigh4Angle = 15;
    calf1Angle = 0;
    calf2Angle = 0;
    calf3Angle = 0;
    calf4Angle = 0;
    shoulder1AngleX = 0;
    shoulder1AngleY = 0;
    shoulder1AngleZ = 10;
    shoulder2AngleX = 0;
    shoulder2AngleY = 0;
    shoulder2AngleZ = -60;
    elbow1AngleX = 0;
    elbow1AngleY = 0;
    elbow1AngleZ = 0;
    elbow2AngleX = 0;
    elbow2AngleY = 0;
    elbow2AngleZ = 60;
    hand2AngleX = 90;
    hand2AngleY = 0;
    hand2AngleZ = 0;
    spearpos = 3;
    spearAngle = 0;
    displaceY = 0;
    displaceZ = 0;
  }
  if (keyboard.pressed("T")) {
    stab();
  }
  if (keyboard.pressed("D")) {
    turn -= 5;
  }
  if (keyboard.pressed("A")) {
    turn += 5;
  }
}

  //animation
function animation() {
  var t = clock.getElapsedTime();
  thigh1Angle = 30*Math.sin(5*t) - 20;
  thigh2Angle = 30*Math.sin(5*t + 10) - 15;
  thigh3Angle = -20*Math.sin(5*t + 15) + 30;
  thigh4Angle = -20*Math.sin(5*t + 20) + 30;
  bodyHeight = 0.2*Math.sin(5*t) + 0.23;
  calf1Angle = 30*Math.sin(5*t) + 30;
  calf2Angle = 30*Math.sin(5*t + 5) + 30;
  calf3Angle = 25*Math.sin(5*t) - 25;
  calf4Angle = 25*Math.sin(5*t) - 25;
  camera.matrixAutoUpdate = true;
}

var gra = 0;
var totalY = 0;
var totalZ = 0;
function throwS() {
  displaceY += 0.1;
  displaceZ -= 0.05;
  shoulder1AngleX = -90;
  shoulder1AngleZ = -20;
  calf1Angle = 30;
  calf2Angle = 20;
  elbow2AngleZ = -100;
  spearAngle -= 1;
  if (displaceY >= 5.3) {
    displaceY = 5.3;
  }
  if (displaceZ <= -2.7) {
    displaceZ = -2.7;
  }
  if (spearAngle <= -51) {
    spearAngle = -51;
  }
  console.log(displaceZ);
  camera.matrixAutoUpdate = true;
}

function stab() {
  var t3 = clock.getElapsedTime();
  // if (t3 >= 0.916285) {
  //   t3 = 0;
  // }
  shoulder2AngleY -= 2;
  hand2AngleZ += 4;
  hand2AngleX += 4;
  shoulder2AngleZ = -45;
  if (hand2AngleZ >= 49.53) {
    hand2AngleZ = 49.53;
  }
  if (hand2AngleX >= 140) {
    hand2AngleX = 140;
  }
  if (shoulder2AngleY <= - 50) {
    shoulder2AngleY = -50;
  }
  console.log(shoulder2AngleY);
}


//////////////////////////////////////////////////////////////////
//  update()
//////////////////////////////////////////////////////////////////

function update() {
  
  mode = -1;
  checkKeyboard();
  if (camSwitch) {
    renderer.render(scene, cam2);
  } else {
    renderer.render(scene, camera);
  }
  updateWorld();
  requestAnimationFrame(update);     // this requests the next update call
}

update();     // launch an infinite drawing loop
