// 引入three.js
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(100, 100, 100);

const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff, //设置材质颜色
});
const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
scene.add(mesh); //网格模型添加到场景中

// AxesHelper：辅助观察的坐标系
const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

const spotLight = new THREE.SpotLight(0xffffff, 1.0);
scene.add(spotLight);
spotLight.angle = Math.PI; // 光源发散角度，光锥角度的二分之一
spotLight.position.set(800, 700, 600); // 光源位置
// console.log('聚光源指向目标',spotLight.target);// spotLight.target是一个模型对象Object3D，默认在坐标原点
spotLight.target.position.set(0, 0, 0);
//spotLight.target添加到场景中.target.position才会起作用
scene.add(spotLight.target);
// 聚光源辅助对象，可视化聚光源
const spotLightHelper = new THREE.SpotLightHelper(spotLight,0xffff00)
scene.add(spotLightHelper);

const width = 800; //宽度
const height = 500; //高度

const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
camera.position.set(1000, 1000, 1000); //相机在Three.js三维坐标系中的位置
camera.lookAt(0, 0, 0); //相机观察目标指向Three.js坐标系原点

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height); //设置three.js渲染区域的尺寸(像素px)
//three.js执行渲染命令会输出一个canvas画布，也就是一个HTML元素，你可以插入到web页面中
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
function render() {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
render();
