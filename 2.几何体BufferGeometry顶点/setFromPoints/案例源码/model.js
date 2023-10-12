import * as THREE from 'three';

const geometry = new THREE.BufferGeometry(); //创建一个几何体对象
//类型数组创建顶点数据
const vertices = new Float32Array([
    0, 0, 0, //顶点1坐标
    80, 0, 0, //顶点2坐标
    80, 80, 0, //顶点3坐标
    0, 80, 0, //顶点4坐标
]);
// 创建属性缓冲区对象
const attribue = new THREE.BufferAttribute(vertices, 3); //3个为一组，表示一个顶点的xyz坐标
// 设置几何体attributes属性的位置属性
geometry.attributes.position = attribue;

console.log('几何体变化',geometry.attributes.position);

// const pointsArr = [
//     // 三维向量Vector3表示的坐标值
//     new THREE.Vector3(0,0,0),
//     new THREE.Vector3(0,100,0),
//     new THREE.Vector3(0,100,100),
//     new THREE.Vector3(0,0,100),
// ];
// // 把数组pointsArr里面的坐标数据提取出来，赋值给`geometry.attributes.position`属性
// geometry.setFromPoints(pointsArr);
const pointsArr = [
    // 三维向量Vector2表示的坐标值
    new THREE.Vector2(0,0),
    new THREE.Vector2(100,0),
    new THREE.Vector2(100,100),
    new THREE.Vector2(0,100),
];
geometry.setFromPoints(pointsArr);
console.log('几何体变化',geometry.attributes.position);



// Uint16Array类型数组创建顶点索引数据
const indexes = new Uint16Array([
    0, 1, 2, 0, 2, 3,
])
// BufferAttribute表示顶点索引属性的值
geometry.index = new THREE.BufferAttribute(indexes, 1); //1个为一组
// 索引数据赋值给几何体的index属性
const material = new THREE.MeshBasicMaterial({
    color: 0x00ffff, 
    // side: THREE.FrontSide, //默认只有正面可见
    // side: THREE.BackSide, //设置只有背面可见
    side: THREE.DoubleSide, //两面可见
});
// 网格模型本质：一个一个三角形(面)构成
const mesh = new THREE.Mesh(geometry, material);

export default mesh;