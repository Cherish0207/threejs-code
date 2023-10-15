import * as THREE from "three";
import data from "./data.js";

const pointsArr = []; // 一组二维向量表示一个多边形轮廓坐标
data.forEach(function (e) {
  // data坐标数据转化为Vector2构成的顶点数组
  const v2 = new THREE.Vector2(e[0], e[1]);
  pointsArr.push(v2);
});
// Shape表示一个平面多边形轮廓,参数是二维向量构成的数组pointsArr
const shape = new THREE.Shape(pointsArr);
// 多边形shape轮廓作为ShapeGeometry参数，生成一个多边形平面几何体
const geometry = new THREE.ShapeGeometry(shape);

const material = new THREE.MeshLambertMaterial({
  color: 0xffff00,
  // wireframe: true,
});

const mesh = new THREE.Mesh(geometry, material); //线条模型对象

export default mesh;
