<template>
  <q-card class="my-card">
    <q-img v-if="recipe.recipe_img" :src="recipe.recipe_img">
      <div class="absolute-bottom text-subtitle2 text-center">
        {{ recipe.recipe_title }}
      </div>
    </q-img>
    <img v-else src="../statics/recipe-image.jpg" />

    <q-card-actions align="right">
      <q-btn flat round color="red-9" icon="delete" @click="deleteRecipe" />
      <q-btn flat round color="teal" icon="check_circle" />
      <!-- <q-btn flat round color="teal" icon="unpublished" /> -->
      <q-btn flat round color="primary" icon="share" />
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";
import { useRecipesStore } from "/src/stores/recipes";

const $q = useQuasar();
const $recipesStore = useRecipesStore();

async function deleteRecipe() {
  $q.dialog({
    title: "Confirm",
    message: "Really delete?",
    cancel: true,
    persistent: true,
  }).onOk(() => {
    $recipesStore.deleteRecipe(props.recipe.recipe_id);
    $q.notify({
      message: "Recipe deleted",
      color: "primary",
    });
  });
}

const props = defineProps({
  recipe: Object,
});
</script>
