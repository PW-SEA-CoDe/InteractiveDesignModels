/**
 * Defines Three Raycaster, and supporting variables. Call PointerHover in model.js
 */

// Modules Imports
import * as THREE from "three"; //Used for text complete, replace this with unpkg module on build
//import * as THREE from 'https://unpkg.com/three@0.164.1/build/three.module.js';

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

/**
 *
 * @param {event} event     event: pass event listener to function
 * @param {object} target   objects: desired objects for raycaster to interact with
 * @param {object} camera   object: scene camera
 * @returns                 dict: object(first intersected object)
 */
export function PointerHover(event, target, camera) {
  let intersected,
    firstIntersected = null;
  let x, y;
  x = (-window.innerWidth / 2 + event.clientX) / (window.innerWidth / 2);
  y = (window.innerHeight / 2 - event.clientY) / (window.innerHeight / 2);

  pointer.x = x;
  pointer.y = y;

  raycaster.setFromCamera(pointer, camera);

  intersected = raycaster.intersectObjects(target, true);
  if (intersected.length > 0) {
    firstIntersected = intersected[0].object;
  } else {
    firstIntersected = null;
  }
  return {
    object: firstIntersected,
  };
}
