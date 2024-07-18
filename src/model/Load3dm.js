/**
 * This script defines different import options for loading 3dm models into the scene. Call the preferred function in model.js to return the 3dm model as an object to be added into the scene.
 */

// Modules Imports
import * as THREE from "https://unpkg.com/three@0.164.1/build/three.module.js";
import { Rhino3dmLoader } from "https://unpkg.com/three@0.164.1/examples/jsm/loaders/3DMLoader.js";
import { UIElements } from "../../main";

const loader = new Rhino3dmLoader();
loader.setLibraryPath("https://cdn.jsdelivr.net/npm/rhino3dm@8.6.1/");

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

          if (child.type === "Mesh") {
            meshs.push(child);
            child.castShadow = castShadow;
            child.receiveShadow = receiveShadow;
          } else if (child.type === "Line") {
            lines.push(child);
          }
        });

        function GetAverageCenter() {
          object.children.forEach((child) => {
            child.geometry.computeBoundingSphere();
            avgCenter.x += child.geometry.boundingSphere.center.x;
            avgCenter.y += child.geometry.boundingSphere.center.y;
            avgCenter.z += child.geometry.boundingSphere.center.z;
          });
          avgCenter.x = avgCenter.x / object.children.length;
          avgCenter.y = avgCenter.y / object.children.length;
          avgCenter.z = avgCenter.z / object.children.length;
        }
        GetAverageCenter();

        function GetLayerTable() {
          let layerObjects, layerObjs, maxLayerDepth, layerTree, layerPaths;

          layerObjects = object.userData.layers;
          layerObjs = [];
          maxLayerDepth = 0;
          layerTree = [];
          layerPaths = [];

          class Layer {
            constructor(name, fullPath, index, object) {
              this.name = name;
              this.fullPath = fullPath;
              this.index = index;
              this.object = object;
            }
            sublayers = [];
            geometry = [];
          }

          layerObjects.forEach((layer, i) => {
            let l = new Layer(layer.name, layer.fullPath, i, layer);
            object.children.forEach((child) => {
              if (child.userData.attributes.layerIndex === l.index) {
                l.geometry.push(child);
              }
            });
            let layerDepth = layer.fullPath.split("::").length;
            if (layerDepth > maxLayerDepth) {
              maxLayerDepth = layerDepth;
            }
            layerObjs.push(l);
          });

          for (let i = 0; i < maxLayerDepth; i++) {
            const previousLayers = [];
            const currentLayers = [];
            layerObjs.forEach((item) => {
              if (i === 0) {
                if (item.fullPath.split("::").length === i + 1) {
                  layerTree.push(item);
                }
              } else {
                if (item.fullPath.split("::").length === i) {
                  previousLayers.push(item);
                } else if (item.fullPath.split("::").length == i + 1) {
                  currentLayers.push(item);
                }
              }
            });
            if (currentLayers) {
              previousLayers.forEach((i) => {
                currentLayers.forEach((n) => {
                  if (n.fullPath.includes(i.fullPath)) {
                    i.sublayers.push(n);
                  }
                });
              });
            }
          }
          return layerTree;
        }
        const layerTree = GetLayerTable();

        function GetGroups() {
          const modelGroups = object.userData.groups;
          const GroupSort = [];
          modelGroups.forEach((group, i) => {
            class Group {
              constructor() {}
              name = null;
              index = null;
              geometry = [];
            }
            let g = new Group();
            g.name = group.name;
            g.index = group.index;
            object.children.forEach((child) => {
              if (child.userData.attributes.groupIds !== undefined) {
                child.userData.attributes.groupIds.forEach((id) => {
                  if (id === i) {
                    g.geometry.push(child);
                  }
                });
              }
            });
            GroupSort.push(g);
          });
          return GroupSort;
        }
        const groups = GetGroups();

        resolve({
          averageCenter: avgCenter,
          geometry: geometry,
          groups: groups,
          layers: layerTree,
          lines: lines,
          meshes: meshs,
          object: object,
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
