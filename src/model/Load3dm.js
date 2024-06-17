/**
 * This script defines different import options for loading 3dm models into the scene. Call the preferred function in model.js to return the 3dm model as an object to be added into the scene.
 */

// Modules Imports
import * as THREE from 'https://unpkg.com/three@0.164.1/build/three.module.js';
import { Rhino3dmLoader } from 'https://unpkg.com/three@0.164.1/examples/jsm/loaders/3DMLoader.js';

const loader = new Rhino3dmLoader()
loader.setLibraryPath('https://cdn.jsdelivr.net/npm/rhino3dm@8.6.1/')

// 3DM Loader functions

/**
 * Fetch3DM: Loads 3dm model and returns model children and materials. Takes arguments to set if model receives or casts shadows.
 * 
 * @param {string} url string: filepath
 * @param {bool} castShadow  bool: True to cast shadows
 * @param {bool} receiveShadow boo: True to receive shadows
 * @returns {dict} dict: objects(array)
 */
export default async function Fetch3DM(url, castShadow, receiveShadow) {
    return new Promise((resolve, reject) => {
        let objects, object
        objects = []
        object = {
            object: null,       // Object
            children: null,     // Array
            material: null      // Array
        }

        loader.load( url, function(object) {
            let centerCalc, avgCenter
            centerCalc = {
                x: 0,
                y: 0,
                z: 0,
                l: 0
            }
            avgCenter = {
                x: 0,
                y: 0,
                z: 0
            }
            
            object.up = new THREE.Vector3(0,0,1)

            object.children.forEach(child => {
                child.castShadow = castShadow
                child.receiveShadow = receiveShadow
                child.geometry.computeBoundingSphere()
                centerCalc.x += child.geometry.boundingSphere.center.x
                centerCalc.y += child.geometry.boundingSphere.center.y
                centerCalc.z += child.geometry.boundingSphere.center.z
                centerCalc.l += 1
            })

            avgCenter.x = centerCalc.x / centerCalc.l
            avgCenter.y = centerCalc.y / centerCalc.l
            avgCenter.z = centerCalc.z / centerCalc.l

            console.log(object)
            console.log(avgCenter)

            resolve({
                object: object,
            })
        })
    }, function(error) {
        reject(error)
        console.log(error)
    })
}
