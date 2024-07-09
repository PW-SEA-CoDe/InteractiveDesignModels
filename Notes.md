## Example Projects
1. ### Mixed-Use Tower
    - Metrics
    - Climate Analysis
    - Design Model

2. ### Campus Model
    - Metrics 
    - Climate Analysis
    - Spatial Information

3. ### Design Options
    - Mobile focused
    - Metrics
    - Fixed camera locations imported from Rhino

4. ### Plug & Play Model
    - Swap model components (tower, podium, etc.)
    - Adjust colors/materials

## What To Showcase
1. ### Co-location of information
    - Allows for user to swap between different information in the same location

2. ### 'Hot Swap' Design Options
    - Allows for live swapping between design options or mix & match between components 

3. ### Mobile Design Viewer
    - Mobile accessible model viewing

4. ### Camera Control
    - Move camera around and find new vantage points of model

5. ### Model Control
    - Allows for users to hide/show elements of model


## Scripting Order of Operations
1. Define Three Scene
2. Define UI Containers
3. Load Model
4. Load Data
5. Load UI Graphics

## Load3DM Return Variables
Geometry:
- ✅ object: Entire loaded model (contains children, layerIndex, etc.)
- ✅ geometry: All children of loaded object (meshs, lines, etc.)
- ✅ meshes: All Mesh type children
- ✅ lines: All line type children
- ✅ averageCenter: Average center of all mesh objects (cant do lines?)

Information:
- layerTable: Dictionary of layer table (main layers, sublayers, sub-sublayers, etc.)
    - using split to find "::" and test length to then relate to sublayer
- groupTable: Dictionary of groups in model

## Working Ideas
- Set camera and controls focus to average center
- Slow orbit on model load
- Define unique material per object for hovering