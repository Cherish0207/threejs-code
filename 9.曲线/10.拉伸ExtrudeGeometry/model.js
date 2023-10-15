import * as THREE from "three";
// Shape表示一个平面多边形轮廓
const shape = new THREE.Shape([
  // 按照特定顺序，依次书写多边形顶点坐标
  new THREE.Vector2(-50, -50), //多边形起点
  new THREE.Vector2(-50, 50),
  new THREE.Vector2(50, 50),
  new THREE.Vector2(50, -50),
]);
const geometry = new THREE.ExtrudeGeometry(shape, {
  depth: 20,
//   bevelThickness: 5, //倒角尺寸:拉伸方向
//   bevelSize: 5, //倒角尺寸:垂直拉伸方向
//   bevelSegments: 1, //倒圆角：倒角细分精度，默认3
});

const material = new THREE.MeshLambertMaterial({
  color: 0xffff00,
  // wireframe: true,
});

// 创建线模型对象   构造函数：Line、LineLoop、LineSegments
// const line = new THREE.Line(geometry, material);
const line = new THREE.Mesh(geometry, material); //线条模型对象

export default line;
