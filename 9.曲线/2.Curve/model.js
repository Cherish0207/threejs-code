import * as THREE from 'three';

// 参数1和2表示椭圆中心坐标  参数3和4表示x和y方向半径
const curve = new THREE.ArcCurve(
	0,  0,            // ax, aY
	100,           // xRadius, yRadius
	0,  -0.4 * Math.PI,  // aStartAngle, aEndAngle
	true,            // aClockwise
	0                 // aRotation
);

const points = curve.getSpacedPoints(40);
const geometry = new THREE.BufferGeometry().setFromPoints( points );
// 线材质
const material = new THREE.PointsMaterial({
    color: 0xff0000, //线条颜色
    size: 10
});
// 创建线模型对象   构造函数：Line、LineLoop、LineSegments
// const line = new THREE.Line(geometry, material); 
const line = new THREE.Points(geometry, material);//线条模型对象

export default line;