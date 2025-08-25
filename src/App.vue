<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { NButton } from 'naive-ui'
import HelloWorld from './components/HelloWorld.vue'

const router = useRouter()
</script>

<template>
  <router-view />
</template>

<style scoped></style>
