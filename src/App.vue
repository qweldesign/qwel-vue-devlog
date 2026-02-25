<script setup lang="ts">
import AppHeader from './components/Header.vue'
import AppMain from './components/Main.vue'
import AppFooter from './components/Footer.vue'
import { provideScrollToAnchor } from './composables/useScrollToAnchor'
import { provideActiveHeader } from './composables/useActiveHeader'

const { headerRef, updateOffset } = provideScrollToAnchor()
provideActiveHeader(headerRef, updateOffset)
</script>

<template>
  <AppHeader />
  <AppMain />
  <AppFooter />
</template>
