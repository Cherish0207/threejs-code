import * as THREE from "three"; 
// 三维样条曲线
const path = new THREE.CatmullRomCurve3([
  new THREE.Vector3(-50, 20, 90),
  new THREE.Vector3(-10, 40, 40),
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(60, -60, 0),
  new THREE.Vector3(70, 0, 80),
]);

// // LineCurve3创建直线段路径
// // const path = new THREE.LineCurve3(new THREE.Vector3(0, 100, 0), new THREE.Vector3(0, 0, 0));
// // p1、p2、p3表示三个点坐标
// const p1 = new THREE.Vector3(-80, 0, 0);
// const p2 = new THREE.Vector3(20, 100, 0);
// const p3 = new THREE.Vector3(80, 0, 100);
// // 三维二次贝赛尔曲线
// const path = new THREE.QuadraticBezierCurve3(p1, p2, p3);

// path:路径   40：沿着轨迹细分数  2：管道半径   25：管道截面圆细分数
const geometry = new THREE.TubeGeometry(path, 40, 5, 25);

const material = new THREE.MeshLambertMaterial({
//   side: THREE.DoubleSide,
  color: 0xff0000, //线条颜色
  size: 10,
});
// 创建线模型对象   构造函数：Line、LineLoop、LineSegments
// const line = new THREE.Line(geometry, material);
const line = new THREE.Mesh(geometry, material); //线条模型对象

export default line;
