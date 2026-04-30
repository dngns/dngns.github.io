<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CustomCursor from './components/CustomCursor.vue'

gsap.registerPlugin(ScrollTrigger)

onMounted(() => {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  })

  function raf(time: number) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)

  // Sync ScrollTrigger with Lenis
  lenis.on('scroll', () => {
    ScrollTrigger.update()
  })
})
</script>

<template>
  <div class="app-container min-h-screen relative font-sans text-[#1a1a1a] bg-[#f3f2eb] z-0">
    <!-- Premium Grain Overlay -->

    <CustomCursor />
    <RouterView />
  </div>
</template>

<style>
@import "tailwindcss";

html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  background-color: #f3f2eb;
  color: #1a1a1a;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* Hide scrollbar for all browsers */
  scrollbar-width: none;
  /* Firefox */
  -ms-overflow-style: none;
  /* IE and Edge */
  overscroll-behavior: none;
}

/* Hide scrollbar for Chrome, Safari and Opera */
*::-webkit-scrollbar {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
}

html, body {
  scrollbar-width: none !important;
  -ms-overflow-style: none !important;
}

.grain-overlay {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  filter: contrast(120%) brightness(120%);
}

::selection {
  background: #1a1a1a;
  color: #f3f2eb;
}
</style>
