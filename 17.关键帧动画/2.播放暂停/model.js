import {
  KeyframeTrack,
  AnimationClip,
  AnimationMixer,
  Clock,
  LoopOnce,
} from "three";
import box from "../../common/box_mesh.js";

box.name = "Box";

/**
   时间轴上，设置三个时刻0、3、6秒
   三个不同时间点，物体分别对应三个xyz坐标
   从2秒到5秒，物体从红色逐渐变化为蓝色
   */
const times = [0, 3, 6];
const values = [0, 0, 0, 100, 0, 0, 0, 0, 100];
const posKF = new KeyframeTrack("Box.position", times, values);
const colorKF = new KeyframeTrack(
  "Box.material.color",
  [2, 5],
  [1, 0, 0, 0, 0, 1]
);
const clip = new AnimationClip("test", 6, [posKF, colorKF]);
const mixer = new AnimationMixer(box); // AnimationAction对象
// mixer:控制如何播放关键帧动画，
// 比如是否播放、几倍速播放、是否循环播放、是否暂停播放...
const clipAction = mixer.clipAction(clip);
// clipAction.play();// .play()控制动画播放，默认循环播放
clipAction.loop = LoopOnce; // //不循环播放，执行一次后默认回到动画开头
clipAction.clampWhenFinished = true; // 物体状态停留在动画结束的时候

const clock = new Clock();
function loop() {
  requestAnimationFrame(loop);
  const frameT = clock.getDelta();
  mixer.update(frameT);
}
loop();

const stop = document.querySelector("#stop");
const paly = document.querySelector("#play");
const bu = document.querySelector("#bu");
const timeScale1 = document.querySelector("#timeScale1");
const timeScale2 = document.querySelector("#timeScale2");
stop.addEventListener("click", () => {
  clipAction.stop();
});

paly.addEventListener("click", () => {
  clipAction.play();
});

bu.addEventListener("click", () => {
  if (clipAction.paused) {
    // 当前暂停状态
    clipAction.paused = false; //切换为播放状态
    bu.textContent = "暂停";
  } else {
    clipAction.paused = true; //切换为状态状态
    bu.textContent = "播放";
  }
});

timeScale1.addEventListener("click", () => {
  clipAction.timeScale = 1; //默认
});
timeScale2.addEventListener("click", () => {
  clipAction.timeScale = 2; //2倍速
});
export default box;
