import { Mesh, BoxGeometry, MeshBasicMaterial } from "three";
const box = new BoxGeometry(15, 15, 15);

const material = new MeshBasicMaterial({
  color: 0xff0000,
});

const mesh = new Mesh(box, material);
export default mesh;
