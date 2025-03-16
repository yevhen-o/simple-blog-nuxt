<template>
  <div v-if="tags" className="tags-list__wrapper">
    <strong>List of tags:</strong>
    <Tag v-for="tag in tags" :key="tag">
      {{ tag }}
    </Tag>
  </div>
</template>

<script setup lang="ts">
import Tag from "./Tag.vue";

defineProps<{ tags?: string[] }>();
</script>

<style lang="scss" scoped>
.tags-list__wrapper {
  display: flex;
  align-items: center;
  gap: var(--spacer-sm);

  & > h5 {
    margin: 0;
  }
}
</style>
