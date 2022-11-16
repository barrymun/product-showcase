import * as THREE from 'three';

/**
 * handle page resize events
 */
window.addEventListener('resize', () => {
  cameraWidth = parentElement.offsetWidth;
  cameraHeight = parentElement.offsetHeight;
  cameraAspect = cameraWidth / cameraHeight;
  camera.aspect = cameraAspect;
  camera.updateProjectionMatrix();
  renderer.setSize(cameraWidth, cameraHeight);
  renderer.render(scene, camera);
});

const parentElement: HTMLDivElement = (document.getElementById('product-display') as HTMLDivElement)!;
let cameraWidth: number = parentElement.offsetWidth;
let cameraHeight: number = parentElement.offsetHeight;
let cameraAspect: number = cameraWidth / cameraHeight;

const scene: THREE.Scene = new THREE.Scene();
const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, cameraAspect, 0.1, 1000);
camera.position.z = 5;

const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({alpha: true});
renderer.setClearColor(0xffffff, 0);  // alpha being the opacity (transparent desired here)
renderer.setSize(cameraWidth, cameraHeight);


parentElement.appendChild(renderer.domElement);

// const ambientLight = new THREE.AmbientLight( 0x404040 );  // soft white light
const ambientLight: THREE.AmbientLight = new THREE.AmbientLight(0x222222);  // more shadows
scene.add(ambientLight);

const directionalLight: THREE.DirectionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(0, 0, 6);
scene.add(directionalLight);

// const geometry: THREE.CapsuleGeometry = new THREE.CapsuleGeometry(1, 2, 10, 50);
const geometry: THREE.BoxGeometry = new THREE.BoxGeometry(3.5, 5, 0.5);
const material: THREE.MeshLambertMaterial = new THREE.MeshLambertMaterial({color: 0x00ff00});
const shape: THREE.Mesh = new THREE.Mesh(geometry, material);
scene.add(shape);

function animate() {
  requestAnimationFrame(animate);

  shape.rotation.x += 0.01;
  shape.rotation.y += 0.01;
  shape.rotation.z += 0.01;

  renderer.render(scene, camera);
}

animate();

export {};
