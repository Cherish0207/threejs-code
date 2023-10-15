// 引入three.js
import * as THREE from 'three';

const geometry = new THREE.BufferGeometry(); //创建一个几何体对象
//类型数组创建顶点数据
const vertices = new Float32Array([
    0, 0, 0, //顶点1坐标
    50, 0, 0, //顶点2坐标
    0, 100, 0, //顶点3坐标
    0, 0, 10, //顶点4坐标
    0, 0, 100, //顶点5坐标
    50, 0, 10, //顶点6坐标
]);
// 创建属性缓冲区对象
const attribue = new THREE.BufferAttribute(vertices, 3); //3个为一组，表示一个顶点的xyz坐标
// 设置几何体attributes属性的位置属性
geometry.attributes.position = attribue;


// 点渲染模式
const material = new THREE.PointsMaterial({
    color: 0xffff00,
    size: 10.0 //点对象像素尺寸
}); 
const basicMaterial = new THREE.MeshBasicMaterial({
    color: 0x0000ff, //设置材质颜色
    // color: 0xffff00,
    // size: 10.0 //点对象像素尺寸
});  
const lineMaterial = new THREE.LineBasicMaterial({
    color: 0xff00ff //线条颜色
}); 


const line = new THREE.LineSegments(geometry, lineMaterial);
const points = new THREE.Mesh(geometry, basicMaterial); //点模型对象

export default line;