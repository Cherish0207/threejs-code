import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
// 后处理扩展库EffectComposer.js
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
// 渲染器通道RenderPass,OutlinePass通道
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { OutlinePass } from "three/addons/postprocessing/OutlinePass.js";
// 伽马校正后处理Shader
import { GammaCorrectionShader } from "three/addons/shaders/GammaCorrectionShader.js";
// ShaderPass功能：使用后处理Shader创建后处理通道
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";

// FXAA抗锯齿Shader
import { FXAAShader } from "three/addons/shaders/FXAAShader.js";
// SMAA抗锯齿通道
import { SMAAPass } from "three/addons/postprocessing/SMAAPass.js";

const loader = new GLTFLoader();
let group = new THREE.Group();
loader.load("./工厂.glb", function (gltf) {
  group.add(gltf.scene);
  // console.log("gltf.scene: ", gltf.scene);
});

export default group;
