// useScrollSpy.ts

import { type Ref, provide, inject, type InjectionKey, ref, onMounted, onBeforeUnmount } from 'vue'

type ScrollSpyContextType = {
  registerSection: (el: HTMLElement) => void
  currentId: Ref<string | null>
}

interface Props {
  rootMargin?: string
}

const scrollSpyKey: InjectionKey<ScrollSpyContextType> = Symbol('ScrollSpyContext')

export function provideScrollSpy(props: Props = {}) {
  // Provide
  const currentId = ref<string | null>(null)

  // オプション
  const rootMargin = props.rootMargin ?? '-40% 0px -60% 0px' // ビューポート中央付近で交差判定

  // 二重登録防止のため Set を使用
  const spySections: Set<HTMLElement> = new Set()

  // IntersectionObserver 初期化
  let observer: IntersectionObserver | null = null

  const onIntersect = (entries: IntersectionObserverEntry[]) => {
    // 交差しているセクションを抽出
    const isIntersecting = entries.find(e => e.isIntersecting)
    if (isIntersecting) {
      currentId.value = isIntersecting.target.id
    }
  }

  // セクション登録
  const registerSection = (el: HTMLElement) => {
    spySections.add(el)
    observer?.observe(el) // 監視開始
  }

  onMounted(() => {
    observer = new IntersectionObserver(onIntersect, { rootMargin })

    spySections.forEach(el => {
      observer?.observe(el) // 既に登録済みの要素を監視
    })
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
  })

  provide(scrollSpyKey, { registerSection, currentId })
}

export function useScrollSpy() {
  return inject(scrollSpyKey)
}
