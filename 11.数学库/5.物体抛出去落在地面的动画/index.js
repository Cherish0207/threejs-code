// 引入three.js
import * as THREE from "three";

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

/**
 * 创建3D场景对象Scene
 */
const scene = new THREE.Scene();

const geometry = new THREE.SphereGeometry(3);
// 漫反射网格材质；MeshLambertMaterial
const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff, //设置材质颜色
  transparent: true, //开启透明
  opacity: 0.5, //设置透明度
});
const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
scene.add(mesh); //网格模型添加到场景中

// AxesHelper：辅助观察的坐标系
const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

/**
 * 光源设置
 */
// 平行光
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(100, 60, 50);
scene.add(directionalLight);
//环境光
const ambient = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambient);

// width和height用来设置Three.js输出的Canvas画布尺寸(像素px)
const width = 800; //宽度
const height = 500; //高度
/**
 * 透视投影相机设置
 */
// 30:视场角度, width / height:Canvas画布宽高比, 1:近裁截面, 3000：远裁截面
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
camera.position.set(-132, 120, 432); //相机在Three.js三维坐标系中的位置
camera.lookAt(-20, 200, 0); //相机观察目标指向Three.js坐标系原点

/**
 * 创建渲染器对象
 */
const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height); //设置three.js渲染区域的尺寸(像素px)
// renderer.render(scene, camera); //执行渲染操作
//three.js执行渲染命令会输出一个canvas画布，也就是一个HTML元素，你可以插入到web页面中
document.body.appendChild(renderer.domElement);

mesh.position.set(0, 100, 0);
const v = new THREE.Vector3(30, 20, 0);
const g = new THREE.Vector3(0, -9.8, 0);

const clock = new THREE.Clock(); //时钟对象
let t = 0;
const pos0 = mesh.position.clone();

const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', function () {
    renderer.render(scene, camera); //执行渲染操作
    // 浏览器控制台查看相机位置变化
    console.log('camera.position',camera);
});//监听鼠标、键盘事件


function render() {
  if (mesh.position.y > 0) {
    const spt = clock.getDelta(); //两帧渲染时间间隔(秒)
    t += spt;
    // 在t时间内，以速度v运动的位移量
    const dis = v
      .clone()
      .multiplyScalar(t)
      .add(g.clone().multiplyScalar(0.5 * t * t));
    console.log(Math.floor(t), dis);
    // 网格模型当前的位置加上spt时间段内运动的位移量
    const newPos = pos0.clone().add(dis);
    console.log("newPos: ", newPos);
    mesh.position.copy(newPos);
  }
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
render();
