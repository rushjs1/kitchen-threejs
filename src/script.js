import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import gsap from "gsap";

///
const canvas = document.querySelector("canvas.webgl");
//Scene
const scene = new THREE.Scene();

//fog?
//const fog = new THREE.Fog("#5c5a56", 10, 50);
//const fog = new THREE.Fog("#ff0000", 8, 100);
//const fog = new THREE.Fog("#c5c7c8", 10, 80);
const fog = new THREE.Fog("#ffffcc", 10, 80);
scene.fog = fog;

//textures time
const textureLoader = new THREE.TextureLoader();

const appleShadowTemplate = textureLoader.load("/simpleShadow.jpg");

const tileColorTexture = textureLoader.load("/textures/basecolor.jpg");
const tileAmbientOcclusionTexture = textureLoader.load(
  "/textures/ambientOcclusion.jpg"
);
const tileNormalTexture = textureLoader.load("/textures/normal.jpg");
const tileHeightTexture = textureLoader.load("/textures/height.png");
const tileRoughText = textureLoader.load("/textures/roughness.jpg");

//load counters textuers
const counterColorTexture = textureLoader.load("/wood/basecolor.jpg");

const counterAmbientOcclusionTexture = textureLoader.load(
  "/wood/ambientOcclusion.jpg"
);
const counterNormalTexture = textureLoader.load("/wood/normal.jpg");
const counterHeightTexture = textureLoader.load("/wood/height.png");
const counterRoughText = textureLoader.load("/wood/roughness.jpg");
//coutertop texture
const counterTopColorTexture = textureLoader.load("/marble/color.jpg");

const counterTopAmbientOcclusionTexture = textureLoader.load(
  "/marble/ambientOcclusion.jpg"
);
const counterTopNormalTexture = textureLoader.load("/marble/normal.jpg");
const counterTopHeightTexture = textureLoader.load("/marble/disp.png");
const counterTopRoughText = textureLoader.load("/marble/rough.jpg");

console.log(counterColorTexture);
//objec
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial({
    map: tileColorTexture,
    aoMap: tileAmbientOcclusionTexture,
    normalMap: tileNormalTexture,
    roughnessMap: tileRoughText,
    displacementMap: tileHeightTexture,
    displacementScale: 0.2
  })
);

/// i only knew these values cuz i saw it on github for someone who was using a planegeometery of 20,20 like i am.. so idk how this math works but ya
tileColorTexture.repeat.set(8, 8);
tileAmbientOcclusionTexture.repeat.set(8, 8);
tileRoughText.repeat.set(8, 8);
tileHeightTexture.repeat.set(8, 8);
tileNormalTexture.repeat.set(8, 8);

//S Wrapping
tileColorTexture.wrapS = THREE.RepeatWrapping;
tileAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping;
tileRoughText.wrapS = THREE.RepeatWrapping;
tileHeightTexture.wrapS = THREE.RepeatWrapping;
tileNormalTexture.wrapS = THREE.RepeatWrapping;
//t wrapping
tileColorTexture.wrapT = THREE.RepeatWrapping;
tileAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping;
tileRoughText.wrapT = THREE.RepeatWrapping;
tileHeightTexture.wrapT = THREE.RepeatWrapping;
tileNormalTexture.wrapT = THREE.RepeatWrapping;

floor.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2)
);

floor.rotation.x = -Math.PI * 0.5;

floor.position.y = 0;

scene.add(floor);

//counters

const countersGeo = new THREE.BoxGeometry(1, 1, 1);

const countersMat = new THREE.MeshStandardMaterial({
  map: counterColorTexture,
  aoMap: counterAmbientOcclusionTexture,
  displacementMap: counterHeightTexture,
  displacementScale: 0,
  roughnessMap: counterRoughText,
  normalMap: counterNormalTexture
});
const counter1 = new THREE.Mesh(countersGeo, countersMat);

counter1.scale.set(16, 2, 2);
counter1.position.set(-8.9, 1, -1.9);
counter1.rotation.y = Math.PI * 0.5;

const counter2 = new THREE.Mesh(countersGeo, countersMat);

counter2.scale.set(16, 2, 2);
counter2.position.set(8.9, 1, -1.9);
counter2.rotation.y = Math.PI * 0.5;
scene.add(counter1, counter2);

//how bout them countertops
const counterTopGeo = new THREE.BoxGeometry(1, 0.2, 1);
const counterTopMaterial = new THREE.MeshStandardMaterial({
  map: counterTopColorTexture,
  aoMap: counterTopAmbientOcclusionTexture,
  displacementMap: counterTopHeightTexture,
  displacementScale: 0,
  normalMap: counterTopNormalTexture,
  roughnessMap: counterTopNormalTexture
});

const counterTop1 = new THREE.Mesh(counterTopGeo, counterTopMaterial);
const counterTop2 = new THREE.Mesh(counterTopGeo, counterTopMaterial);
counterTop2.position.set(-8.9, 2.1, -1.9);
counterTop2.scale.set(2, 1, 16);
counterTop1.position.set(8.9, 2.1, -1.9);
counterTop1.scale.set(2, 1, 16);

scene.add(counterTop1, counterTop2);

//wallllls

const wallsGeo = new THREE.PlaneGeometry(1, 1, 1);
const wallsMaterial = new THREE.MeshStandardMaterial({
  map: tileColorTexture,
  aoMap: tileAmbientOcclusionTexture,
  normalMap: tileNormalTexture,
  roughnessMap: tileRoughText,
  displacementMap: tileHeightTexture,
  displacementScale: 0.2
});

const walls1 = new THREE.Mesh(wallsGeo, wallsMaterial);

walls1.position.set(0, 4, -10);
walls1.scale.set(20, 8, 1);

walls1.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(walls1.geometry.attributes.uv.array, 2)
);
const walls2 = new THREE.Mesh(wallsGeo, wallsMaterial);
walls2;
walls2.position.set(-10, 4, 0);
walls2.scale.set(20, 8, 1);
//walls2.rotation.y = (Math.PI - 0.5) / 0.004;
walls2.rotation.y = Math.PI / 2;

walls2.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(walls2.geometry.attributes.uv.array, 2)
);
scene.add(walls2, walls1);

///obj loader

const loader = new GLTFLoader();
loader.load("/furniture/models/gltfFormat/kitchenFridge.glb", gltf => {
  gltf.scene.scale.set(7, 6, 10);
  gltf.scene.position.set(1, 0.01, -7.1);
  gltf.scene.castShadow = true;
  scene.add(gltf.scene);
});

loader.load("/furniture/models/gltfFormat/kitchenStove.glb", gltf => {
  gltf.scene.scale.set(7, 5, 10);
  gltf.scene.position.set(-8, 0.01, -5.3);
  gltf.scene.castShadow = true;
  gltf.scene.receiveShadow = true;

  scene.add(gltf.scene);
});

loader.load("/furniture/models/gltfFormat/kitchenSink.glb", gltf => {
  gltf.scene.scale.set(7, 5, 10);
  gltf.scene.position.set(-5, 0.01, -5.3);
  gltf.scene.castShadow = true;
  gltf.scene.receiveShadow = true;

  scene.add(gltf.scene);
});
loader.load("furniture/models/gltfFormat/kitchenCabinet.glb", res => {
  res.scene.scale.set(7, 8, 6);
  res.scene.position.set(-2, 0.01, -7.2);
  res.scene.castShadow = true;
  res.scene.receiveShadow = true;
  scene.add(res.scene);
});

loader.load("/furniture/models/gltfFormat/kitchenBlender.glb", res => {
  res.scene.scale.set(6, 6, 6);
  res.scene.position.set(-1.5, 3.2, -8);
  res.scene.castShadow = true;
  scene.add(res.scene);
});
loader.load("furniture/models/gltfFormat/kitchenCabinetUpper.glb", glb => {
  glb.scene.scale.set(4.5, 6, 4);
  glb.scene.position.set(-8, 5, -9);
  glb.scene.castShadow = true;
  glb.scene.receiveShadow = true;

  scene.add(glb.scene);
});
loader.load("furniture/models/gltfFormat/kitchenCabinetUpper.glb", glb => {
  glb.scene.scale.set(4.5, 3, 4);
  glb.scene.position.set(-6.1, 5, -9);
  glb.scene.castShadow = true;
  glb.scene.receiveShadow = true;

  scene.add(glb.scene);
});
loader.load("furniture/models/gltfFormat/kitchenCabinetUpper.glb", glb => {
  glb.scene.scale.set(4.5, 3.2, 4);
  glb.scene.position.set(-6.1, 6.1, -9);
  glb.scene.castShadow = true;
  glb.scene.receiveShadow = true;

  scene.add(glb.scene);
});
loader.load(
  "/furniture/models/gltfFormat/kitchenCabinetUpperCorner.glb",
  glb => {
    glb.scene.scale.set(4.5, 8, 8);
    glb.scene.rotation.y = Math.PI / 2;
    glb.scene.position.set(-8.3, 4.2, -9);
    glb.scene.castShadow = true;
    glb.scene.receiveShadow = true;

    scene.add(glb.scene);
  }
);
loader.load("/furniture/models/gltfFormat/kitchenCoffeeMachine.glb", glb => {
  glb.scene.scale.set(8, 8, 8);
  glb.scene.position.set(-9.5, 2, -7);
  glb.scene.castShadow = true;
  scene.add(glb.scene);
});
loader.load("/furniture/models/gltfFormat/washerDryerStacked.glb", glb => {
  glb.scene.scale.set(6, 5.5, 8);
  glb.scene.position.set(5.5, 0.01, -7);
  glb.scene.castShadow = true;
  glb.scene.receiveShadow = true;

  scene.add(glb.scene);
});
loader.load("/furniture/models/gltfFormat/lampRoundFloor.glb", glb => {
  glb.scene.scale.set(6, 6, 6);
  glb.scene.position.set(-9, 0.01, 8);
  glb.scene.castShadow = true;
  scene.add(glb.scene);
});
loader.load("/furniture/models/gltfFormat/lampSquareTable.glb", glb => {
  glb.scene.scale.set(6, 6, 6);
  glb.scene.position.set(1.5, 5.6, -8);
  glb.scene.castShadow = true;
  scene.add(glb.scene);
});

loader.load("/furniture/models/gltfFormat/bear.glb", thing => {
  thing.scene.scale.set(6, 6, 6);
  thing.scene.rotation.y = Math.PI / 2;

  thing.scene.position.set(-8.5, 5, -2);
  thing.scene.castShadow = true;
  thing.scene.receiveShadow = true;
  scene.add(thing.scene);
});

loader.load("/furniture/models/gltfFormat/lampSquareTable.glb", thing => {
  thing.scene.scale.set(6, 6, 6);
  thing.scene.position.set(9, 2.2, -9);
  thing.scene.castShadow = true;
  scene.add(thing.scene);
});

///lights

const ambientLight = new THREE.AmbientLight("#b9b5ff", 0);

scene.add(ambientLight);

//cool moonlight effect with directional light
const moonLight = new THREE.DirectionalLight("#b9d5ff", 0.2);

moonLight.position.set(-4, 5, -2);
scene.add(moonLight);

const dirHelper = new THREE.DirectionalLightHelper(moonLight, 0.5);
//scene.add(dirHelper);

const directionalLight2 = new THREE.DirectionalLight("#fffcce", 0.5);
directionalLight2.position.set(4, 5, -6);
const dirHelp2 = new THREE.DirectionalLightHelper(directionalLight2);
//directionalLight2.lookAt(new Vector3(15, 5, 0));

const directionalLight = new THREE.DirectionalLight("#fffcce", -0.3);
directionalLight.position.set(-4, 5, 6);
const dirLightHelp3 = new THREE.DirectionalLightHelper(directionalLight);

directionalLight.lookAt(new THREE.Vector3(1, 6.7, -8));
scene.add(directionalLight2, directionalLight);

const dirLight3 = new THREE.DirectionalLight("#fffcce", 1);

const dirHelp3 = new THREE.DirectionalLightHelper(dirLight3, 0.2);
dirLight3.position.set(1, 5, 2);
//scene.add(dirLight3, dirHelp3);

const wallPointLight = new THREE.PointLight(0xdd9000, 1.5, 4.5);
wallPointLight.position.set(2, 6.7, -8.2);

const pointLightHelper = new THREE.PointLightHelper(wallPointLight);

wallPointLight.castShadow = true;
wallPointLight.shadow.mapSize.height = 1024;
wallPointLight.shadow.mapSize.width = 1024;
wallPointLight.shadow.camera.near = 0.1;
wallPointLight.shadow.camera.far = 5;

scene.add(wallPointLight);

const pl2 = new THREE.PointLight(0xdd9000, 2, 3.5);
const pl2Help = new THREE.PointLightHelper(pl2);

pl2.position.set(9.3, 3.5, -9.2);
scene.add(pl2);

const pl4 = new THREE.PointLight(0xdd9000, 2, 3.5);
const pl4Help = new THREE.PointLightHelper(pl4);
pl4.position.set(-9.4, 6.7, -3);
scene.add(pl4);

let flicker1 = 1;
const pl3 = new THREE.PointLight(0xdd9000, 2, 4.5, flicker1);
const pl3Help = new THREE.PointLightHelper(pl3);
pl3.position.set(-8.6, 3.8, 7.6);
scene.add(pl3);

//sizes

const sizes = {
  height: window.innerHeight,
  width: window.innerWidth
};

///shadowss
const appleShadow = new THREE.Mesh(
  new THREE.PlaneGeometry(1.5, 1.5, 1.5),
  new THREE.MeshBasicMaterial({
    color: "#000000",
    alphaMap: appleShadowTemplate,
    transparent: true,
    side: THREE.DoubleSide
  })
);
appleShadow.scale.set(0.5, 0.5, 0.5);
appleShadow.position.set(-0.5, 3.4, -8);
appleShadow.rotation.x = Math.PI / 2;

scene.add(appleShadow);

//ghosts
const ghost1 = new THREE.PointLight("#ff00ff", 2, 3);
//const ghost2 = new THREE.PointLight("#80ff92", 2, 3);
const ghost2 = new THREE.PointLight("#bfaa8f", 2, 3);
const ghost3 = new THREE.PointLight("#00ffff", 2, 3);
ghost1.position.set(0, 3.4, -8);
//ghost2.position.set(-3, 3.6, -8);
ghost3.position.set(0, 3.6, -8);
scene.add(ghost1, ghost2, ghost3);

//resize

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

//camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.x = 10;
camera.position.y = 12;
camera.position.z = 13;
scene.add(camera);

// add orbit controls
//allows for user to orbit camera, self explanitory
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

//lets try to timeout the flicker cuz it looks to obnoxous the other way
// three clock to reference when the user arraived
const clockForFlick = new THREE.Clock();

var flickerTimeID = setInterval(flickerTime, 50);

function flickerTime() {
  wallPointLight.decay = Math.random() * 40;
}

var stormyEffect = setInterval(stormTime, 100);
function stormTime() {
  ambientLight.intensity = Math.random() * 0.1;
  //directionalLight.intensity = Math.random() * 0.1;
}

var stormBrighter = setInterval(stormBrighTime, 10000);
function stormBrighTime() {
  directionalLight.intensity = Math.random() * 0.05;
}

//renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("canvas.webgl")
});
renderer.setClearColor("#262837");
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
renderer.shadowMap.enabled = true;

//idk if this worked or there just no light for a shadow, kinda dont feel like testing

floor.receiveShadow = true;

///animate

//THIS IS FOR GETTING THE ELAPSED TIME OF A USER BEING ON THE PAGE. EXTREMLY USEFUL FOR ANIMATIONS
const clock = new THREE.Clock();

loader.load("/food/models/gltfFormat/apple.glb", glb => {
  glb.scene.scale.set(2, 2, 2);
  glb.scene.position.set(-0.5, 3.3, -8);
  glb.scene.castShadow = true;

  scene.add(glb.scene);
  camera.lookAt(glb.scene);
  const tick = () => {
    const elapsed = clock.getElapsedTime();

    ////// THESE THREE LINES ARE WHAT WILL ALLOW USE CONTROLS TO CONTINOUSLY CHECK FOR EVENTS ON THE CANVAS, CLICKS YATTA YATTA, BUT WILL TELL OUR RENDER HEY WE NEED TO RENDER AGAIN. REQUESTANIMATOONFRAME WILL CONSTANTLY RUN THIS LOOP
    //update the controls
    controls.update();
    //glb.scene.position.x = Math.cos(elapsed) * 1;
    // glb.scene.position.y = Math.cos(elapsed) * 4;
    glb.scene.rotation.y = Math.sin(elapsed) * 4;
    glb.scene.position.y = Math.abs(Math.sin(elapsed)) + 3.5;

    //appleShadow.position.x = glb.scene.position.x;
    //appleShadow.position.y = glb.scene.position.y;
    ///appleShadow.position.z = glb.scene.position.z;

    appleShadow.material.opacity = -(1.4 - glb.scene.position.y) * 0.2;

    //move the ghosts around
    ///  Math cos + math sin to force the circle motion, while position . y will cause the dips with math sin

    const ghost2Angle = -elapsed * 0.4;

    ghost2.position.x = Math.cos(ghost2Angle) * 5;
    ghost2.position.z = Math.sin(ghost2Angle) * 4;
    ghost2.position.y = Math.sin(ghost2Angle) * Math.sin(elapsed);
    //ghost2.position.y = Math.random() + Math.sin(elapsed * 2);
    ghost2.position.y = Math.sin(elapsed * 1) + Math.sin(elapsed * 2.5);

    //const ghost1Angle = elapsed * 0.4;
    //ghost1.position.y = Math.cos(ghost2Angle) * 5;
    const ghost3Angle = -elapsed * 0.3;
    ghost3.position.y = Math.sin(ghost3Angle) * 2 + 4;

    //lets try to make that light flicker
    // pl3.decay = Math.random() * 10;

    camera.position.x = Math.cos(ghost3Angle) * 7 + Math.sin(elapsed * 0.12);
    //camera.position.y = Math.sin(elapsed) + 3;

    //camera.position.z =
    //Math.abs(Math.cos(ghost3Angle) * 7 + Math.sin(elapsed * 0.32)) + 6;

    //call renderer again

    renderer.render(scene, camera);

    //CALL FOR TH TICK TO RUN ON THE NEXT FRAME
    /// this is what will keep it going
    window.requestAnimationFrame(tick);
  };

  tick();
});

console.log("test");
