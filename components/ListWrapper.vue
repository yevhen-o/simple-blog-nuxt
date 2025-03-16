<template>
  <div class="list__wrapper">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.list__wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--spacer-df);
}
</style>
