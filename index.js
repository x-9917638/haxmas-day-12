// import "./style.css";
import * as three from "three";

const scene = new three.Scene();
const camera = new three.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

const renderer = new three.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);

renderer.render(scene, camera);

const cube_geo = new three.BoxGeometry(1, 1, 1);
const cube_tex = new three.TextureLoader().load("meow_trans.png");
const cube_mat = new three.MeshBasicMaterial({ map: cube_tex });
const cube = new three.Mesh(cube_geo, cube_mat);
scene.add(cube);

const donut_geo = new three.TorusGeometry(10, 3, 16, 100);
const donut_text = new three.TextureLoader().load("meow_baka.png");
const donut_mat = new three.MeshBasicMaterial({ map: donut_text });
const donut = new three.Mesh(donut_geo, donut_mat);
scene.add(donut);

function add_star() {
  const star_geometry = new three.SphereGeometry(0.25, 24, 24);
  const star_material = new three.MeshBasicMaterial({ color: 0xffffff });
  const star = new three.Mesh(star_geometry, star_material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => three.MathUtils.randFloatSpread(200));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(add_star);

camera.position.z = 10;

function animate() {
  donut.rotation.x += 0.01;
  donut.rotation.y += 0.01;

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);

  requestAnimationFrame(animate);
}

animate();

camera.position.setZ(45);

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  cube.rotation.y += 0.01;
  cube.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0;
  camera.rotation.y = t * -0.0;
}

document.body.onscroll = moveCamera;
moveCamera();
