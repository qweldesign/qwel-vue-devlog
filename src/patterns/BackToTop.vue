<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Icon from '../primitives/Icon.vue'

interface Props {
  offsetRatio?: number
}

const props = withDefaults(defineProps<Props>(), {
  offsetRatio: 0
})

const isShown = ref(false)

// ボタン操作
const backToTop = () => {
  window.scroll({ top: 0, behavior: 'smooth' })
}

// ボタン表示制御
const updateVisibility = () => {
  isShown.value = window.innerHeight * props.offsetRatio < window.scrollY
}

onMounted(() => {
  window.addEventListener('scroll', updateVisibility, { passive: true })
  updateVisibility()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateVisibility)
})
</script>

<template>
  <Icon
    :class="{ 'is-active': isShown }"
    role="button"
    tabindex="0"
    aria-label="トップへ戻る"
    name="back-to-top"
    icon="chevron-up"
    color="sky"
    size="large"
    :rounded="true"
    @click.prevent="backToTop"
  ></Icon>
</template>
