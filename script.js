import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.154.0/build/three.module.js';

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75, // Field of view
  window.innerWidth / window.innerHeight, // Aspect ratio
  0.1, // Near clipping plane
  1000 // Far clipping plane
);
camera.position.z = 5;

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Texture Loader
const textureLoader = new THREE.TextureLoader();

// Add background picture
const backgroundTexture = textureLoader.load('./assets/background.jpg');
scene.background = backgroundTexture;

// Load planet Earth's texture
const earthTexture = textureLoader.load('./assets/earth.jpeg');

// Geometry and Material for the Earth
const earthGeometry = new THREE.SphereGeometry(1, 32, 32);
const earthMaterial = new THREE.MeshStandardMaterial({ map: earthTexture });
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(earth);

// Load Moon's texture
const moonTexture = textureLoader.load('./assets/moon.jpg');

// Geometry and Material for the Moon
const moonGeometry = new THREE.SphereGeometry(0.13, 32, 32);
const moonMaterial = new THREE.MeshStandardMaterial({ map: moonTexture });
const moon = new THREE.Mesh(moonGeometry, moonMaterial);

// Add the Moon to the scene
scene.add(moon);

// Lighting
const light = new THREE.PointLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

// Moon Orbit Variables
const moonOrbitRadius = 2; // Distance between the Earth and the Moon
let moonOrbitAngle = 0; // Initial angle for the Moon's orbit
const moonOrbitSpeed = 0.005; // Speed of the Moon's orbit

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Rotate the Earth
  earth.rotation.y += 0.002;

  // Update Moon's orbit
  moonOrbitAngle += moonOrbitSpeed;
  moon.position.x = earth.position.x + moonOrbitRadius * Math.cos(moonOrbitAngle);
  moon.position.z = earth.position.z + moonOrbitRadius * Math.sin(moonOrbitAngle);

  // Rotate the Moon
  moon.rotation.y += 0.01;

  // Render the scene
  renderer.render(scene, camera);
}

animate();

// Resize handler
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
