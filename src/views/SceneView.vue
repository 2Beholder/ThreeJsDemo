<template>
  <canvas ref="canvasRef" id="c"></canvas>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { onMounted, ref } from 'vue'

const canvasRef = ref<HTMLCanvasElement>()

// 在组件挂载时初始化Three.js场景
onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return

  // 创建画布和渲染器
  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas })

  // 创建场景
  const scene = new THREE.Scene()

  // 要更新旋转角度的对象数组
  const objects: THREE.Object3D[] = []

  const solarSystem = new THREE.Object3D()
  scene.add(solarSystem)
  objects.push(solarSystem)

  // 一球多用
  const radius = 1
  const widthSegments = 6
  const heightSegments = 6
  const sphereGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments)

  // 太阳
  const sunMaterial = new THREE.MeshPhongMaterial({ emissive: 0xffff00 })
  const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial)
  sunMesh.scale.set(5, 5, 5) // 扩大太阳的大小
  solarSystem.add(sunMesh)
  objects.push(sunMesh)

  // 地球
  const earthMaterial = new THREE.MeshPhongMaterial({
    color: 0x2233ff,
    emissive: 0x112244,
  })
  const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial)
  earthMesh.position.x = 10
  solarSystem.add(earthMesh)
  objects.push(earthMesh)

  const color = 0xffffff
  const intensity = 500
  const light = new THREE.PointLight(color, intensity)
  scene.add(light)

  // 创建相机
  const fov = 40
  const aspect = 2 // the canvas default
  const near = 0.1
  const far = 1000
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
  camera.position.set(0, 50, 0)
  camera.up.set(0, 0, 1)
  camera.lookAt(0, 0, 0)

  function resizeRendererToDisplaySize(renderer: THREE.WebGLRenderer): boolean {
    const canvas = renderer.domElement
    const pixelRatio = window.devicePixelRatio
    const width = Math.floor(canvas.clientWidth * pixelRatio)
    const height = Math.floor(canvas.clientHeight * pixelRatio)
    const needResize = canvas.width !== width || canvas.height !== height
    if (needResize) {
      renderer.setSize(width, height, false)
    }
    return needResize
  }

  function render(time: number): void {
    time *= 0.001

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement
      camera.aspect = canvas.clientWidth / canvas.clientHeight
      camera.updateProjectionMatrix()
    }

    objects.forEach((obj) => {
      obj.rotation.y = time
    })

    renderer.render(scene, camera)

    requestAnimationFrame(render)
  }

  requestAnimationFrame(render)
})
</script>

<style scoped>
#c {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: block;
  margin: 0;
  padding: 0;
}
</style>
