<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-vue-next'
import { onMounted, onUnmounted, ref, defineComponent, h } from 'vue'

gsap.registerPlugin(ScrollTrigger)

const main = ref<HTMLElement | null>(null)
let ctx: gsap.Context

// Scribble Components
const ScribbleUnderline = defineComponent({
  render() {
    return h('svg', { viewBox: '0 0 200 20', class: 'absolute -bottom-2 left-0 w-full h-4 text-[#FF4D00] pointer-events-none' }, [
      h('path', {
        d: 'M5 15 Q 50 5, 100 15 T 195 10',
        fill: 'none',
        stroke: 'currentColor',
        'stroke-width': '3',
        'stroke-linecap': 'round',
        class: 'scribble-path'
      })
    ])
  }
})

const ScribbleCircle = defineComponent({
  render() {
    return h('svg', { viewBox: '0 0 100 100', class: 'absolute -inset-4 w-[calc(100%+2rem)] h-[calc(100%+2rem)] text-[#FF4D00] pointer-events-none opacity-60' }, [
      h('path', {
        d: 'M 50, 50 m -45, 0 a 45,45 0 1,0 90,0 a 45,45 0 1,0 -90,0',
        fill: 'none',
        stroke: 'currentColor',
        'stroke-width': '2',
        'stroke-dasharray': '300',
        'stroke-dashoffset': '300',
        class: 'scribble-circle'
      })
    ])
  }
})

const IconX = defineComponent({
  render() {
    return h('svg', { viewBox: '0 0 24 24', fill: 'currentColor', class: 'w-5 h-5' }, [
      h('path', { d: 'M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z' })
    ])
  }
})

const IconLinkedin = defineComponent({
  render() {
    return h('svg', { viewBox: '0 0 24 24', fill: 'currentColor', class: 'w-5 h-5' }, [
      h('path', { d: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z' })
    ])
  }
})

const IconGithub = defineComponent({
  render() {
    return h('svg', { viewBox: '0 0 24 24', fill: 'currentColor', class: 'w-5 h-5' }, [
      h('path', { d: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12' })
    ])
  }
})

onMounted(() => {
  if (!main.value) return

  ctx = gsap.context(() => {
    // Entrance Animations
    gsap.from('.poly-reveal', {
      y: 60,
      opacity: 0,
      duration: 1.4,
      stagger: 0.1,
      ease: 'expo.out'
    })

    // Simulate drawing the text with a clip-path wipe
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#contact',
        start: 'top 75%',
      }
    })

    // 1. Text wipe
    tl.fromTo('.try-this-text',
      { clipPath: 'inset(0 100% 0 0)' },
      { clipPath: 'inset(0 0% 0 0)', duration: 0.8, ease: 'power2.inOut' }
    )

    // 2. Arrow draw
    tl.fromTo('.animated-arrow',
      { strokeDasharray: 100, strokeDashoffset: 100 },
      { strokeDashoffset: 0, duration: 0.6, ease: 'power1.out' },
      "-=0.2"
    )

    // Floating Nav Highlight
    const sections = ['about', 'projects', 'contact']
    sections.forEach(id => {
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveNav(id),
        onEnterBack: () => setActiveNav(id)
      })
    })
  }, main.value)
})

const activeNav = ref('hero')
const setActiveNav = (id: string) => { activeNav.value = id }

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>

<template>
  <main ref="main" class="relative bg-[#0A0A0A] text-white">

    <!-- FLOATING NAV (BOTTOM PILL) -->
    <nav
      class="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] px-2 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full flex items-center gap-1 shadow-2xl">
      <a v-for="item in [
        { id: 'about', label: 'About' },
        { id: 'projects', label: 'Work' },
        { id: 'contact', label: 'Contact' }
      ]" :key="item.id" :href="`#${item.id}`" @click="setActiveNav(item.id)"
        class="px-6 py-2.5 rounded-full text-[13px] font-bold transition-all duration-500"
        :class="activeNav === item.id ? 'bg-[#FF4D00] text-white shadow-lg' : 'hover:bg-white/10 opacity-60 hover:opacity-100'">
        {{ item.label }}
      </a>
    </nav>

    <!-- HERO -->
    <section class="min-h-[100dvh] flex flex-col justify-center items-center px-6 text-center relative overflow-hidden">
      <div class="poly-reveal flex flex-col items-center gap-8 z-10">
        <a href="#contact" class="flex group cursor-crosshair">
          <div class="border border-white/20 bg-transparent px-5 py-2.5 flex items-center gap-4 relative overflow-hidden transition-all duration-500 hover:border-[#FF4D00] hover:bg-[#FF4D00]/5 hover:scale-[1.02] active:scale-95">
            <!-- Mechanical Corners -->
            <div class="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-white/30 group-hover:border-[#FF4D00] transition-colors duration-300"></div>
            <div class="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white/30 group-hover:border-[#FF4D00] transition-colors duration-300"></div>
            
            <!-- System Label -->
            <span class="font-mono text-white/40 group-hover:text-[#FF4D00]/80 text-[10px] uppercase tracking-widest transition-colors duration-300">
              [SYS_REQ]
            </span>
            
            <!-- Separator -->
            <div class="w-px h-3 bg-white/20 group-hover:bg-[#FF4D00]/40 transition-colors duration-300"></div>
            
            <!-- Main Text -->
            <span class="font-mono text-white group-hover:text-[#FF4D00] text-[11px] font-bold uppercase tracking-[0.2em] transition-colors duration-300">
              Open For Hire
              <span class="inline-block w-2 h-3 bg-white group-hover:bg-[#FF4D00] ml-1 align-middle animate-pulse transition-colors duration-300"></span>
            </span>
          </div>
        </a>

        <h1 class="text-[12vw] md:text-[8vw] font-bold leading-[1.1] tracking-[-0.04em] max-w-5xl">
          Architecting
          <span class="relative inline-block text-[#FF4D00]">
            Systems
            <ScribbleUnderline />
          </span>
          Not Apps.
        </h1>

        <p class="text-lg md:text-2xl opacity-60 max-w-2xl font-medium leading-relaxed">
          Nguyen Manh Duc — Crafting high-performance digital infrastructure with a focus on human-centric aesthetics.
        </p>

        <div class="grid grid-cols-12 gap-3 mt-10 w-full max-w-[350px] mx-auto sm:max-w-none sm:flex sm:justify-center sm:gap-4 px-4 sm:px-0 z-20 relative">
          <!-- Primary: View Archives -->
          <a href="#projects"
            class="col-span-7 sm:w-auto h-14 group relative flex items-center justify-between p-2 pl-6 bg-white text-black font-bold rounded-full overflow-hidden transition-transform hover:scale-[1.02] active:scale-95">
            <span class="relative z-10 text-[14px] sm:text-[15px] whitespace-nowrap">View Archives</span>
            <div class="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center group-hover:bg-[#FF4D00] group-hover:text-white transition-colors duration-500 shrink-0 ml-2">
              <ArrowUpRight :size="18" class="group-hover:rotate-45 transition-transform duration-500" />
            </div>
          </a>
          
          <!-- Secondary: Connect -->
          <a href="#contact"
            class="col-span-5 sm:w-auto h-14 flex items-center justify-center gap-2.5 px-4 sm:px-8 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-white/20 transition-all hover:scale-[1.02] active:scale-95 group shadow-2xl backdrop-blur-md">
            <span class="relative flex h-2 w-2 shrink-0">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF4D00] opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-[#FF4D00]"></span>
            </span>
            <span class="font-bold text-[14px] sm:text-[15px] whitespace-nowrap">Connect</span>
          </a>
        </div>
      </div>

      <!-- Background Blobs (Poly style) -->
      <div class="absolute top-1/4 -left-24 w-96 h-96 bg-[#FF4D00]/10 blur-[120px] rounded-full animate-pulse"></div>
      <div
        class="absolute bottom-1/4 -right-24 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full animate-pulse delay-700">
      </div>
    </section>

    <!-- ABOUT SECTION -->
    <section id="about" class="py-32 md:py-48 px-6">
      <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
        <div class="lg:col-span-5 poly-reveal sticky top-32">
          <h2 class="text-5xl md:text-7xl font-bold tracking-tight mb-8">
            Digital Craftsmanship <br />
            <span class="opacity-30">Meets</span> Performance.
          </h2>
          <p class="text-xl opacity-50 leading-relaxed mb-12">
            I treat code as a craft. Every pixel and every line of logic is an opportunity to create something that
            feels both powerful and personal. We don't just build apps; we engineer experiences.
          </p>
          <div class="flex gap-12 border-t border-white/10 pt-8">
            <div v-for="stat in [
              { label: 'Years Experience', val: '04+' },
              { label: 'Projects Built', val: '24+' }
            ]" :key="stat.label">
              <div class="text-4xl font-bold text-[#FF4D00] mb-2">{{ stat.val }}</div>
              <div class="text-[10px] uppercase font-bold tracking-widest opacity-40">{{ stat.label }}</div>
            </div>
          </div>
        </div>

        <div class="lg:col-span-7 flex flex-col gap-6 poly-reveal mt-12 lg:mt-0">
          <div
            class="p-8 md:p-12 bg-white/[0.02] border border-white/5 rounded-[32px] hover:bg-white/[0.04] transition-colors group">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-3xl font-bold tracking-tight group-hover:text-[#FF4D00] transition-colors">Core
                Architecture</h3>
              <div class="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center">
                <span class="text-[10px] font-mono opacity-40">01</span>
              </div>
            </div>
            <p class="text-lg opacity-60 leading-relaxed mb-8">
              Building scalable, high-performance foundations. Specializing in low-level system design and robust
              frontend architecture.
            </p>
            <div class="flex flex-wrap gap-3">
              <span
                class="px-4 py-2 rounded-full border border-white/10 text-[11px] font-bold uppercase tracking-widest opacity-60">Vue
                3 / TresJS</span>
              <span
                class="px-4 py-2 rounded-full border border-white/10 text-[11px] font-bold uppercase tracking-widest opacity-60">Rust</span>
            </div>
          </div>

          <div
            class="p-8 md:p-12 bg-white/[0.02] border border-white/5 rounded-[32px] hover:bg-white/[0.04] transition-colors group">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-3xl font-bold tracking-tight group-hover:text-[#FF4D00] transition-colors">Mobile
                Ecosystems</h3>
              <div class="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center">
                <span class="text-[10px] font-mono opacity-40">02</span>
              </div>
            </div>
            <p class="text-lg opacity-60 leading-relaxed mb-8">
              Crafting native-feeling mobile applications with a deep focus on 60fps animations, memory management, and
              UI fluidity.
            </p>
            <div class="flex flex-wrap gap-3">
              <span
                class="px-4 py-2 rounded-full border border-white/10 text-[11px] font-bold uppercase tracking-widest opacity-60">React
                Native</span>
              <span
                class="px-4 py-2 rounded-full border border-white/10 text-[11px] font-bold uppercase tracking-widest opacity-60">SwiftUI</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- WORK SECTION (ASYMMETRIC GLASS BENTO) -->
    <section id="projects" class="py-32 md:py-48 px-6 bg-white/[0.01]">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col md:flex-row justify-between items-end gap-8 mb-16 poly-reveal">
          <h2 class="text-6xl md:text-8xl font-bold tracking-tight">
            Selected <br />
            <span class="text-[#FF4D00] relative">
              Archives.
              <ScribbleUnderline />
            </span>
          </h2>
          <p class="text-lg opacity-40 max-w-xs font-medium mb-4">A curated selection of technical explorations and
            systems.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-12 gap-6 poly-reveal">

          <!-- Featured Project 1 (Full Width) -->
          <div
            class="md:col-span-12 group relative rounded-[32px] overflow-hidden bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-700 min-h-[400px] flex flex-col justify-between p-8 md:p-12 cursor-pointer">
            <!-- Subtle Hover Gradient -->
            <div
              class="absolute inset-0 bg-gradient-to-r from-[#FF4D00]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            </div>

            <div class="relative z-10 flex justify-between items-start">
              <div
                class="px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest">
                Branding / WebGL</div>
              <div
                class="w-12 h-12 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center group-hover:bg-[#FF4D00] group-hover:border-[#FF4D00] transition-colors duration-500">
                <ArrowUpRight :size="20" class="group-hover:text-white" />
              </div>
            </div>

            <div class="relative z-10 mt-32 md:mt-0 w-full md:w-1/2">
              <h3
                class="text-5xl md:text-7xl font-bold tracking-tighter mb-4 group-hover:text-[#FF4D00] transition-colors duration-500">
                Way of D.</h3>
              <p class="text-lg opacity-50 font-medium">The primary architectural unit and personal portfolio system,
                engineered with Vue 3, TresJS, and custom shaders.</p>
            </div>

            <!-- Tech Grid Pattern -->
            <div
              class="absolute right-0 top-0 w-full md:w-2/3 h-full pointer-events-none opacity-20 group-hover:opacity-40 transition-all duration-700"
              style="background-image: radial-gradient(circle at center, #FF4D00 1px, transparent 1px); background-size: 24px 24px; mask-image: linear-gradient(to right, transparent, black);">
            </div>
          </div>

          <!-- Project 2 (Wide) -->
          <div
            class="md:col-span-7 group relative rounded-[32px] overflow-hidden bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-700 min-h-[360px] flex flex-col justify-between p-8 md:p-12 cursor-pointer">
            <div
              class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            </div>

            <div class="relative z-10 flex justify-between items-start">
              <div
                class="px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest">
                Native / WebRTC</div>
              <div
                class="w-12 h-12 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center group-hover:bg-[#FF4D00] group-hover:border-[#FF4D00] transition-colors duration-500">
                <ArrowUpRight :size="20" />
              </div>
            </div>

            <div class="relative z-10 mt-24">
              <h3 class="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Uplink Terminal</h3>
              <p class="text-base opacity-50 font-medium max-w-sm">Secure, real-time communication interface built on
                React Native.</p>
            </div>

            <!-- Wireframe Pattern -->
            <div
              class="absolute -right-12 -bottom-12 w-64 h-64 border border-white/10 rounded-full opacity-20 group-hover:scale-110 transition-transform duration-700 flex items-center justify-center">
              <div class="w-48 h-48 border border-white/10 rounded-full"></div>
            </div>
          </div>

          <!-- Project 3 (Square) -->
          <div
            class="md:col-span-5 group relative rounded-[32px] overflow-hidden bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-700 min-h-[360px] flex flex-col justify-between p-8 md:p-12 cursor-pointer">
            <div
              class="absolute inset-0 bg-gradient-to-bl from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            </div>

            <div class="relative z-10 flex justify-between items-start">
              <div
                class="px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest">
                Rust / System</div>
              <div
                class="w-12 h-12 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center group-hover:bg-[#FF4D00] group-hover:border-[#FF4D00] transition-colors duration-500">
                <ArrowUpRight :size="20" />
              </div>
            </div>

            <div class="relative z-10 mt-24">
              <h3 class="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Core Engine</h3>
              <p class="text-base opacity-50 font-medium">Low-level computational framework for heavy data processing.
              </p>
            </div>

            <div
              class="absolute top-1/2 right-4 -translate-y-1/2 opacity-10 group-hover:opacity-30 transition-opacity duration-700">
              <h3 class="text-8xl font-black italic">CE</h3>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- CONTACT SECTION -->
    <section id="contact"
      class="py-32 md:py-64 px-6 relative overflow-hidden flex flex-col items-center justify-center">
      <div class="max-w-4xl mx-auto text-center poly-reveal relative z-10 w-full flex flex-col items-center">

        <div class="relative inline-block mb-12 mt-12 md:mt-24">
          <h2 class="text-6xl md:text-[9vw] font-bold tracking-tighter leading-none text-white">
            Let's Start <br />
            <span class="relative inline-block mt-4 text-[#FF4D00]">
              Something.
              <!-- Handwritten underline (static) -->
              <svg
                class="absolute -bottom-2 md:-bottom-4 left-0 w-full h-4 md:h-6 text-[#FF4D00] opacity-100 pointer-events-none"
                viewBox="0 0 100 20" preserveAspectRatio="none" fill="none" stroke="currentColor" stroke-width="4">
                <path d="M2 15 Q 25 5, 50 15 T 98 15" stroke-linecap="round" />
              </svg>
            </span>
          </h2>
        </div>

        <div class="flex flex-col items-center gap-12 mt-20">
          <div class="relative inline-block">
            <!-- Handwritten "try this" & Arrow pointing to email -->
            <div
              class="absolute -top-16 left-0 md:-top-16 md:-left-32 flex flex-col items-center md:items-end gap-1 text-white pointer-events-none z-20 wiggle">
              <span class="try-this-text text-2xl md:text-4xl -rotate-12 whitespace-nowrap opacity-90"
                style="font-family: 'Caveat', cursive;">try this</span>
              <svg class="w-8 md:w-16 h-8 md:h-16 opacity-60 md:translate-x-4 -rotate-12" viewBox="0 0 100 100"
                fill="none" stroke="currentColor" stroke-width="2">
                <path class="animated-arrow" pathLength="100" d="M 20 10 Q 30 60, 80 80 M 60 85 L 80 80 L 70 65"
                  stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>

            <a href="mailto:dnglabsneversleep@gmail.com"
              class="text-xl sm:text-2xl md:text-4xl font-bold border-b-4 border-white pb-2 hover:opacity-60 transition-opacity relative z-10">
              dnglabsneversleep@gmail.com
            </a>
          </div>

          <div class="flex gap-8">
            <a v-for="(social, index) in [
              { icon: IconGithub, url: 'https://github.com/dngns' },
              { icon: IconLinkedin, url: 'https://linkedin.com/in/mduc-engineer' },
              { icon: IconX, url: 'https://x.com/ddn431' }
            ]" :key="index" :href="social.url"
              class="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-colors border border-white/10">
              <component :is="social.icon" :size="20" />
            </a>
          </div>
        </div>
      </div>
    </section>


  </main>
</template>

<style scoped>
.scribble-path {
  stroke-dasharray: 200;
  stroke-dashoffset: 200;
  animation: draw 2s ease-out forwards;
}

@keyframes wiggle {

  0%,
  100% {
    transform: translate(0px, 0px) rotate(0deg);
  }

  25% {
    transform: translate(1px, -1px) rotate(0.5deg);
  }

  50% {
    transform: translate(-1px, 1px) rotate(-0.5deg);
  }

  75% {
    transform: translate(-1px, -1px) rotate(0.5deg);
  }
}

.wiggle {
  animation: wiggle 1.2s ease-in-out infinite alternate;
}

.poly-reveal {
  will-change: transform, opacity;
}

html {
  scroll-behavior: smooth;
}
</style>
