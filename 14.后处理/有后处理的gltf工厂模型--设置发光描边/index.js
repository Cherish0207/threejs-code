import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import mesh from "./model.js";

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

const can = document.querySelector("#can");
const width = window.innerWidth;
const height = window.innerHeight;

const scene = new THREE.Scene();
const aDom = document.querySelector(".a");
const bDom = document.querySelector(".b");

// 2.创建相机 - 正交相机
export const camera = (() => {
  //渲染器和相机
  const camera = new THREE.PerspectiveCamera(90, width / height, 1, 3000);
  camera.position.set(100, 100, 100); //根据渲染范围尺寸数量级设置相机位置
  camera.lookAt(0, 0, 0);
  return camera;
})();

scene.add(mesh);

// 光源设置
const directionLight = (() => {
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(200, 200, 200);
  scene.add(directionalLight);

  return directionalLight;
})();

// WebGL渲染器设置
const renderer = (() => {
  const renderer = new THREE.WebGLRenderer({
    antialias: true, // 开启优化锯齿
  });
  renderer.setPixelRatio(window.devicePixelRatio); //防止输出模糊
  // 设置渲染的尺寸大小
  renderer.setSize(width, height);
  // 将webgl渲染的canvas内容添加到body
  can.appendChild(renderer.domElement);
  renderer.outputEncoding = THREE.sRGBEncoding;
  return renderer;
})();

//辅助观察的坐标系
const axesHelper = (() => {
  const axesHelper = new THREE.AxesHelper(100);
  scene.add(axesHelper);
  return axesHelper;
})();

// 后处理器
const composer = (() => {
  // 创建后处理对象EffectComposer，WebGL渲染器作为参数
  const composer = new EffectComposer(renderer);
  // 创建一个渲染器通道，场景和相机作为参数
  const renderPass = new RenderPass(scene, camera);

  // 设置renderPass通道
  composer.addPass(renderPass);

  // OutlinePass第一个参数v2的尺寸和canvas画布保持一致
  const v2 = new THREE.Vector2(window.innerWidth, window.innerWidth);
  // const v2 = new THREE.Vector2(800, 600);
  const outlinePass = new OutlinePass(v2, scene, camera);

  // 一个模型对象
  // outlinePass.selectedObjects = meshArr;
  composer.addPass(outlinePass);

  aDom.addEventListener("click", () => {
    const A = mesh.getObjectByName("设备A");
    outlinePass.selectedObjects = [A];
  });

  bDom.addEventListener("click", () => {
    const B = mesh.getObjectByName("设备B");
    outlinePass.selectedObjects = [B];
  });
  //
  // // 创建一个发光通道
  // const v3 = new THREE.Vector2(window.innerWidth, window.innerHeight);
  // const bloomPass = new UnrealBloomPass(v3);
  // composer.addPass(bloomPass)
  //
  // const glitchPass = new GlitchPass();
  // // 设置glitchPass通道
  // composer.addPass(glitchPass);

  // 创建伽马校正通道
  const gammaPass = new ShaderPass(GammaCorrectionShader);
  composer.addPass(gammaPass);

  // .getPixelRatio()获取设备像素比
  const FXAAPass = new ShaderPass(FXAAShader);
  // `.getPixelRatio()`获取`renderer.setPixelRatio()`设置的值
  const pixelRatio = renderer.getPixelRatio(); //获取设备像素比
  // width、height是canva画布的宽高度
  FXAAPass.uniforms.resolution.value.x = 1 / (width * pixelRatio);
  FXAAPass.uniforms.resolution.value.y = 1 / (height * pixelRatio);
  composer.addPass(FXAAPass);

  // //获取.setPixelRatio()设置的设备像素比
  // const pixelRatio = renderer.getPixelRatio();
  // // width、height是canva画布的宽高度
  // const smaaPass = new SMAAPass(width * pixelRatio, height * pixelRatio);
  // composer.addPass(smaaPass);

  return composer;
})();

function render() {
  composer.render();
  // renderer.render(scene, camera);
  requestAnimationFrame(render);
}
render();

window.onresize = () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
};
camera.position.set(202, 123, 125);
// camera.position.set(1.1, 11.8, 62.4);
// camera.position.set(-27.89946421649832, 2.1430827174824683, 57.01962024512579);

const controls = new OrbitControls(camera, renderer.domElement);

// 可视化选择相机位置
controls.addEventListener("change", function () {
  console.log("camera.position", camera.position);
});
