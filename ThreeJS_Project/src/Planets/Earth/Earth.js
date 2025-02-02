import * as THREE from 'three';

export function createEarth(scene) {
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load('src/assets/Earth/Earth_Diffuse.jpg');
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;

  const geometry = new THREE.SphereGeometry(16, 64, 32);
  const material = new THREE.MeshBasicMaterial({ map: texture });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  return mesh;
}