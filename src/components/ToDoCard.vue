<template>
  <q-card class="my-card">
    <q-img v-if="recipe.recipe_img" :src="recipe.recipe_img">
      <div class="absolute-bottom text-subtitle2 text-center">
        {{ recipe.recipe_title }}
      </div>
    </q-img>
    <img v-else src="../statics/recipe-image.jpg" />

    <q-card-actions align="right">
      <q-btn
        flat
        round
        color="red-9"
        icon="delete"
        @click="deleteRecipe(recipe.recipe_id)"
      />
      <q-btn flat round color="teal" icon="check_circle" />
      <!-- <q-btn flat round color="teal" icon="unpublished" /> -->
      <q-btn flat round color="primary" icon="share" />
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";
import { useUserStore } from "/src/stores/user";
import { useRecipesStore } from "/src/stores/recipes";

const $q = useQuasar();
const $userStore = useUserStore();
const $recipesStore = useRecipesStore();

async function deleteRecipe(recipeId) {
  $q.dialog({
    title: "Confirm",
    message: "Really delete?",
    cancel: true,
    persistent: true,
  }).onOk(() => {
    $recipesStore.deleteRecipe($userStore.user.id, recipeId).then(() => {
      $recipesStore.recipes.splice(
        $recipesStore.recipes.findIndex(
          (recipe) => recipe.recipe_id === recipeId
        ),
        1
      );
      $q.notify({
        message: "Recipe deleted",
        color: "primary",
      });
    });
  });
}

defineProps({
  recipe: Object,
});
</script>
