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
    minWidth: "200px",
    width: "10%",
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
      width: "100%",
      height: "5%",
      marginTop: "2%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      pointerEvents: "all",

      borderRadius: "5px",

      backgroundColor: "rgba(254,254,249,1)",
      color: "rgba(54,54,49,1)",
    };
    layers.forEach((layer) => {
      const activeStyle = {
        backgroundColor: "rgba(254,254,249,1)",
        color: "rgba(54,54,49,1)",
        boxShadow: "2px 1px 0px rgba(50, 50, 50, 0.9)",
        fontWeight: "200",
      };
      const unactiveStyle = {
        backgroundColor: "rgba(104,104,99,1)",
        color: "rgba(254,254,249,1)",
        fontWeight: "100",
      };
      const div = CreateDiv(`${layer.name}`, layerStyle);
      div.innerText = layer.name;
      wrapper.append(div);

      layer.sublayers.forEach((sublayer) => {
        const subLayerStyle = {
          marginLeft: "10%",
          width: "90%",
        };
        const div = CreateDiv(`${sublayer.name}`, layerStyle);
        const tertLayerStyle = {
          marginLeft: "20%",
          width: "80%",
        };
        UpdateStyle(div, subLayerStyle);
        div.innerText = sublayer.name;

        if (sublayer.object.visible === true) {
          console.log(true);
          UpdateStyle(div, activeStyle);
        } else if (sublayer.object.visible === false) {
          console.log(false);
          UpdateStyle(div, unactiveStyle);
        }

        wrapper.append(div);

        sublayer.sublayers.forEach((tertlayer) => {
          const div = CreateDiv(`${tertlayer.name}`, layerStyle);
          UpdateStyle(div, tertLayerStyle);
          div.innerText = tertlayer.name;
          console.log(tertlayer.object);
          /*

          if (tertlayer.object.visible === true) {
            console.log(true);
            UpdateStyle(div, activeStyle);
          } else if (tertlayer.object.visible === false) {
            console.log(false);
            UpdateStyle(div, unactiveStyle);
          }
            */
          wrapper.append(div);
        });
      });
    });

    container.append(wrapper);
  }
  Title();
  ConstructTable();

  function LayerToggle(layers) {
    const activeStyle = {
      backgroundColor: "rgba(254,254,249,1)",
      color: "rgba(54,54,49,1)",
      fontWeight: "200",
    };
    const unactiveStyle = {
      backgroundColor: "rgba(104,104,99,1)",
      color: "rgba(254,254,249,1)",
      fontWeight: "100",
    };
    const layerTable = document.getElementById("layer-list");
    let uiLayers = layerTable.querySelectorAll("div");
    uiLayers.forEach((child) => {
      child.addEventListener("click", function (event) {
        layers.forEach((layer) => {
          Toggle(layer, child);
          layer.sublayers.forEach((sublayer) => {
            Toggle(sublayer, child);
            sublayer.sublayers.forEach((tertLayer) => {
              Toggle(tertLayer, child);
            });
          });
        });
      });
    });

    function Toggle(target, button) {
      console.log(button.id);
      if (target.name === button.id) {
        console.log(target);
        target.geometry.forEach((geometry) => {
          geometry.visible = !geometry.visible;
        });
        target.object.visible = !target.object.visible;
        if (target.object.visible === true) {
          UpdateStyle(button, activeStyle);
        } else if (target.object.visible === false) {
          UpdateStyle(button, unactiveStyle);
        }
      }
    }
  }
  LayerToggle(layers);
}
