// useActiveHeader.ts

import { type Ref, onMounted, onUnmounted } from 'vue'
import { useScrollToAnchor } from './useScrollToAnchor'

interface Options {
  cssVar?: string
  offset?: number
}

export function useActiveHeader(sentinelRef: Ref<HTMLElement | null> , headerRef: Ref<HTMLElement | null> , isActiveRef: Ref<boolean>, options: Options = {}) {
  // ScrollToAnchor
  const { updateOffset } = useScrollToAnchor(headerRef, options)

  let observer: IntersectionObserver | null = null
  
  const onIntersect = (entries: IntersectionObserverEntry[]) => {
    const entry = entries[0]
    if (!entry) return
    isActiveRef.value = entry.isIntersecting // headerクラス切り替え
  } 

  onMounted(() => {
    // IntersectionObserver 初期化
    observer = new IntersectionObserver(onIntersect, { threshold: 0 });
    // 監視開始
    if (sentinelRef.value) observer.observe(sentinelRef.value);
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return { updateOffset }
}
