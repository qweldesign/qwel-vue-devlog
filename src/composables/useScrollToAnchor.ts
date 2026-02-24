// useScrollToAnchor.ts

import { type Ref, onMounted, onUnmounted } from "vue"

interface Options {
  cssVar?: string
  offset?: number
}

export function useScrollToAnchor(headerRef: Ref<HTMLElement | null> , options: Options = {}) {
  // オプション
  const cssVar = options.cssVar ?? '--scroll-offset'
  const fallbackOffset = options.offset ?? 0

  // resize throttle
  let resizeTicking = false

  // header高さを取得
  const getHeaderOffset = () => {
    return headerRef ? headerRef.value?.offsetHeight : fallbackOffset
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

  onUnmounted(() => {
    window.removeEventListener('resize', onResize)
  })
}
