/**
 * This script contains a collection of Three lighting types and paradigms. Single lighting components are defined first, with more complicated multi-light setups listed later.
 * Call the preferred lighting type in model.js to load into the scene. Functions return a dictionary containing light and any other useful items (light helper, etc.). To add light
 * call scene.add((LightTypee).light)
 */

// Modules Imports
import * as THREE from 'three';         //Used for text complete, replace this with unpkg module on build
//import * as THREE from 'https://unpkg.com/three@0.164.1/build/three.module.js';


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
    let sDetail = 1
    lColor = new THREE.Color( color )
    light = new THREE.DirectionalLight( lColor, intensity )

    light.position.set( pos.x, pos.y, pos.z )
    light.castShadow = shadow
    light.shadow.mapSize.width = 1024 * sDetail           // LOD for shadows
    light.shadow.mapSize.height = 1024 * sDetail          // LOD for shadows
    light.shadow.camera.near = 0.5
    light.shadow.camera.far = 10_000
    
    return ({
        light:  light,
    })
}

/**
 * 
 * @param {*} color string: rgb or hex value. Defines light color
 * @param {*} intensity float: Defines light intensity
 * @param {*} range float: Defines distance light is visible
 * @param {*} pos dict(ints): Defines light position
 * @param {*} shadow bool: Toggle whether light casts shadow
 * @returns 
 */
export function PointLight(color, intensity, range, pos, shadow) {
    let lColor, light, sDetail, helper
    lColor = new THREE.Color( color )
    light = new THREE.PointLight(lColor, intensity, range)
    helper = new THREE.Mesh(
        new THREE.SphereGeometry( 15, 32, 16),
        new THREE.MeshBasicMaterial({color: color})
    )
    sDetail = 1
    light.up = new THREE.Vector3(0,0,1)
    light.position.set( pos.x, pos.y, pos.z )
    light.castShadow = shadow
    light.decay = 1.0
    light.shadow.mapSize.width = (1024 * sDetail)         // LOD for shadows
    light.shadow.mapSize.height = (1024 * sDetail)        // LOD for shadows
    light.shadow.camera.near = 0.5
    light.shadow.camera.far = 10_000
    helper.position.set( pos.x, pos.y, pos.z )

    return({
        light: light,
        helper: helper,
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
    let sDetail = 1
    lColor = new THREE.Color( color )
    light = new THREE.SpotLight(lColor)
    helper = new THREE.SpotLightHelper(light,'#000000')

    light.position.set( pos.x, pos.y, pos.z )
    light.intensity = ( intensity )
    light.castShadow = shadow
    light.angle = Math.pi / ( angle )
    light.penumbra = 0.5
    light.decay = 1.0
    light.shadow.mapSize.width = 1024 * sDetail         // LOD for shadows
    light.shadow.mapSize.height = 1024 * sDetail        // LOD for shadows
    light.shadow.camera.near = 0.5
    light.shadow.camera.far = 10_000
    helper.update()

    return ({
        light:  light,
        helper: helper,
    })
}

//Complex Lighting Paradigms

/**
 * Three Point Lighting. Typically used in movie sets to evenly light target.
 * 
 * @param {string} color string: rgb or hex value. Defines light color
 * @param {float} intensity float: Defines light intensity
 * @param {dict} pos dict(ints): Defines light position
 * @param {bool} shadow bool: Toggle whether light casts shadow
 * @returns dict: lightA(obj), lightB(obj), lightC(obj)
 */
export function ThreePointLight(color, intensity, pos, shadow) {
    let kColor, fColor, rColor
    let kLight, fLight, rLight

    kColor = new THREE.Color( color )
    kLight = new THREE.DirectionalLight(kColor, intensity)
    kLight.position.set( pos.x, pos.y, pos.z )
    kLight.castShadow = shadow

    fColor = new THREE.Color( color )
    fLight = new THREE.DirectionalLight(fColor, (intensity * 0.5))
    fLight.position.set( -pos.x, pos.y, pos.z )
    fLight.castShadow = false

    rColor = new THREE.Color( color )
    rLight = new THREE.DirectionalLight(rColor, (intensity * 0.85))
    rLight.position.set( -pos.x, -pos.y, pos.z )
    rLight.castShadow = false

    return ({
        lightA: kLight,
        lightB: fLight,
        lightC: rLight
    })
}
/**
 * Four point uniform lighting. Equally lights all sides of model
 * 
 * @param {string} color string: rgb or hex value. Defines light color
 * @param {float} intensity float: Defines light intensity
 * @param {dict} pos dict(ints): Defines light position
 * @param {bool} shadow bool: Toggle whether light casts shadow
 * @returns dict: lightA(obj), lightB(obj), lightC(obj)
 */
export function FourPointUniformLight(color, intensity, pos, shadow) {
    let aColor, bColor, cColor, dColor
    let aLight, bLight, cLight, dLight

    aColor = new THREE.Color( color )
    aLight = new THREE.DirectionalLight(aColor, intensity)
    aLight.position.set( pos.x, pos.y, pos.z )
    aLight.castShadow = shadow

    bColor = new THREE.Color( color )
    bLight = new THREE.DirectionalLight(bColor, intensity)
    bLight.position.set( -pos.x, pos.y, pos.z )
    bLight.castShadow = shadow

    cColor = new THREE.Color( color )
    cLight = new THREE.DirectionalLight(cColor, intensity)
    cLight.position.set( pos.x, -pos.y, pos.z )
    cLight.castShadow = shadow

    dColor = new THREE.Color( color )
    dLight = new THREE.DirectionalLight(dColor, intensity)
    dLight.position.set( -pos.x, -pos.y, pos.z )
    dLight.castShadow = shadow

    return ({
        lightA: aLight,
        lightB: bLight,
        lightC: cLight,
        lightD: dLight,
    })
}