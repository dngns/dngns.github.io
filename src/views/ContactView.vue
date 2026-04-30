<script setup lang="ts">
import { gsap } from 'gsap'
import { ArrowLeft, Mail, MapPin, Radio, Terminal } from 'lucide-vue-next'
import { defineComponent, h, onMounted, onUnmounted, ref } from 'vue'
import { handleScramble } from '../utils/scramble'

// Custom SVG Icons from Simple Icons for long-term stability
const IconX = defineComponent({
  render() {
    return h('svg', { viewBox: '0 0 24 24', fill: 'currentColor', class: 'w-6 h-6' }, [
      h('path', { d: 'M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z' })
    ])
  }
})

const IconLinkedin = defineComponent({
  render() {
    return h('svg', { viewBox: '0 0 24 24', fill: 'currentColor', class: 'w-6 h-6' }, [
      h('path', { d: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z' })
    ])
  }
})

const IconGithub = defineComponent({
  render() {
    return h('svg', { viewBox: '0 0 24 24', fill: 'currentColor', class: 'w-6 h-6' }, [
      h('path', { d: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12' })
    ])
  }
})

const main = ref<HTMLElement | null>(null)
const systemLog = ref<string[]>([
  'Initializing Contact_Protocol_v4.2...',
  'Scanning for active uplinks...',
  'System status: ONLINE',
  'Encryption: AES-256-GCM active'
])

let ctx: gsap.Context

onMounted(() => {
  if (!main.value) return
  
  ctx = gsap.context(() => {
    const tl = gsap.timeline()
    
    // Industrial entrance sequence
    tl.to('.reveal-data', {
      opacity: 1,
      y: 0,
      stagger: 0.08,
      duration: 0.6,
      ease: "expo.out"
    })
    .to('.hazard-bar', {
      scaleY: 1,
      duration: 0.8,
      ease: "power4.out"
    }, "-=0.4")

    // Continuous signal pulse
    gsap.to('.signal-bar', {
      height: () => Math.random() * 100 + "%",
      duration: 0.2,
      repeat: -1,
      stagger: 0.1,
      ease: "none"
    })
    
    // Log updates
    const logInterval = setInterval(() => {
      const logs = [
        `Uplink ping: ${Math.floor(Math.random() * 50)}ms`,
        `Packet inspection: SUCCESS`,
        `Location: 10.8231° N, 106.6297° E`,
        `Entropy source: STABLE`,
        `Protocol: SECURE_CHANNEL_ESTABLISHED`
      ]
      systemLog.value.push(logs[Math.floor(Math.random() * logs.length)])
      if (systemLog.value.length > 6) systemLog.value.shift()
    }, 3000)
    
    onUnmounted(() => clearInterval(logInterval))
  }, main.value)
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>

<template>
  <div ref="main"
    class="contact-terminal bg-[#f3f2eb] min-h-screen text-[#1a1a1a] selection:bg-[#8b7e66] selection:text-white relative overflow-hidden antialiased z-30 font-sans">
    
    <!-- ANALOG DEGRADATION OVERLAYS -->
    <div class="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] mix-blend-multiply bg-noise"></div>
    <div class="fixed inset-0 pointer-events-none z-[101] opacity-[0.05] scanlines"></div>

    <!-- MAIN GRID INFRASTRUCTURE -->
    <div class="grid grid-cols-1 md:grid-cols-12 min-h-screen border-l border-black/10">
      
      <!-- LEFT REGISTRY: IDENTITY & STATUS -->
      <aside
        class="md:col-span-3 border-r border-black/10 p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
        <div class="reveal-data opacity-0 translate-y-4">
          <!-- CREATIVE BACK BUTTON: OPERATIONAL COMMAND -->
          <router-link to="/" 
            class="group relative inline-flex flex-col gap-2 transition-all active:scale-[0.96]"
            @mouseenter="handleScramble($event, 'RETURN_TO_CORE', '.cmd-text')">
            <div class="flex items-center gap-2 text-[8px] font-mono font-bold opacity-40 tracking-widest uppercase">
              <span class="w-1 h-1 bg-[#8b7e66]"></span>
              [ CMD: EXIT_SYSTEM ]
            </div>
            <div class="flex items-center gap-3 bg-black/5 px-4 py-3 border border-black/5 group-hover:border-[#8b7e66]/30 transition-all">
              <ArrowLeft :size="14" stroke-width="2.5" class="group-hover:-translate-x-1 transition-transform" />
              <span class="cmd-text text-[10px] font-mono font-black uppercase tracking-[0.2em]">Return_to_Core</span>
            </div>
            <!-- Kinetic Progress Line -->
            <div class="absolute bottom-0 left-0 h-[2px] bg-[#8b7e66] w-0 group-hover:w-full transition-all duration-500 ease-expo"></div>
          </router-link>
          
          <div class="mt-20">
            <div class="flex items-center gap-2 mb-4">
              <div class="w-2 h-2 bg-[#8b7e66] animate-pulse"></div>
              <span class="text-[9px] font-mono font-bold tracking-widest uppercase text-[#8b7e66]">System_Active</span>
            </div>
            <h1 class="text-6xl md:text-8xl font-black leading-[0.8] tracking-tighter uppercase mb-6 text-wrap-balance">
              DIR<br />ECT<br />ORY.
            </h1>
            <p class="text-[11px] font-mono leading-relaxed opacity-60 uppercase tracking-wider">
              Establish secure communication uplink with the primary architectural unit.
            </p>
          </div>
        </div>

        <div class="reveal-data opacity-0 translate-y-4">
          <!-- SIGNAL TELEMETRY -->
          <div class="mb-10">
            <div class="text-[8px] font-mono font-bold opacity-30 mb-3 tracking-[0.3em]">SIGNAL_STRENGTH</div>
            <div class="flex items-end gap-1 h-12">
              <div v-for="i in 12" :key="i" class="signal-bar w-1 bg-black/10" :style="{ height: '20%' }"></div>
            </div>
          </div>
          
          <div class="text-[9px] font-mono font-bold opacity-40 space-y-1">
            <div class="flex justify-between"><span>LATITUDE</span> <span>10.8231 N</span></div>
            <div class="flex justify-between"><span>LONGITUDE</span> <span>106.6297 E</span></div>
            <div class="flex justify-between"><span>LOCAL_TIME</span> <span>{{ new Date().toLocaleTimeString() }}</span>
            </div>
          </div>
        </div>
        
        <!-- HAZARD BAR -->
        <div class="hazard-bar absolute left-0 top-0 bottom-0 w-1 bg-[#8b7e66] origin-top scale-y-0"></div>
      </aside>

      <!-- MAIN TERMINAL: UPLINKS -->
      <main class="md:col-span-9 flex flex-col">
        
        <div class="flex-grow p-6 md:p-12 overflow-y-auto">
          <!-- UPLINK GRID (The "Anti-Bento") -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24">
            
            <!-- PRIMARY CHANNEL: EMAIL -->
            <div class="lg:col-span-2 reveal-data opacity-0 translate-y-4">
              <div class="flex items-center gap-4 mb-6">
                <div class="px-2 py-0.5 bg-black text-white text-[8px] font-mono font-bold tracking-widest">UPLINK_01
                </div>
                <div class="h-px flex-grow bg-black/10"></div>
              </div>
              <a href="mailto:dnglabsneversleep@gmail.com"
                @mouseenter="handleScramble($event, 'DNGLABSNEVERSLEEP@GMAIL.COM')"
                class="block text-4xl md:text-7xl font-mono font-black tracking-tighter hover:text-[#8b7e66] transition-all duration-300 break-all leading-none uppercase active:scale-[0.96]">
                dnglabsneversleep@gmail.com
              </a>
              <div class="mt-4 flex gap-8 text-[10px] font-mono font-bold opacity-40 uppercase tracking-widest">
                <span class="flex items-center gap-2">
                  <Mail :size="12" /> SMTP_ENCRYPTED
                </span>
                <span>Response_Time: &lt; 24h</span>
              </div>
            </div>

            <!-- SOCIAL UPLINKS -->
            <div v-for="(link, i) in [
              { label: 'UPLINK_02', title: 'LINKEDIN', url: 'https://www.linkedin.com/in/mduc-engineer/', icon: IconLinkedin, data: 'PROFESSIONAL_GRAPH' },
              { label: 'UPLINK_03', title: 'GITHUB', url: 'https://github.com/dngns', icon: IconGithub, data: 'SOURCE_REPOSITORY' },
              { label: 'UPLINK_04', title: 'X_TWITTER', url: 'https://x.com/ddn431', icon: IconX, data: 'BROADCAST_NODE' }
            ]" :key="i" class="reveal-data opacity-0 translate-y-4">
              <div class="flex items-center gap-4 mb-4">
                <div class="text-[8px] font-mono font-bold opacity-40 tracking-widest">{{ link.label }}</div>
                <div class="h-px flex-grow bg-black/10"></div>
              </div>
              <a :href="link.url" target="_blank" 
                @mouseenter="handleScramble($event, link.title, 'h3')"
                class="group flex items-end justify-between border-b-2 border-black/5 pb-4 hover:border-[#8b7e66] transition-all duration-300 active:scale-[0.96]">
                <h3 class="text-3xl md:text-5xl font-mono font-black tracking-tighter uppercase text-wrap-balance">{{ link.title }}</h3>
                <div class="flex items-center gap-3">
                  <component :is="link.icon"
                    class="w-7 h-7 group-hover:text-[#8b7e66] group-hover:-translate-y-1 transition-all" />
                </div>
              </a>
              <div
                class="mt-2 text-[9px] font-mono font-bold opacity-30 tracking-widest flex justify-between uppercase">
                <span>{{ link.data }}</span>
                <span>STATUS: ACTIVE</span>
              </div>
            </div>

            <!-- GEOGRAPHIC NODE -->
            <div class="reveal-data opacity-0 translate-y-4">
              <div class="flex items-center gap-4 mb-4">
                <div class="text-[8px] font-mono font-bold opacity-40 tracking-widest">NODE_LOCATION</div>
                <div class="h-px flex-grow bg-black/10"></div>
              </div>
              <div class="flex items-start justify-between">
                <div>
                  <h3 class="text-3xl md:text-5xl font-mono font-black tracking-tighter uppercase leading-tight text-wrap-balance">
                    Saigon,<br />Vietnam</h3>
                  <div
                    class="mt-4 text-[10px] font-mono font-bold opacity-40 flex items-center gap-2 uppercase tracking-widest">
                    <MapPin :size="12" /> GMT +7.00
                  </div>
                </div>
                <div class="w-24 h-24 border border-black/10 relative overflow-hidden group">
                  <div class="absolute inset-0 bg-black/5 group-hover:bg-[#8b7e66]/10 transition-colors"></div>
                  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Radio :size="24"
                      class="opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all text-[#8b7e66]" />
                  </div>
                  <!-- Mini grid inside -->
                  <div class="absolute inset-0 opacity-10"
                    style="background-image: radial-gradient(circle, #000 1px, transparent 1px); background-size: 10px 10px;">
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <!-- TERMINAL FOOTER: LOGS -->
        <footer class="mt-auto border-t border-black/10 p-6 md:px-12 md:py-12 bg-[#1a1a1a] text-[#f3f2eb]">
          <div class="flex flex-col md:flex-row justify-between gap-8 items-end">
            <div class="w-full">
              <div class="flex items-center gap-2 mb-4">
                <Terminal :size="14" class="text-[#8b7e66]" />
                <span class="text-[9px] font-mono font-bold tracking-[0.4em] uppercase">System_Log_Console</span>
              </div>
              <div class="space-y-1">
                <div v-for="(log, i) in systemLog" :key="i" 
                  class="text-[10px] font-mono opacity-60 flex gap-4 overflow-hidden whitespace-nowrap">
                  <span class="opacity-30">[{{ new Date().toLocaleTimeString() }}]</span>
                  <span class="reveal-log">{{ log }}</span>
                </div>
              </div>
            </div>
          </div>
        </footer>

      </main>
    </div>

    <!-- TACTICAL DECORATIONS -->
    <div class="absolute top-0 right-0 p-4 flex gap-2 opacity-20 pointer-events-none">
      <div v-for="i in 3" :key="i" class="w-1 h-1 bg-black"></div>
    </div>
    <div class="absolute bottom-0 left-0 p-4 flex flex-col gap-2 opacity-20 pointer-events-none">
      <div v-for="i in 3" :key="i" class="w-1 h-1 bg-black"></div>
    </div>

  </div>
</template>

<style scoped>
.bg-noise {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3%3Cfilter id='noiseFilter'%3%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3%3C/filter%3%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3%3C/svg%3");
}

.scanlines {
  background: repeating-linear-gradient(0deg,
      transparent,
      transparent 1px,
      rgba(0, 0, 0, 0.1) 1px,
      rgba(0, 0, 0, 0.1) 2px);
  background-size: 100% 4px;
}

/* Custom scrollbar for the terminal feel */
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

@keyframes flicker {
  0% {
    opacity: 0.97;
  }

  5% {
    opacity: 0.95;
  }

  10% {
    opacity: 0.9;
  }

  15% {
    opacity: 0.95;
  }

  25% {
    opacity: 0.98;
  }

  30% {
    opacity: 0.95;
  }

  100% {
    opacity: 1;
  }
}

.scanlines {
  animation: flicker 0.15s infinite;
}

.reveal-log {
  display: inline-block;
  animation: type 0.1s steps(20);
}

@keyframes type {
  from {
    width: 0;
  }

  to {
    width: 100%;
  }
}
</style>
