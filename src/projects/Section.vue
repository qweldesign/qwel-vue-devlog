<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useScrollSpy } from '../composables/useScrollSpy'
import { useReadableOnScroll } from '../composables/useReadableOnScroll';

const props = defineProps<{ name: string }>()
const sectionRef = ref<HTMLElement | null>(null)
const scrollSpy = useScrollSpy()
const registerSection = scrollSpy?.registerSection
const { el, isInview } = useReadableOnScroll()

defineExpose({ el })

onMounted(() => {
  if (sectionRef.value) registerSection?.(sectionRef.value)
})
</script>

<template>
  <section :id="name" class="section" ref="sectionRef">
    <h2 class="section__heading" :class="{'is-inview': isInview}" ref="el" data-readable>{{ name }} section</h2>
  </section>
</template>
