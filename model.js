import SceneInit from "./src/scene/SceneInit";
import Fetch3DM from "./src/model/Load3dm";
import {
  AmbientLight,
  DirectionalLight,
  FourPointUniformLight,
  ThreePointLight,
} from "./src/scene/Lighting";
import { handleWindowResize } from "./src/utils/CanvasUtils";
import { PointerHover } from "./src/model/Interaction";
import { UIElements } from "./main";
import { CreateDiv, UpdateStyle } from "./src/utils/ScriptUtils";
import { color } from "three/examples/jsm/nodes/Nodes.js";
import { LayerTable } from "./src/ui/Containers";

//Scene
const { scene, sceneContainer, renderer, camera, controls } = SceneInit();
camera.position.set(-600, 750, 800);

//Lighting
let aLight, dLight, tpLight, fourLight;
aLight = AmbientLight("rgb(255,255,255)", 5.0);
dLight = DirectionalLight(
  "rgb(255,255,255)",
  5.0,
  { x: 500, y: 500, z: 200 },
  true
);
tpLight = ThreePointLight(
  "rgb(255,255,255)",
  5.0,
  { x: 500, y: 500, z: 200 },
  true
);
fourLight = FourPointUniformLight(
  "rgb(255,255,255)",
  2.0,
  { x: 500, y: 500, z: 500 },
  true
);

scene.add(
  fourLight.lightA,
  fourLight.lightB,
  fourLight.lightC,
  fourLight.lightD
);

//Models
let model;
model = await Fetch3DM("assets/models/Massing-Options.3dm", false, true);

model.geometry.forEach((item) => {
  scene.add(item);
});

const fb = UIElements().fb;
LayerTable(model.layers, fb);
console.log(model);

//Interaction
window.addEventListener("mousemove", function (event) {
  let intersected = PointerHover(event, model.meshes, camera).object;
  //console.log(intersected);
});

//Utils
handleWindowResize(camera, renderer, sceneContainer);

//Rendering
function render() {
  camera.updateMatrixWorld();
  renderer.render(scene, camera);
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  render();
}
animate();
