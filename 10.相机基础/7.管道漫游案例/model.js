// 引入three.js
import * as THREE from "three";
// 三维样条曲线
const path = new THREE.CatmullRomCurve3([
  new THREE.Vector3(-50, 20, 90),
  new THREE.Vector3(-10, 40, 40),
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(60, -60, 0),
  new THREE.Vector3(70, 0, 80),
]);

const geometry = new THREE.TubeGeometry(path, 40, 2, 25);

//纹理贴图加载器TextureLoader
const texLoader = new THREE.TextureLoader();
// .load()方法加载图像，返回一个纹理对象Texture
const texture = texLoader.load("./diffuse.jpg");

const pointMaterial = new THREE.PointsMaterial({
  // 设置纹理贴图：Texture对象作为材质map属性的属性值
  map: texture, //map表示材质的颜色贴图属性
  side: THREE.BackSide,
});
// const material = new THREE.MeshLambertMaterial({
//   // 设置纹理贴图：Texture对象作为材质map属性的属性值
//   map: texture, //map表示材质的颜色贴图属性
//   side: THREE.BackSide,
// });

texture.wrapS = THREE.RepeatWrapping; //UV坐标U方向阵列模式
console.log("uv", geometry.attributes.uv);
texture.repeat.x = 10;//纹理沿着管道方向阵列(UV坐标U方向)

const mesh = new THREE.Points(geometry, pointMaterial); //点模型对象
// const mesh = new THREE.Points(geometry, pointMaterial); //点模型对象
// 从曲线轨迹线上等间距获取一定数量点坐标
const pointsArr = path.getSpacedPoints(500);
export { mesh, pointsArr };
