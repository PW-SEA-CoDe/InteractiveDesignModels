/**
 * Module for defining basic UI containers. Scope should be limited to defining the general position
 * and styling of the container/wrapper while any graphic/interactivity should be defined in a seperate
 * import module. For example:
 *
 * function SideBar should be defined in this file while,
 * function SideBarNav should be defined in Menus.js
 * function StackingDiagram should be defined in Graphics.js
 */

import { CreateDiv, UpdateStyle } from "./UIUtils";
import { HoverStyle, neutralColors, pwColors } from "./Styles";
import { Button, LayerTable } from "./Components";

//Global Variables
const ui = document.getElementById("ui");
console.log("Imported " + ui.id + " correctly!");

//UI Container Elements
export function Taskbar() {
  const style = {
    pointerEvents: "all",

    //Position
    position: "absolute",
    top: "93%",
    left: "2.5%",
    width: "95%",
    height: "6%",
    zIndex: "1",

    //Display
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    //Color
    backgroundColor: neutralColors.lightBlack75,

    //Edges
    borderRadius: "20px",
    backdropFilter: "blur(10px)",
    boxShadow: `0px 50px 100px ${neutralColors.lightBlack75}`,
  };
  const div = CreateDiv("taskbar", style);
  ui.append(div);

  let button1 = Button("layers", `url("../assets/icons/Layers.png")`);
  let button2 = Button("cameras", `url("../assets/icons/Cameras.png")`);
  let button3 = Button("groups", `url("../assets/icons/Groups.png")`);
  let button4 = Button("metrics", `url("../assets/icons/Metrics.png")`);

  let buttons = [button1, button2, button3, button4];
  div.append(button1);
  div.append(button2);
  div.append(button3);
  div.append(button4);

  const menuStyle = {
    pointerEvents: "all",

    //Position
    position: "absolute",
    bottom: "5%",
    left: "45%",
    width: "50%",
    height: "1%",
    zIndex: "0",

    //Display
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",

    //Color
    backgroundColor: neutralColors.lightBlack50,

    //Edges
    borderRadius: "8px",
    backdropFilter: "blur(10px)",
    boxShadow: `0px 10px 100px ${neutralColors.lightBlack25}`,

    //Transitions
    transition: "height 0.25s ease-in-out",
  };
  const menu = CreateDiv("taskbar-menu", menuStyle);
  let mHead, mBody, mFoot;
  let hStyle, bStyle, fStyle;
  hStyle = {
    //Position
    height: "5%",
    width: "100%",
    //Edges
    padding: "10px",
    //Color
    color: `${neutralColors.offWhite}`,
    //Font
    fontWeight: "600",
    textAlign: "center",
  };
  bStyle = {
    height: "90%",
    width: "90%",
  };
  fStyle = {
    height: "5%",
    width: "100%",
  };
  const menuHeader = CreateDiv("tb-menu-head", hStyle);
  const menuBody = CreateDiv("tb-menu-body", bStyle);
  const menuFooter = CreateDiv("tb-menu-foot", fStyle);
  menu.append(menuHeader);
  menu.append(menuBody);
  menu.append(menuFooter);

  let menuOpen = false;
  ui.append(menu);

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      console.log(button.id);
      if (menuOpen === false) {
        menu.style.height = "60%";
        menuOpen = true;
      } else if (menuOpen === true) {
        menu.style.height = "1%";
        menuOpen = false;
      }
      menuHeader.innerText =
        button.id.charAt(0).toUpperCase() + button.id.slice(1);
    });
  });

  return {
    mHead: menuHeader,
    mBody: menuBody,
    mFoot: menuFooter,
  };
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
