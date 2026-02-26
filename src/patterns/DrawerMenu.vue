<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { sections, socials } from '../types/navigation'
import Icon from '../primitives/Icon.vue'
import XIcon from '../assets/icons/icon-x.svg'
import FacebookIcon from '../assets/icons/icon-facebook.svg'
import InstagramIcon from '../assets/icons/icon-instagram.svg'

const isShown = ref(false) // 初期表示
const isActive = ref(false) // 開閉状態

// 開閉
const toggle = () => {
  isActive.value = !isActive.value
}

// スクロール時にメニューを非表示
const windowScrollHandler = () => {
  if (isActive.value) toggle()
}

onMounted(() => {
  setTimeout(() => {
    isShown.value = true
  }, 1000)

  window.addEventListener('scroll', windowScrollHandler)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', windowScrollHandler)
})

const componentsMap = {
  x: XIcon,
  facebook: FacebookIcon,
  instagram: InstagramIcon
}
</script>

<template>
  <Icon
    :class="{ 'is-active': isShown && !isActive }"
    role="button"
    tabindex="0"
    aria-label="メニューを開く"
    name="drawer-navicon"
    icon="menu"
    color="sky"
    size="large"
    :rounded="false"
    @click="toggle"
  ></Icon>
  <Icon
    :class="{ 'is-active': isShown && isActive }"
    role="button"
    tabindex="0"
    aria-label="メニューを閉じる"
    name="drawer-close"
    icon="close"
    color="sky"
    size="large"
    :rounded="false"
    @click="toggle"
  ></Icon>
  <div class="drawer-menu" :class="{ 'is-collapsed': !isActive }">
    <div class="drawer-menu__inner" :class="{ 'is-hidden': !isActive }">
      <div class="drawer-menu__sitebrand">
        <img src="/images/logo.svg" alt="QWEL in Action" />
      </div>
      <ul class="drawer-menu__list is-primary-menu">
        <li class="drawer-menu__item" v-for="name in sections" :key="name">
          <a :href="`#${name}`">{{ name }}</a>
        </li>
      </ul>
      <ul class="drawer-menu__list is-social-menu">
        <li class="drawer-menu__item" v-for="name in socials">
          <a :href="`https://${name}.com/qweldesign`" target="_blank" rel="noopener">
            <component :is="componentsMap[name]" />
          </a>
        </li>
      </ul>
    </div>
  </div>
  <div class="drawer-menu-overlay" :class="{ 'is-collapsed': !isActive }" @click="toggle"></div>
</template>
