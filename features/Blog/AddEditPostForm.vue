<template>
  <form @submit="onSubmit" class="add-post-form">
    <InputField
      v-model="title"
      label="Title"
      name="title"
      :error="errors.title"
    />
    <InputField v-model="slug" label="Slug" name="slug" :error="errors.slug" />
    <InputField
      v-model="content"
      label="Content"
      name="content"
      rows="5"
      :error="errors.content"
    />
    <InputField v-model="tags" label="Tags" name="tags" :error="errors.tags" />
    <InputField
      v-model="author"
      label="Author"
      name="author"
      :error="errors.author"
    />

    <Button type="submit">Submit</Button>
  </form>
</template>

<script setup lang="ts">
import InputField from "~/components/form/InputField.vue";
import Button from "~/components/Button.vue";
import { useField, useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { getUrl, IDENTIFIERS, maskEmail, titleToSlug } from "~/utils";
import { isSlugInUse, postNewBlog } from "~/services/clientHttpClient";
import * as z from "zod";
import {
  PostValidationSchema,
  type PostInterface,
} from "~/types/PostInterface";
import { useAuth } from "~/hooks/useAuth";
import { useRouter } from "vue-router";

const router = useRouter();
const { user } = useAuth();

const schema = PostValidationSchema.omit({
  tags: true,
  authorId: true,
  createdAt: true,
}).extend({
  tags: z.string(),
});

let initialValues = {
  title: "",
  id: "",
  content: "",
  author: maskEmail(user?.email || ""),
  tags: "",
};

const validationSchema = toTypedSchema(schema);
const { handleSubmit, errors } = useForm({
  validationSchema,
  initialValues,
});
const { value: title } = useField("title");
const { value: content } = useField("content");
const { value: tags } = useField("tags");
const { value: slug } = useField("slug");
const { value: author } = useField("author");

const onSubmit = handleSubmit(async (values) => {
  try {
    await postNewBlog({
      ...values,
      tags: values.tags.split(" "),
      authorId: user!.uid,
      createdAt: Date.now().toString(),
    });
    router.push(getUrl(IDENTIFIERS.BLOG));
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    }
  } finally {
    isSubmitting = false;
  }
});

const validateSlug = async () => {
  const isInUse = await isSlugInUse(slug);
  if (isInUse) {
    setErrors("slug", "This slug already in use");
    touchedFields = { ...touchedFields, slug: true };
  }
  slugIsUsed = isInUse;
};

const createSlug = async () => {
  if (hasCustomSlug || !title) return;
  setData("slug", titleToSlug(title));
  await tick();
  validateSlug();
};

const handleBlur = (e: FocusEvent) => {
  if (
    !(
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLTextAreaElement
    )
  )
    return;

  touchedFields = {
    ...touchedFields,
    [e.target.name]: true,
  };
};

const setAllFieldsTouched = () => {
  touchedFields = Object.keys(initialValues).reduce(
    (acc, key) => ({ ...acc, [key]: true }),
    {}
  );
};
</script>

<style lang="scss" scoped>
.add-post-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacer-df);
}
</style>
