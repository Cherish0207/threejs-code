import * as THREE from "three";

// 下面代码绘制了一个矩形+扇形的轮廓，圆心在(100, 0),半径50。
const shape = new THREE.Shape();
shape.lineTo(100, 0); //.currentPoint变为(100,0)
// 圆弧.arc参数的圆心0,0坐标是相对当前.currentPoint而言，而不是坐标原点
// shape.arc(0,0,50,0,Math.PI/2); //.currentPoint变为圆弧线结束点坐标
console.log('currentPoint',shape.currentPoint);



// // absarc圆心坐标不受到.currentPoint影响，以坐标原点作为参考
shape.absarc(60,0,50,0,Math.PI/2); //.currentPoint变为圆弧线结束点坐标
// 绘制直线，直线起点：圆弧绘制结束的点  直线结束点：(0, 0)
shape.lineTo(0, 50);



// ExtrudeGeometry拉伸Shape获得一个长方体几何体
const geometry = new THREE.ExtrudeGeometry(shape, {
  depth: 20, //拉伸长度
  bevelEnabled: false, //禁止倒角
  curveSegments:20,//shape曲线对应曲线细分数
});

const material = new THREE.MeshLambertMaterial({
  color: 0xffff00,
  wireframe: true,
});

// 创建线模型对象   构造函数：Line、LineLoop、LineSegments
// const line = new THREE.Line(geometry, material);
const line = new THREE.Mesh(geometry, material); //线条模型对象

export default line;