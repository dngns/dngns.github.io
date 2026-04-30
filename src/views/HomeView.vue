<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Activity, Menu, X } from 'lucide-vue-next'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { scrambleText, stopScramble } from '../utils/scramble'

gsap.registerPlugin(ScrollTrigger)

const main = ref<HTMLElement | null>(null)
const heroTitle = ref<HTMLElement | null>(null)
const isMobileMenuOpen = ref(false)
let ctx: gsap.Context

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

// Lock scroll when menu is open
watch(isMobileMenuOpen, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

onMounted(() => {
  if (!main.value) return

  ctx = gsap.context(() => {
    // Hero Parallax & Reveal
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroTitle.value,
        start: 'top 20%',
        end: 'bottom top',
        scrub: 1.5,
      }
    })

    tl.to('.hero-line-1', { x: -100, opacity: 0, duration: 1 })
      .to('.hero-line-2', { x: 100, opacity: 0, duration: 1 }, 0)
      .to('.hero-line-3', { y: 50, opacity: 0, duration: 1 }, 0)

    // Expertise Reveal
    gsap.fromTo('.expertise-module', 
      { y: 60, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '.expertise-grid',
          start: 'top 80%',
          end: 'top 20%',
          toggleActions: 'play none none reverse'
        },
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: 'power4.out'
      }
    )

    // Coordinate Tracker
    ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        // Progress bar sync
        gsap.to('#scroll-progress', { scaleX: self.progress, duration: 0.1, ease: 'none' })
      }
    })
  }, main.value)
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>

<template>
  <main ref="main"
    class="min-h-screen font-sans bg-transparent text-[#1a1a1a] selection:bg-[#1a1a1a] selection:text-[#f3f2eb] overflow-x-hidden antialiased">

    <!-- Progress Bar -->
    <div class="fixed top-0 left-0 w-full h-[2px] bg-black/10 z-[100]">
      <div class="h-full bg-[#8b7e66] origin-left scale-x-0 will-change-transform" id="scroll-progress"></div>
    </div>

    <!-- Header -->
    <header class="w-full px-6 py-8 md:px-12 md:py-10 flex justify-between items-start z-[70] relative">
      <div class="flex flex-col uppercase tracking-[0.2em] text-[10px] font-black leading-tight">
        <span class="text-black">Way Of D.</span>
        <span class="text-black/30">Protocol 4.0</span>
      </div>

      <!-- Desktop Nav -->
      <nav class="hidden md:flex items-center gap-12 text-[10px] uppercase tracking-[0.2em] font-black">
        <a href="#about" class="hover:text-[#8b7e66] transition-all duration-300 active:scale-[0.96]">Work</a>
        <a href="#expertise" class="hover:text-[#8b7e66] transition-all duration-300 active:scale-[0.96]">Playground</a>
        <router-link to="/contact" class="hover:text-[#8b7e66] transition-all duration-300 active:scale-[0.96]">Contact</router-link>
      </nav>

      <!-- Mobile Menu Button -->
      <button 
        @click="toggleMobileMenu"
        class="md:hidden text-black p-2 -mr-2 active:scale-90 transition-transform z-[80]">
        <Menu v-if="!isMobileMenuOpen" :size="24" />
        <X v-else :size="24" />
      </button>
    </header>

    <!-- Mobile Menu Overlay -->
    <Transition
      enter-active-class="transition-opacity duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="isMobileMenuOpen" class="fixed inset-0 bg-[#f3f2eb] z-[60] flex flex-col justify-center px-6">
        <nav class="flex flex-col gap-8">
          <a v-for="(item, idx) in [
            { label: 'Work', href: '#about' },
            { label: 'Playground', href: '#expertise' },
            { label: 'Contact', href: '/contact', isRoute: true }
          ]" 
            :key="idx"
            :href="!item.isRoute ? item.href : undefined"
            @click="toggleMobileMenu"
            class="text-[12vw] font-black uppercase tracking-tighter leading-none hover:text-[#8b7e66] transition-colors"
          >
            <router-link v-if="item.isRoute" :to="item.href">{{ item.label }}</router-link>
            <template v-else>{{ item.label }}</template>
          </a>
        </nav>

        <div class="absolute bottom-12 left-6 right-6 flex justify-between items-end">
          <div class="text-[10px] font-black uppercase tracking-widest opacity-30">
            Navigation_Protocol<br/>Active_Session
          </div>
          <div class="flex flex-col items-end gap-2 text-[10px] font-black uppercase tracking-widest">
            <a href="#" class="hover:text-[#8b7e66]">Instagram</a>
            <a href="#" class="hover:text-[#8b7e66]">Twitter</a>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Hero Section -->
    <section
      class="px-6 md:px-12 pb-12 w-full max-w-[1800px] mx-auto min-h-screen flex flex-col relative overflow-hidden">
      <div class="flex-grow flex flex-col justify-center">
        <h1 ref="heroTitle"
          class="text-[14vw] md:text-[11vw] leading-[0.8] font-black uppercase tracking-tighter flex flex-col text-wrap-balance">
          <span class="hero-line-1 block">Architecting</span>
          <span class="hero-line-2 block italic text-[#8b7e66] font-light tracking-tight ml-[10vw]">Systems.</span>
          <span class="hero-line-3 block text-right cursor-none select-none"
            @mouseenter="scrambleText($event.target as HTMLElement, 'CORE ONLY.')"
            @mouseleave="scrambleText($event.target as HTMLElement, 'NOT APPS.')">
            NOT APPS.
          </span>
        </h1>

        <div class="mt-20 md:ml-[30vw] max-w-xl">
          <p class="text-lg md:text-xl font-medium leading-relaxed text-[#1a1a1a]/70 text-wrap-pretty">
            Nguyen Manh Duc — Mobile Engineer <br />
            Engineering high-performance mobile applications with uncompromising digital aesthetics.
          </p>
        </div>
      </div>


    </section>

    <!-- ABOUT & EXPERTISE MERGED SECTION -->
    <section id="about"
      class="px-6 md:px-12 py-32 w-full max-w-[1800px] mx-auto border-t border-black/5 relative overflow-hidden">
      <!-- Background Telemetry -->
      <div class="absolute inset-0 opacity-[0.03] pointer-events-none"
        style="background-image: radial-gradient(circle, #000 1px, transparent 1px); background-size: 40px 40px;"></div>

      <div class="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

        <!-- LEFT: ABOUT -->
        <div class="lg:col-span-7 flex flex-col justify-start">
          <div class="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-[#8b7e66] mb-8">
            <span class="w-8 h-px bg-[#8b7e66]"></span>
            System_Manifesto
          </div>

          <h2
            class="text-[4rem] md:text-[6rem] lg:text-[7.5rem] font-black uppercase tracking-tighter leading-[0.85] mb-12 text-[#1a1a1a] text-wrap-balance">
            ABOUT.
          </h2>

          <div class="flex flex-col gap-8 max-w-2xl">
            <h3 class="text-2xl md:text-3xl font-black uppercase tracking-tighter leading-[1.1] text-wrap-balance">
              Building digital infrastructure that is <span
                class="italic font-light text-[#8b7e66]">Irreplaceable</span>.
            </h3>
            <p class="text-base md:text-lg text-black/60 leading-relaxed font-medium text-wrap-pretty">
              Focused on the intersection of native performance and industrial brutalism. My approach treats every
              application as a precision instrument. By bridging the gap between low-level native cores and high-end
              visual engineering, I deliver systems that are not just functional, but architectural benchmarks.
            </p>
          </div>
        </div>

        <!-- RIGHT: TECH STACK & TOOLS -->
        <div id="expertise" class="lg:col-span-5 flex flex-col gap-12 pt-8 lg:pt-16 expertise-grid scroll-mt-32">

          <!-- Tech Stack -->
          <div>
            <div class="flex items-center gap-4 text-[12px] font-black uppercase tracking-[0.2em] text-[#1a1a1a] mb-6">
              <Activity :size="14" class="text-[#8b7e66]" />
              Tech_Stack
            </div>

            <div class="flex flex-wrap gap-2">
              <div v-for="tech in [
                'React Native', 'React.js', 'Next.js', 'Vue.js',
                'Flutter', 'Jetpack Compose', 'KMP', 'System Bridges'
              ]" :key="tech"
                class="expertise-module px-3 py-2 border border-black/20 text-[10px] font-mono font-bold uppercase tracking-widest text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-[#f3f2eb] hover:border-[#1a1a1a] transition-colors duration-300 cursor-default active:scale-[0.96]">
                {{ tech }}
              </div>
            </div>
          </div>

          <!-- Tools -->
          <div>
            <div class="flex items-center gap-4 text-[12px] font-black uppercase tracking-[0.2em] text-[#1a1a1a] mb-6">
              <span class="w-2 h-2 bg-[#8b7e66]"></span>
              Tools
            </div>

            <div class="flex flex-wrap gap-2">
              <div v-for="tool in [
                'Git', 'Figma', 'ChatGPT', 'Notion',
                'Docker', 'Android Studio', 'Xcode', 'Illustrator'
              ]" :key="tool"
                class="expertise-module px-3 py-2 border border-black/20 border-dotted text-[10px] font-mono font-bold uppercase tracking-widest text-black/60 hover:text-[#1a1a1a] hover:border-black/50 transition-colors duration-300 cursor-default active:scale-[0.96]">
                {{ tool }}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

  </main>
</template>

<style scoped>
.hero-line-1,
.hero-line-2,
.hero-line-3 {
  display: block;
  will-change: transform;
}

.will-change-transform {
  will-change: transform;
}

.ease-expo {
  transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
}

@media (max-width: 768px) {
  .hero-line-2 {
    margin-left: 0;
  }
}

.expertise-module {
  cursor: pointer;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: #f3f2eb;
}

::-webkit-scrollbar-thumb {
  background: #1a1a1a;
}

::-webkit-scrollbar-thumb:hover {
  background: #8b7e66;
}
</style>
