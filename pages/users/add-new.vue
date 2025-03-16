<template>
  <BackButtonHeading>
    Simulate add new user, to check cache revalidation
  </BackButtonHeading>

  <button @click="submitFunction" type="submit">Submit</button>
</template>

<script setup lang="ts">
import BackButtonHeading from "~/components/BackButtonHeading";
import { getUrl, IDENTIFIERS, Link } from "~/utils";
import { postNewUser } from "~/services/httpClient";
import { useRouter } from "vue-router";

const router = useRouter();

definePageMeta({
  layout: "blog",
});

const submitFunction = async () => {
  await postNewUser({ name: "Joan", email: "joan@joan.com" });
  router.push(getUrl(IDENTIFIERS.USERS));
};
</script>
