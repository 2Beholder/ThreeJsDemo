<template>
  <div class="cat">
    <n-flex vertical justify="space-between">
      <n-marquee>
        hajim hajim hajim hajim hajim dingdongji dingdongji ccb ccb hajim hajim hajim hajim hajim
        dingdongji dingdongji ccb ccb hajim hajim hajim hajim hajim dingdongji dingdongji ccb ccb
        dagoujiao dagoujiao dagoujiao dagoujiao</n-marquee
      >
      <n-statistic label="click the button to kill maodie " tabular-nums>
        <n-number-animation
          ref="numberAnimationInstRef"
          show-separator
          :from="0"
          :to="100000000"
          :active="false"
        />maodies were killed
      </n-statistic>
      <n-button @click="handleClick"> start </n-button>
    </n-flex>
  </div>
</template>

<script setup lang="ts">
import type { NumberAnimationInst } from 'naive-ui'
import { ref } from 'vue'
import { NButton, NNumberAnimation, NStatistic, NMarquee, NFlex } from 'naive-ui'

const numberAnimationInstRef = ref<NumberAnimationInst | null>(null)

function handleClick() {
  numberAnimationInstRef.value?.play()
}
</script>

<style>
@media (min-width: 1024px) {
  .cat {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
