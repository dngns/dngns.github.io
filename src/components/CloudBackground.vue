<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import CloudShader from './CloudShader.vue'
</script>

<template>
  <div class="fixed inset-0 w-full h-full -z-10 bg-[#f3f2eb]">
    <TresCanvas clear-color="#f3f2eb" window-size :power-preference="'high-performance'" :antialias="false"
      :stencil="false" :depth="false" :alpha="false">
      <CloudShader />
    </TresCanvas>
  </div>
</template>
