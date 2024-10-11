# IDM - Findings & Best Practices

## Overview

### React Three Fiber (R3F) Benefits

- Developer experience is improved and simplified immensely
- Bootstrapping an interactive design model for those with relatively no background in React is simple due to the library being declarative
- Typically better performance over vanilla Javascript thanks to React's selective re-rendering
- Debugging using *React Web Tools* is enjoyable to use

## Best Practices

### Model Exporting & Loading

#### glTF
In terms of popularity and optimizations, .glTF and its derivative, .glb are the leading filetypes for 3D models. While more performant and widespread, we opted to pursue a path allowing native Rhino .3dm files to be loaded directly for ease of use. If a reason arises that necessitates smaller file sizes/faster loading for massive models, try the following best practices for exporting: 

1. Pass model through the meshReducer.ghx Grasshopper definition, found [here](https://github.com/PW-SEA-CoDe/IDM-R3F/blob/main/gh/meshReducer.ghx)
2. Export as either .glTF or .glb
   - .glTF is a json-like format (best for development and version control)
   - .glb is a binary encoding (best for deployment)
4. When exporting, make sure to opt to use draco compression
5. Debug and fix any issues with your model using [glTF Viewer](https://gltf-viewer.donmccurdy.com/)
   - This tool allows you to reduce faces, triangulate, and rebuild the mesh, removing most errors

#### Draco

Draco is an open-source library for compression/decompression of 3D meshes/point clouds. This allows us to host much larger models on the web with better performance and quicker loading times. However, as with all compression, some detail may be lost in transmission. Additionally, the Draco decorder files must be packaged with your web application and run on the client-side. Thankfully, decompression using this technique is real-time.
