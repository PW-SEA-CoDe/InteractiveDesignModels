/**
 * This script contains a collection of Three lighting types and paradigms. Single lighting components are defined first, with more complicated multi-light setups listed later.
 * Call the preferred lighting type in model.js to load into the scene.
 */

// Modules Imports
import * as THREE from 'https://unpkg.com/three@0.164.1/build/three.module.js';
import SceneInit from './SceneInit';

const scene = SceneInit().scene

/**
 * Ambient Light. Best used as base lighting to get uniform light for scene.
 * 
 * @param {*} color string; rgb or hex value. Defines light color
 * @param {*} intensity float. Defines intensity of light
 * @returns {*} Dict: light(obj)
 */
export function AmbientLight(color, intensity) {
    let lColor, light
    lColor = new THREE.Color( color )
    light = new THREE.AmbientLight( lColor, intensity )

    return ({
        light: light,
    })
}

/**
 * Directional Light. Best used to emulate sun with focused light on model center
 * 
 * @param {*} color string; rgb or hex value. Defines light color
 * @param {*} intensity float. Defines light intensity
 * @param {*} pos dict; ints. Defines light position
 * @returns Dict: light(obj)
 */
export function DirectionalLight(color, intensity, pos) {
    let lColor, light
    lColor = new THREE.Color( color )
    light = new THREE.DirectionalLight( lColor, intensity )

    light.position.set( pos.x, pos.y, pos.z )
    light.castShadow = true
    light.shadow.mapSize.width = 1024 * 1
    light.shadow.mapSize.height = 1024 * 1
    light.shadow.camera.near = 0.5
    light.shadow.camera.fat = 10_000
    
    return ({
        light: light,
    })
}

/**
 * Spotlight. Best used to cast shadows and for focused lighting on objects.
 * 
 * @param {*} color string; rgb or hex value. Defines light color
 * @param {*} intensity float. Defines light intensity
 * @param {*} pos dict; ints. Defines light position
 * @param {*} angle int; factor of 2. Defines light spread, larger smaller number yields wider angle
 * @param {*} showHelper bool. Toggle if light helper is added to scene
 * @returns Dict: light(obj), helper(obj)
 */
export function Spotlight(color, intensity, pos, angle, showHelper) {
    let lColor, light, helper
    lColor = new THREE.Color( color )
    light = new THREE.SpotLight(lColor)
    helper = new THREE.SpotLightHelper(light,'#000000')

    light.position.set( pos.x, pos.y, pos.z )
    light.intensity = ( intensity )
    light.castShadow = true
    light.angle = Math.pi / ( angle )
    light.penumbra = 0.5
    light.decay = 1.0
    light.shadow.mapSize.width = 1024 * 1
    light.shadow.mapSize.height = 1024 * 1
    light.shadow.camera.near = 0.5
    light.shadow.camera.fat = 10_000
    helper.update()

    return ({
        light: light,
        helper: helper,
    })
}