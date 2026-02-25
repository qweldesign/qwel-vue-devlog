<script setup lang="ts">
import AppHeader from './components/Header.vue'
import AppMain from './components/Main.vue'
import AppFooter from './components/Footer.vue'
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
  <AppFooter />
</template>
