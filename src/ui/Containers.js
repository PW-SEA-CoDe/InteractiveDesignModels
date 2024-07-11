/**
 * Module for defining basic UI containers. Scope should be limited to defining the general position
 * and styling of the container/wrapper while any graphic/interactivity should be defined in a seperate
 * import module. For example:
 *
 * function SideBar should be defined in this file while,
 * function SideBarNav should be defined in Menus.js
 * function StackingDiagram should be defined in Graphics.js
 */

import { CreateDiv, UpdateStyle } from "../utils/ScriptUtils";

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
    };
    const wrapper = CreateDiv("layer-title", wrapperStyle);
    wrapper.innerText = "Layer Table";
    container.append(wrapper);
  }

  function ConstructTable() {
    const wrapperStyle = {
      width: "100%",
      height: "95%",
    };
    const wrapper = CreateDiv("layer-table", wrapperStyle);
    function DefTable() {
      const ulStyle = {
        listStyleType: "none",
        width: "100%",
        height: "100%",
        margin: "0px",
        padding: "0px",
      };
      const layerList = document.createElement("ul");
      UpdateStyle(layerList, ulStyle);
      layerList.id = "layer-list";

      layers.forEach((layer, i) => {
        const liStyle = {
          width: "100%",
          height: "10%",

          margin: "10px",

          fontWeight: "100",
          fontSize: "14px",
          color: "white",
        };
        const item = document.createElement("li");
        item.innerText = layer.name;
        UpdateStyle(item, liStyle);
        layerList.append(item);
        console.log(layer.name);
        if (layer.sublayers.length !== 0) {
          const subList = document.createElement("ul");
          UpdateStyle(subList, ulStyle);
          layer.sublayers.forEach((sublayer) => {
            const item = document.createElement("li");
            item.innerText = sublayer.name;
            UpdateStyle(item, liStyle);
            subList.append(item);
            console.log(sublayer.name);
          });
          item.append(subList);
        }
      });
      wrapper.append(layerList);
    }
    DefTable();
    container.append(wrapper);
  }
  Title();
  ConstructTable();
}
