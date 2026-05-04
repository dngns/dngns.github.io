<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { useIntersectionObserver } from '@vueuse/core'

const props = defineProps({
  words: {
    type: Array as () => string[],
    required: true,
  },
  interval: {
    type: Number,
    default: 2500,
  },
})

const currentIndex = ref(0)
const container = ref<HTMLElement | null>(null)
let timer: ReturnType<typeof setInterval> | null = null

const startLoop = () => {
  if (timer) clearInterval(timer)
  timer = setInterval(() => {
    if (!container.value) return
    const elements = container.value.children
    const currentEl = elements[currentIndex.value]

    // Animate out
    gsap.to(currentEl, {
      y: -20,
      opacity: 0,
      filter: 'blur(8px)',
      duration: 0.6,
      ease: 'power3.inOut',
    })

    currentIndex.value = (currentIndex.value + 1) % props.words.length
    const nextEl = elements[currentIndex.value]

    // Animate in
    gsap.fromTo(
      nextEl,
      { y: 20, opacity: 0, filter: 'blur(8px)' },
      { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.6, ease: 'power3.inOut' },
    )
  }, props.interval)
}

const stopLoop = () => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

onMounted(() => {
  const elements = container.value?.children
  if (elements) {
    for (let i = 0; i < elements.length; i++) {
      if (i !== 0) {
        gsap.set(elements[i], { opacity: 0, y: 20, filter: 'blur(8px)' })
      }
    }
  }

  useIntersectionObserver(
    container,
    ([{ isIntersecting }]) => {
      if (isIntersecting) {
        startLoop()
      } else {
        stopLoop()
      }
    },
    { threshold: 0.1 }, // Start when at least 10% visible
  )
})

onUnmounted(() => {
  stopLoop()
})
</script>

<template>
  <span class="inline-grid align-middle overflow-visible" ref="container">
    <span
      v-for="(word, index) in words"
      :key="word"
      class="col-start-1 row-start-1 whitespace-nowrap"
    >
      {{ word }}
    </span>
  </span>
</template>
