/**
 * Module for defining basic UI containers. Scope should be limited to defining the general position
 * and styling of the container/wrapper while any graphic/interactivity should be defined in a seperate
 * import module. For example:
 *
 * function SideBar should be defined in this file while,
 * function SideBarNav should be defined in Menus.js
 * function StackingDiagram should be defined in Graphics.js
 */

import { color } from "three/examples/jsm/nodes/Nodes.js";
import { CreateDiv, UpdateStyle } from "../utils/ScriptUtils";
import { MarchingCubes } from "three/examples/jsm/Addons.js";

//Global Variables
const ui = document.getElementById("ui");
console.log("Imported " + ui.id + " correctly!");

export function FloatingTab() {
  let wrapper, wrapperStyle;
  wrapperStyle = {
    //Location
    position: "absolute",
    top: "1%",
    right: "1%",

    //Size
    minWidth: "300px",
    width: "20%",
    maxWidth: "100%",

    minHeight: "100px",
    height: "40%",
    maxHeight: "100%",

    //Framing
    padding: "10px",
    margin: "10px",

    //Style
    backgroundColor: "rgba(55,55,55,0.5)",
    backdropFilter: "blur(5px)",
    borderRadius: "20px",
  };
  wrapper = CreateDiv("fb-wrapper", wrapperStyle);
  ui.append(wrapper);
  return wrapper;
}

export function LayerTable(layers, cont) {
  const container = cont;

  function Title() {
    const wrapperStyle = {
      width: "100%",
      height: "5%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      fontSize: "14px",
      fontWeight: "600",
    };
    const wrapper = CreateDiv("layer-title", wrapperStyle);
    wrapper.innerText = "Layer Table";
    container.append(wrapper);
  }

  function ConstructTable() {
    const wrapperStyle = {
      width: "100%",
      height: "95%",
      display: "flex",
      flexDirection: "column",

      color: "white",
      fontSize: "12px",
      fontWeight: "200",
    };
    const wrapper = CreateDiv("layer-list", wrapperStyle);

    const layerStyle = {
      width: "50%",
      height: "5%",
      marginTop: "2%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",

      borderRadius: "5px",

      backgroundColor: "white",
      color: "gray",
    };
    layers.forEach((layer) => {
      const div = CreateDiv(`${layer.name}`, layerStyle);
      div.innerText = layer.name;
      wrapper.append(div);
      layer.sublayers.forEach((sublayer) => {
        const subLayerStyle = {
          marginLeft: "5%",
        };
        const div = CreateDiv(`${sublayer.name}`, layerStyle);
        UpdateStyle(div, subLayerStyle);
        div.innerText = sublayer.name;
        wrapper.append(div);
        sublayer.sublayers.forEach((tertlayer) => {
          const tertLayerStyle = {
            marginLeft: "10%",
          };
          const div = CreateDiv(`${sublayer.name}`, layerStyle);
          UpdateStyle(div, tertLayerStyle);
          div.innerText = tertlayer.name;
          wrapper.append(div);
        });
      });
    });

    container.append(wrapper);
  }
  Title();
  ConstructTable();
}
