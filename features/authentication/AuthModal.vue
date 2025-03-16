<template>
  <Modal title="Authentication" @close="emitClose">
    <LoginSignupForm @authenticate="emitClose" />
  </Modal>
</template>

<script lang="ts" setup>
import Modal from "~/components/Modal.vue";
import LoginSignupForm from "./LoginSingupForm.vue";

const emit = defineEmits(["close"]);

const emitClose = () => {
  emit("close");
};
</script>
