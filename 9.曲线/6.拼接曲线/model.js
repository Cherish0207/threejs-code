import * as THREE from "three";
const R = 80;//圆弧半径
const H = 160;//直线部分高度
// 直线1
const line1 = new THREE.LineCurve(new THREE.Vector2(R, H), new THREE.Vector2(R, 0));
// 圆弧
const arc = new THREE.ArcCurve(0, 0, R, 0, Math.PI, true);
// 直线2
const line2 = new THREE.LineCurve(new THREE.Vector2(-R, 0), new THREE.Vector2(-R, H));

// CurvePath创建一个组合曲线对象
const CurvePath = new THREE.CurvePath();
//line1, arc, line2拼接出来一个U型轮廓曲线，注意顺序
CurvePath.curves.push(line1, arc, line2);


const points = CurvePath.getSpacedPoints(30);
const geometry = new THREE.BufferGeometry().setFromPoints( points );
// 线材质
const material = new THREE.LineBasicMaterial({
    color: 0xff0000, //线条颜色
    size: 10
});
// 创建线模型对象   构造函数：Line、LineLoop、LineSegments
// const line = new THREE.Line(geometry, material); 
const line = new THREE.Line(geometry, material);//线条模型对象

export default line;
