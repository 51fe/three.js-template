import './style.css'
import * as THREE from 'three'

// 创建场景对象Scene
const scene = new THREE.Scene();

// 创建一个球体几何对象
const geometry = new THREE.BoxGeometry(100, 100, 100);
// 创建材质对象
const material = new THREE.MeshLambertMaterial({
  color: 0x990000
});
// 创建Mesh
const cube = new THREE.Mesh(geometry, material)
// 网格模型添加到场景中
scene.add(cube);

// 点光源
const point = new THREE.PointLight(0xffffff);
//点光源位置
point.position.set(400, 200, 300)
//点光源添加到场景中
scene.add(point);
// 环境光
const ambient = new THREE.AmbientLight(0x444444);
//环境光添加到场景中
scene.add(ambient);

// 窗口宽度
const width = window.innerWidth;
// 窗口高度
const height = window.innerHeight;
// 窗口宽高比
const aspect = width / height;
// 三维场景显示范围控制系数，系数越大，显示的范围越大
const s = 200;

// 创建相机对象
const camera = new THREE.OrthographicCamera(-s * aspect, s * aspect, s, -s, 1, 1000);
// 设置相机位置
camera.position.set(200, 300, 200);
// 设置相机方向(指向的场景对象)
camera.lookAt(scene.position);

// 设置渲染
const canvas = document.querySelector('canvas.webgl');
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
// 设置渲染区域尺寸
renderer.setSize(width, height);
// 设置背景颜色
renderer.setClearColor(0xb9d3ff, 1);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
//执行渲染操作 指定场景、相机作为参数
renderer.render(scene, camera);

// 循环动画
const loop = () => {
  cube.rotation.z += 0.03;
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};
loop();

window.addEventListener("resize", () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  // 更新相机
  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  // 更新渲染
  renderer.setSize(width, height);
});
