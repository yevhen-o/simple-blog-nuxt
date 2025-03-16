<template>
  <div class="user-menu__wrapper">
    <div v-if="user">
      <DropDown :options="options">{{ user.email }}</DropDown>
    </div>
    <div v-else>
      <Button @click="showAuthModal">Login</Button>
    </div>
  </div>
  <AuthModal v-if="hasAuthModalShown" @close="closeAuthModal" />
</template>

<script setup lang="ts">
import AuthModal from "./AuthModal.vue";
import { useAuth } from "~/hooks/useAuth";
import { logout } from "~/services/firebase/auth";

const hasAuthModalShown = ref(false);
const { user } = useAuth();

const options = [
  {
    label: "Log out",
    value: "logout",
    onClick: logout,
  },
];

const showAuthModal = () => {
  hasAuthModalShown.value = true;
};

const closeAuthModal = () => {
  hasAuthModalShown.value = false;
};
</script>

<style scoped>
.user-menu__wrapper {
  margin-left: auto;
  align-self: center;
}
</style>
