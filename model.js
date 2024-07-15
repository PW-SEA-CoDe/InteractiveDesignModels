import SceneInit from "./src/scene/SceneInit";
import Fetch3DM from "./src/model/Load3dm";
import {
  AmbientLight,
  DirectionalLight,
  FourPointUniformLight,
  HemisphereLight,
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
camera.position.set(-500, -400, 800);

//Lighting
let aLight, dLight, tpLight, fourLight, hLight;
aLight = AmbientLight("rgb(255,255,255)", 10.0);
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
  2.5,
  { x: 500, y: 500, z: 500 },
  true
);
hLight = HemisphereLight("rgb(239,254,254)", "rgb(54,54,39)", 2);

scene.add(
  fourLight.lightA,
  fourLight.lightB,
  fourLight.lightC,
  fourLight.lightD,
  hLight.light
);

//Models
let model;
model = await Fetch3DM("assets/models/Massing-Options.3dm", false, true);

model.meshes.forEach((item) => {
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
