import * as THREE from "three";
// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const loader = new GLTFLoader(); //创建一个GLTF加载器

const model = new THREE.Group(); //声明一个组对象，用来添加加载成功的三维场景

loader.load("./工厂.gltf", function (gltf) {
  //gltf加载成功后返回一个对象
  console.log('控制台查看gltf对象结构', gltf);
  // console.log('场景3D模型数据', gltf.scene);
  model.add(gltf.scene); //三维场景添加到model组对象中
  //mesh表示地形网格模型
  const mesh = gltf.scene.children[0];
  console.log("mesh: ", mesh);
  // 顶点数据
  const att = mesh.geometry.attributes;
  console.log("att", att);
  // 顶点位置数据
  const pos = mesh.geometry.attributes.position;
  console.log("pos", pos);
  console.log("index", mesh.geometry.index);
  const count = pos.count; //几何体顶点数量
  console.log("count", count);

  // 获取几何体第一个顶点的x坐标
  const x = pos.getX(0);
  console.log("x", x);

  // pos.setX(0, 100);
  // 批量设置所有几何体顶点位置的y坐标
  for (let i = 0; i < count; i++) {
    const x = pos.getX(i); //获取第i+1个顶点y坐标
    // pos.setX(i, x * 6); //设置第i+1个顶点y坐标为自身2倍
  }
  console.log("x", pos.getX(0));
});

export default model;
