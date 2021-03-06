/////////////////////////////////////////////////////////////////////////////////////////
//  Assignment 0 Template
/////////////////////////////////////////////////////////////////////////////////////////

console.log('Assignment 1 (Haoran Wang)');

a=4;
b=5;
function go() {
  var a = 14;
  b = 15; }
go();
console.log('a=',a,'b=',b);

//  another print example
myvector = new THREE.Vector3(0,1,2);
console.log('myvector =',myvector);

// SETUP RENDERER & SCENE
var canvas = document.getElementById('canvas');
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0x87CEFA); // set background colour
canvas.appendChild(renderer.domElement);

// SETUP CAMERA
var camera = new THREE.PerspectiveCamera(30,1,0.1,1000); // view angle, aspect ratio, near, far
camera.position.set(0,12,20);
camera.lookAt(0,0,0);
scene.add(camera);

// SETUP ORBIT CONTROLS OF THE CAMERA
var controls = new THREE.OrbitControls(camera);
controls.damping = 0.2;
controls.autoRotate = false;

// ADAPT TO WINDOW RESIZE
function resize() {
  renderer.setSize(window.innerWidth,window.innerHeight);
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
}

// EVENT LISTENER RESIZE
window.addEventListener('resize',resize);
resize();

//SCROLLBAR FUNCTION DISABLE
window.onscroll = function () {
     window.scrollTo(0,0);
   }

/////////////////////////////////////	
// ADD LIGHTS  and define a simple material that uses lighting
/////////////////////////////////////	

light = new THREE.PointLight(0xFFFF00);
light.position.set(0,4,2);
scene.add(light);
ambientLight = new THREE.AmbientLight(0x606060);
scene.add(ambientLight);

var diffuseMaterial = new THREE.MeshLambertMaterial( {color: 0xffffff} );
var diffuseMaterial2 = new THREE.MeshLambertMaterial( {color: 0xffffff, side: THREE.DoubleSide } );
var basicMaterial = new THREE.MeshBasicMaterial( {color: 0xff0000} );

///////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////  OBJECTS /////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////	
// WORLD COORDINATE FRAME
/////////////////////////////////////	

var worldFrame = new THREE.AxisHelper(5) ;
scene.add(worldFrame);


/////////////////////////////////////	
// FLOOR with texture
/////////////////////////////////////	

floorTexture = new THREE.ImageUtils.loadTexture('images/floor.jpg');
floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(1, 1);
floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.DoubleSide });
floorGeometry = new THREE.PlaneBufferGeometry(15, 15);
floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.position.y = -1.1;
floor.rotation.x = Math.PI / 2;
scene.add(floor);

///////////////////////////////////////////////////////////////////////
//   sphere, representing the light 
///////////////////////////////////////////////////////////////////////

sphereGeometry = new THREE.SphereGeometry(0.3, 32, 32);    // radius, segments, segments
redSphere = new THREE.MeshBasicMaterial({color: 0xFFFF00});
sphere = new THREE.Mesh(sphereGeometry, redSphere);
sphere.position.set(0,4,2);
sphere.position.set(light.position.x, light.position.y, light.position.z);
scene.add(sphere);

///////////////////////////////////////////////////////////////////////
//   box
///////////////////////////////////////////////////////////////////////

boxGeometry1 = new THREE.BoxGeometry( 1, 1, 1 );    // width, height, depth
boxGeometry2 = new THREE.BoxGeometry( 1, 1, 1 ); 
boxGeometry3 = new THREE.BoxGeometry( 1, 1, 1 ); 
var diffuseMaterial3 = new THREE.MeshLambertMaterial( {color: 0xFFFFFF, side: THREE.DoubleSide } );
var diffuseMaterial4 = new THREE.MeshLambertMaterial( {color: 0x008000, side: THREE.DoubleSide } );
var diffuseMaterial5 = new THREE.MeshLambertMaterial( {color: 0xFFFF00, side: THREE.DoubleSide } );
box1 = new THREE.Mesh( boxGeometry1, diffuseMaterial3 );
box1.position.set(-4, 0, 0);
box2 = new THREE.Mesh( boxGeometry2, diffuseMaterial4 );
box2.position.set(-4, 1, 0);
box2.rotation.set(0, Math.PI/3, 0)
box3 = new THREE.Mesh( boxGeometry3, diffuseMaterial5 );
box3.position.set(-4, 2, 0);
box3.rotation.set(0, 2*Math.PI/3, 0)

scene.add( box1 );
scene.add( box2 );
scene.add( box3 );

///////////////////////////////////////////////////////////////////////
//  mcc:  multi-colour cube     [https://stemkoski.github.io/Three.js/HelloWorld.html] 
///////////////////////////////////////////////////////////////////////

  // Create an array of materials to be used in a cube, one for each side
var cubeMaterialArray = [];
  // order to add materials: x+,x-,y+,y-,z+,z-
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xff3333 } ) );
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xff8800 } ) );
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xffff33 } ) );
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x33ff33 } ) );
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x3333ff } ) );
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x8833ff } ) );
var mccMaterials = new THREE.MeshFaceMaterial( cubeMaterialArray );
  // Cube parameters: width (x), height (y), depth (z), 
  //        (optional) segments along x, segments along y, segments along z
var mccGeometry = new THREE.BoxGeometry( 1.5, 1.5, 1.5, 1, 1, 1 );
// using THREE.MeshFaceMaterial() in the constructor below
// causes the mesh to use the materials stored in the geometry
mcc = new THREE.Mesh( mccGeometry, mccMaterials );
mcc.position.set(-2,0,0);
scene.add( mcc );	

/////////////////////////////////////////////////////////////////////////
// cylinder
/////////////////////////////////////////////////////////////////////////

// parameters:    
//    radiusAtTop, radiusAtBottom, height, segmentsAroundRadius, segmentsAlongHeight, segmentsAlongHeight
cylinderGeometry = new THREE.CylinderGeometry( 0.25, 0.25, 1.8, 20, 4 );
cylinder = new THREE.Mesh( cylinderGeometry, diffuseMaterial);
cylinder.position.set(2.4, 1, 0);
scene.add( cylinder );
headGeo = new THREE.SphereGeometry(0.25, 32, 32);
head = new THREE.Mesh(headGeo, diffuseMaterial);
head.position.set(2.4, 2.2, 0);
scene.add(head);
limbGeometry = new THREE.CylinderGeometry( 0.15, 0.15, 1.5, 20, 4 );
leg1 = new THREE.Mesh(limbGeometry, diffuseMaterial);
leg1.position.set(2.85, -0.5, 0);
leg1.rotation.set(0, 0, Math.PI/6);
leg2 = new THREE.Mesh(limbGeometry, diffuseMaterial);
leg2.position.set(2.00, -0.5, 0);
leg2.rotation.set(0, 0, -Math.PI/6);
arm1 = new THREE.Mesh(limbGeometry, diffuseMaterial);
arm1.position.set(1.85, 1.9, 0);
arm1.rotation.set(0, 0, Math.PI/6);
arm2 = new THREE.Mesh(limbGeometry, diffuseMaterial);
arm2.position.set(2.95, 1.9, 0);
arm2.rotation.set(0, 0, -Math.PI/6);
scene.add(leg1);
scene.add(leg2);
scene.add(arm1);
scene.add(arm2);
/////////////////////////////////////////////////////////////////////////
// cone
/////////////////////////////////////////////////////////////////////////

// parameters:    
//    radiusAtTop, radiusAtBottom, height, segmentsAroundRadius, segmentsAlongHeight, segmentsAlongHeight
coneGeometry = new THREE.CylinderGeometry( 0.0, 0.30, 0.80, 20, 4 );
cone = new THREE.Mesh( coneGeometry, diffuseMaterial);
cone.position.set(4, 0, 0);
scene.add( cone);

/////////////////////////////////////////////////////////////////////////
// torus
/////////////////////////////////////////////////////////////////////////

// parameters:   radius of torus, diameter of tube, segments around radius, segments around torus
torusGeometry = new THREE.TorusGeometry( 1.2, 0.4, 10, 20 );
torus = new THREE.Mesh( torusGeometry, diffuseMaterial);
torus.position.set(6, 0, 0);   // translation
torus.rotation.set(0,0,0);     // rotation about x,y,z axes
torus2 = new THREE.Mesh( torusGeometry, diffuseMaterial);
torus2.position.set(4.5, 0, 0);
torus2.rotation.set(Math.PI/2,0,0);
scene.add( torus );
scene.add( torus2 );

/////////////////////////////////////
//  CUSTOM OBJECT 
////////////////////////////////////

var geom = new THREE.Geometry(); 
var v0 = new THREE.Vector3(0,0,0);
var v1 = new THREE.Vector3(3,0,0);
var v2 = new THREE.Vector3(0,0,3);
var v3 = new THREE.Vector3(3,0,3);
var v4 = new THREE.Vector3(1.5,3,1.5);

geom.vertices.push(v0);
geom.vertices.push(v1);
geom.vertices.push(v2);
geom.vertices.push(v3);
geom.vertices.push(v4);

geom.faces.push( new THREE.Face3( 0, 1, 2 ) );
geom.faces.push( new THREE.Face3( 1, 3, 2 ) );
geom.faces.push( new THREE.Face3( 4, 0, 2 ) );
geom.faces.push( new THREE.Face3( 4, 2, 3 ) );
geom.faces.push( new THREE.Face3( 4, 1, 3 ) );
geom.faces.push( new THREE.Face3( 4, 0, 1 ) );
geom.computeFaceNormals();

customObject = new THREE.Mesh( geom, diffuseMaterial2 );
customObject.position.set(-1.5, 0, -4);
customObject.material.color.setHex(0xFFA500);
scene.add(customObject);

/////////////////////////////////////////////////////////////////////////////////////
//  disco ball
/////////////////////////////////////////////////////////////////////////////////////

var sph = new THREE.SphereGeometry(0.6, 32, 32);
var mat = new THREE.MeshPhongMaterial();
mat.map = THREE.ImageUtils.loadTexture('discal ball_Haoran Wang_505029637.jpg');
mat.transparent = true;
mat.side = THREE.doubleSided;
mat.depthWrite = false;
var disco = new THREE.Mesh(sph, mat);
disco.position.set(0, 5, 0);
scene.add(disco);
animate();
disco_light = new THREE.PointLight(0xFFFF00);
disco_light.position.set(0, 5, 0);
scene.add(disco_light);

/////////////////////////////////////////////////////////////////////////////////////
//  ARMADILLO
/////////////////////////////////////////////////////////////////////////////////////

// MATERIALS
var armadilloMaterial = new THREE.ShaderMaterial();

// LOAD SHADERS
var shaderFiles = [
  'glsl/armadillo.vs.glsl',
  'glsl/armadillo_Haoran Wang_505029637.fs.glsl'
];

new THREE.SourceLoader().load(shaderFiles, function(shaders) {
  armadilloMaterial.vertexShader = shaders['glsl/armadillo.vs.glsl'];
  armadilloMaterial.fragmentShader = shaders['glsl/armadillo_Haoran Wang_505029637.fs.glsl'];
})


//   NOTE:  Unfortunately, the following loading code does not easily allow for multiple 
//          instantiations of the OBJ geometry.

function loadOBJ(file, material, scale, xOff, yOff, zOff, xRot, yRot, zRot) {
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
    object.parent = worldFrame;
    scene.add(object);

  }, onProgress, onError);
}

  // now load the actual armadillo
loadOBJ('obj/armadillo.obj', armadilloMaterial, 1, 0,0,0, 0,Math.PI,0);

///////////////////////////////////////////////////////////////////////////////////////
// LISTEN TO KEYBOARD
///////////////////////////////////////////////////////////////////////////////////////

var keyboard = new THREEx.KeyboardState();
function checkKeyboard() {
  if (keyboard.pressed("W")) {
    if (light.position.y > 5) {
      return;
    }else {
      console.log('W pressed');
      light.position.y += 0.1;
    }
  } else if (keyboard.pressed("S")) {
      if (light.position.y < -5) {
        return;
      }else {
        light.position.y -= 0.1;
      }
  }
  if (keyboard.pressed("A")) {
    if (light.position.x < -5) {
      return;
    }else {
      light.position.x -= 0.1;
    }
  }
  else if (keyboard.pressed("D")) {
    if (light.position.x > 5) {
      return;
    }else {
      light.position.x += 0.1;
    }
  }
  sphere.position.set(light.position.x, light.position.y, light.position.z);
}

///////////////////////////////////////////////////////////////////////////////////////
// UPDATE CALLBACK
///////////////////////////////////////////////////////////////////////////////////////

function update() {
  checkKeyboard();
  requestAnimationFrame(update);
  renderer.render(scene, camera);
}

update();

///////////////////////////////////////////////////////////////////////////////////////
// ANIMATION
///////////////////////////////////////////////////////////////////////////////////////
function animate() {
    requestAnimationFrame(animate);
    disco.rotation.y += 0.005;
}