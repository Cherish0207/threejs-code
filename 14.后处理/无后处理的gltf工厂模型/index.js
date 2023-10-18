import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import mesh from "./model.js";

const can = document.querySelector("#can");
const width = window.innerWidth;
const height = window.innerHeight;

const scene = new THREE.Scene();

export const camera = (() => {
  // 正交相机
  const camera = new THREE.PerspectiveCamera(90, width / height, 1, 3000);
  camera.position.set(100, 100, 100); //根据渲染范围尺寸数量级设置相机位置
  camera.lookAt(0, 0, 0);
  return camera;
})();

scene.add(mesh);

const directionLight = (() => {
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(200, 200, 200);
  scene.add(directionalLight);
  return directionalLight;
})();

const renderer = (() => {
  const renderer = new THREE.WebGLRenderer({
    antialias: true, // 开启优化锯齿
  });
  renderer.setPixelRatio(window.devicePixelRatio); //防止输出模糊
  renderer.setSize(width, height);
  can.appendChild(renderer.domElement);
  const controls = new OrbitControls(camera, renderer.domElement);
  // 加载gltf模型如果出现颜色偏差，需要设置renderer.outputEncoding解决
  renderer.outputEncoding = THREE.sRGBEncoding;
  controls.addEventListener("change", function () {
    renderer.render(scene, camera);
  });
  return renderer;
})();

const axesHelper = (() => {
  const axesHelper = new THREE.AxesHelper(100);
  scene.add(axesHelper);
  return axesHelper;
})();

function render() {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
render();

window.onresize = () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
};
