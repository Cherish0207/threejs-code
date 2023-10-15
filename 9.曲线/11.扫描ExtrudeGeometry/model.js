import * as THREE from "three";
// 扫描轮廓：Shape表示一个平面多边形轮廓
const shape = new THREE.Shape([
    // 按照特定顺序，依次书写多边形顶点坐标
    new THREE.Vector2(0,0), //多边形起点
    new THREE.Vector2(0,10),
    new THREE.Vector2(10,10),
    new THREE.Vector2(10,0),
]);

// 扫描轨迹：创建轮廓的扫描轨迹(3D样条曲线)
const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3( -10, -50, -50 ),
    new THREE.Vector3( 10, 0, 0 ),
    new THREE.Vector3( 8, 50, 50 ),
    new THREE.Vector3( -5, 0, 100)
]);



//扫描造型：扫描默认没有倒角
const geometry = new THREE.ExtrudeGeometry(
    shape, //扫描轮廓
    {
        extrudePath:curve,//扫描轨迹
        steps:10//沿着路径细分精度，越大越光滑
    }
);

const material = new THREE.MeshLambertMaterial({
    color: 0xffff00,
    wireframe:true,
});

// 创建线模型对象   构造函数：Line、LineLoop、LineSegments
// const line = new THREE.Line(geometry, material); 
const line = new THREE.Mesh(geometry, material);//线条模型对象

export default line;
