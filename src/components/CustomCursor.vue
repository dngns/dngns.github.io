<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'

const cursor = ref<HTMLElement | null>(null)
const follower = ref<HTMLElement | null>(null)

let xTo: any, yTo: any
let xFollowerTo: any, yFollowerTo: any

onMounted(() => {
  // Use quickTo for high performance
  xTo = gsap.quickTo(cursor.value, "x", { duration: 0.1, ease: "power3" })
  yTo = gsap.quickTo(cursor.value, "y", { duration: 0.1, ease: "power3" })
  
  xFollowerTo = gsap.quickTo(follower.value, "x", { duration: 0.4, ease: "power3" })
  yFollowerTo = gsap.quickTo(follower.value, "y", { duration: 0.4, ease: "power3" })

  const onMouseMove = (e: MouseEvent) => {
    if (cursor.value && gsap.getProperty(cursor.value, "opacity") === 0) {
      gsap.to([cursor.value, follower.value], { opacity: 1, duration: 0.3 })
    }
    xTo(e.clientX)
    yTo(e.clientY)
    xFollowerTo(e.clientX)
    yFollowerTo(e.clientY)
  }

  const onMouseEnter = () => {
    gsap.to([cursor.value, follower.value], { opacity: 1, duration: 0.3 })
  }

  const onMouseLeave = () => {
    gsap.to([cursor.value, follower.value], { opacity: 0, duration: 0.3 })
  }

  window.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseenter', onMouseEnter)
  document.addEventListener('mouseleave', onMouseLeave)

  // Hover states
  const interactives = document.querySelectorAll('button, a, .bento-card, .group')
  
  const onEnter = () => {
    gsap.to(follower.value, {
      scale: 2.5,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderColor: 'transparent',
      duration: 0.3
    })
    gsap.to(cursor.value, {
      scale: 0.5,
      duration: 0.3
    })
  }

  const onLeave = () => {
    gsap.to(follower.value, {
      scale: 1,
      backgroundColor: 'transparent',
      borderColor: 'rgba(255, 255, 255, 0.3)',
      duration: 0.3
    })
    gsap.to(cursor.value, {
      scale: 1,
      duration: 0.3
    })
  }

  interactives.forEach(el => {
    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mouseleave', onLeave)
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseenter', onMouseEnter)
    document.removeEventListener('mouseleave', onMouseLeave)
  })
})
</script>

<template>
  <div class="cursor-wrapper hidden md:block">
    <div ref="cursor" class="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[10000] opacity-0 -translate-x-1/2 -translate-y-1/2 mix-blend-difference" />
    <div ref="follower" class="fixed top-0 left-0 w-8 h-8 border border-white/30 rounded-full pointer-events-none z-[9999] opacity-0 -translate-x-1/2 -translate-y-1/2 mix-blend-difference" />
  </div>
</template>

<style>
/* Global cursor reset */
@media (min-width: 768px) {
  html, body, a, button, .bento-card {
    cursor: none !important;
  }
}
</style>
