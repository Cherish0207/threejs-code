import * as THREE from "three";

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
export default sprite;
