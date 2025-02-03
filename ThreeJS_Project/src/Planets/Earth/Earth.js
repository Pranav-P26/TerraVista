import * as THREE from "three";

export function createEarth(scene) {
  const EARTH_AXIAL_TILT = 23.5;
  const EARTH_ROTATION_SPEED = 360 / (24 * 60 * 60);
  const EARTH_RADIUS_KM = 6371;
  const SCALE_FACTOR = 1000;

  const earthRadius = EARTH_RADIUS_KM / SCALE_FACTOR;

  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load("src/assets/Earth/Earth_Diffuse.jpg");
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;

  const geometry = new THREE.SphereGeometry(earthRadius, 32, 32);
  const material = new THREE.MeshPhongMaterial({ map: texture });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  mesh.rotation.x = THREE.MathUtils.degToRad(-EARTH_AXIAL_TILT);

  const clock = new THREE.Clock();

  const animate = () => {
    const delta = clock.getDelta();
    mesh.rotation.y += 0.01; //THREE.MathUtils.degToRad(EARTH_ROTATION_SPEED) * delta;
    requestAnimationFrame(animate);
  };
  animate();

  return mesh;
}