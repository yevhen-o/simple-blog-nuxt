<template>
  <form @submit="onSubmit" class="add-post-form">
    <InputField
      v-model="title"
      label="Title"
      name="title"
      :error="errors.title"
      @blur="handleBlur"
      :isTouched="touchedFields.title"
    />
    <InputField
      v-model="slug"
      label="Slug"
      name="slug"
      :error="errors.slug"
      @blur="handleBlur"
      :isTouched="touchedFields.slug"
    />
    <InvalidText v-if="slugAlreadyInUse">
      Slug already in use
      <Button
        v-if="slugAlreadyInUse && !hasCustomSlug"
        @click="setHasCustomSlug"
        >Set custom slug</Button
      >
    </InvalidText>
    <InputField
      v-model="content"
      label="Content"
      name="content"
      rows="5"
      :error="errors.content"
      @blur="handleBlur"
      :isTouched="touchedFields.content"
    />
    <InputField
      v-model="tags"
      label="Tags"
      name="tags"
      :error="errors.tags"
      @blur="handleBlur"
      :isTouched="touchedFields.tags"
    />
    <InputField
      v-model="author"
      disabled
      label="Author"
      name="author"
      :error="errors.author"
      @blur="handleBlur"
      :isTouched="touchedFields.author"
    />

    <Button type="submit">Submit</Button>
  </form>
</template>

<script setup lang="ts">
import InputField from "~/components/form/InputField.vue";
import InvalidText from "~/components/form/InvalidText.vue";
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
import { nextTick } from "vue";

const router = useRouter();
const { user } = useAuth();

const touchedFields = ref<{ [key: string]: boolean }>({ slug: true });
const hasCustomSlug = ref(false);
const slugAlreadyInUse = ref(false);

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
  author: "",
  tags: "",
  slug: "",
};

watch(
  () => user.value,
  (newUser) => {
    if (newUser?.email) {
      setFieldValue("author", maskEmail(newUser.email));
    }
  },
  { immediate: true } // Run immediately to catch existing user if present
);

const validationSchema = toTypedSchema(schema);
const { handleSubmit, errors, setErrors, setFieldValue } = useForm({
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
  }
});

const validateSlug = async () => {
  const isInUse = await isSlugInUse(slug.value);
  slugAlreadyInUse.value = isInUse;
};

const setHasCustomSlug = () => {
  hasCustomSlug.value = true;
};

const createSlug = async () => {
  if (hasCustomSlug.value || !title.value) return;
  setFieldValue("slug", titleToSlug(title.value));
  await nextTick();
  await validateSlug();
};

const handleBlur = (e: FocusEvent) => {
  if (
    !(
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLTextAreaElement
    )
  )
    return;

  const target = e.target as HTMLInputElement | HTMLTextAreaElement;
  touchedFields.value[target.name] = true;

  if (target.name === "title") {
    createSlug();
  }
  if (target.name === "slug") {
    validateSlug();
  }
};

const setAllFieldsTouched = () => {
  Object.keys(initialValues).forEach((key) => {
    touchedFields.value[key] = true;
  });
};
</script>

<style lang="scss" scoped>
.add-post-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacer-df);
}
</style>
