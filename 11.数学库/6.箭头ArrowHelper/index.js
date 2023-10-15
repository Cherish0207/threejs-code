// 引入three.js
import * as THREE from "three";
/**
 * 创建3D场景对象Scene
 */
const scene = new THREE.Scene();
const A = new THREE.Vector3(0, 30, 0); //A点
const B = new THREE.Vector3(80, 0, 0); //B点

// 绿色小球可视化A点位置
const AMesh = createSphereMesh(0x00ff00, 2);
AMesh.position.copy(A);
// 红色小球可视化B点位置
const BMesh = createSphereMesh(0xff0000, 2);
BMesh.position.copy(B);

const group = new THREE.Group();
group.add(AMesh, BMesh);

function createSphereMesh(color, R) {
  const geometry = new THREE.SphereGeometry(R);
  const material = new THREE.MeshLambertMaterial({
    color: color,
  });
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
}

scene.add(group);

// 绘制一个从A指向B的箭头
const AB = B.clone().sub(A);
const L = AB.length();//AB长度
const dir = AB.clone().normalize();//单位向量表示AB方向

// 生成箭头从A指向B
const arrowHelper = new THREE.ArrowHelper(dir, A, 2*L)
group.add(arrowHelper);


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
camera.position.set(292, 223, 185); //相机在Three.js三维坐标系中的位置
camera.lookAt(0, 0, 0); //相机观察目标指向Three.js坐标系原点

/**
 * 创建渲染器对象
 */
const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height); //设置three.js渲染区域的尺寸(像素px)
// renderer.render(scene, camera); //执行渲染操作
//three.js执行渲染命令会输出一个canvas画布，也就是一个HTML元素，你可以插入到web页面中
document.body.appendChild(renderer.domElement);

// 渲染循环
function render() {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();
