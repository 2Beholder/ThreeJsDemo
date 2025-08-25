<template>
  <div class="animation">
    <div
      v-for="color in ['green', 'purple', 'blue', 'red', 'orange', 'yellow']"
      :key="color"
      class="box"
      :class="color"
      ref="boxRefs"
    ></div>
    <nav>
      <n-button strong secondary @click="restart"> Restart </n-button> |
      <n-button strong secondary @click="Pause"> Pause </n-button>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { onMounted, ref } from 'vue'
import { NButton } from 'naive-ui'

const tl = gsap.timeline()
const boxRefs = ref<HTMLElement[]>([])

//在dom元素加载完成后执行动画
onMounted(() => {
  gsap.to('.green', { rotation: 360, x: 100, duration: 1 })
  gsap.from('.purple', { rotation: -360, x: -100, duration: 1 })
  gsap.fromTo('.blue', { x: -100 }, { rotation: 360, x: 100, duration: 1 })
  tl.to('.red', { duration: 1, x: 200 })
    .to('.orange', { duration: 2, x: 200 })
    .to('.yellow', { duration: 3, x: 200 })
  gsap.registerEffect({
    name: 'fade',
    defaults: { duration: 2 }, //defaults get applied to the "config" object passed to the effect below
    effect: (targets: gsap.TweenTarget, config: { duration: number }) => {
      return gsap.to(targets, { duration: config.duration, opacity: 0 })
    },
  })
  boxRefs.value.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      gsap.effects.fade(el)
    })
  })
})

const restart = () => {
  tl.restart()
}
const Pause = () => {
  tl.pause()
}
</script>

<style scoped>
/* @import url(https://codepen.io/GreenSock/pen/xxmzBrw/fcaef74061bb7a76e5263dfc076c363e.css); */

.box {
  border-radius: 10px;
  width: 50px;
  height: 50px;
}

.green {
  background-color: green;
}

.purple {
  background-color: purple;
}

.blue {
  background-color: blue;
}

.red {
  background-color: red;
}

.orange {
  background-color: orange;
}

.yellow {
  background-color: yellow;
}

@media (min-width: 1024px) {
  .animation {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
  }
}
</style>
