import * as THREE from "three";

const triangleGeometry = new THREE.BufferGeometry();
const vertices = new Float32Array([
  100, 25, 0, //顶点1坐标
  100, -25, 25, //顶点2坐标
  100, -25, -25, //顶点3坐标
]);
// 创建属性缓冲区对象
const attribue = new THREE.BufferAttribute(vertices, 3); //3个为一组，表示一个顶点的xyz坐标
// 设置几何体attributes属性的位置属性
triangleGeometry.attributes.position = attribue;

const triangleMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ffff, //材质颜色
    // side: THREE.FrontSide, //默认只有正面可见
    // side: THREE.BackSide, //设置只有背面可见
    // side: THREE.DoubleSide, //两面可见
});
// 网格模型本质：一个一个三角形(面)构成
const triangle = new THREE.Mesh(triangleGeometry, triangleMaterial); 


export default triangle;
