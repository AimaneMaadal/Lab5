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

//three js add soft light
function setLight() {
  //add a pointlight
  light2 = new THREE.PointLight(0xffffff, 1, 100);
  light2.position.set(0, 0, 0);
  light = new THREE.AmbientLight(0xffffff, 1);
  scene.add(light, light2);
}

function loadGLTF() {
  let balloonLoader = new THREE.GLTFLoader();
  balloonLoader.load('./model/donutv4.glb', (gltf) => {
    //load model and put it in Mesh variable
    Mesh = gltf.scene;
    Mesh.scale.set(0.5, 0.5, 0.5);
    Mesh.position.set(0, 6, 0);
    scene.add(Mesh);
  });

  //load second model

  balloonLoader.load('./model/cup2.glb', (gltf) => {
    Cup = gltf.scene;
    Cup.scale.set(0.5, 0.5, 0.5);
    Cup.position.set(0, -7, 0);
    scene.add(Cup);

  });

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

function animate2() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}


init();
setLight();
loadGLTF();
animate();
animate2();


window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});