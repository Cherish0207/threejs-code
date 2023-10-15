import * as THREE from 'three';

// 二维向量Vector2创建一组顶点坐标
const arr = [
    new THREE.Vector2(-100, 0),
    new THREE.Vector2(0, 30),
    new THREE.Vector2(100, 0),
];
// 二维样条曲线
const curve = new THREE.SplineCurve(arr);

const points = curve.getSpacedPoints(10);
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