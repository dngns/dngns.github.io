<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { useEventListener } from '@vueuse/core'

const cursor = ref<HTMLElement | null>(null)
const follower = ref<HTMLElement | null>(null)

let xTo: gsap.QuickToFunc, yTo: gsap.QuickToFunc
let xFollowerTo: gsap.QuickToFunc, yFollowerTo: gsap.QuickToFunc

onMounted(() => {
  if (!cursor.value || !follower.value) return

  xTo = gsap.quickTo(cursor.value, 'x', { duration: 0.1, ease: 'power3' })
  yTo = gsap.quickTo(cursor.value, 'y', { duration: 0.1, ease: 'power3' })

  xFollowerTo = gsap.quickTo(follower.value, 'x', { duration: 0.4, ease: 'power3' })
  yFollowerTo = gsap.quickTo(follower.value, 'y', { duration: 0.4, ease: 'power3' })
})

useEventListener(globalThis, 'mousemove', (e: MouseEvent) => {
  if (cursor.value && gsap.getProperty(cursor.value, 'opacity') === 0) {
    gsap.to([cursor.value, follower.value], { opacity: 1, duration: 0.3 })
  }
  if (xTo && yTo && xFollowerTo && yFollowerTo) {
    xTo(e.clientX)
    yTo(e.clientY)
    xFollowerTo(e.clientX)
    yFollowerTo(e.clientY)
  }
})

useEventListener(document, 'mouseenter', () => {
  if (cursor.value && follower.value) {
    gsap.to([cursor.value, follower.value], { opacity: 1, duration: 0.3 })
  }
})

useEventListener(document, 'mouseleave', () => {
  if (cursor.value && follower.value) {
    gsap.to([cursor.value, follower.value], { opacity: 0, duration: 0.3 })
  }
})

// Event delegation for hover states
useEventListener(document, 'mouseover', (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (target.closest('button, a, .bento-card, .group')) {
    if (follower.value) {
      gsap.to(follower.value, {
        scale: 2.5,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderColor: 'transparent',
        duration: 0.3,
      })
    }
    if (cursor.value) {
      gsap.to(cursor.value, {
        scale: 0.5,
        duration: 0.3,
      })
    }
  }
})

useEventListener(document, 'mouseout', (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (target.closest('button, a, .bento-card, .group')) {
    if (follower.value) {
      gsap.to(follower.value, {
        scale: 1,
        backgroundColor: 'transparent',
        borderColor: 'rgba(255, 255, 255, 0.3)',
        duration: 0.3,
      })
    }
    if (cursor.value) {
      gsap.to(cursor.value, {
        scale: 1,
        duration: 0.3,
      })
    }
  }
})
</script>

<template>
  <div class="cursor-wrapper hidden md:block">
    <div
      ref="cursor"
      class="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[10000] opacity-0 -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
    />
    <div
      ref="follower"
      class="fixed top-0 left-0 w-8 h-8 border border-white/30 rounded-full pointer-events-none z-[9999] opacity-0 -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
    />
  </div>
</template>

<style>
@media (min-width: 768px) {
  html,
  body,
  a,
  button,
  .bento-card {
    cursor: none !important;
  }
}
</style>
