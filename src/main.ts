import * as THREE from 'three';

const scene = new THREE.Scene();
// scene.background = new THREE.Color( 0xff0000 );
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setClearColor( 0xffffff, 0 );  // alpha being the opacity (transparent desired here)
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );

const geometry = new THREE.CapsuleGeometry( 1, 2, 10, 50 );
const material = new THREE.MeshLambertMaterial({color: 0x00ff00});
const capsule = new THREE.Mesh(geometry, material);
scene.add(capsule);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);

  capsule.rotation.x += 0.01;
  capsule.rotation.y += 0.01;
  capsule.rotation.z += 0.01;

  renderer.render(scene, camera);
}

animate();

export {};
