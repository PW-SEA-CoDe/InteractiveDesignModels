export function handleWindowResize(camera, renderer, sceneContainer) {
  window.addEventListener("resize", function () {
    camera.aspect = sceneContainer.clientWidth / sceneContainer.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight);
  });
}
