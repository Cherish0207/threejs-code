import * as THREE from 'three';


const geometry = new THREE.BufferGeometry(); // 创建一个空的几何体对象

// 顶点数据 表示几何体的顶点坐标
const vertices = new Float32Array([
    0, 0, 0, //顶点1坐标
    80, 0, 0, //顶点2坐标
    80, 80, 0, //顶点3坐标
    0, 80, 0, //顶点4坐标
]);

// 顶点索引数据,索引值对应顶点位置数据中的顶点坐标
const indexes = new Uint16Array([
    0, 1, 2, 0, 2, 3,
])

// 顶点法线属性,每个顶点的法线数据和顶点位置数据一一对应
const normals = new Float32Array([
    0, 1, 1, //顶点1法线( 法向量 )
    0, 5, 1, //顶点1法线( 法向量 )
    0, 1, 1, //顶点1法线( 法向量 )
    0, 1, 1, //顶点1法线( 法向量 )
]);

// BufferAttribute: 属性缓冲区对象(定义几何体顶点位置数据)

// 设置几何体attributes属性的位置属性,3个为一组，表示一个顶点的xyz坐标
geometry.attributes.position = new THREE.BufferAttribute(vertices, 3);
geometry.index = new THREE.BufferAttribute(indexes, 1); //1个为一组


// 设置几何体的顶点法线属性.attributes.normal
geometry.attributes.normal = new THREE.BufferAttribute(normals, 3); //3个为一组,表示一个顶点的法线数据

const material = new THREE.MeshBasicMaterial({
    color: 0x0000ff, 
    side: THREE.FrontSide, //默认只有正面可见
    // side: THREE.BackSide, //设置只有背面可见
    // side: THREE.DoubleSide, //两面可见
});
// 网格模型本质：一个一个三角形(面)构成
const mesh = new THREE.Mesh(geometry, material);

export default mesh;