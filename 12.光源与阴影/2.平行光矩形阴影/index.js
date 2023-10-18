// 引入three.js
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import model from "./model.js"; //模型对象
import { GUI } from "three/addons/libs/lil-gui.module.min.js";

//创建一个GUI对象，你可以看到浏览器右上角多了一个交互界面，GUI本质上就是一个前端js库。
const gui = new GUI();
const scene = new THREE.Scene();
scene.add(model); //模型对象添加到场景中

// AxesHelper：辅助观察的坐标系
const axesHelper = new THREE.AxesHelper(300);
scene.add(axesHelper);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(100, 60, 50);
scene.add(directionalLight);

directionalLight.castShadow = true;

directionalLight.shadow.camera.left = -50;
directionalLight.shadow.camera.right = 50;
directionalLight.shadow.camera.top = 200;
directionalLight.shadow.camera.bottom = -100;
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 300;
const orCamera = directionalLight.shadow.camera;
// mapSize属性默认512x512
console.log("阴影默认像素", directionalLight.shadow.mapSize);
// directionalLight.shadow.mapSize.set(128,128)

// console.log("阴影相机属性", directionalLight.shadow.camera);
// 模糊弱化阴影边缘
console.log(".shadow.radius", directionalLight.shadow.radius);
directionalLight.shadow.radius = 13;

// 可视化平行光阴影对应的正投影相机对象
const cameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
scene.add(cameraHelper);

gui.add(orCamera, "left", -150, -50).onChange(function (v) {
  orCamera.updateProjectionMatrix(); //相机更新投影矩阵
  cameraHelper.update(); //相机范围变化了，相机辅助对象更新
});
gui.add(orCamera, "far", 50, 400).onChange(function (v) {
  orCamera.updateProjectionMatrix(); //相机更新投影矩阵
  cameraHelper.update(); //相机范围变化了，相机辅助对象更新
});

const width = window.innerWidth;
const height = window.innerHeight;
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
// camera.position.set(1000, 1000, 1000); //相机在Three.js三维坐标系中的位置
camera.position.set(96.7682133755867, 228.15584106365523, 220.7453246229684); //相机在Three.js三维坐标系中的位置
camera.lookAt(0, 0, 0); //相机观察目标指向Three.js坐标系原点

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
// renderer.setPixelRatio(window.devicePixelRatio);
//three.js执行渲染命令会输出一个canvas画布，也就是一个HTML元素，你可以插入到web页面中
document.body.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true;

const controls = new OrbitControls(camera, renderer.domElement);
function render() {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
render();

// 画布跟随窗口变化
window.onresize = function () {
  const width = window.innerWidth;
  const height = window.innerHeight;
  // cnavas画布宽高度重新设置
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
};
// 可视化选择相机位置

controls.addEventListener("change", function () {
  console.log("camera.position:");
  console.log(`${camera.position.x},${camera.position.y},${camera.position.z}`);
});
