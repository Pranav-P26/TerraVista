import { useEffect } from "react";
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createEarth } from './Planets/Earth/Earth';

function App() {
  useEffect(() => {
    const EARTH_AXIAL_TILT = 23.5;
    const EARTH_ROTATION_SPEED = 360 / (24 * 60 * 60);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.set(0, 20, 100);

    const canvas = document.getElementById('myThreeJsCanvas');
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 10;
    controls.maxDistance = 500;
    controls.minPolarAngle = 0;
    controls.maxPolarAngle = Math.PI;
    controls.update();

    const earth = createEarth(scene);

    earth.rotation.x = THREE.MathUtils.degToRad(-EARTH_AXIAL_TILT);

    const clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();

      earth.rotation.y += THREE.MathUtils.degToRad(EARTH_ROTATION_SPEED) * delta;

      console.log(`Earth rotation: x=${THREE.MathUtils.radToDeg(earth.rotation.x)}, y=${THREE.MathUtils.radToDeg(earth.rotation.y)}`);

      controls.update();
      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    };
    animate();

    return () => {
      renderer.dispose();
      controls.dispose();
    };
  }, []);

  return (
    <>
      <div>
        <canvas id="myThreeJsCanvas" />
      </div>
    </>
  )
}

export default App;