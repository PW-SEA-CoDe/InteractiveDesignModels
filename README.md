# InteractiveDesignModels
A public repository to host examples utilizing Three.js for interactive architectural design projects.


## 1. Opportunities & Purpose
### - Evolving How We Share Design Ideas
Text located here.
### - Exploring What is possible
## 2. API Guide & Quickstart
`
💡 This project assumes that the user has at least basic understanding of HTML/CSS, Javascript, and Rhino/Grasshopper fundamentals. We will try our best to explain the code examples provided, but also do not want to overburden the project summary by explaining basic concepts
`
### - Three.js 'Scene' Basic Structure
Three.js is a JavaScript Application Programming Interface (API) which allows users to create interactive 3D models using WebGL. Users can create 3D geometry in the browser by creating a Three ‘Scene’ which contains three key elements to visualize the 3d model:
```
scene ↴
        renderer
        camera
        lights ↴
                    Spotlight
                    Domelight
                    ...
        objects ↴
                    Mesh
                    Polysurface
                    Line
                    ...
        controls
```
#### Camera
Each scene needs to initialize a camera in order to view the scene. Three provides a series of pre-built camera options that need some additional attributes in order to work properly.
#### Lights
Similar to the camera, each scene should be initialized with a light source in order to view the models materials, and shadows.
#### Mesh(Geometry)
Lastly, the user can populate the scene with any amount of meshes, or 3D geometry by either using native Three object constructors, or by loading a third-party geometry (such as a Rhino .3dm) using pre-built model loading scripts.

### - Loading a .3dm Model
### - UI & Site Structure
The template file developed for this project breaks down the site structure into two ‘layers’; the ‘Model’ layer contains the Three scene, while the ‘UI’ layer contains any UI elements that the user needs to implement to interact with their models or data. 
## 3. Project Structure & Deployment
## 4. Model Setup
## 5. UI Elements
## 6. Interactivity
## 7. Accessibility & Scalability
## 8. Summary & Next Steps
## Appendix

