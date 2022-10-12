import './style.css'
const renderer = new THREE.WebGLRenderer();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
const scene = new THREE.Scene();
let light;
let light2;
let Mesh = null;
let Cup = null;

function init() {
  scene.background = new THREE.Color('#FFF0CF');
  camera.position.set(0, 0, 20);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
}

function setLight() {
  light2 = new THREE.PointLight(0xffffff, 1, 100);
  light2.position.set(10, 30, 0);
  light = new THREE.AmbientLight(0xffffff, 1);
  scene.add(light, light2);
}

function loadGLTF() {
  let balloonLoader = new THREE.GLTFLoader();
  balloonLoader.load('./model/donut.gltf', (gltf) => {
    Mesh = gltf.scene;
    Mesh.scale.set(0.5, 0.5, 0.5);
    Mesh.position.set(0, 6, 0);
    scene.add(Mesh);
  });

  balloonLoader.load('./model/cup.gltf', (gltf) => {
    Cup = gltf.scene;
    Cup.scale.set(1, 1, 1);
    Cup.position.set(0, -7, 0);
    scene.add(Cup);

  });
}

//add cube
function addSprinkels() {
  for (let i = 0; i < 200; i++) {
    const geometry = new THREE.BoxGeometry(0.1, 0.35, 0.1);
    //random color
    const material = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff });
    const cube = new THREE.Mesh(geometry, material);
    let x = Math.random() * 30 - 15;
    let y = Math.random() * 20 + 10;
    let z = Math.random() * 20 - 1;
    cube.position.set(x, y, z);
    scene.add(cube);
  }
}


function animate() {
  requestAnimationFrame(animate);
  if (Mesh) {
    Mesh.rotation.x += 0.005;
    Mesh.rotation.y += 0.01;
  }
  if (Cup) {
    Cup.rotation.y += 0.005;
  }
  renderer.render(scene, camera);
}
function animateSprinkle() {
  requestAnimationFrame(animateSprinkle);
  //get all the cubes 
  let cubes = scene.children.filter((child) => child.type === 'Mesh');
  //loop through the cubes
  cubes.forEach((cube) => {
    cube.position.y -= 0.1;
  });
}

init();
setLight();
loadGLTF();
animate();
addSprinkels();
animateSprinkle();


window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

