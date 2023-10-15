import * as THREE from 'three';
// p1、p3轨迹线起始点坐标
const p1 = new THREE.Vector3(-100, 0, -100);
const p3 = new THREE.Vector3(100, 0, 100);
// 计算p1和p3的中点坐标
const x2 = (p1.x + p3.x)/2;
const z2 = (p1.z + p3.z)/2;
const h = 50;
const p2 = new THREE.Vector3(x2, h, z2);

const arr = [p1, p2, p3];
// 三维样条曲线
const curve = new THREE.CatmullRomCurve3(arr);



const pointsArr = curve.getPoints(100); //曲线上获取点
const geometry = new THREE.BufferGeometry();
geometry.setFromPoints(pointsArr); //读取坐标数据赋值给几何体顶点
const material = new THREE.LineBasicMaterial({color: 0x00fffff});
const line = new THREE.Line(geometry, material);

const geometry2 = new THREE.BufferGeometry();
geometry2.setFromPoints([p1,p2,p3]);
const material2 = new THREE.PointsMaterial({
    color: 0xff00ff,
    size: 10,
});
//点模型对象
const points = new THREE.Points(geometry2, material2);
// 三个点构成的线条
const line2 = new THREE.Line(geometry2, new THREE.LineBasicMaterial());

export  {line,line2,points};