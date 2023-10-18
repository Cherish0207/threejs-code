import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { mesh1, mesh2 } from "./model.js";

const scene = new THREE.Scene();

scene.add(mesh1);
scene.add(mesh2);
// console.log('mesh1: ', mesh1);
// console.log('mesh2: ', mesh2);
const raycaster = new THREE.Raycaster();
raycaster.ray.origin = new THREE.Vector3(0, 0, 80);
raycaster.ray.direction = new THREE.Vector3(0, 0, -1).normalize();
const intersects = raycaster.intersectObjects([mesh1, mesh2]);
// console.log("射线器返回的对象", intersects);
// intersects.length大于0说明，说明选中了模型
if (intersects.length > 0) {
  // 选中模型的第一个模型，设置为红色
  intersects[0].object.material.color.set(0xff0000);
  // console.log("交叉点坐标", intersects[0].point);
  console.log("交叉对象", intersects[0].object);
  // console.log("交叉对象", intersects[1].object);
  // console.log("交叉对象", intersects[2].object);
  // console.log("交叉对象", intersects[3].object);
  // console.log("交叉对象", intersects[4].object);
  // console.log("射线原点和交叉点距离", intersects[0].distance);
}

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
const scan =document.getElementById('scan')
scan.appendChild(renderer.domElement);
scan.addEventListener('click',function(event){
  // event对象有很多鼠标事件相关信息
  console.log('clientX',event.clientX);
  console.log('clientY',event.clientY);
  console.log('offsetX',event.offsetX);
  console.log('offsetY',event.offsetY);
})

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
