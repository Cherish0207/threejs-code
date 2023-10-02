// 引入three.js
import * as THREE from 'three';
// 引入轨道控制器扩展库OrbitControls.js
import {
    OrbitControls
} from 'three/addons/controls/OrbitControls.js';
var scene = new THREE.Scene();
var box = new THREE.SphereGeometry(25, 50, 50);
var material = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  side: THREE.BackSide,
});
var mesh = new THREE.Mesh(box, material);
scene.add(mesh);

// AxesHelper：辅助观察的坐标系
const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

var textureLoader = new THREE.TextureLoader();
// 初始化一个监听
var listener = new THREE.AudioListener();
// 初始化音频对象
var audio = new THREE.Audio(listener);
var texture = textureLoader.load(
  "./风格/中式/客餐厅/00125.jpg",
  function (obj) {
    console.log('obj: ', obj);
    console.log(vm.loading);
    vm.loading.close();
    // 初始化一个加载器
    var audioLoader = new THREE.AudioLoader();
    // 加载资源
    audioLoader.load("./音乐/银临-意难平.mp3", function (AudioBuffer) {
      // 给一个加载器对象设置音频对象的缓存
      audio.setBuffer(AudioBuffer);
      audio.setLoop(true);
      audio.setVolume(0.3);
      // 播放音频
      audio.play();
    });
    render();
  }
);
mesh.material.map = texture;
/**
 * 透视投影相机设置
 */
var width = window.innerWidth;
var height = window.innerHeight;
var k = width / height;
var camera = new THREE.PerspectiveCamera(60, k, 1, 1000);
camera.zoom = 1;
camera.updateProjectionMatrix();
camera.position.set(-0.87, 0.03, 0.4);
camera.lookAt(scene.position);
console.log('scene.position: ', scene.position);
/**
 * 创建渲染器对象
 */
var renderer = new THREE.WebGLRenderer(
  { 
    antialias: true /*开启优化锯齿*/ 
  });
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

var clock = new THREE.Clock();
var FPS = 30;
var 刷新时间 = 1 / FPS;
var timeS = 0;

// 渲染循环
function render() {
  requestAnimationFrame(render);
  var 渲染间隔 = clock.getDelta();//两帧渲染时间间隔(秒)
  timeS = timeS + 渲染间隔;
  if (timeS > 刷新时间) {
    renderer.render(scene, camera);
    if (vm.rotateBoool) {
      mesh.rotateY(0.002);
    }
    timeS = 0;
  }
}
render();
var controls = new OrbitControls(camera,renderer.domElement);
controls.enablePan = false;
var styleObjArr = path();
var vm = new Vue({
  el: "#app",
  data: {
    loading: null,
    styleArr: styleObjArr,
    styleChoose: null,
    posArr: null,
    posChoose: null,
    width: window.innerWidth,
    height: window.innerHeight,
    classPath: "中式/客餐厅",
    path: "",
    audioBoool: true,
    ScreenBoool: true,
    rotateBoool: true,
    N: styleObjArr[0].children[0].jpgNameArr.length,
    num: 1,
  },
  methods: {
    audioClick: function () {
      if (this.audioBoool) {
        this.audioBoool = false;
        audio.pause();
      } else {
        this.audioBoool = true;
        audio.play();
      }
    },
    ScreenClick: function () {
      if (this.ScreenBoool) {
        this.ScreenBoool = false;
        requestFullScreen();
      } else {
        this.ScreenBoool = true;
        exitFullscreen();
      }
    },
    questionClick: function () {
      this.$alert("按住左键不放上下左右拖动，可以旋转整个场景", "旋转操作", {});
    },
    rotateClick: function () {
      if (this.rotateBoool) {
        this.rotateBoool = false;
      } else {
        this.rotateBoool = true;
      }
    },
    nextClick: function () {
      if (this.num < this.N) {
        this.num += 1;
      } else {
        this.num = 1;
      }
    },
    upClick: function () {
      if (this.num > 1) {
        this.num -= 1;
      } else {
        this.num = this.N;
      }
    },
    styleClick: function (styleObj) {
      this.loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      this.num = 1;
      this.styleChoose.styleObj.background = null;
      this.posChoose.styleObj.background = null;
      this.styleChoose = styleObj;
      this.styleChoose.styleObj.background = "#409EFF";
      this.posArr = this.styleChoose.children;
      this.posChoose = this.posArr[0];
      this.posArr[0].styleObj.background = "#409EFF";
      this.N = this.posChoose.jpgNameArr.length;
      this.classPath = this.styleChoose.name + "/" + this.posChoose.name;
      this.path =
        this.classPath + "/" + this.posChoose.jpgNameArr[this.num - 1];
      var texture = textureLoader.load("./风格/" + this.path, function (obj) {
        vm.loading.close();
        render();
      });
      mesh.material.map = texture;
    },
    posClick: function (posObj) {
      this.loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      this.num = 1;
      this.posChoose.styleObj.background = null;
      this.posChoose = posObj;
      this.N = this.posChoose.jpgNameArr.length;
      this.posChoose.styleObj.background = "#409EFF";
      this.classPath = this.styleChoose.name + "/" + this.posChoose.name;
      this.path =
        this.classPath + "/" + this.posChoose.jpgNameArr[this.num - 1];
      var texture = textureLoader.load("./风格/" + this.path, function (obj) {
        vm.loading.close();
        render();
      });
      mesh.material.map = texture;
    },
    update: function () {},
  },
  watch: {
    num: function (value) {
      this.loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      this.path =
        this.classPath + "/" + this.posChoose.jpgNameArr[this.num - 1];
      console.log(this.path);
      var texture = textureLoader.load("./风格/" + this.path, function (obj) {
        vm.loading.close();
        render();
      });
      mesh.material.map = texture;
      render();
    },
  },
  created() {
    this.posArr = styleObjArr[0].children;
    this.styleChoose = this.styleArr[0];
    this.posChoose = styleObjArr[0].children[0];
    this.loading = this.$loading({
      lock: true,
      text: "Loading",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.7)",
    });
  },
});
window.onresize = onresizeFun;
function onresizeFun() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  vm.width = window.innerWidth;
  vm.height = window.innerHeight;
}
function requestFullScreen() {
  console.log("fdsfdf");
  var de = document.documentElement;
  if (de.requestFullscreen) {
    de.requestFullscreen();
  } else if (de.mozRequestFullScreen) {
    de.mozRequestFullScreen();
  } else if (de.webkitRequestFullScreen) {
    de.webkitRequestFullScreen();
  }
}
function exitFullscreen() {
  var de = document;
  if (de.exitFullscreen) {
    de.exitFullscreen();
  } else if (de.mozCancelFullScreen) {
    de.mozCancelFullScreen();
  } else if (de.webkitCancelFullScreen) {
    de.webkitCancelFullScreen();
  }
}
