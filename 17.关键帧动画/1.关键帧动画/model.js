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
const mixer = new AnimationMixer(box);
const clipAction = mixer.clipAction(clip);
clipAction.play();
// clipAction.loop = LoopOnce;
// clipAction.clampWhenFinished = true;

const clock = new Clock();
function loop() {
  requestAnimationFrame(loop);
  //   const frameT = clock.getDelta();
  //   mixer.update(frameT);
}
loop();

export default box;
