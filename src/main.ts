import * as THREE from 'three';

/**
 * handle page resize events
 */
window.addEventListener('resize', () => {
  return; // TODO:
  cameraWidth = parentElement.offsetWidth;
  cameraHeight = parentElement.offsetHeight;
  // cameraWidth = parentElement.getBoundingClientRect().width;
  // cameraHeight = parentElement.getBoundingClientRect().height;
  // cameraWidth = parentElement.clientWidth;
  // cameraHeight = parentElement.clientHeight;
  cameraAspect = cameraWidth / cameraHeight;
  camera.aspect = cameraAspect;

  camera.updateProjectionMatrix();
  renderer.setSize(cameraWidth, cameraHeight);
  // renderer.render(scene, camera);

  // camera.aspect = window.innerWidth / window.innerHeight;
  // camera.updateProjectionMatrix();
  // renderer.setSize(window.innerWidth, window.innerHeight);
});

const parentElement: HTMLDivElement = (document.getElementById('product-display') as HTMLDivElement)!;
// let cameraWidth: number = parentElement.offsetWidth;
// let cameraHeight: number = parentElement.offsetHeight;
let cameraWidth: number = window.innerWidth;
let cameraHeight: number = window.innerHeight;
let cameraAspect: number = cameraWidth / cameraHeight;
let documentHeight: number = Math.max(
  document.body.scrollHeight,
  document.body.offsetHeight,
  document.documentElement.clientHeight,
  document.documentElement.scrollHeight,
  document.documentElement.offsetHeight
);

const scene: THREE.Scene = new THREE.Scene();
const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, cameraAspect, 0.1, 1000);
camera.position.z = 5;

const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({alpha: true});
renderer.setClearColor(0xffffff, 0);  // alpha being the opacity (transparent desired here)
renderer.setSize(cameraWidth, cameraHeight);

// bind the renderer to the DOM
parentElement.appendChild(renderer.domElement);
// document.body.appendChild(renderer.domElement);

// const ambientLight = new THREE.AmbientLight( 0x404040 );  // soft white light
const ambientLight: THREE.AmbientLight = new THREE.AmbientLight(0x222222);  // more shadows
scene.add(ambientLight);

const directionalLight: THREE.DirectionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(0, 0, 6);
scene.add(directionalLight);

const textureLoader: THREE.TextureLoader = new THREE.TextureLoader();

const textureImages: Array<string> = [
  'public/system-shock-2-windows-side.jpeg',
  'public/system-shock-2-windows-side.jpeg',
  'public/system-shock-2-windows-top.jpeg',
  'public/system-shock-2-windows-bottom.jpeg',
  'public/system-shock-2-windows-front.jpeg',
  'public/system-shock-2-windows-back.jpeg',
];

const materials: Array<THREE.MeshLambertMaterial> = textureImages.map((image: string) => {
  return new THREE.MeshLambertMaterial({
    map: textureLoader.load(image),
  });
})

const geometry: THREE.BoxGeometry = new THREE.BoxGeometry(3, 4, 1);
const shape: THREE.Mesh = new THREE.Mesh(geometry, materials);
// shape.rotateX(0.4);
// shape.rotateY(0.4);
scene.add(shape);

function animate() {
  requestAnimationFrame(animate);

  // const currentTimeLine: number = (window.scrollY / documentHeight) * 12.5;  // full
  const currentTimeLine: number = (window.scrollY / documentHeight) * 6.25;  // half
  shape.rotation.set(0, currentTimeLine, 0);

  renderer.render(scene, camera);
}

animate();

export {};
