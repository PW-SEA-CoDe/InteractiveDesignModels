//Local Modules
import SceneInit from "./src/scene/SceneInit";
import Fetch3DM from "./src/model/Load3dm";
import {
  AmbientLight,
  FourPointUniformLight,
  HemisphereLight,
} from "./src/scene/Lighting";
import { handleWindowResize } from "./src/scene/SceneUtils";
import { PointerHover } from "./src/model/Interaction";
import { UIElements } from "./main";
import { LayerTable } from "./src/ui/Components";
import FetchViewData from "./src/model/LoadViews";
import PostProcessing from "./src/scene/Postprocessing";

//Scene
const { scene, sceneContainer, renderer, camera, controls } = SceneInit();
camera.position.set(-500, -400, 800);

//Lighting
let aLight, fourLight, hLight;
aLight = AmbientLight("rgb(255,255,255)", 0.5);
hLight = HemisphereLight("rgb(239,254,254)", "rgb(54,54,39)", 2);
fourLight = FourPointUniformLight(
  "rgb(255,255,255)",
  5,
  { x: -500, y: -500, z: 500 },
  4,
  true
);
scene.add(
  aLight.light,
  hLight.light,
  fourLight.lightA,
  fourLight.lightB,
  fourLight.lightC,
  fourLight.lightD
);

//Models
let model, views;
model = await Fetch3DM("assets/models/Design-Model.3dm", true, true);
console.log(model.object);
model.meshes.forEach((item) => {
  scene.add(item);
});

//Load Named Views
views = await FetchViewData("assets/models/CameraPositions.json");
let currentView = views[3];
console.log(currentView);
camera.position.copy(currentView.position);
camera.lookAt(currentView.target);
camera.fov = currentView.fov;
console.log(camera);

//UI
//const fb = UIElements().fb;
const menu = UIElements().tb.mBody;

LayerTable(model.layers, menu);
console.log(model);

//Post-Processing
const composer = PostProcessing(scene, renderer, camera);

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
  //composer.render();
  render();
}
animate();
