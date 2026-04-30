import { animate, scrambleText as animeScramble, type JSAnimation } from 'animejs'
const activeScrambles = new WeakMap<HTMLElement, JSAnimation>()

/**
 * Core scramble logic using AnimeJS v4.
 */
export const scrambleText = (
  el: HTMLElement,
  targetText: string,
  config: { chars?: string; duration?: number; revealRate?: number; settleDuration?: number } = {}
) => {
  // Stop existing animation if any
  stopScramble(el)

  const animation = animate(el, {
    textContent: animeScramble({
      text: targetText,
      chars: config.chars || 'A-Z0-9!@#$%^&*()_+',
      revealRate: config.revealRate || 80,
      settleDuration: config.settleDuration || 200,
    }),
    duration: config.duration,
    ease: 'outQuart',
    onComplete: () => {
      activeScrambles.delete(el)
    }
  })

  activeScrambles.set(el, animation)
}

/**
 * Force stop an active scramble animation.
 */
export const stopScramble = (el: HTMLElement, finalText?: string) => {
  const animation = activeScrambles.get(el)
  if (animation) {
    animation.pause()
    activeScrambles.delete(el)
  }
  if (finalText !== undefined) {
    el.innerText = finalText
  }
}

/**
 * Template-friendly helper for hover interactions.
 */
export const handleScramble = (e: MouseEvent, text: string, selector?: string) => {
  const target = e.currentTarget as HTMLElement
  const el = selector ? (target.querySelector(selector) as HTMLElement) : target
  if (el) scrambleText(el, text)
}

