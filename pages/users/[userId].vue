<template>
  <BackButtonHeading>
    View user, to check cache revalidation
  </BackButtonHeading>
  <code>{{ JSON.stringify(user, null, 2) }}</code>
</template>

<script setup lang="ts">
import BackButtonHeading from "~/components/BackButtonHeading";
import { getUserById } from "~/services/httpClient";
const route = useRoute();
const { data: user } = await useAsyncData("user", () =>
  getUserById(route.params.userId)
);
definePageMeta({
  layout: "blog",
});
</script>
