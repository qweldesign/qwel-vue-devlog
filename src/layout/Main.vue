<script lang="ts" setup>
import { sections } from '../types/navigation'
import Hero from '../projects/Hero.vue'
import AppSection from '../projects/Section.vue'
</script>

<template>
  <main>
    <Hero />
    <AppSection v-for="section in sections" :name="section" />
  </main>
</template>
