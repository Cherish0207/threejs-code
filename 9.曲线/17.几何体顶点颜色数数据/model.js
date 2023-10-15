import * as THREE from "three";
const geometry = new THREE.BufferGeometry(); //创建一个几何体对象
const vertices = new Float32Array([
    0, 0, 0, //顶点1坐标
    50, 0, 0, //顶点2坐标
    0, 25, 0, //顶点3坐标
]);
// 顶点位置
geometry.attributes.position = new THREE.BufferAttribute(vertices, 3);

const colors = new Float32Array([
  1, 0, 0, //顶点1颜色
  0, 0, 1, //顶点2颜色
  0, 1, 0, //顶点3颜色
]);
// 设置几何体attributes属性的颜色color属性
//3个为一组,表示一个顶点的颜色数据RGB
geometry.attributes.color = new THREE.BufferAttribute(colors, 3); 

// // 点渲染模式
const pointMaterial = new THREE.PointsMaterial({
  // color: 0x333333,//使用顶点颜色数据，color属性可以不用设置
  vertexColors:true,//默认false，设置为true表示使用顶点颜色渲染
  size: 20.0, //点对象像素尺寸
});
const points = new THREE.Points(geometry, pointMaterial); //点模型对象

const lineMaterial = new THREE.LineBasicMaterial({
  vertexColors:true,//使用顶点颜色渲染
});
const line = new THREE.Line(geometry, lineMaterial);


const meshMaterial = new THREE.MeshBasicMaterial({
  // color: 0x333333,//使用顶点颜色数据，color属性可以不用设置
  vertexColors:true,//默认false，设置为true表示使用顶点颜色渲染
  side: THREE.DoubleSide,
});
const mesh = new THREE.Mesh(geometry, meshMaterial); 


export default mesh;