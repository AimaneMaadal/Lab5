import * as THREE from "https://threejsfundamentals.org/threejs/resources/threejs/r122/build/three.module.js";
import { OrbitControls } from "https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/controls/OrbitControls.js";
import { TextureLoader } from "three";
import { GLTFLoader } from "https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/loaders/GLTFLoader.js";

import "./style.css";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//add orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 0;
controls.maxDistance = 100;

// add ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// add directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

// add light helper
const lightHelper = new THREE.DirectionalLightHelper(directionalLight);
// scene.add(lightHelper);

// load texture
const textureLoader = new THREE.TextureLoader();
const starTexture = textureLoader.load("/textures/galaxy.webp");


// add cube
const geometry = new THREE.TorusGeometry( 5, 2, 8, 50 );
const material = new THREE.MeshLambertMaterial({ color: 0xffaaee });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// load gltf
let robot;
const gltfLoader = new GLTFLoader();
gltfLoader.load("/models/robot/scene.gltf", (gltf) => {
  scene.add(gltf.scene);
  robot = gltf.scene;
  scene.position.set(0, 0, 0);
    //loop over meshes
  gltf.scene.traverse((child) => {
    if (child.isMesh) {
      child.material.color.set(0x00ff00);
    }
  });
});

const earthTexture = textureLoader.load("/textures/earth.png");

const addEarth = (x,y,z) => {
  const earthGeometry = new THREE.SphereGeometry(2, 16, 32);
  const earthMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFFF });
  const earth = new THREE.Mesh(earthGeometry, earthMaterial);
  //load texture
  
  earth.position.set(x, y, z);
  
  earthMaterial.map = earthTexture;
  scene.add(earth);
};

for (let i = 0; i < 100; i++) {
  const x = Math.random() * 100 -50;
  const y = Math.random() * 100 -50;
  const z = Math.random() * 50 -25;
  addEarth(x, y, z);
}


addEarth(0,0,0);

camera.position.z = 5;
controls.update();

function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();




document.querySelector('.recolor').addEventListener('click', () => {
  robot.traverse((child) => {
    if (child.isMesh) {
      child.material.color.set(0x00ffff);
    }
  });
});