# Interactive Design Models w/ Three.JS 3️⃣

![code size](https://img.shields.io/github/languages/code-size/PW-SEA-CoDe/InteractiveDesignModels?style=flat-square)
![license](https://img.shields.io/github/license/PW-SEA-CoDe/InteractiveDesignModels?style=flat-square)
![issues](https://img.shields.io/github/issues/PW-SEA-CoDe/InteractiveDesignModels)

> This project is part of the 2024 Perkins&Will 'Innovation Incubator' research grant. The codebase is intended for public use, and while currently under heavy development, we welcome contributions once the research grant has concluded (~ Q4 2024). 

### Overview:

Interactive Design Models (IDM) is a project started during the Spring 2024 Perkins&Will Innovation Incubator. The overall goal of this project is to research, test and implement a templeted codebase using Three.js which allows designers to load and interact with Rhino .3dm files in a lightweight stand-alone web application.

Research done to-date focuses around the 'building blocks' of the site, including loading a .3dm model, accessing the model data, and implementing a UI which is linked to the loaded models and data. Our aim was to develop these core elements so that users have a jumping off point to develop more unique applications that fit their project needs. 

Currently, we have worked to develop three different 'entry points' to the application by implementing Three.js alongside different popular Javascript frameworks. Each of these implementations can be found in companion repositories with their respective frameworks and these repositories are listed below. To-date, IDM-Vanilla and IDM-R3F are the most developed repos and should be the first point of reference. Our hope is to continue development of these repositories, and potentially develop new ones for other popular frameworks such as Vue and Svelte as possible.

> Code-bases and examples are currently held in unique repositories: <br/>
> [IDM-Vanilla (Three.js / Vanilla JS)](https://github.com/PW-SEA-CoDe/IDM-Vanilla) | [IDM-React (Three.js / React)](https://github.com/PW-SEA-CoDe/IDM-React) | [IDM-R3F (React / React-Three-Fiber)](https://github.com/PW-SEA-CoDe/IDM-R3F)

This ReadMe will be the primary resource for cataloguing our research to-date. Other more specific information related to each framework will be located in their respective respositories as needed.

### Contributors:

[William Franklin](https://github.com/wmfranklin20) | [Preston Pape](https://github.com/prxsto)

<details id="Quickstart" closed>
<summary><h2>🚀 Quickstart</summary>


The ```examples``` subfolder contains a variety of example Three.js web applications split into categories based upon framework/library choices. Within each, there are UI components to pull into fresh applications, as well as helper functions for loading models, adding environmental effects, and manipulating cameras, lighting, etc.

### Cloning & Install
You can clone the examples to your local machine using the following commands (from within your desired directory):
```shell
$ git clone --no-checkout --depth=1 https://github.com/PW-SEA-CoDe/InteractiveDesignModels.git
$ cd InteractiveDesignModels
$ git checkout main -- examples
$ rm -rf .git
```

### Dependencies
Once cloned, you will need to install the dependencies. Make sure your working directory is the root of the example you are interested in, and then run the following command (subsituting ```npm``` for your favorite Node.js package manager):
```shell
$ npm install
```
This will reference the package-lock.json file to install all required dependencies. If you have any issues, please submit and issue or reach out for assistance.

###  Deployment & Testing
To deploy a testing environment using ```vite``` run:
```shell
$ npm run dev
```
This will deploy a local version of the web application and you should see the port listed in your terminal output with which to view your app.
Typically this will be http://localhost:XXXX/

To build your application for deployment, you can instead run:
```shell
$ npm run build
```
</details>

<details id="Purpose">
<summary><h2>🌟 Opportunities & Purpose</summary>

### Purpose and Goals

Across the AEC industry, digital innovation is changing the way that we communicate design. IDM represents an exciting opportunity to bring our design models to life and allow designers and clients to interact with our design in a more meaningful way when compared to static presentation files. Similarly, leveraging web interaction can allow users to explore different aspects of our design ideas that are otherwise too difficult to convey in traditional presentation methods. 


### Opportunities

The potential opportunities to leverage this technology are endless. Below are just a few potential use cases that can help elevate our process and design:

Design:
 - Toggle between design options without need for multiple pages

Sustainability:
 - Understand shading impact of design options in real-time and with user control of sun position

Metrics:
 - Visualize key building or campus metrics aligned with building models. 

</details>

<details id="Api-Guide">
<summary><h2>🛠️ API Guide</summary>

## 
> [!NOTE]
> 💡 This project assumes that the user has at least basic understanding of HTML/CSS, Javascript, and Rhino/Grasshopper fundamentals. We will try our best to explain the code examples provided, but also do not want to overburden the project summary by explaining basic concepts.

### What is Three?
Three.js is a JavaScript Application Programming Interface (API) which allows users to create interactive 3D models using WebGL. Users can create 3D geometry in the browser by creating a Three ‘Scene’ which contains three key elements to visualize the 3d model:


<details>
  <summary>Three.js 'Scene' Basic Structure</summary>
The root object in Three is the 'Scene' which contains all other components. The Scene is appended to an existing DOM element and is then updated with any additional Three components or UI styling that is needed by the user. 

_**At a minimum, the Scene, a Camera and a Renderer must be defined to create a Scene.**_  

```
scene ↴                                 // Root Element
        renderer                        // Renders Scene
        camera                          // Visual access point to scene
        lights ↴                        // Lighting - Multiple possible types
                    Spotlight                   
                    Domelight
                    ...
        geometry ↴                      // Geometry - Multiple native and loadable types
                    Mesh
                    Polysurface
                    Line
                    .3dm
                    .gltf
                    ... 
        controls                        // Control of camera in scene space
```
#### Camera
Each scene needs to initialize a camera in order to view the scene. Three provides a series of pre-built camera options that need some additional attributes in order to work properly.

#### Lights
Similar to the camera, each scene should be initialized with a light source in order to view the models materials, and shadows.

#### Mesh(Geometry)
Lastly, the user can populate the scene with any amount of meshes, or 3D geometry by either using native Three object constructors, or by loading a third-party geometry (such as a Rhino .3dm) using pre-built model loading scripts.

### Loading a .3dm Model

### UI & Site Structure
The template file developed for this project breaks down the site structure into two ‘layers’; the ‘Model’ layer contains the Three scene, while the ‘UI’ layer contains any UI elements that the user needs to implement to interact with their models or data. 

</details>
</details>

<details>
<summary><h2>🖥️ Site Structure</summary>

### Overview
### Model 'Layer'
### UI 'Layer'
### Unique Conditions
</details>


<details id="Proj-Structure">
<summary><h2>📦 Project Structure</summary>

### Overview
A goal of this project is to develop basic templated codebases to allow users to quickly load their design models into a web applicaiton, which comes pre-built with core functions. This means balancing adding as much additional functionality to the 'template' while also minimizing the size and complexity of the codebase. Similary, we have tried to develop a comparable codebase in a variety of frameworks to allow users a greater spectrum of entry points depending on their preferences and backgrounds. 

#### Basic Project Module Structure
Regardless of framework, we have tried our best to organize sub-folders which contain modules used to set-up key functions across the site. These folders listed below should contain all scripts used to define the building blocks of the site:
```
main               // Call functions related to UI
model              // Call functions related to Scene and Model 
src/↴
     data/↴          // Data formatting/importing
     model/↴         // Model interaction
     scene/↴         // Scene (initialization, post-processing, lighting)
     ui/↴            // UI elements (containers, graphics, styling)
     utils/↴         // Site Utilities (window resize, helper functions, etc.) 
assets/↴
     data/↴          // Data related to models (json, csv, etc.)
     models/↴        // Models to be loaded into site
     icons/↴         // UI icons and images
```
Within each of these folders, we have tried to simplify the number of unique scripts as much as possible, aiming to create one or two scripts which export a variety of relevant functions to be called higher up in the project structure.

### Vanilla Javascript
```
index.html              // Entry point, contains core elements
style.css               // Styling for html,body all other styles handled in JS
main.js                 // Call functions to create UI elements 
model.js                // Call functions related to Scene and Model 
src/↴
        data/↴          // Data formatting/importing
        model/↴         // Model interaction
        scene/↴         // Scene (initialization, post-processing, lighting)
        ui/↴            // UI elements (containers, graphics, styling)
        utils/↴         // Site Utilities (window resize, helper functions, etc.) 
assets/↴
        data/↴
        models/↴        // holds rhino (.3dm) files
        icons/↴
```
### React
### React Three Fiber
```
index.html                    // entry point, contains core elements
src/↴
        index.css             // base styling, component styling will override
        index.jsx             // main react file, declare components here 
        scene.jsx             // holds scene objects (models/lights/etc.)
        assets/↴              // assets- dynamic upon state/props
        components/↴          // react components and their stylesheets, add subfolders by use
        lib/↴                 // global constants, hooks, helper functions, etc. 
                constants.js  // constants for all components
                hooks.js      // custom react hooks
                # types.ts    // custom typescript types (if typescript project)
                utils.js      // helper functions
public/↴                      
        images/↴              // holds images/textures/icons (png/jpg/etc.)
        models/↴              // holds rhino (.3dm) files
        fonts/↴               // holds fonts (prefer .woff2 if possible)
```
### Vue/TresJS

</details>



<details id="Model-Data">
<summary><h2>💾 Model Information</summary>

### Overview
Three natively imports some model information directly from your Rhino .3dm file, however some key information is not imported, and other information is not easily accessible with the out-of-the-box import. This section will aim to explain the process of accessing Rhino model information and breakdown the scripts included in this project that assist with this effort.

### Native .3dm Information
The current functionality of Three allows users to load .3dm files with the following model information directly associated to a dictionary referenced as the model 'object'. 
```
Natively Imported Information
- Geometry
- Layer ID's
- Group ID's 
- Materials

Currently Unsupported Information
- Geometry associated to each Layer
- Geometry associated to each group
- Unique materials for each element (for interaction)
- Object center points
```

### Layers & Groups
### Materials
### Cameras
### Data
#### Model Data
#### Other Data
</details>

<details id="Summary">
<summary><h2>🗒️ Summary & Next Steps</summary>


</details>

## Appendix
