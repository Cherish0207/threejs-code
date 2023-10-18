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
  // intersects[0].object.material.color.set(0xff0000);
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
renderer.domElement.addEventListener('click', function (event) {
  // .offsetY、.offsetX以canvas画布左上角为坐标原点,单位px
  const px = event.offsetX;
  const py = event.offsetY;
  //屏幕坐标px、py转WebGL标准设备坐标x、y
  //width、height表示canvas画布宽高度
  const x = (px / width) * 2 - 1;
  const y = -(py / height) * 2 + 1;
  //创建一个射线投射器`Raycaster`
  const raycaster = new THREE.Raycaster();
  //.setFromCamera()计算射线投射器`Raycaster`的射线属性.ray
  // 形象点说就是在点击位置创建一条射线，射线穿过的模型代表选中
  raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
  //.intersectObjects([mesh1, mesh2, mesh3])对参数中的网格模型对象进行射线交叉计算
  // 未选中对象返回空数组[],选中一个对象，数组1个元素，选中两个对象，数组两个元素
  const intersects = raycaster.intersectObjects([mesh1, mesh2]);
  console.log("射线器返回的对象", intersects);
  // intersects.length大于0说明，说明选中了模型
  if (intersects.length > 0) {
      // 选中模型的第一个模型，设置为红色
      intersects[0].object.material.color.set(0xff0000);
  }
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
