<!-- components/MouseFollower.vue -->
<template>
  <div class="ball" :style="style"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'

const x = ref(0)
const y = ref(0)

// 监听鼠标移动
function handleMouseMove(e: MouseEvent) {
  x.value = e.clientX
  y.value = e.clientY
}

// 自动注册/注销事件
onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
})

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', handleMouseMove)
})

// 绑定样式
const style = computed(() => ({
  transform: `translate(${x.value}px, ${y.value}px)`,
}))
</script>

<style scoped>
.ball {
  position: fixed;
  width: 30px;
  height: 30px;
  background: #3cb371;
  border-radius: 50%;
  pointer-events: none;
  transform: translate(0, 0);
  transition: transform 0.05s linear;
  z-index: 9999;
}
</style>
