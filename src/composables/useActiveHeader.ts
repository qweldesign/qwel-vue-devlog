// useActiveHeader.ts

import { type Ref, provide, inject, type InjectionKey, ref, onMounted, onUnmounted } from 'vue'

type ActiveHeaderContextType = {
  sentinelRef: Ref<HTMLElement | null>
  headerRef: Ref<HTMLElement | null>
  isActiveRef: Ref<boolean>
  updateOffset: () => void
}

const activeHeaderKey: InjectionKey<ActiveHeaderContextType> = Symbol('ActiveHeaderContext')

export function provideActiveHeader(headerRef: Ref<HTMLElement | null>, updateOffset: () => void) {
  // Provide
  const sentinelRef = ref<HTMLElement | null>(null)
  const isActiveRef = ref<boolean>(true)

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
  
  provide(activeHeaderKey, { sentinelRef, headerRef, isActiveRef, updateOffset })
}

export function useActiveHeader() {
  return inject(activeHeaderKey)
}
