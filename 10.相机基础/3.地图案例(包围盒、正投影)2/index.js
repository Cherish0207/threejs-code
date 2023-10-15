import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import model from "./model.js";
const scene = new THREE.Scene();
const geometry = new THREE.BoxGeometry(10, 10, 10);

const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff, //设置材质颜色
  transparent: true, //开启透明
  opacity: 0.5, //设置透明度
});

scene.add(model);

const box3 = new THREE.Box3();
box3.expandByObject(model);
const size = new THREE.Vector3();
const center = new THREE.Vector3();
box3.getSize(size);
box3.getCenter(center); // 计算包围盒中心坐标
console.log("模型包围盒尺寸", size);
console.log("模型中心坐标", center);

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
const s = 2.50; //控制left, right, top, bottom范围大小
const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 8000);
camera.position.set(300, 300, 300);
// camera.lookAt(0, 0, 0); //指向坐标原点

const x = 113.51,
  y = 33.88;
camera.lookAt(x, y, 0);



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
controls.target.set(x, y, 0); //与lookAt参数保持一致
controls.update();//update()函数内会执行camera.lookAt(controls.target)

// 画布跟随窗口变化
window.onresize = function () {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
};
