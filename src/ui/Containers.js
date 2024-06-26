/**
 * Module for defining basic UI containers. Scope should be limited to defining the general position
 * and styling of the container/wrapper while any graphic/interactivity should be defined in a seperate
 * import module. For example:
 * 
 * function SideBar should be defined in this file while,
 * function SideBarNav should be defined in Menus.js 
 * function StackingDiagram should be defined in Graphics.js 
 */

import { CreateDiv } from "../utils/ScriptUtils"

//Global Variables
const ui = document.getElementById('ui')
console.log('Imported ' + ui.id + ' correctly!')

export function FloatingBar() {
    let wrapper, wrapperStyle
    wrapperStyle = {
        //Location
        position: 'absolute',
        top: '1%',
        right: '1%',

        //Size
        minWidth: '300px',
        width: '20%',
        maxWidth: '100%',

        minHeight: '100px',
        height: '40%',
        maxHeight: '100%',

        //Framing
        padding: '10px',
        margin: '10px',

        //Style
        backgroundColor: 'rgba(55,55,55,0.5)',
        backdropFilter: 'blur(5px)',
        borderRadius: '20px'
    }
    wrapper = CreateDiv('fb-wrapper', wrapperStyle)
    ui.append(wrapper)
    return (wrapper)
}