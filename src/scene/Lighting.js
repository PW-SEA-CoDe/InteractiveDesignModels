/**
 * This script contains a collection of Three lighting types and paradigms. Single lighting components are defined first, with more complicated multi-light setups listed later.
 * Call the preferred lighting type in model.js to load into the scene. Functions return a dictionary containing light and any other useful items (light helper, etc.). To add light
 * call scene.add((LightTypee).light)
 */

// Modules Imports
import * as THREE from 'https://unpkg.com/three@0.164.1/build/three.module.js';


//Generic Light Types

/**
 * Ambient Light. Best used as base lighting to get uniform light for scene.
 * 
 * @param {string} color string: rgb or hex value. Defines light color
 * @param {float} intensity float: Defines intensity of light
 * @returns dict: light(obj)
 */
export function AmbientLight(color, intensity) {
    let lColor, light
    lColor = new THREE.Color( color )
    light = new THREE.AmbientLight( lColor, intensity )

    return ({
        light:  light,
    })
}

/**
 * Directional Light. Best used to emulate sun with focused light on model center
 * 
 * @param {string} color string: rgb or hex value. Defines light color
 * @param {float} intensity float: Defines light intensity
 * @param {dict} pos dict: ints. Defines light position
 * @param {bool} shadow bool: Toggle whether light casts shadow
 * @returns dict: light(obj)
 */
export function DirectionalLight(color, intensity, pos, shadow) {
    let lColor, light
    lColor = new THREE.Color( color )
    light = new THREE.DirectionalLight( lColor, intensity )

    light.position.set( pos.x, pos.y, pos.z )
    light.castShadow = shadow
    light.shadow.mapSize.width = 1024 * 1
    light.shadow.mapSize.height = 1024 * 1
    light.shadow.camera.near = 0.5
    light.shadow.camera.far = 10_000
    
    return ({
        light:  light,
    })
}

/**
 * Spotlight. Best used to cast shadows and for focused lighting on objects.
 * 
 * @param {string} color string: rgb or hex value. Defines light color
 * @param {float} intensity float: Defines light intensity
 * @param {dict} pos dict(ints): Defines light position
 * @param {int} angle int: factor of 2. Defines light spread, larger smaller number yields wider angle
 * @param {bool} shadow bool: Toggle whether light casts shadow
 * @param {bool} showHelper bool: Toggle if light helper is added to scene
 * @returns dict: light(obj), helper(obj)
 */
export function Spotlight(color, intensity, pos, angle, shadow, showHelper) {
    let lColor, light, helper
    lColor = new THREE.Color( color )
    light = new THREE.SpotLight(lColor)
    helper = new THREE.SpotLightHelper(light,'#000000')

    light.position.set( pos.x, pos.y, pos.z )
    light.intensity = ( intensity )
    light.castShadow = shadow
    light.angle = Math.pi / ( angle )
    light.penumbra = 0.5
    light.decay = 1.0
    light.shadow.mapSize.width = 1024 * 1
    light.shadow.mapSize.height = 1024 * 1
    light.shadow.camera.near = 0.5
    light.shadow.camera.far = 10_000
    helper.update()

    return ({
        light:  light,
        helper: helper,
    })
}

//Complex Lighting Paradigms