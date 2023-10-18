import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import triangle from "./model.js";

const scene = new THREE.Scene();

scene.add(triangle);
const ray = new THREE.Ray();
ray.origin = new THREE.Vector3(1, 0, 3);
ray.direction = new THREE.Vector3(1, 0, 0);
/*
	计算一个射线和一个三角形在3D空间中是否交叉
  p1,p2,p3 是三角形三个点坐标，可以理解为一个三角形，有正反两面，如果沿着三个点的顺序转圈是逆时针方向，表示正面。
  point用来记录射线和三角形的交叉点
	.intersectTriangle()计算射线和三角形是否相交叉，相交返回交点，不相交返回null
*/
const p1 = new THREE.Vector3(100, 25, 0);
const p2 = new THREE.Vector3(100, -25, 25);
const p3 = new THREE.Vector3(100, -25, -25);
const point = new THREE.Vector3();
// 参数4表示是否进行背面剔除。设为true表示进行背面剔除。
// 虽然从几何空间上讲，该案例源码射线和三角形虽然交叉，但在threejs中，三角形背面对着射线，视为交叉无效，进行背面剔除，返回值r是null
const result = ray.intersectTriangle(p1, p2, p3, true, point);
console.log("交叉点坐标", point);
console.log("查看是否相交", result);

//辅助观察的坐标系
const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

//光源设置
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(100, 60, 50);
scene.add(directionalLight);
const ambient = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambient);

//渲染器和相机
const width = window.innerWidth;
const height = window.innerHeight;
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
camera.position.set(292, 223, 185);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

// 渲染循环
function render() {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
render();

const controls = new OrbitControls(camera, renderer.domElement);

// 画布跟随窗口变化
window.onresize = function () {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
};
