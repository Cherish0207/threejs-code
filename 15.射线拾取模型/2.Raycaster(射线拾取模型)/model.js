import * as THREE from "three";

const geometry = new THREE.PlaneGeometry(100, 50);
const material = new THREE.MeshLambertMaterial({
  color: 0xff00ff, //线条颜色
});
const mesh1 = new THREE.Mesh(geometry, material); //线条模型对象
const mesh2 = mesh1.clone();

mesh2.material = mesh1.material.clone();
mesh2.position.set(0, 0, 50);

export { mesh1, mesh2 };
