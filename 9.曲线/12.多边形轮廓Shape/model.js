import * as THREE from "three";
const shape = new THREE.Shape();
const path = new THREE.Path();
console.log("currentPoint", shape.currentPoint);
console.log("currentPoint", path.currentPoint);

shape.moveTo(10, 0);
console.log("currentPoint", shape.currentPoint);

shape.lineTo(100, 0); // 绘制直线线段，起点(10,0)，结束点(100,0)

// ExtrudeGeometry拉伸Shape获得一个长方体几何体
const geometry = new THREE.ExtrudeGeometry(shape, {
  depth: 20, //拉伸长度
  bevelEnabled: false, //禁止倒角
});

const material = new THREE.MeshLambertMaterial({
  color: 0xffff00,
  wireframe: true,
});

// 创建线模型对象   构造函数：Line、LineLoop、LineSegments
// const line = new THREE.Line(geometry, material);
const line = new THREE.Mesh(geometry, material); //线条模型对象

export default line;
