<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useScrollSpy } from '../composables/useScrollSpy'

const props = defineProps<{ name: string }>()
const sectionRef = ref<HTMLElement | null>(null)
const scrollSpy = useScrollSpy()
const registerSection = scrollSpy?.registerSection

onMounted(() => {
  if (sectionRef.value) registerSection?.(sectionRef.value)
})
</script>

<template>
  <section :id="name" class="section" ref="sectionRef">
    <h2 class="section__heading">{{ name }} section</h2>
  </section>
</template>
