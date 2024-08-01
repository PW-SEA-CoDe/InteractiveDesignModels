# Interactive Design Models w/ Three.JS 3️⃣

> 💡 This project is part of the 2024 Perkins&Will 'Innovation Incubator' research grant and is intended for public use.

The goal of this project is to research and develop a series of templated code bases for creating minimal standalone web applications that allows designers to load, render and interact with Rhino .3dm models using Three.js. The repository contains a starting template as well as some completed example projects with the aim of providing users with an entry point to build upon for their specific design needs.

### Contributors:

[William Franklin](https://github.com/wmfranklin20)

[Preston Pape](https://github.com/prxsto)

### Tech Stack:
- Plain Javascript / React
- [Three.js](https://threejs.org/)
- [Vite](https://vitejs.dev/)

## Quickstart

The examples/ subfolder contains a variety of example Three.js web applications split into categories based upon framework/library choices. Within each, there are UI components to pull into fresh applications, as well as helper functions for loading models, adding environmental effects, and manipulating cameras, lighting, etc.

### Cloning & Install
You can clone the examples to your local machine using the following commands (from within your desired directory):
```
git clone --no-checkout --depth=1 https://github.com/PW-SEA-CoDe/InteractiveDesignModels.git
cd InteractiveDesignModels
git checkout main -- examples
rm -rf .git
```

### Dependencies
Once cloned, you will need to install the dependencies. Make sure your working directory is the root of the example you are interested in, and then run the following command (subsituting 'npm' for your favorite Node.js package manager):
```
npm install
```
This will reference the package.lock file to install all required dependencies. If you have any issues, please submit and issue or reach out for assistance.

### Deployment & Testing
To deploy a testing environment using [Vite](https://vitejs.dev/), run:
```
npm run dev
```
This will deploy a local version of the web application and you should see the port listed in your terminal output with which to view your app.
Typically this will be http://localhost:XXXX/

To build your application for deployment, you can instead run:
```
npm run build
```

## API Guide
> 💡 This project assumes that the user has at least basic understanding of HTML/CSS, Javascript, and Rhino/Grasshopper fundamentals. We will try our best to explain the code examples provided, but also do not want to overburden the project summary by explaining basic concepts.

### What is Three?
Three.js is a JavaScript Application Programming Interface (API) which allows users to create interactive 3D models using WebGL. Users can create 3D geometry in the browser by creating a Three ‘Scene’ which contains three key elements to visualize the 3d model:

### Three.js 'Scene' Basic Structure
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

## Opportunities & Purpose

### Purpose and Goals
#### What This Project Is
#### What This Project Isn't

### Opportunities to elevate our workflow
#### Evolving How We Share Design Ideas
#### Improving How We Communicate Design Information

### Example Use Cases

## Site Structure
### Overview
### Model 'Layer'
### UI 'Layer'
### Unique Conditions

## Project Structure


### Project Structure & Deployment

#### Vanilla Javascript
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
        models/↴
        icons/↴
```
#### React
#### React/React Three Fiber
#### Vue/TresJS

## Accessing Model Data
### Overview
### Initial Object3d data
### Layers & Groups
### Materials
### Cameras
### Data
#### Model Data
#### Other Data

## Summary & Next Steps

## Appendix
