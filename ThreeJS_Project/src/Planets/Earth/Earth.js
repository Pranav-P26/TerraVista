import * as THREE from "three";

export function createEarth(scene) {
  const EARTH_RADIUS_KM = 6371;
  const SCALE_FACTOR = 1000; // Adjusted scale factor to a more reasonable value

  const earthRadius = EARTH_RADIUS_KM / SCALE_FACTOR;

  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load("src/assets/Earth/Earth_Diffuse.jpg");
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;

  const geometry = new THREE.SphereGeometry(earthRadius, 32, 32);
  const material = new THREE.MeshBasicMaterial({ map: texture });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  return mesh;
}