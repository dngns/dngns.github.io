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
    duration: 1.5, // Slightly longer for that 'weighted' Poly feel
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    lerp: 0.08, // Smoother, heavier interpolation
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
  <div class="app-container relative text-[#FFFFFF] bg-[#0A0A0A] z-0 overflow-x-hidden selection:bg-[#FF4D00] selection:text-white">
    <!-- Poly-inspired Noise Overlay -->
    <div class="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] mix-blend-screen bg-noise"></div>
    
    <CustomCursor />
    <RouterView />
  </div>
</template>

<style>
@import "tailwindcss";

:root {
  --font-heading: 'Inter Tight', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  --bg-deep: #0A0A0A;
  --accent-poly: #FF4D00;
}

.bg-noise {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}

/* THE GOLD STANDARD: HIDE SCROLLBARS WHILE MAINTAINING SCROLL */
html {
  scrollbar-width: none;
  -ms-overflow-style: none;
  overflow-y: auto;
  overflow-x: hidden;
  font-family: var(--font-heading);
  background-color: var(--bg-deep);
}

body {
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 100vh;
  min-height: 100dvh;
  background-color: var(--bg-deep);
  color: #FFFFFF;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}

/* Hide scrollbar for Chrome, Safari and Opera */
::-webkit-scrollbar {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
}

* {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

*::-webkit-scrollbar {
  display: none !important;
}

h1, h2, h3, h4 {
  font-family: var(--font-heading);
  letter-spacing: -0.04em;
}

.font-mono {
  font-family: var(--font-mono);
}

::selection {
  background: var(--accent-poly);
  color: #FFFFFF;
}
</style>
