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

## 1. Opportunities & Purpose

### i. Purpose
#### What This Project Is
#### What This Project Isn't

### ii. Opportunities
#### Evolving How We Share Design Ideas
#### Improving How We Communicate Design Information


## 2. API Guide & Quickstart

> 💡 This project assumes that the user has at least basic understanding of HTML/CSS, Javascript, and Rhino/Grasshopper fundamentals. We will try our best to explain the code examples provided, but also do not want to overburden the project summary by explaining basic concepts

### i. What is Three?
Three.js is a JavaScript Application Programming Interface (API) which allows users to create interactive 3D models using WebGL. Users can create 3D geometry in the browser by creating a Three ‘Scene’ which contains three key elements to visualize the 3d model:

### ii. Three.js 'Scene' Basic Structure
The root object in Three is the 'Scene' which contains all other components. The Scene is appended to an existing DOM element and is then updated with any additional Three components or UI styling that is needed by the user. 

_**At a minimum, the Scene, a Camera and a Renderer must be defined to create a Scene.**_  

```
scene ↴                                 //Root Element
        renderer                        //Renders Scene
        camera                          //Visual access point to scene
        lights ↴                        //Lighting - Multiple possible types
                    Spotlight                   
                    Domelight
                    ...
        geometry ↴                       //Geometry - Multiple native and loadable types
                    Mesh
                    Polysurface
                    Line
                    .3dm
                    .gltf
                    ... 
        controls                        //Control of camera in scene space
```
#### Camera
Each scene needs to initialize a camera in order to view the scene. Three provides a series of pre-built camera options that need some additional attributes in order to work properly.
#### Lights
Similar to the camera, each scene should be initialized with a light source in order to view the models materials, and shadows.
#### Mesh(Geometry)
Lastly, the user can populate the scene with any amount of meshes, or 3D geometry by either using native Three object constructors, or by loading a third-party geometry (such as a Rhino .3dm) using pre-built model loading scripts.

### iii. Loading a .3dm Model
### iv. UI & Site Structure
The template file developed for this project breaks down the site structure into two ‘layers’; the ‘Model’ layer contains the Three scene, while the ‘UI’ layer contains any UI elements that the user needs to implement to interact with their models or data. 
## 3. Project Structure & Deployment
## 4. Model Setup
## 5. UI Elements
## 6. Interactivity
## 7. Accessibility & Scalability
## 8. Summary & Next Steps
## Appendix

