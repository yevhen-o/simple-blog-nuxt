<template>
  <teleport to="body">
    <div class="overlay" @click="emitClose" />
    <div class="modal__wrapper">
      <div class="modal__container">
        <div>
          <div class="modal__header">
            <h3 class="modal__title">{{ title }}</h3>
            <Button
              v-if="hasCloseButton"
              class="modal__close"
              isFlat
              @click="emitClose"
            >
              <Close />
            </Button>
          </div>
          <div class="modal__content">
            <slot></slot>
          </div>
          <!-- Actions -->
          <div
            v-if="actions"
            class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600"
          >
            <Button
              v-for="action in actions"
              :key="action.title"
              @click="action.onClick"
            >
              {{ action.title }}
            </Button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "vue";
import Button from "./Button";
import { Close } from "./Icons";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  hasCloseButton: {
    type: Boolean,
    default: true,
  },
  actions: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["close"]);

const emitClose = () => {
  emit("close");
};

// Close modal on pressing 'Escape' key
const keydownListener = (e: KeyboardEvent) => {
  if (e.key === "Escape") {
    close();
  }
};

onMounted(() => {
  document.body.addEventListener("keyup", keydownListener);
});

onUnmounted(() => {
  document.body.removeEventListener("keyup", keydownListener);
});
</script>

<style scoped lang="scss">
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal {
  &__wrapper {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  &__container {
    position: relative;
    background-color: var(--primary-background);
    max-width: 900px;
    max-height: 90vh;
    border-radius: var(--border-radius-lg);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    padding: var(--spacer-df);
  }
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--primary-border);
  }
  &__title {
    margin: 0;
  }
  &__close {
    padding: var(--spacer-sm);
  }
  &__content {
    position: relative;
  }
}
</style>
