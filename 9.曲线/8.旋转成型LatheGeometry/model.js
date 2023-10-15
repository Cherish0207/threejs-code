import * as THREE from "three";

// Vector2表示的三个点坐标，三个点构成的轮廓相当于两端直线相连接
const pointsArr = [
    new THREE.Vector2(50, 60),
    new THREE.Vector2(25, 0),
    new THREE.Vector2(50, -60)
];
// LatheGeometry：pointsArr轮廓绕y轴旋转生成几何体曲面
// pointsArr：旋转几何体的旋转轮廓形状
const geometry = new THREE.LatheGeometry(pointsArr,10,0, 2*Math.PI);

// 通过三个点定义一个二维样条曲线
// const curve = new THREE.SplineCurve([
//     new THREE.Vector2(50, 60),
//     new THREE.Vector2(25, 0),
//     new THREE.Vector2(50, -60)
// ]);
// //曲线上获取点,作为旋转几何体的旋转轮廓
// const pointsArr = curve.getPoints(50); 
// console.log('旋转轮廓数据',pointsArr);
// // LatheGeometry：pointsArr轮廓绕y轴旋转生成几何体曲面
// const geometry = new THREE.LatheGeometry(pointsArr, 30);



const material = new THREE.LineBasicMaterial({
    color: 0xff0000, //线条颜色
    size: 10
});
// 创建线模型对象   构造函数：Line、LineLoop、LineSegments
// const line = new THREE.Line(geometry, material); 
const line = new THREE.Line(geometry, material);//线条模型对象

export default line;
