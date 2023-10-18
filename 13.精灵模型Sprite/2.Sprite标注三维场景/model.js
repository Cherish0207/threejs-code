import * as THREE from "three";
import { Group } from "three";
const group = new Group();

const geometry = new THREE.BoxGeometry(25, 100, 50);
geometry.translate(0, 50, 0);
const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
// mesh顶部中心添加标注，顶部中心坐标是(0,100,0)
const mesh = new THREE.Mesh(geometry, material);
group.add(mesh);

const texLoader = new THREE.TextureLoader();
const texture = texLoader.load("./转弯.png");
const spriteMaterial = new THREE.SpriteMaterial({
  map: texture, //map表示材质的颜色贴图属性
  transparent: true, //开启透明，这样png贴图的透明部分不显示
  //   color: 0x00ffff,
  // map
  // .transparent
  // .opacity

  //   rotation: Math.PI / 4, //旋转精灵对象45度，弧度值
});
const sprite = new THREE.Sprite(spriteMaterial);

sprite.scale.set(50, 25, 1); //只需要设置x、y两个分量就可以
sprite.position.set(0, 100 + 10 / 2, 0); //设置位置，要考虑sprite尺寸影响

group.add(sprite);
export default group;
