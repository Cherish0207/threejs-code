import * as THREE from "three";

const A = new THREE.Vector3(30, 40, 0); // 人起点A
const v = new THREE.Vector3(1, 1, 0);
// walk表示运动的位移量用向量
const walk = v.clone().multiplyScalar(40);
// const B = new THREE.Vector3(); // 人运动结束点B
const B = A.clone().add(walk);
// addVectors的含义就是参数中两个向量xyz三个分量分别相加
// B.addVectors(A, walk);

console.log("A", A);
console.log("B", B);
const AB = new THREE.Vector3();
AB.subVectors(B,A);
console.log('AB: ', AB);

const L = A.length();
console.log('L',L);

const dir = new THREE.Vector3(1, 1, 0);
dir.normalize(); //向量归一化
//Vector3(√2/2, √2/2, 0)   Vector3(0.707, 0.707, 0)
console.log('dir',dir);

const R = 100; //半径长度
const angle = Math.PI / 6; //30度
// const angle = Math.PI/2;//90度
// const angle = Math.PI;//180度
const x = R * Math.cos(angle);
const y = R * Math.sin(angle);
const geometry = new THREE.SphereGeometry(3);
const material = new THREE.MeshLambertMaterial({ color: 0x00ffff });

const group = new THREE.Group();

const meshA = new THREE.Mesh(geometry, material);
const meshB = new THREE.Mesh(geometry, material);

// 两个小球网格模型可视化A点和B点
meshA.position.copy(A);
meshB.position.copy(B);

group.add(meshA);
group.add(meshB);

export default group;
