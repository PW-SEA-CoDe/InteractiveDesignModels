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
            object.children.forEach(child => {
                console.log(child)
                console.log(child.userData.attributes)
                console.log(child.userData.attributes.groupIds)
                child.castShadow = castShadow
                child.receiveShadow = receiveShadow
            })

            resolve({
                object: object,
            })
        })
    }, function(error) {
        reject(error)
        console.log(error)
    })
}