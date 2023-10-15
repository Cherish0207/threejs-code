import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

//场景
const scene = new THREE.Scene();
const geometry = new THREE.BoxGeometry(100, 100, 100);
//材质对象Material
const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff, //设置材质颜色
  transparent: true, //开启透明
  opacity: 0.5, //设置透明度
});
geometry.rotateX(Math.PI/3)

const group = new THREE.Group()
for (let i = 0; i < 10; i++) {
  const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
  // 沿着x轴分布
  mesh.position.set(i * 200, 0, 0);
  group.add(mesh)
  console.log('mesh.position: ', mesh.position);
}
scene.add(group); //网格模型添加到场景中



// const box3 = new THREE.Box3()
// console.log('min',box3.min);// Vector3 {x: Infinity, y: Infinity, z: Infinity} Vector3 {x: -Infinity, y: -Infinity, z: -Infinity}
// console.log('min',box3.max);// Vector3 {x: Infinity, y: Infinity, z: Infinity} Vector3 {x: -Infinity, y: -Infinity, z: -Infinity}


// box3.min = new THREE.Vector3(-10, -10,0);
// box3.max = new THREE.Vector3(100, 20,50);
// console.log('min',box3.min);// Vector3 {x: Infinity, y: Infinity, z: Infinity} Vector3 {x: -Infinity, y: -Infinity, z: -Infinity}
// console.log('min',box3.max);// Vector3 {x: Infinity, y: Infinity, z: Infinity} Vector3 {x: -Infinity, y: -Infinity, z: -Infinity}


const box3 = new THREE.Box3();
box3.expandByObject(group); // 计算模型包围盒
console.log('查看包围盒',box3.min,box3.max);
// const scale = new THREE.Vector3()
// box3.getSize(scale)
// console.log('模型包围盒尺寸', scale);


// 计算包围盒中心坐标
const center = new THREE.Vector3()
box3.getCenter(center)
console.log('模型中心坐标', center);

//辅助观察的坐标系
const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

//光源设置
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(100, 60, 50);
scene.add(directionalLight);
const ambient = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambient);

// 正投影相机
const width = window.innerWidth; //canvas画布宽度
const height = window.innerHeight; //canvas画布高度
const k = width / height; //canvas画布宽高比
const s = 900; //控制left, right, top, bottom范围大小
const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 8000);

camera.position.set(0, 2000, 0); //相机放在了y轴上
camera.lookAt(0, 0, 0); //指向坐标原点

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
