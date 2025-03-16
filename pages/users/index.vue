<template>
  <h1>List of users</h1>
  <Link :to="getUrl(IDENTIFIERS.USER_ADD)">Add new user</Link>
  <br />
  <br />
  <ListWrapper>
    <Link
      v-for="user in users"
      :to="getUrl(IDENTIFIERS.USER_VIEW, { userId: user.id })"
      :key="user.id"
    >
      {{ JSON.stringify(user) }}
    </Link>
  </ListWrapper>
</template>

<script setup lang="ts">
import ListWrapper from "~/components/ListWrapper.vue";
import { getUsers } from "~/services/httpClient";
import { getUrl, IDENTIFIERS, Link } from "~/utils";

definePageMeta({
  layout: "blog",
});
const { data: users } = await useAsyncData("users", getUsers);
</script>
