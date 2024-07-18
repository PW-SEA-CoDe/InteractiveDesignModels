import * as THREE from "https://unpkg.com/three@0.164.1/build/three.module.js";
import { EffectComposer } from "https://unpkg.com/three@0.164.1/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "https://unpkg.com/three@0.164.1/examples/jsm/postprocessing/RenderPass.js";
import { FilmPass } from "https://unpkg.com/three@0.164.1/examples/jsm/postprocessing/FilmPass.js";
import { RenderPixelatedPass } from "https://unpkg.com/three@0.164.1/examples/jsm/postprocessing/RenderPixelatedPass.js";
import { SSAOPass } from "https://unpkg.com/three@0.164.1/examples/jsm/postprocessing/SSAOPass.js";

export default function PostProcessing(scene, renderer, camera) {
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  composer.addPass(new FilmPass(0.25, false));
  composer.addPass(new RenderPixelatedPass(5, scene, camera));
  composer.addPass(new SSAOPass(scene, camera, 1, 1));

  return composer;
}
