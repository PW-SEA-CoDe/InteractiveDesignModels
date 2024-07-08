/**
 * This script defines different import options for loading 3dm models into the scene. Call the preferred function in model.js to return the 3dm model as an object to be added into the scene.
 */

// Modules Imports
import * as THREE from "three"; //Used for text complete, replace this with unpkg module on build
//import * as THREE from 'https://unpkg.com/three@0.164.1/build/three.module.js';
import { Rhino3dmLoader } from "https://unpkg.com/three@0.164.1/examples/jsm/loaders/3DMLoader.js";
import { UIElements } from "../../main";
import { load } from "three/examples/jsm/libs/opentype.module.js";

const loader = new Rhino3dmLoader();
loader.setLibraryPath("https://cdn.jsdelivr.net/npm/rhino3dm@8.6.1/");

const testUI = UIElements().fb;
console.log(testUI);
// 3DM Loader functions

/**
 * Fetch3DM: Loads 3dm model and returns model children and materials. Takes arguments to set if model receives or casts shadows.
 *
 * @param {string} url string: filepath
 * @param {bool} castShadow  bool: True to cast shadows
 * @param {bool} receiveShadow boo: True to receive shadows
 * @returns dict: object(obj), averageCenter(Vector3)
 */
export default async function Fetch3DM(url, castShadow, receiveShadow) {
  return new Promise((resolve, reject) => {
    let object;
    object = null;

    loader.load(
      url,
      function (object) {
        object = object;
        console.log(object);

        let geometry = [];
        let meshs = [];
        let lines = [];
        let avgCenter;
        avgCenter = {
          x: 0,
          y: 0,
          z: 0,
        };
        object.up = new THREE.Vector3(0, 0, 1);

        object.children.forEach((child) => {
          geometry.push(child);
          child.geometry.computeBoundingSphere();
          avgCenter.x += child.geometry.boundingSphere.center.x;
          avgCenter.y += child.geometry.boundingSphere.center.y;
          avgCenter.z += child.geometry.boundingSphere.center.z;
          if (child.type === "Mesh") {
            meshs.push(child);
            child.castShadow = castShadow;
            child.receiveShadow = receiveShadow;
          } else if (child.type === "Line") {
            lines.push(child);
          }
        });

        avgCenter.x = avgCenter.x / object.children.length;
        avgCenter.y = avgCenter.y / object.children.length;
        avgCenter.z = avgCenter.z / object.children.length;

        function ConstructLayerTable() {
          const layers = object.userData.layers;
          const mainLayers = [];
          class Layer {
            constructor() {}
            name = null;
            index = null;
            sublayers = [];
            objects = [];
          }

          layers.forEach((layer, i) => {
            if (!layer.fullPath.includes("::")) {
              let mLayer = new Layer();
              mLayer.name = layer.name;
              mLayer.index = i;
              mainLayers.push(mLayer);
            }
          });

          mainLayers.forEach((layer) => {
            console.log(layer.name);
            layers.forEach((item, i) => {
              if (
                item.fullPath.includes(layer.name) &&
                item.fullPath.split("::").length <= 2 &&
                item.fullPath.split("::").length > 1
              ) {
                let sLayer = new Layer();
                sLayer.name = item.name;
                sLayer.index = i;
                layer.sublayers.push(sLayer);
                console.log(item.name);
              }
            });
            console.log(" ");
          });
          console.log(mainLayers);

          const groups = object.userData.groups;

          return mainLayers;
        }
        ConstructLayerTable();

        function LayerSort() {
          const modelLayers = object.userData.layers;
          const LayerSort = [];
          modelLayers.forEach((layer, i) => {
            const layerChildren = [];
            object.children.forEach((child) => {
              if (child.userData.attributes.layerIndex === i) {
                layerChildren.push(child);
              }
            });
            LayerSort.push(layerChildren);
          });

          return LayerSort;
        }
        const layerSort = LayerSort();
        //console.log(layerSort);

        function GroupSort() {
          const modelGroups = object.userData.groups;
          const GroupSort = [];
          modelGroups.forEach((group, i) => {
            const groupChildren = [];
            object.children.forEach((child) => {
              if (child.userData.attributes.groupIds !== undefined) {
                child.userData.attributes.groupIds.forEach((id) => {
                  if (id === i) {
                    groupChildren.push(child);
                  }
                });
              }
            });
            GroupSort.push(groupChildren);
          });
        }

        const groupSort = GroupSort();
        //console.log(groupSort);

        resolve({
          object: object,
          meshes: meshs,
          lines: lines,
          object: geometry,
          layers: layerSort,
          groups: groupSort,
          averageCenter: avgCenter,
        });
      },
      undefined,
      function (error) {
        reject(error);
        console.log(error);
      }
    );
  });
}
