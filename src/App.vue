<script setup lang="ts">
import AppHeader from './layout/Header.vue'
import AppMain from './layout/Main.vue'
import BackToTop from './patterns/BackToTop.vue'
import DrawerMenu from './patterns/DrawerMenu.vue'
import AppFooter from './layout/Footer.vue'
import { provideScrollToAnchor } from './composables/useScrollToAnchor'
import { provideActiveHeader } from './composables/useActiveHeader'
import { provideScrollSpy } from './composables/useScrollSpy'
import { provideReadableOnScroll } from './composables/useReadableOnScroll'

const { headerRef, updateOffset } = provideScrollToAnchor()
provideActiveHeader(headerRef, updateOffset)
provideScrollSpy()
provideReadableOnScroll()
</script>

<template>
  <AppHeader />
  <AppMain />
  <BackToTop />
  <DrawerMenu />
  <AppFooter />
</template>
