// 引入three.js
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();

// 尺寸相同的Sprite和矩形平面Mesh:

const spriteMaterial = new THREE.SpriteMaterial({
  color: 0x00ffff,
  rotation:Math.PI/4,//旋转精灵对象45度，弧度值
});
const sprite = new THREE.Sprite(spriteMaterial);
sprite.scale.set(50, 25, 1);

scene.add(sprite);

const geometry = new THREE.PlaneGeometry(50, 25);
const material = new THREE.MeshBasicMaterial({
  color: 0x00ffff,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// AxesHelper：辅助观察的坐标系
const axesHelper = new THREE.AxesHelper(25);
scene.add(axesHelper);

const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
scene.add(ambientLight);

const width = 800; //宽度
const height = 500; //高度

const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
// const s = 0.5; //控制left, right, top, bottom范围大小
// const k = width / height;
// const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 8000);

camera.position.set(200, 200, 200); //相机在Three.js三维坐标系中的位置
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
