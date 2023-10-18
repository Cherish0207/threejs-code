import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import mesh from "./model.js";

// 后处理扩展库EffectComposer.js
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
// 渲染器通道RenderPass,OutlinePass通道
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { OutlinePass } from "three/addons/postprocessing/OutlinePass.js";
// 伽马校正后处理Shader
import { GammaCorrectionShader } from "three/addons/shaders/GammaCorrectionShader.js";
// ShaderPass功能：使用后处理Shader创建后处理通道
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";

// FXAA抗锯齿Shader
import { FXAAShader } from "three/addons/shaders/FXAAShader.js";
// SMAA抗锯齿通道
import { SMAAPass } from "three/addons/postprocessing/SMAAPass.js";

const can = document.querySelector("#can");
const width = window.innerWidth;
const height = window.innerHeight;

const scene = new THREE.Scene();

// 2.创建相机 - 正交相机
export const camera = (() => {
  //渲染器和相机
  const camera = new THREE.PerspectiveCamera(90, width / height, 1, 3000);
  camera.position.set(100, 100, 100); //根据渲染范围尺寸数量级设置相机位置
  camera.lookAt(0, 0, 0);
  return camera;
})();

scene.add(mesh);

// 光源设置
const directionLight = (() => {
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(200, 200, 200);
  scene.add(directionalLight);

  return directionalLight;
})();

// WebGL渲染器设置
const renderer = (() => {
  const renderer = new THREE.WebGLRenderer({
    antialias: true, // 开启优化锯齿
  });
  renderer.setPixelRatio(window.devicePixelRatio); //防止输出模糊
  // 设置渲染的尺寸大小
  renderer.setSize(width, height);
  // 将webgl渲染的canvas内容添加到body
  can.appendChild(renderer.domElement);
  renderer.outputEncoding = THREE.sRGBEncoding;
  return renderer;
})();

//辅助观察的坐标系
const axesHelper = (() => {
  const axesHelper = new THREE.AxesHelper(100);
  scene.add(axesHelper);
  return axesHelper;
})();

// 后处理器
const composer = (() => {
  // 创建后处理对象EffectComposer，WebGL渲染器作为参数
  const composer = new EffectComposer(renderer);
  // 创建一个渲染器通道，场景和相机作为参数
  const renderPass = new RenderPass(scene, camera);

  // 设置renderPass通道
  composer.addPass(renderPass);

  // OutlinePass第一个参数v2的尺寸和canvas画布保持一致
  const v2 = new THREE.Vector2(window.innerWidth, window.innerWidth);
  // const v2 = new THREE.Vector2(800, 600);
  const outlinePass = new OutlinePass(v2, scene, camera);

  composer.addPass(outlinePass);

  // 创建伽马校正通道
  const gammaPass = new ShaderPass(GammaCorrectionShader);
  composer.addPass(gammaPass);

  // .getPixelRatio()获取设备像素比
  const FXAAPass = new ShaderPass(FXAAShader);
  // `.getPixelRatio()`获取`renderer.setPixelRatio()`设置的值
  const pixelRatio = renderer.getPixelRatio(); //获取设备像素比
  // width、height是canva画布的宽高度
  FXAAPass.uniforms.resolution.value.x = 1 / (width * pixelRatio);
  FXAAPass.uniforms.resolution.value.y = 1 / (height * pixelRatio);
  composer.addPass(FXAAPass);

  renderer.domElement.addEventListener("click", function (event) {
    // .offsetY、.offsetX以canvas画布左上角为坐标原点,单位px
    const px = event.offsetX;
    const py = event.offsetY;
    //屏幕坐标px、py转WebGL标准设备坐标x、y
    //width、height表示canvas画布宽高度
    const x = (px / width) * 2 - 1;
    const y = -(py / height) * 2 + 1;
    //创建一个射线投射器`Raycaster`
    const raycaster = new THREE.Raycaster();
    //.setFromCamera()计算射线投射器`Raycaster`的射线属性.ray
    // 形象点说就是在点击位置创建一条射线，射线穿过的模型代表选中
    raycaster.setFromCamera(new THREE.Vector2(x, y), camera);

    const cunchu = mesh.children[0].getObjectByName("存储罐");
    console.log("cunchu: ", cunchu);
    // 可以给待选对象的所有子孙后代Mesh，设置一个祖先属性ancestors,值指向祖先(待选对象)
    for (let i = 0; i < cunchu.children.length; i++) {
      const group = cunchu.children[i];
      //递归遍历chooseObj，并给chooseObj的所有子孙后代设置一个ancestors属性指向自己
      group.traverse(function (obj) {
        if (obj.isMesh) {
          obj.ancestors = group;
        }
      });
    }
    // 射线拾取模型对象(包含多个Mesh)
    // 射线交叉计算拾取模型
    console.log(raycaster.ray);
    const intersects = raycaster.intersectObjects(cunchu.children);

    if (intersects.length > 0) {
      outlinePass.selectedObjects = [intersects[0].object.ancestors];
    }

    console.log("射线器返回的对象", intersects);
    // intersects.length大于0说明，说明选中了模型
    if (intersects.length > 0) {
      // 选中模型的第一个模型，设置为红色
      intersects[0].object.material.color.set(0xff0000);
    }
  });

  setTimeout(() => {
    console.log("cunchu: ", mesh.children[0]);
  }, 1000);
  // //获取.setPixelRatio()设置的设备像素比
  // const pixelRatio = renderer.getPixelRatio();
  // // width、height是canva画布的宽高度
  // const smaaPass = new SMAAPass(width * pixelRatio, height * pixelRatio);
  // composer.addPass(smaaPass);

  return composer;
})();

function render() {
  composer.render();
  // renderer.render(scene, camera);
  requestAnimationFrame(render);
}
render();

window.onresize = () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
};
camera.position.set(202, 123, 125);
// camera.position.set(1.1, 11.8, 62.4);
// camera.position.set(-27.89946421649832, 2.1430827174824683, 57.01962024512579);

const controls = new OrbitControls(camera, renderer.domElement);

// 可视化选择相机位置
controls.addEventListener("change", function () {
  console.log("camera.position", camera.position);
});
