import SceneInit from "./src/scene/SceneInit";
import Fetch3DM from "./src/model/Load3dm";
import { AmbientLight, DirectionalLight, PointLight, ThreePointLight } from "./src/scene/Lighting";

//Scene
const {scene, sceneContainer, renderer, camera, controls} = SceneInit()
camera.position.set(500,500,500) 

//Lighting
let aLight, dLight, tpLight
aLight = AmbientLight('rgb(255,255,255)', 5.0)
dLight = DirectionalLight('rgb(255,255,255)', 5.0, {x:500,y:500,z:200}, true)
tpLight = ThreePointLight('rgb(255,255,255)', 5.0, {x:500,y:500,z:200}, true)

//scene.add(aLight.light)
//scene.add(dLight.light)
scene.add(tpLight.lightA, tpLight.lightB, tpLight.lightC)

//Models
let model
model = await Fetch3DM('assets/models/MixedUse-Tower-Massing-Model.3dm', false, true)

scene.add(model.object)

//Rendering
function render () {
    camera.updateMatrixWorld();
    renderer.render( scene, camera );
}

function animate() {
    requestAnimationFrame(animate)
    controls.update();
    render();
}
animate();