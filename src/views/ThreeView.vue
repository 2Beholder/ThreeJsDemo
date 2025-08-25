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

  // 创建相机
  const fov = 75
  const aspect = 2
  const near = 0.1
  const far = 5
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
  camera.position.z = 2

  // 创建场景
  const scene = new THREE.Scene()

  // 创建立方体
  const boxWidth = 1
  const boxHeight = 1
  const boxDepth = 1
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth)

  // 定义材质
  const material = new THREE.MeshBasicMaterial({ color: 0x44aa88 })

  // 添加灯光
  const color = 0xffffff
  const intensity = 3
  const light = new THREE.DirectionalLight(color, intensity)
  light.position.set(-1, 2, 4)
  scene.add(light)

  // 创建网格
  const cube = new THREE.Mesh(geometry, material)

  // 创建实例
  function makeInstance(geometry: THREE.BoxGeometry, color: number, x: number): THREE.Mesh {
    const material = new THREE.MeshPhongMaterial({ color })
    const cube = new THREE.Mesh(geometry, material)

    scene.add(cube)

    cube.position.x = x

    return cube
  }

  const cubes = [
    makeInstance(geometry, 0x44aa88, 0),
    makeInstance(geometry, 0x8844aa, -2),
    makeInstance(geometry, 0xaa8844, 2),
  ]

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

  // 动画函数 (TypeScript 版本)
  function render(time: number): void {
    time *= 0.001 // 将时间单位变为秒

    cube.rotation.x = time
    cube.rotation.y = time

    const canvas = renderer.domElement
    camera.aspect = canvas.clientWidth / canvas.clientHeight
    camera.updateProjectionMatrix()

    renderer.render(scene, camera)

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement
      camera.aspect = canvas.clientWidth / canvas.clientHeight
      camera.updateProjectionMatrix()
    }

    cubes.forEach((cube, ndx) => {
      const speed = 1 + ndx * 0.1
      const rot = time * speed
      cube.rotation.x = rot
      cube.rotation.y = rot
    })

    requestAnimationFrame(render)
  }

  // 开始动画循环
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
