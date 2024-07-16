/**
 *
 * Loads camera positions from Named Views in the target model, using a JSON file
 */
import * as THREE from "https://unpkg.com/three@0.164.1/build/three.module.js";
/**
 *
 * @param {string} url  string: File path for named views JSON (created in GH)
 * @returns             array: View objects containing: name, position, target, fov
 */
export default async function FetchViewData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();

    data.forEach((view) => {
      function TranslateVector(target) {
        let chunk = target.split(",");
        chunk = chunk.map((item) => item.replace(/[{}]/g, "").trim());
        let vector = new THREE.Vector3(chunk[0], chunk[1], chunk[2]);
        return vector;
      }
      view.position = TranslateVector(view.position);
      view.target = TranslateVector(view.target);
      view.fov = parseFloat(view.fov);
    });

    return data;
  } catch (error) {
    console.log("Error fetching requested file", error);
  }
}
