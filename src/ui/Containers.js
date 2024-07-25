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
import { HoverStyle, neutralColors, pwColors } from "./Styles";

//Global Variables
const ui = document.getElementById("ui");
console.log("Imported " + ui.id + " correctly!");

//UI Container Elements
export function MobileTaskbar() {
  const style = {
    pointerEvents: "all",

    //Position
    position: "absolute",
    top: "92.5%",
    left: "0%",
    width: "100%",
    height: "7.5%",

    //Display
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    //Edges
    borderRadius: "25px 25px 0px 0px",
    backdropFilter: "blur(10px)",
    boxShadow: `0px 50px 100px ${neutralColors.lightBlack50}`,
    //mixBlendMode: "multiply",

    //Color
    backgroundColor: neutralColors.darkGray50,
  };
  const div = CreateDiv("taskbar", style);
  ui.append(div);

  let buttons = ["Layers", "Views", "Groups", "Reset"];
  const buttonStyle = {
    padding: "1px",
    height: "90%",
    width: "12.5%",
    backgroundColor: `${pwColors.lightGreen}`,
    backgroundImage: `url("../assets/icons/Layers.png")`,
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    borderRadius: "10px",
    boxShadow: `0px 0px 10px ${neutralColors.darkGray50}`,
    opacity: "0.85",
  };
  const button = CreateDiv("button", buttonStyle);
  div.append(button);

  let buttonHeight = window.getComputedStyle(button).getPropertyValue("height");
  let buttonWidth = {
    width: `${buttonHeight}`,
  };

  UpdateStyle(button, buttonWidth);
  let hoverStyle = {
    boxShadow: `0px 0px 5px ${neutralColors.darkGray}`,
    opacity: "1.0",
  };
  HoverStyle(button, hoverStyle, buttonWidth, buttonStyle);
}

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
