<script lang="ts" setup>
const props = defineProps<{
  name: string
}>()
</script>

<template>
  <section :id="name" class="section">
    <h2 class="section__heading">{{ name }} section</h2>
  </section>
</template>
