import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import  model  from './model.js';//模型对象

//场景
const scene = new THREE.Scene();
scene.add(model); //模型对象添加到场景中


//辅助观察的坐标系
const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);


//光源设置
const pointLight = new THREE.PointLight(0xffffff, 1.0);
pointLight.position.set(400, 200, 300);
scene.add(pointLight);
const ambient = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambient);


//渲染器和相机
const width = window.innerWidth;
const height = window.innerHeight;
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
camera.position.set(492, 423, 185);
camera.lookAt(model.position);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

const tween = new TWEEN.Tween(model.position);//创建一段tween动画
//经过2000毫秒，model.position的x和y属性变化为100、50
tween.to({x: -100,y: -50}, 2000);
//tween动画开始执行
tween.start();


// 渲染循环
function render() {
    TWEEN.update();//tween更新
    // console.log(model.position.x,model.position.y);
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