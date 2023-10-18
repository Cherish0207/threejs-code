import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

import scene from "./scene.js";

import modifyCityMaterial from "../modify/modifyCityMaterial.js";

import MeshLine from "./MeshLine.js";

const gltfLoader = new GLTFLoader();
gltfLoader.load("../model/city.glb", (gltf) => {
  gltf.scene.traverse((item) => {
    if (item.type == "Mesh") {
      console.log(item);
      const cityMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(0x0c0e33),
      });
      item.material = cityMaterial;
      modifyCityMaterial(item);
      if (item.name == "Layerbuildings") {
        const meshLine = new MeshLine(item.geometry);
        const size = item.scale.x;
        meshLine.mesh.scale.set(size, size, size);
        scene.add(meshLine.mesh);
      }
    }
  });
  scene.add(gltf.scene);
});
