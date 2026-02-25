// useReadableOnScroll.ts

import { provide, inject, type InjectionKey, ref, onMounted, onBeforeUnmount } from 'vue'

type ReadableOnScrollContextType = {
  enable: boolean
  toggle: boolean
  register: (el: HTMLElement, callback: (entry: IntersectionObserverEntry) => void) => void
  unregister: (el: HTMLElement) => void
}

interface Props {
  enable?: boolean
  threshold?: number
  rootMargin?: string
  toggle?: boolean
}

const readableOnScrollKey: InjectionKey<ReadableOnScrollContextType> = Symbol('ReadableOnScroll')

export function provideReadableOnScroll(props: Props = {}) {
  // オプション
  const {
    enable = true,
    threshold = 0.15,
    rootMargin = '0px 0px -12% 0px',
    toggle = false
  } = props

  // Inview ターゲットを格納
  const targets = new Map<HTMLElement, (entry: IntersectionObserverEntry) => void>()

  // IntersectionObserver
  let observer: IntersectionObserver | null = null

  // クラス切り替え
  const onIntersect = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      const callback = targets.get(entry.target as HTMLElement)
      if (callback) callback(entry)
    })
  }

  observer = new IntersectionObserver(onIntersect, { threshold, rootMargin })

  onBeforeUnmount(() => {
    observer?.disconnect()
  })

  const register = (el: HTMLElement, callback: (entry: IntersectionObserverEntry) => void) => {
    if (!enable) return
    targets.set(el, callback)
    observer?.observe(el)
  }

  const unregister = (el: HTMLElement) => {
    targets.delete(el)
    observer?.unobserve(el)
  }

  provide(readableOnScrollKey, { enable, toggle, register, unregister })
}

export function useReadableOnScroll() {
  const ctx = inject(readableOnScrollKey)
  if (!ctx || !ctx.enable) return {
    el: ref(null),
    isInview: ref(true)
  }
  
  const el = ref(null)
  const isInview = ref(false)

  onMounted(() => {
    if (!ctx || !el.value) return
    ctx.register(el.value, (entry) => {
      if (entry.isIntersecting) {
        isInview.value = true
        if (!ctx.toggle) ctx.unregister(el.value!)
      } else if (ctx.toggle) {
        isInview.value = false
      }
    })
  });

  onBeforeUnmount(() => {
    if (ctx && el.value) {
      ctx.unregister(el.value)
    }
  });

  return { el, isInview };
}
