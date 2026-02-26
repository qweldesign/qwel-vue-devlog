<script lang="ts" setup>
const props = defineProps<{
  name: string,
  icon: string,
  color:string,
  size: string,
  rounded: boolean
}>()
</script>

<template>
  <button :class="name">
    <div :class="`icon is-${icon} is-${color} is-${size} ${rounded ? 'is-rounded' : ''}`">
      <span class="icon__span"></span>
    </div>
  </button>
</template>
