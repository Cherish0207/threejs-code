import { Group } from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const group = new Group();

(() => {
  const loader = new GLTFLoader();
  loader.load("./工厂.glb", function (gltf) {
    group.add(gltf.scene);
   console.log( gltf.scene.getObjectByName('存储罐'));;
    console.log('gltf.scene: ', gltf.scene);
  });
})();

export default group;
