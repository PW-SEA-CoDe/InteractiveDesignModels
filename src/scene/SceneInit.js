/**
 * This script initializes the core Three scene components. Call the SceneInit function in model.js to reference the component variables for use.
 */

// Modules Imports
import * as THREE from "three"; //Used for text complete, replace this with unpkg module on build
//import * as THREE from 'https://unpkg.com/three@0.164.1/build/three.module.js';
import { OrbitControls } from "https://unpkg.com/three@0.164.1/examples/jsm/controls/OrbitControls.js";

export default function SceneInit() {
  // Reference scene html container
  const sceneContainer = document.getElementById("scene");
  const sceneWidth = sceneContainer.clientWidth;
  const sceneHeight = sceneContainer.clientHeight;

  // Core Three sceme components
  const scene = new THREE.Scene();
  scene.up = new THREE.Vector3(0, 0, 1);
  scene.name = "Main_Scene";

  const renderer = new THREE.WebGLRenderer({
    antialias: true, // Pixel smoothing
    alpha: true, // Transparent scene background
  });
  renderer.setSize(sceneWidth, sceneHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Other options available but PCF represents best balance of quality & performance

  sceneContainer.append(renderer.domElement);

  const camera = new THREE.PerspectiveCamera(
    60, // Field of View
    sceneWidth / sceneHeight, // Aspect Ratio
    0.1, // Near Clipping
    10_000 // Far Clipping
  );
  camera.up = new THREE.Vector3(0, 0, 1);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target = new THREE.Vector3(0, 0, 0);
  controls.enableDamping = true; // Damping for smooth camera movement
  controls.dampingFactor = 0.05; // Damping strength, 1 is max 0 is min

  console.log(scene);
  console.log(controls);

  return {
    scene: scene,
    sceneContainer: sceneContainer,
    renderer: renderer,
    camera: camera,
    controls: controls,
  };
}
