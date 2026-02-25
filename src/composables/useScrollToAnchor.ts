// useScrollToAnchor.ts

import { type Ref, provide, inject, type InjectionKey, ref, onMounted, onBeforeUnmount } from 'vue'

export type ScrollToAnchorContextType = {
  headerRef: Ref<HTMLElement | null>
  updateOffset: () => void
}

interface Props {
  cssVar?: string
  offset?: number
}

const scrollToAnchorKey: InjectionKey<ScrollToAnchorContextType> = Symbol('ScrollToAnchorContext')

export function provideScrollToAnchor(props: Props = {}) {
  // Provide
  const headerRef = ref<HTMLElement | null>(null)

  // オプション
  const cssVar = props.cssVar ?? '--scroll-offset'
  const fallbackOffset = props.offset ?? 0

  // resize throttle
  let resizeTicking = false

  // header高さを取得
  const getHeaderOffset = () => {
    return headerRef.value?.offsetHeight ?? fallbackOffset
  }

  // CSS変数にセット
  const updateOffset = () => {
    const offset = getHeaderOffset()
    document.documentElement.style.setProperty(cssVar, `${offset}px`);
  }

  // リサイズ
  const onResize = () => {
    if (resizeTicking) return

    // requestAnimationFrame でスロットル
    resizeTicking = true
    requestAnimationFrame(() => {
      updateOffset()
      resizeTicking = false
    })
  }

  // CSS変数反映後にアンカー位置を再計算させるため,
  // hash を一度リセットして再適用する
  const correctInitialAnchor = () => {
    const { hash } = window.location
    if (!hash) return

    // history を汚さないため replaceState を使用
    history.replaceState(null, '', window.location.pathname + window.location.search)
    history.replaceState(null, '', window.location.pathname + window.location.search + hash)
  }

  onMounted(() => {
    updateOffset()
    correctInitialAnchor()
    window.addEventListener('resize', onResize, { passive: true })
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', onResize)
  })

  provide(scrollToAnchorKey, { headerRef, updateOffset })

  return { headerRef, updateOffset }
}

export function useScrollToAnchor() {
  return inject(scrollToAnchorKey)
}
