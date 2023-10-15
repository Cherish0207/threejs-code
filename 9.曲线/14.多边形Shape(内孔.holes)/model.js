import * as THREE from "three";

const shape = new THREE.Shape();
// .lineTo(100, 0)绘制直线线段，线段起点：.currentPoint，线段结束点：(100,0)
shape.lineTo(100, 0);
shape.lineTo(100, 100);
shape.lineTo(0, 100);


// Shape内孔轮廓
const path1 = new THREE.Path();// 圆孔1
path1.absarc(20, 20, 10);
const path2 = new THREE.Path();// 圆孔2
path2.absarc(80, 20, 10);
const path3 = new THREE.Path();// 方形孔
path3.moveTo(50, 50);
path3.lineTo(80, 50);
path3.lineTo(80, 80);
path3.lineTo(50, 80);

//三个内孔轮廓分别插入到holes属性中
shape.holes.push(path1, path2,path3);

const geometry = new THREE.ExtrudeGeometry(shape, {
  depth:20,//拉伸长度
  bevelEnabled:false,//禁止倒角
  curveSegments:50,
});


const material = new THREE.MeshLambertMaterial({
  color: 0xa9eeff,
  // wireframe: true,
});

// 创建线模型对象   构造函数：Line、LineLoop、LineSegments
// const line = new THREE.Line(geometry, material);
const line = new THREE.Mesh(geometry, material); //线条模型对象

export default line;