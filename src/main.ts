import * as THREE from 'three';

/**
 * handle page resize events w.r.t. the renderer
 */
const handleResize = (): void => {
  cameraWidth = productElement.offsetWidth;
  cameraHeight = productElement.offsetHeight;
  cameraAspect = cameraWidth / cameraHeight;
  camera.aspect = cameraAspect;
  camera.updateProjectionMatrix();
  renderer.setSize(cameraWidth, cameraHeight);
};

/**
 * fade effect as the product starts to approach of the bottom of its scroll limit
 */
const productFadeEffect = (): void => {
  // start the fade effect at a given percentage of the product scroll area
  // in this case, the user would have to scroll down through the product container startPercentage %
  // before the fade effect could begin
  const startPercentage: number = 0.8;
  const sectionWhereFadeBegins: number = productDisplayElement.offsetHeight * startPercentage;
  const sectionWhereFadeEnds: number = productDisplayElement.offsetHeight;

  if (window.scrollY >= sectionWhereFadeBegins && window.scrollY <= sectionWhereFadeEnds) {
    let denominator: number = sectionWhereFadeEnds - sectionWhereFadeBegins;
    denominator = denominator > 0 ? denominator : 1;
    let numerator: number = sectionWhereFadeEnds - window.scrollY;
    numerator = numerator > 0 ? numerator : 1;
    let opacity = numerator / denominator;
    productElement.style.opacity = opacity.toString();
  } else if (window.scrollY < sectionWhereFadeBegins) {
    productElement.style.opacity = '1';
  } else if (window.scrollY > sectionWhereFadeEnds) {
    productElement.style.opacity = '0';
  }
};

// event listeners
window.addEventListener('resize', handleResize);
window.addEventListener('scroll', productFadeEffect);

const productDisplayElement: HTMLDivElement = (document.getElementById('product-display') as HTMLDivElement)!;
const productElement: HTMLDivElement = (document.getElementById('product') as HTMLDivElement)!;
let cameraWidth: number = productElement.offsetWidth;
let cameraHeight: number = productElement.offsetHeight;
let cameraAspect: number = productElement.offsetWidth / productElement.offsetHeight;

const scene: THREE.Scene = new THREE.Scene();
const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, cameraAspect, 0.1, 1000);
camera.position.z = 5.5;

const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({alpha: true});
renderer.setClearColor(0xffffff, 0);  // alpha being the opacity (transparent desired here)
renderer.setSize(cameraWidth, cameraHeight);

// bind the renderer to the DOM
productElement.appendChild(renderer.domElement);

// const ambientLight = new THREE.AmbientLight( 0x404040 );  // soft white light
const ambientLight: THREE.AmbientLight = new THREE.AmbientLight(0x222222);  // more shadows
scene.add(ambientLight);

const directionalLight: THREE.DirectionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(0, 0, 6);
scene.add(directionalLight);

const textureLoader: THREE.TextureLoader = new THREE.TextureLoader();
const textureImages: Array<string> = [
  '/system-shock-2-windows-side.jpeg',
  '/system-shock-2-windows-side.jpeg',
  '/system-shock-2-windows-top.jpeg',
  '/system-shock-2-windows-bottom.jpeg',
  '/system-shock-2-windows-front.jpeg',
  '/system-shock-2-windows-back.jpeg',
];
const materials: Array<THREE.MeshLambertMaterial> = textureImages.map((image: string) => {
  return new THREE.MeshLambertMaterial({
    map: textureLoader.load(image),
  });
})

const geometry: THREE.BoxGeometry = new THREE.BoxGeometry(3, 4, 1);
const shape: THREE.Mesh = new THREE.Mesh(geometry, materials);
// shape.rotateX(10.4);
// shape.rotateY(10.4);
scene.add(shape);

const offsetX: number = 0;
const offsetY: number = 0.04;
const offsetZ: number = 0.02;

function animate() {
  requestAnimationFrame(animate);

  const position: number = window.scrollY / productDisplayElement.offsetHeight;
  const x: number = (position * Math.PI * -0.15) + offsetX;
  const y: number = (position * Math.PI * 2) + offsetY;
  shape.rotation.set(x, y, offsetZ);

  renderer.render(scene, camera);
}

animate();

export {};
