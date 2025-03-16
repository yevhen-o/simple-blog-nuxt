<template>
  <form @submit="onSubmit" class="login-form__fields">
    <h2 v-if="isLogin">Login</h2>
    <h2 v-else>Sign Up</h2>
    <InputField
      v-model="email"
      type="email"
      label="Email"
      name="email"
      :error="errors.email"
    />
    <InputField
      v-model="password"
      type="password"
      label="Password"
      name="password"
      :error="errors.password"
    />

    <Button v-if="isLogin" type="submit">Submit</Button>
    <Button v-else type="submit">Sign Up</Button>

    <div class="switch">
      <Button isFlat @click="toggleLogin">
        <span v-if="isLogin">Switch to Sign Up</span>
        <span v-else>Switch to Login</span>
      </Button>
    </div>
  </form>
</template>
<script setup lang="ts">
import InputField from "~/components/form/InputField.vue";
import Button from "~/components/Button.vue";
import { useField, useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as zod from "zod";
import { signUp, login } from "~/services/firebase/auth";

const emit = defineEmits(["authenticate"]);

const validationSchema = toTypedSchema(
  zod.object({
    email: zod
      .string()
      .min(1, { message: "This is required" })
      .email({ message: "Must be a valid email" }),
    password: zod
      .string()
      .min(1, { message: "This is required" })
      .min(8, { message: "Too short" }),
  })
);
const { handleSubmit, errors } = useForm({
  validationSchema,
});
const { value: email } = useField("email");
const { value: password } = useField("password");
const isLogin = ref(true);
const onSubmit = handleSubmit(async (data) => {
  try {
    if (isLogin.value) {
      await login(data.email, data.password);
    } else {
      await signUp(data.email, data.password);
    }
    emit("authenticate");
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    }
  }
});
const toggleLogin = () => {
  isLogin.value = !isLogin.value;
};
</script>

<style lang="scss" scoped>
.login-form {
  &__fields {
    min-width: 300px;
    display: flex;
    flex-direction: column;
    gap: var(--spacer-df);
  }
}
.switch {
  text-align: center;
}
</style>
