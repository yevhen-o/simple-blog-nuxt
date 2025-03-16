<template>
  <div>
    <BackButtonHeading>Add new post</BackButtonHeading>
    <template v-if="!user">
      Sorry add posts can only be done by logged in users
      <UserMenu />
    </template>
    <AddEditPostForm v-else />
  </div>
</template>

<script setup lang="ts">
import BackButtonHeading from "~/components/BackButtonHeading";
import UserMenu from "~/features/authentication/UserMenu.vue";
import AddEditPostForm from "~/features/Blog/AddEditPostForm.vue";
import { useAuth } from "~/hooks/useAuth";

const { user } = useAuth();

definePageMeta({
  layout: "blog",
});
</script>
