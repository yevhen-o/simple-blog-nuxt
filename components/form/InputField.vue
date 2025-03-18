<template>
  <div class="input_field">
    <Label
      v-if="label"
      :for="id"
      :is-focused="isFocused"
      :is-filled="!!modelValue"
      >{{ label }}</Label
    >
    <input
      v-if="rows === 1"
      :id="id"
      :name="name"
      :type="type"
      :value="modelValue"
      @input="handleInput"
      @blur="handleBlur"
      @focus="handleFocus"
      v-bind="$attrs"
    />
    <textarea
      v-else
      :rows="rows"
      :id="id"
      :name="name"
      :value="modelValue"
      @input="handleInput"
      @blur="handleBlur"
      @focus="handleFocus"
      v-bind="$attrs"
    ></textarea>
    <InvalidText v-if="error && isTouched">{{ error }}</InvalidText>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import Label from "./Label.vue";
import InvalidText from "./InvalidText.vue";

const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  id: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  rows: {
    type: Number,
    default: 1,
  },
  error: {
    type: String,
    default: "",
  },
  isTouched: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: [String, Number],
    default: "",
  },
});

const emit = defineEmits(["update:modelValue", "blur", "focus"]);

const isFocused = ref(false);

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement | HTMLTextAreaElement;
  emit("update:modelValue", target.value);
};

const handleBlur = (event: FocusEvent) => {
  isFocused.value = false;
  emit("blur", event);
};

const handleFocus = (event: FocusEvent) => {
  isFocused.value = true;
  emit("focus", event);
};
</script>

<style lang="scss" scoped>
.input_field {
  display: flex;
  flex-direction: column;

  input,
  textarea {
    all: unset;
    width: 100%;
    padding: 0.9rem 1.25rem;
    border: 1px solid var(--color-gray-25);
    border-radius: var(--border-radius-df);
    background: var(--color-gray-0);
    color: var(--color-gray-100);
    box-sizing: border-box;
    transition: var(--transition-df);

    &:focus {
      border-color: var(--color--focus);
    }
  }
}
</style>
